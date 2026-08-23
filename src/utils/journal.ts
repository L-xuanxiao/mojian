// 笺录取数共享入口：列表、归档、分类、标签、RSS 与首页同用一份排序口径
import { getCollection, type CollectionEntry } from 'astro:content';

export type JournalEntry = CollectionEntry<'journal'>;

/** 发布日期倒序比较器，供已持有序列的调用方复用 */
export const byPubDateDesc = (a: JournalEntry, b: JournalEntry): number =>
  b.data.pubDate.getTime() - a.data.pubDate.getTime();

/** 取全部笺录（排除草稿），按发布日期倒序；返回新数组，调用方可安全 slice / filter */
export async function getJournalPosts(): Promise<JournalEntry[]> {
  return (await getCollection('journal', ({ data }) => !data.draft)).sort(byPubDateDesc);
}
