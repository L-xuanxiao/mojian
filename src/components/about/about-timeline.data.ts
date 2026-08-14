/**
 * 行年数据（待主人逐年补记）：记录对主人真正有意义的阶段与事件，不必逐年皆有。
 * 条目示例：{ year: '2026', title: '订卷', event: '把散页装订成册，是为这一卷的来路。' }
 * 为空时 About 页渲染空态，不虚构年份与经历。
 */
export interface AboutMilestone {
  year: string;
  title: string;
  event: string;
}

export const aboutMilestones: AboutMilestone[] = [];
