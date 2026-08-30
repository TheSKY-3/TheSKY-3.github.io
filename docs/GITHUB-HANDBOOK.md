# GitHub 仓库体系手册（交接档）

> 与网站手册分工：`../README.md` 管网站（内容地图/设计/部署），**本文件管 GitHub 仓库体系**（仓库在哪、怎么包装、转公开清单、红线）。新会话做 GitHub 相关工作，从这里开始。

## 体系分工（一句话）

网站 = 橱窗（精选叙事，给人看）；GitHub = 完整工程（复现细节，给懂行的人看）。两边内容不重复、互相链接。

## 仓库清单

| 仓库 | 状态 | 本地位置 | 来源与注意 |
| --- | --- | --- | --- |
| `TheSKY-3/TheSKY-3.github.io` | 公开 | `D:\个人知识库\个人网站` | 本网站，手册见 `../README.md` |
| `TheSKY-3`（profile README） | 公开 | `D:\eng_project\TheSKY-3` | GitHub 主页自我介绍 |
| `olist-biz-analytics` | 私有 | 推送仓库 `D:\eng_project\olist-biz-analytics` | **完整版在 `E:\eng_project\baxi\olist-biz-analytics\olist-biz-analytics`**（真实结果与 5 张图）；有更新先改 E: 再同步 D: 推送 |
| `ga4-ecommerce-growth` | 私有 | `D:\eng_project\数据分析_产品经理\ga4_ecommerce_growth_project` | 结果图在 `paper/figures/`；**转公开前必须审查 `docs/source_context/`** |
| `criteo-uplift` | 私有 | `D:\eng_project\criteo-uplift` | 从 `D:\eng_project\Criteo\.worktrees\foundation` 干净提取；**旧 `D:\eng_project\Criteo` 仓库 git 历史含简历 docx，永不推送** |
| `fraud-tccr` | 私有 | `D:\eng_project\run\金融欺诈代码包_V2_修复版_FINAL\金融欺诈代码包_V2_修复版_FINAL - 副本` | 论文投稿配套（在投）；投稿 tex/PDF/图在 `paper/`；data 1.1G / outputs 7.6G 已 gitignore；docs/superpowers 等内部文档已排除；**论文录用前保持私有，tex 不单独公开** |
| ECom Review Agent | **未上传** | `D:\eng_project\电商AGENT` | 等用户吃透项目（大白话讲解过关）后再传；届时剔除 `简历`、`规划` 等私人文件夹 |

网络：所有 GitHub 推送/gh 命令走代理 `HTTPS_PROXY=http://127.0.0.1:7890`（git 已配全局 github.com 代理）。

## README 展示模式（每个项目仓库统一结构）

1. **标题 = 价值主张**（不用术语堆砌，如「广告增量审计 · Uplift」而不是「实验设计」）
2. banner 图（`docs/assets/banner.svg`，规范见下）
3. shields 徽章（语言/框架/协议）
4. **核心结论 TL;DR**（真实数字前置，如「准时评分 4.29 → 迟 6 天+ 1.74」）
5. **为什么做**（业务问题，不写学习动机）
6. mermaid 方法流程图
7. 结果图表（每图配 caption：复述图中关键数字 + 一句话结论）
8. 复现步骤
9. **证据边界**（项目做到哪一步，不能声称什么）

## Banner 规范

- 尺寸 **1200×300（4:1）**，深底 `#0B1220`，标题 46px `#F2F5F9`（x=60,y=105），副标题 25px `#8FB8D8`，琥珀数据行 19px `#E8A33D` 等宽字体，技术栈行 17px `#C6CFDC`。
- **统一设计语言 + 每项目专属图形母题**（右侧 x≥800 区域）：Olist=评分阶梯下降柱（最后一根琥珀）、GA4=三级漏斗条、Criteo=treatment/control 增量双曲线、论文项目=成本-容量曲线（未画）。
- 网站项目卡缩略图与仓库 banner 是**同一个文件**，改一处两边同步（网站侧 `site/public/images/banners/`）。

## 转公开检查清单（逐仓库执行）

通用：① `git log --all --diff-filter=A --name-only` 扫历史有无简历/手机号/私人文件；② 原始数据确认不在库（只有聚合结果）；③ README 证据边界表述复核；④ 转公开后回网站详情页加「查看代码 →」链接（`projects.ts` 加 `repo` 字段）。

专项：
- `ga4-ecommerce-growth`：审查 `docs/source_context/`（含岗位样本等私有上下文，必要时移出）。
- `criteo-uplift`：确认没有从旧仓库带任何历史。
- `fraud-tccr`：**论文录用前不动**。
- profile：检查 TheSKY-3/CV 相关公开仓库内容隐私（用户自查项）。

## 红线（对所有仓库）

1. **手机号**不进任何仓库/文档/图（正则 `1[3-9][0-9]{9}`，网站侧由 `site/scripts/check-dist.mjs` 把关）。
2. **简历及作者视角文件**（面试卡、提示词、superpowers 文档）不进仓库，本地保留。
3. **原始数据**永不入库。
4. 仓库暂不公开是用户要求；逐个转公开前走上面的清单。

## 待办快照（2026-08-30）

- [ ] 用户检查 profile 侧公开仓库隐私 → 满意后按清单逐个转公开
- [ ] 转公开后：网站详情页加「查看代码」链接 + profile 页 Pin 四个项目仓库（UI 操作）
- [ ] ECom：大白话讲解过关 → 剔除私人文件夹 → 展示 README + banner → 上传私有
- [ ] 论文录用后：fraud-tccr 转公开 + 网站研究板块改「已录用」
- [ ] （可选）fraud-tccr 补 banner（成本-容量曲线母题）
