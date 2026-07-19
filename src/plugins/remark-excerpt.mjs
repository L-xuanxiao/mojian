import { nodeText } from './mdast-text.mjs';

// 取正文首个段落纯文本作为自动摘要，写入 remarkPluginFrontmatter.excerpt。
// 显式 description 优先（见 src/lib/posts.ts getExcerpt），此处只兜底。
export function remarkExcerpt() {
  return (tree, file) => {
    const frontmatter = file.data.astro?.frontmatter;
    if (!frontmatter) return;
    const firstParagraph = tree.children.find((node) => node.type === 'paragraph');
    frontmatter.excerpt = nodeText(firstParagraph).replace(/\s+/g, ' ').trim();
  };
}
