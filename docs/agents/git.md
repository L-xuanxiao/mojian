# Git 工作流

- 修改前后检查 `git status` 和相关 `git diff`，保留用户已有未提交修改。
- 未经用户明确要求，不提交、不推送、不创建 PR。
- 不执行 `git reset --hard`、`git clean -fd`、`git checkout .`、`git restore .` 等覆盖工作区的命令。
- 用户要求提交时，一个提交对应一个明确目标；Commit Message 使用规范前缀和简洁中文描述，如 `fix: 修复移动端画廊溢出`。
