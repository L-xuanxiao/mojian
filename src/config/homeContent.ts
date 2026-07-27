// 首页准静态文案的单一出处(术语见 CONTEXT.md「homeContent」)
// 与 siteConfig 的分工:siteConfig 管跨页配置(导航/页脚/分类/开关),homeContent 管首页专属文案

export const homeContent = {
  hero: {
    eyebrow: '一方墨笺 · 记于人间',
    title: '墨笺有余闲',
    titleAccent: '。',
    subtitle: '写日常，也写山川与旧书',
    intro: ['这里收拢寻常日子里的微光。', '也留下山川、旧书与缓慢生长的心事。'],
    actions: { primary: '阅览文章', secondary: '关于此间' },
    verticalCopy: '风来疏竹　雨过远山',
    scrollHint: '入卷',
    /** 新札卡:徽标字与 meta 后缀(形如「日常 · 新卷初展」) */
    noteBadge: '新札',
    noteSuffix: '新卷初展',
  },

  study: {
    kicker: 'THE STUDY INDEX',
    title: '书斋目录',
    note: '把日常与见闻，按四条线索慢慢归置。',
  },

  recent: {
    kicker: 'RECENT NOTES',
    title: '近来所记',
    // 与 postList.recentCount 解耦:篇数改了文案不用动
    note: '新卷横陈案上。行旅、日常与旧书各成一卷，也把远山与墨痕留在纸面。',
    allPostsLink: '查看全部文章',
  },

  desk: {
    kicker: 'ON THE DESK',
    title: '案头近况',
    note: '不只保存已经写完的文章，也留下正在发生的过程。墨色稍深，像夜里案上的一盏灯。',
    nowTitle: '此刻',
    fragmentLabel: '一页小记',
    fragmentSource: '—— 记于墨笺之间',
  },

  about: {
    kicker: 'ABOUT THIS PLACE',
    title: '关于此间',
    intro: [
      '我喜欢记录日常，也喜欢山川与旧书。',
      '这个网站会保存沿途所见、读书所得，以及一些没有明确分类的想法。',
    ],
    signature: '愿每一页都有来处',
    topics: ['代码', '器物', '光影', '山川'],
    /** 印章字(两行) */
    seal: ['山窗', '小记'],
  },

  /** 名片列:署名、一句话、社链、统计标签;头像图在 AboutSection 内 import */
  profile: {
    name: '拾墨',
    oneLiner: '写字的人，也在字里住着。',
    github: 'https://github.com/L-xuanxiao',
    emails: [
      { label: 'Gmail', address: 'xuanxiao0311@gmail.com' },
      { label: 'QQ', address: 'xuanxiao0311@qq.com' },
    ],
    statsLabels: { posts: '笺记', categories: '线索', since: '记录始' },
  },
} as const;

export type HomeContent = typeof homeContent;
