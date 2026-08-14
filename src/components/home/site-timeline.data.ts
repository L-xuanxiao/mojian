/**
 * 卷尾年谱（站点史）：记录 Mojian 这一卷的来路，与 About「行年」（人的经历）职责切分、各自维护。
 * 更早的站点史（旧站上线年份等）待主人补记；条目即改即生效。
 */
export interface SiteMilestone {
  year: string;
  event: string;
}

export const siteMilestones: SiteMilestone[] = [
  { year: '2026', event: '以 Astro 重写墨笺，把旧站重新装订成数字书卷' },
];
