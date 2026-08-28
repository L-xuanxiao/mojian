import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetDir = path.resolve(process.argv[2] ?? path.join(root, 'src/assets/art/sketchbook'));
const names = [
  'cover-unified.png',
  'journal-unified.png',
  'projects-unified.png',
  'gallery-unified.png',
  'about-unified.png',
  'guestbook-unified.png',
];
const expected = { width: 1760, height: 1240 };

const inspect = async (name) => {
  const file = path.join(assetDir, name);
  const metadata = await sharp(file).metadata();
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const bounds = { left: info.width, top: info.height, right: -1, bottom: -1 };
  let edgePixels = 0;
  let brightEdgePixels = 0;

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      if (data[(y * info.width + x) * 4 + 3] <= 16) continue;
      bounds.left = Math.min(bounds.left, x);
      bounds.top = Math.min(bounds.top, y);
      bounds.right = Math.max(bounds.right, x);
      bounds.bottom = Math.max(bounds.bottom, y);

      if (data[(y * info.width + x) * 4 + 3] <= 64) continue;
      const touchesTransparency = [-1, 0, 1].some((dy) =>
        [-1, 0, 1].some((dx) => {
          const px = x + dx;
          const py = y + dy;
          return (
            px < 0 ||
            py < 0 ||
            px >= info.width ||
            py >= info.height ||
            data[(py * info.width + px) * 4 + 3] <= 64
          );
        }),
      );
      if (!touchesTransparency) continue;
      edgePixels += 1;
      if (
        (data[(y * info.width + x) * 4] +
          data[(y * info.width + x) * 4 + 1] +
          data[(y * info.width + x) * 4 + 2]) /
          3 >
        230
      )
        brightEdgePixels += 1;
    }
  }

  return {
    name,
    width: metadata.width,
    height: metadata.height,
    channels: metadata.channels,
    hasAlpha: metadata.hasAlpha,
    ...bounds,
    brightEdgeRatio: edgePixels ? brightEdgePixels / edgePixels : 0,
  };
};

const assets = await Promise.all(names.map(inspect));
const failures = [];
const anchor = assets[0];

for (const asset of assets) {
  if (asset.width !== expected.width || asset.height !== expected.height)
    failures.push(`${asset.name}: ${asset.width}×${asset.height}，应为 1760×1240`);
  if (asset.channels !== 4 || !asset.hasAlpha)
    failures.push(`${asset.name}: 必须是带透明通道的 RGBA 图片`);
  if (asset.brightEdgeRatio > 0.01) failures.push(`${asset.name}: 外轮廓仍有可见白边污染`);

  const normalized = {
    left: asset.left / asset.width,
    top: asset.top / asset.height,
    right: asset.right / asset.width,
    bottom: asset.bottom / asset.height,
  };
  if (
    normalized.left < 0.035 ||
    normalized.left > 0.07 ||
    normalized.top < 0.2 ||
    normalized.top > 0.24 ||
    normalized.right < 0.93 ||
    normalized.right > 0.97 ||
    normalized.bottom < 0.76 ||
    normalized.bottom > 0.8
  )
    failures.push(`${asset.name}: 可见书本边界不符合上游透明画布几何`);

  if (
    Math.max(
      Math.abs(asset.left - anchor.left),
      Math.abs(asset.top - anchor.top),
      Math.abs(asset.right - anchor.right),
      Math.abs(asset.bottom - anchor.bottom),
    ) > 3
  )
    failures.push(`${asset.name}: 可见书本边界与卷首相差超过 3px`);
}

console.table(assets);
if (failures.length) {
  console.error(`\n册页一致性检查失败（${failures.length} 项）：`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log('\n册页一致性检查通过：六张均为 1760×1240 RGBA，共享同一书本边界且无可见白边。');
}
