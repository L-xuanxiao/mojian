// 阅读量估算：中文字符与英文单词合并计字，按常速每分钟约四百字折算分钟数
export function readingStats(body: string): { words: number; minutes: number } {
  const cjk = body.match(/[一-鿿㐀-䶿]/g)?.length ?? 0;
  const latinWords = body.match(/[a-zA-Z0-9]+/g)?.length ?? 0;
  const words = cjk + latinWords;
  return { words, minutes: Math.max(1, Math.ceil(words / 400)) };
}
