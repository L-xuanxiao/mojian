/**
 * 站点级配置：外部服务接入与联系方式集中于此。
 * 外部服务（giscus / Formspree）尚未开通时保持空值，对应页面自动降级为占位或静态替代。
 */
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
