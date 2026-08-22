# Git 工作流

- 修改前后检查 `git status` 和相关 `git diff`，保留用户已有未提交修改。
- 未经用户明确要求，不提交、不推送、不创建 PR。
- 不执行 `git reset --hard`、`git clean -fd`、`git checkout .`、`git restore .` 等覆盖工作区的命令。
- 用户要求提交时，一个提交对应一个明确目标；Commit Message 使用规范前缀和简洁中文描述，如 `fix: 修复移动端画廊溢出`。
- 行尾由根目录 `.gitattributes` 固定为 LF（ico/webp 已豁免）；Windows 下偶发的全仓幻影 modified 以 `git add` 归位即可，不要手动转换行尾。
- 全仓基线类提交（行尾统一、格式化基线、CI 配置）直接落在 `main`；特性工作走独立分支再合并，避免基线生效依赖特性分支的合并顺序。
