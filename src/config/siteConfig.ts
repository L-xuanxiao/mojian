// 站点集中配置：站名、导航、页脚与文章列表行为
// 消费方：SiteHeader / SiteFooter / BaseLayout / index.astro / PostCard

export interface NavItem {
  /** 用于 active 状态判断 */
  key: 'top' | 'articles' | 'archive' | 'about' | 'guest';
  label: string;
  ariaLabel: string;
  icon: string;
  /** 首页内锚点 id */
  homeAnchor: string;
  /** 独立页面路径（相对 BASE，尾斜杠）；空串表示仅首页锚点 */
  path: '' | 'archive/' | 'about/' | 'guestbook/';
}

export interface CategoryDef {
  /** 与 src/content.config.ts 的分类枚举一致 */
  key: '日常' | '行旅' | '读书' | '摄影';
  /** 分类页英文路由 slug（category/[slug]/） */
  slug: 'daily' | 'travel' | 'reading' | 'photography';
  /** 首页书斋目录序号字 */
  number: string;
  description: string;
}

export const siteConfig = {
  name: '墨笺',
  /** 页首印章字 */
  seal: '笺',
  description: '写日常，也写山川与旧书。',
  /** 首页 document.title */
  homeTitle: '墨笺｜个人博客',
  /** 非首页标题分隔符，形如「关于｜墨笺」 */
  titleSeparator: '｜',

  nav: [
    {
      key: 'top',
      label: '墨庐',
      ariaLabel: '首页·墨庐',
      icon: 'material-symbols:home-outline-rounded',
      homeAnchor: 'top',
      path: '',
    },
    {
      key: 'articles',
      label: '笺录',
      ariaLabel: '文章·笺录',
      icon: 'material-symbols:article-outline-rounded',
      homeAnchor: 'articles',
      path: '',
    },
    {
      key: 'archive',
      label: '卷藏',
      ariaLabel: '归档·卷藏',
      icon: 'material-symbols:archive-outline-rounded',
      homeAnchor: 'archive',
      path: 'archive/',
    },
    {
      key: 'about',
      label: '此间',
      ariaLabel: '关于·此间',
      icon: 'material-symbols:person-outline-rounded',
      homeAnchor: 'about',
      path: 'about/',
    },
    {
      key: 'guest',
      label: '留墨',
      ariaLabel: '留言·留墨',
      icon: 'material-symbols:edit-note-outline-rounded',
      homeAnchor: '',
      path: 'guestbook/',
    },
  ] satisfies NavItem[],

  /** 页面开关：false 时导航中隐藏对应项（预留，页面本身仍需手动处理） */
  pages: {
    archive: true,
    about: true,
    guestbook: true,
  },

  /** 留墨页：mailto 收件人（为空时唤起邮件客户端但不预填收件人） */
  contactEmail: '',

  /** 留墨墙 giscus：repoId / categoryId 填好后自动启用；获取见 https://giscus.app/zh-CN */
  giscus: {
    repo: 'L-xuanxiao/mojian',
    repoId: '',
    category: 'General',
    categoryId: '',
    mapping: 'pathname',
  },

  footer: {
    quote: '一纸闲墨，记人间朝暮。',
    tagline: '写日常，也写山川与旧书',
    builtWith: '由 Astro 构筑',
    copyrightYear: '2026',
  },

  /** 书斋目录：分类定义；slug 与中文枚举的唯一映射处，篇数由文章数据动态统计 */
  categories: [
    { key: '日常', slug: 'daily', number: '壹', description: '寻常烟火与片刻心绪' },
    { key: '行旅', slug: 'travel', number: '贰', description: '山川远近与沿途所见' },
    { key: '读书', slug: 'reading', number: '叁', description: '旧书新页与字里光阴' },
    { key: '摄影', slug: 'photography', number: '肆', description: '光影流转与留住片刻' },
  ] satisfies CategoryDef[],

  postList: {
    /** 首页「近来所记」展示篇数 */
    recentCount: 3,
    /** 卡片摘要截断行数 */
    descriptionLines: 2,
    /** 无 description 时自动摘要截断字数 */
    excerptLength: 120,
    /** 卡片标签最多展示数 */
    tagsMax: 3,
  },
} as const;

export type SiteConfig = typeof siteConfig;
