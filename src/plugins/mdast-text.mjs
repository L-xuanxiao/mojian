// remark 插件共用：递归收集 mdast 节点纯文本
export function nodeText(node) {
  if (!node) return '';
  if (node.type === 'text' || node.type === 'inlineCode') return node.value ?? '';
  return (node.children ?? []).map(nodeText).join('');
}
