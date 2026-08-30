# 吴柏高 · 个人介绍网站

求职作品集网站 + GitHub 项目展示体系的**前台**。线上地址：**https://thesky-3.github.io**

> 本文件是网站的维护手册：改内容去哪个文件、设计规范、加新项目的步骤、部署方式、红线。新会话/新窗口从这里就能接着干活。

## 常用命令

```bash
cd site
npm run dev                 # 本地开发 http://localhost:4321（首次先 npm install）
npm run build               # 产出静态文件到 site/dist/
npm run preview             # 本地预览 dist
node scripts/check-dist.mjs # 安全扫描（必须输出 OK 才能发布）
```

推送 GitHub 网络操作需要代理：`export HTTPS_PROXY=http://127.0.0.1:7890`（git 已配置全局 github.com 代理，gh CLI 需手动加）。

## 改内容去哪里改（内容地图）

所有文案都在 `site/src/data/` 下，改文字不用碰页面代码：

| 文件 | 内容 |
| --- | --- |
| `profile.ts` | 姓名、一句话定位、求职意向、**邮箱、GitHub 链接**、首屏 4 个统计数字 |
| `experience.ts` | 实习经历（公司、职位、4 段经历） |
| `projects.ts` | **四个项目**：卡片摘要、缩略图、详情页各小节、结果图表（figures）、证据边界声明 |
| `research.ts` | 研究亮点（金融欺诈论文：TC-CCR 框架、成本降低数字） |
| `skills.ts` | 技能分组标签 |
| `education.ts` | 教育背景与荣誉 |

页面结构（`site/src/`）：

- `layouts/BaseLayout.astro` — 顶栏导航 + 页脚。**导航锚点必须写 `/#projects` 形式**（带斜杠），这样在项目详情页点击才能跳回首页对应区块；写 `#projects` 在详情页上无效。
- `components/` — Hero（含 GitHub/邮件快捷按钮）、Projects（项目卡）、Experience、Research、Skills、Contact。
- `pages/projects/*.astro` — 四个详情页，内容全部从 `projects.ts` 渲染，含可选的「结果图表」区块。

## 加一个新项目（SOP）

1. **素材**：准备一张 1200×300 的 banner SVG（风格参考 `site/public/images/banners/`，深底 `#0B1220` + 琥珀曲线 + 大标题 + 琥珀色数据行），放到 `site/public/images/banners/<slug>.svg`；结果图 PNG 放到 `site/public/images/<slug>/`。
2. **数据**：在 `projects.ts` 加一条记录，字段：`slug`、`eyebrow`（方向标签）、`title`、`period`、`summary`（卡片摘要，**必须带真实数字**）、`tags`、`thumbnail`、`sections[]`（详情小节，按「背景与目标 → 核心发现 → 数据与方法 → 关键决策/踩坑 → 成果产出」组织）、`figures[]`（结果图 + caption，caption 里复述图中关键数字）、`boundary`（证据边界声明）。
3. **详情页**：复制 `pages/projects/` 下任一 astro 文件，改 import 的 slug。
4. **构建验证**：`npm run build && node scripts/check-dist.mjs`，本地 `npm run preview` 用浏览器过一遍（桌面 1280 + 手机 375 各看一次），再提交推送。

## 设计系统（浅色商务风）

设计令牌全部在 `site/src/styles/global.css`，换主题只改这里：

| 令牌 | 值 | 用途 |
| --- | --- | --- |
| `--c-ink` | `#F6F8FB` | 页面底色（浅灰蓝） |
| `--c-panel` | `#FFFFFF` | 卡片 |
| `--c-line` | `#D8E0EA` | 边框 |
| `--c-paper` | `#17233A` | 主文字（深藏青） |
| `--c-mist` | `#2E3A4C` | 次级文字 |
| `--c-amber` | `#A0650A` | 强调色（数字、CTA、hover） |
| `--c-ice` | `#3E6B96` | 链接、辅助强调 |

