type InkScene = 'paper' | 'hero' | 'journey' | 'darkroom' | 'reading';
type ParticleKind = 'speck' | 'drop' | 'fiber';

interface SceneProfile {
  desktopCount: number;
  mobileCount: number;
  alpha: [number, number];
  drift: [number, number];
  pale: boolean;
}

interface InkParticle {
  x: number;
  y: number;
  z: number;
  size: number;
  alpha: number;
  velocityX: number;
  velocityY: number;
  age: number;
  life: number;
  rotation: number;
  kind: ParticleKind;
}

const canvas = document.querySelector<HTMLCanvasElement>('[data-ambient-ink]');

if (canvas) {
  const context = canvas.getContext('2d', { alpha: true });
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileViewport = window.matchMedia('(max-width: 767px)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  const profiles: Record<InkScene, SceneProfile> = {
    paper: { desktopCount: 12, mobileCount: 7, alpha: [0.08, 0.22], drift: [2, 6], pale: false },
    hero: { desktopCount: 24, mobileCount: 12, alpha: [0.12, 0.28], drift: [3, 10], pale: false },
    journey: {
      desktopCount: 18,
      mobileCount: 9,
      alpha: [0.1, 0.24],
      drift: [3, 8],
      pale: false,
    },
    darkroom: {
      desktopCount: 14,
      mobileCount: 8,
      alpha: [0.07, 0.2],
      drift: [2, 7],
      pale: true,
    },
    reading: {
      desktopCount: 8,
      mobileCount: 5,
      alpha: [0.07, 0.16],
      drift: [2, 5],
      pale: false,
    },
  };

  const sceneRatios = new Map<HTMLElement, number>();
  const particles: InkParticle[] = [];
  const avoidRects: DOMRect[] = [];
  const pointer = { x: -9999, y: -9999, strength: 0 };

  let width = 0;
  let height = 0;
  let dpr = 1;
  let currentScene: InkScene = 'paper';
  let previousScene: InkScene = 'paper';
  let sceneChangedAt = performance.now();
  let frameId = 0;
  let lastFrame = performance.now();
  let lastPaint = 0;
  let lastScrollY = window.scrollY;
  let lastScrollAt = performance.now();
  let scrollImpulse = 0;
  let avoidRectsDirty = true;
  let inkChannels = [37, 38, 34];

  // 路径固定种子让同一路由的首帧可复现，便于截图回归与视觉比较。
  let seed = Array.from(window.location.pathname).reduce(
    (value, char) => Math.imul(value ^ char.charCodeAt(0), 16777619),
    2166136261,
  );

  const random = () => {
    seed += 0x6d2b79f5;
    let value = seed;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };

  const parseColor = (value: string) => {
    const probe = document.createElement('span');
    probe.style.color = value;
    probe.style.display = 'none';
    document.body.append(probe);
    const resolved = getComputedStyle(probe).color;
    probe.remove();
    const channels = resolved
      .match(/[\d.]+/g)
      ?.slice(0, 3)
      .map(Number);
    return channels?.length === 3 ? channels : [37, 38, 34];
  };

  const readPalette = () => {
    const inkColor =
      getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#252622';
    inkChannels = parseColor(inkColor);
  };

  const getCount = (scene = currentScene) => {
    const profile = profiles[scene];
    return mobileViewport.matches ? profile.mobileCount : profile.desktopCount;
  };

  const isAvoided = (x: number, y: number) =>
    avoidRects.some(
      (rect) =>
        x > rect.left - 24 && x < rect.right + 24 && y > rect.top - 24 && y < rect.bottom + 24,
    );

  const updateAvoidRects = () => {
    avoidRects.length = 0;
    document.querySelectorAll<HTMLElement>('[data-ink-avoid]').forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.bottom > -48 && rect.top < height + 48) avoidRects.push(rect);
    });
    avoidRectsDirty = false;
  };

  const choosePosition = (scene: InkScene) => {
    let x = random() * width;
    let y = random() * height;

    for (let attempt = 0; attempt < 18; attempt += 1) {
      if (scene === 'reading') {
        const side = random() > 0.5 ? 1 : 0;
        const gutter = mobileViewport.matches ? width * 0.12 : width * 0.2;
        x = side ? width - random() * gutter : random() * gutter;
      } else {
        x = random() * width;
      }
      y = random() * height;
      if (!isAvoided(x, y)) break;
    }

    return { x, y };
  };

  const makeParticle = (scene: InkScene, distributeAge = false): InkParticle => {
    const profile = profiles[scene];
    const z = 0.25 + random() * 0.75;
    const kindRoll = random();
    const kind: ParticleKind = kindRoll < 0.5 ? 'speck' : kindRoll < 0.85 ? 'drop' : 'fiber';
    const life = 18 + random() * 27;
    const direction = random() * Math.PI * 2;
    const speed = profile.drift[0] + random() * (profile.drift[1] - profile.drift[0]);
    const position = choosePosition(scene);
    const nearBlob = kind === 'drop' && z > 0.82 && random() > 0.55;

    return {
      ...position,
      z,
      size: nearBlob ? 8 + random() * 4 : 1.5 + random() * 4.5,
      alpha: profile.alpha[0] + random() * (profile.alpha[1] - profile.alpha[0]),
      velocityX: Math.cos(direction) * speed,
      velocityY: Math.sin(direction) * speed * 0.48 - 0.6,
      age: distributeAge ? random() * life * 0.72 : 0,
      life,
      rotation: random() * Math.PI,
      kind,
    };
  };

  const syncParticleCount = () => {
    const target = getCount();
    while (particles.length < target) particles.push(makeParticle(currentScene, true));
    if (particles.length > target) particles.splice(target);
  };

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, mobileViewport.matches ? 1.25 : 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context?.setTransform(dpr, 0, 0, dpr, 0, 0);
    avoidRectsDirty = true;
    syncParticleCount();
    if (reducedMotion.matches) paint(performance.now(), false);
  };

  const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;

  const drawParticle = (particle: InkParticle, transition: number) => {
    // 阅读场景的中央半幅永不落墨，避免粒子掠过正文与题名。
    if (
      !context ||
      isAvoided(particle.x, particle.y) ||
      (currentScene === 'reading' && particle.x > width * 0.22 && particle.x < width * 0.78)
    )
      return;

    const fromProfile = profiles[previousScene];
    const toProfile = profiles[currentScene];
    const paleChannels = [232, 227, 212];
    const fromChannels = fromProfile.pale ? paleChannels : inkChannels;
    const toChannels = toProfile.pale ? paleChannels : inkChannels;
    const channels = fromChannels.map((channel, index) =>
      Math.round(mix(channel, toChannels[index] ?? channel, transition)),
    );
    const lifeFade = Math.min(1, particle.age / 2.2, (particle.life - particle.age) / 3.2);
    const pointerDistance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y);
    const pointerForce = Math.max(0, 1 - pointerDistance / 160) * pointer.strength * particle.z;
    const pointerAngle = Math.atan2(particle.y - pointer.y, particle.x - pointer.x);
    const offsetX = Math.cos(pointerAngle) * pointerForce * 6;
    const offsetY = Math.sin(pointerAngle) * pointerForce * 6;
    const x = particle.x + offsetX;
    const y = particle.y + offsetY;
    const alpha = Math.max(0, particle.alpha * lifeFade);

    context.save();
    context.translate(x, y);
    context.rotate(particle.rotation);
    context.fillStyle = `rgba(${channels.join(', ')}, ${alpha})`;

    if (particle.kind === 'fiber') {
      context.scale(1 + particle.z * 1.8, 0.22 + particle.z * 0.16);
      context.fillRect(-particle.size * 1.5, -particle.size / 2, particle.size * 3, particle.size);
    } else if (particle.kind === 'drop') {
      const gradient = context.createRadialGradient(0, 0, 0, 0, 0, particle.size * 1.35);
      gradient.addColorStop(0, `rgba(${channels.join(', ')}, ${alpha})`);
      gradient.addColorStop(0.58, `rgba(${channels.join(', ')}, ${alpha * 0.68})`);
      gradient.addColorStop(1, `rgba(${channels.join(', ')}, 0)`);
      context.fillStyle = gradient;
      context.beginPath();
      context.ellipse(
        0,
        0,
        particle.size * (1.02 + particle.z * 0.45),
        particle.size * 1.25,
        0,
        0,
        Math.PI * 2,
      );
      context.fill();
    } else {
      const radius = particle.size * (0.58 + particle.z * 0.34);
      context.beginPath();
      context.arc(0, 0, radius, 0, Math.PI * 2);
      context.fill();
    }

    context.restore();
  };

  const paint = (time: number, advance: boolean) => {
    if (!context) return;
    if (avoidRectsDirty) updateAvoidRects();
    context.clearRect(0, 0, width, height);

    const delta = Math.min((time - lastFrame) / 1000, 0.05);
    lastFrame = time;
    const transition = Math.min(1, (time - sceneChangedAt) / 600);

    particles.forEach((particle, index) => {
      if (advance) {
        particle.age += delta;
        particle.x += (particle.velocityX + scrollImpulse * particle.z) * delta;
        particle.y += particle.velocityY * delta;
        particle.rotation += delta * 0.025 * particle.z;

        if (
          particle.age >= particle.life ||
          particle.x < -24 ||
          particle.x > width + 24 ||
          particle.y < -24 ||
          particle.y > height + 24
        ) {
          particles[index] = makeParticle(currentScene);
        }
      }
      drawParticle(particles[index] ?? particle, transition);
    });
  };

  const animate = (time: number) => {
    const frameInterval = mobileViewport.matches ? 1000 / 30 : 1000 / 60;
    if (time - lastPaint >= frameInterval) {
      pointer.strength *= Math.pow(0.001, (time - lastPaint) / 900);
      scrollImpulse *= 0.9;
      paint(time, true);
      lastPaint = time;
    }
    frameId = requestAnimationFrame(animate);
  };

  const setScene = (nextScene: InkScene) => {
    if (nextScene === currentScene) return;
    previousScene = currentScene;
    currentScene = nextScene;
    sceneChangedAt = performance.now();
    syncParticleCount();
    if (nextScene === 'reading') {
      particles.forEach((_, index) => {
        particles[index] = makeParticle('reading', true);
      });
    }
  };

  const chooseScene = () => {
    let nextScene: InkScene = 'paper';
    let largestRatio = 0;
    sceneRatios.forEach((ratio, element) => {
      if (ratio > largestRatio) {
        const candidate = element.dataset.inkScene as InkScene | undefined;
        if (candidate && candidate in profiles) {
          nextScene = candidate;
          largestRatio = ratio;
        }
      }
    });
    setScene(nextScene);
  };

  readPalette();
  resize();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) =>
        sceneRatios.set(entry.target as HTMLElement, entry.intersectionRatio),
      );
      chooseScene();
      avoidRectsDirty = true;
      if (reducedMotion.matches) paint(performance.now(), false);
    },
    { threshold: [0, 0.15, 0.35, 0.6, 0.85], rootMargin: '-10% 0px -10% 0px' },
  );

  document
    .querySelectorAll<HTMLElement>('[data-ink-scene]')
    .forEach((element) => observer.observe(element));

  const themeObserver = new MutationObserver(() => {
    readPalette();
    if (reducedMotion.matches) paint(performance.now(), false);
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  // React Island 水合后可能新增避让区，监听结构变化即可，不在每帧重算布局。
  const contentObserver = new MutationObserver(() => {
    avoidRectsDirty = true;
  });
  contentObserver.observe(document.body, { childList: true, subtree: true });

  window.addEventListener('resize', resize, { passive: true });

  if (reducedMotion.matches) {
    paint(performance.now(), false);
  } else {
    window.addEventListener(
      'scroll',
      () => {
        const now = performance.now();
        const elapsed = Math.max(16, now - lastScrollAt);
        const velocity = ((window.scrollY - lastScrollY) / elapsed) * 16;
        scrollImpulse = Math.max(-10, Math.min(10, velocity));
        lastScrollY = window.scrollY;
        lastScrollAt = now;
        avoidRectsDirty = true;
      },
      { passive: true },
    );

    if (finePointer.matches) {
      window.addEventListener(
        'pointermove',
        (event) => {
          pointer.x = event.clientX;
          pointer.y = event.clientY;
          pointer.strength = 1;
        },
        { passive: true },
      );
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(frameId);
      } else {
        lastFrame = performance.now();
        frameId = requestAnimationFrame(animate);
      }
    });

    frameId = requestAnimationFrame(animate);
  }
}
