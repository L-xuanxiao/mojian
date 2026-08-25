/**
 * 站点级配置：导航、外部服务与联系方式集中于此。
 * 外部服务（giscus / Formspree）尚未开通时保持空值，对应页面自动降级为占位或静态替代。
 */

/**
 * 主导航清单：新增页面在此登记即可进页眉；href 存站内根路径，渲染时经 withBase 拼接。
 * icon 为 Lucide 内联 SVG path（构建期拼装，页眉保持零客户端 JS）。
 */
export const navItems = [
  {
    href: '/',
    label: '卷首',
    icon: '<path d="M12 5v16"/><path d="M20.001 19A2 2 0 0 0 22 17V5a2 2 0 0 0-1.999-2L16 3.002A5 5 0 0 0 12 5a5 5 0 0 0-4-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 1.999 2H8a5 5 0 0 1 4 2a5 5 0 0 1 4-2z"/>',
  },
  {
    href: '/journal/',
    label: '笺录',
    icon: '<path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/>',
  },
  {
    href: '/projects/',
    label: '器作',
    icon: '<path d="m12.99 6.74l1.93 3.44M19.136 12a10 10 0 0 1-14.271 0M21 21l-2.16-3.84M3 21l8.02-14.26"/><circle cx="12" cy="5" r="2"/>',
  },
  {
    href: '/gallery/',
    label: '光影',
    icon: '<circle cx="12" cy="12" r="10"/><path d="m14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"/>',
  },
  {
    href: '/about/',
    label: '此间',
    icon: '<path d="m8 3l4 8l5-5l5 15H2z"/>',
  },
  {
    href: '/guestbook/',
    label: '留墨',
    icon: '<path d="M14.086 18.412A2 2 0 0 1 12.67 19H5v-7.672a2 2 0 0 1 .586-1.414L11.75 3.75a6 6 0 1 1 8.49 8.49zM16 8L2 22m15.488-7H9"/>',
  },
] as const;

export const site = {
  /** 联系邮箱（占位，待填写）；为空时往来区块不显示邮箱 */
  email: '',
  github: 'https://github.com/L-xuanxiao/mojian',
  /**
   * 个人身份锚点：仅收多页面复用的署名信息。
   * 长篇自述留在 About 组件数据入口、年谱留在各自 data 文件，均不入此配置。
   */
  profile: {
    /** 署名 / 显示名（待主人填写）；为空时自述落款保持「待主人自题」 */
    displayName: '',
    /** 首页身份短题（如「独立开发者」）；只填写主人确认过的真实身份 */
    role: '',
    /** 首页关注方向；为空时改用站内真实内容数量作为能力锚点 */
    focus: [] as readonly string[],
  },
  /** Formspree 表单 endpoint，形如 https://formspree.io/f/xxxx；为空时表单降级 */
  formspree: {
    endpoint: '',
  },
  /** giscus 留言墙配置（需仓库开启 Discussions 并安装 giscus app）；repo 为空时留言墙降级 */
  giscus: {
    repo: '',
    repoId: '',
    category: '',
    categoryId: '',
  },
} as const;

/**
 * 站内绝对路径拼接部署 base（GitHub Pages 项目页为 /mojian/）。
 * 仅用于 .astro / 端点 / React Island 里手写的根路径链接；
 * Astro 资产管线（Image/getImage/字体）生成的 URL 已自动携带 base，不要重复拼接。
 */
export const withBase = (path: string): string => {
  const base = import.meta.env.BASE_URL;
  const clean = path.replace(/^\/+/, '');
  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`;
};
