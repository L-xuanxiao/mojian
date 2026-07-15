# 墨笺

基于 Astro、Tailwind CSS 4 与 Markdown 的水墨书卷风个人博客。

## 本地开发

```bash
npm install
npm run dev
```

浏览器访问 `http://localhost:4321`。

## 写一篇文章

在 `src/content/blog/` 新建 `.md` 文件，复制现有文章的 Frontmatter，再修改标题、日期、分类和正文。

## 检查与构建

```bash
npm run check
npm run build
```

生产文件会生成到 `dist/`，该目录不会提交到 Git。

## 推送到 GitHub

先在 GitHub 新建空仓库 `mojian`，不要勾选初始化 README、`.gitignore` 或 License，然后执行：

```bash
git init
git add .
git commit -m "feat: 初始化墨笺博客"
git branch -M main
git remote add origin https://github.com/你的用户名/mojian.git
git push -u origin main
```
