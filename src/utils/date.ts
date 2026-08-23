/** 日期统一为中文长格式：2026 年 8 月 1 日 */
export function formatDate(date: Date): string {
  return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日`;
}

/** ISO 短格式：2026-08-01，用于 <time datetime> 与 RSS */
export function formatDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** 年月格式：2026 年 8 月，用于期次行与「最近更新」 */
export function formatYearMonth(date: Date): string {
  return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月`;
}
