// 站点集中配置：站名、导航、页脚与文章列表行为
// 消费方：SiteHeader / SiteFooter / BaseLayout / index.astro / PostCard

export interface NavItem {
  /** 用于 active 状态判断 */
  key: 'top' | 'articles' | 'archive' | 'about';
  label: string;
  ariaLabel: string;
  icon: string;
  /** 首页内锚点 id */
  homeAnchor: string;
  /** 独立页面路径（相对 BASE，尾斜杠）；空串表示仅首页锚点 */
  path: '' | 'archive/' | 'about/';
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
  ] satisfies NavItem[],

  /** 页面开关：false 时导航中隐藏对应项（预留，页面本身仍需手动处理） */
  pages: {
    archive: true,
    about: true,
  },

  footer: {
    quote: '一纸闲墨，记人间朝暮。',
    tagline: '写日常，也写山川与旧书',
    builtWith: '由 Astro 构筑',
    copyrightYear: '2026',
  },

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
