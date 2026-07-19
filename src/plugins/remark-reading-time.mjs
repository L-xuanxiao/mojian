import { nodeText } from './mdast-text.mjs';

// 统计正文字数并估算阅读时长，写入 remarkPluginFrontmatter.words / minutes。
// 中文阅读速度按约 400 字/分钟。
export function remarkReadingTime() {
  return (tree, file) => {
    const frontmatter = file.data.astro?.frontmatter;
    if (!frontmatter) return;
    const chars = nodeText(tree).replace(/\s/g, '').length;
    frontmatter.words = chars;
    frontmatter.minutes = Math.max(1, Math.round(chars / 400));
  };
}