- 字体：系统字体栈（零外部请求）；数字用等宽 `--font-mono`。
- **Hero 头像**：`site/public/images/avatar.jpg`（480×480 方形裁切，CSS 圆框），替换照片直接覆盖该文件即可。
- 项目卡缩略图：banner 原生 **4:1**（1200×300），CSS `aspect-ratio: 4/1; object-fit: cover`，**零裁切**——banner 标题从 x=60 开始，改比例会切字。
- banner 设计语言统一（深底 `#0B1220` + 琥珀强调），但**每项目一个专属图形母题**（Olist=评分阶梯、GA4=漏斗、Criteo=增量双曲线），避免"同一个模板只换字"的雷同感；banner 详细规范在 `docs/GITHUB-HANDBOOK.md`。
- 深色 banner 在浅色主题上形成对比，与各 GitHub 仓库 README 的 banner 同一套视觉（同一文件）。
- 结果图：PNG matplotlib 图，白底，caption 必须复述图中的关键数字（HR 只看图和 caption 也能懂）。

## 部署（已上线，全自动）

- 仓库 `TheSKY-3/TheSKY-3.github.io`（公开），branch `main`。
- 推送到 main → GitHub Actions（`.github/workflows/deploy.yml`）自动 `npm ci && npm run build`（`working-directory: site`）→ 发布 `site/dist` 到 Pages。约 1-2 分钟生效。
- `site/astro.config.mjs` 的 `site` 已是 `https://thesky-3.github.io`。

**发布前检查顺序**：改内容 → `npm run build` → `node scripts/check-dist.mjs` 输出 OK → 本地 preview 过目 → commit → push → 等 Actions 绿 → 刷新线上确认。

## 红线（每次改动都要守住）

1. **手机号禁止**出现在本仓库任何文件与构建产物中（`scripts/check-dist.mjs` 用大陆手机号正则扫描 dist，文档里也不要写号码原文）。联系只用邮箱。
2. **证据边界**（文案措辞，不能越界）：
   - ECom：只说「本地证据决策原型 / 阶段性工程验证」，不说已上线、已节省工时、已改善业务指标；
   - Criteo：只说「离线分析完成，线上验证未开始」，不说真实投放、收入、ROI；
   - 论文研究：「校级重点项目 · 第一作者 · 论文在投」，不提前声称已发表。
3. **原始数据永不入库**（网站与 GitHub 仓库都只放聚合结果图表）。

## GitHub 展示体系（网站之外的全貌）

**详细手册在 `docs/GITHUB-HANDBOOK.md`**（仓库清单与位置、README 展示模式、banner 规范、转公开检查清单、红线）。速览：

| 仓库 | 状态 | 一句话 |
| --- | --- | --- |
| 本仓库 | 公开 | 网站，自动部署 |
| `TheSKY-3` profile | 公开 | GitHub 主页自我介绍 |
| `olist-biz-analytics` | 私有 | 完整版在 E 盘 baxi 目录，改完同步推送 |
| `ga4-ecommerce-growth` | 私有 | 转公开前审查 docs/source_context |
| `criteo-uplift` | 私有 | 旧 Criteo 仓库历史含简历，永不推送 |
| `fraud-tccr` | 私有 | 在投论文配套，录用前不动 |
| ECom | 未上传 | 用户吃透项目后再传 |

## 当前状态与待办（2026-08-30）

- ✅ 网站上线并自动部署；四个项目卡横幅缩略图；GA4/Criteo 详情页结果图表；Hero/联系区/页脚 GitHub 入口；导航锚点修复。
- ⏳ 四个项目仓库暂为私有（用户要求）；用户满意后逐个转公开，转公开后给网站详情页加「查看代码 →」链接（`projects.ts` 加 `repo` 字段 + 详情页渲染）。
- ⏳ ECom 卡片刻意无缩略图（项目仍在开发），吃透后再补图与 README。
- ⏳ 论文录用后：research 板块可加「已录用」标注，fraud-tccr 转公开。

## 技术栈

Astro 7（纯静态输出）· 原生 CSS 设计令牌 · 零外部请求（系统字体栈）· TypeScript · GitHub Actions Pages
