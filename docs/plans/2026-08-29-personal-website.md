# 吴柏高个人介绍网站 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 基于用户 Obsidian 知识库构建一个深色科技风的个人求职作品集网站（Astro 静态站，1 个首页 + 3 个项目详情页），本地可预览、可构建、内容已脱敏。

**Architecture:** Astro 纯静态输出；内容与展示分离——全部文案放在 `src/data/*.ts` 类型化数据模块，页面组件只负责渲染；手写 CSS 设计令牌（无 UI 框架、无外部字体请求）。三个项目详情页用三个字面 `.astro` 页面（不引入动态路由，YAGNI）。

**Tech Stack:** Astro 7.2.9（registry 实测 latest；若安装时出现更新的大版本，锁定 `^7.2.9` 不升级）、TypeScript、原生 CSS、Node LTS（winget 安装）。

**Spec:** `docs/specs/2026-08-29-personal-website-design.md`（本计划从该规范出发；执行者需同时阅读两份文档）

## Global Constraints

以下约束来自 spec，适用于**每一个任务**，复制自此 spec §5 与已确认决策：

- 手机号**禁止**出现在网站任何页面、元数据、代码仓库及全部文档中（本计划刻意不记录号码原文）。仓库级与产物级检查统一使用大陆手机号正则 `1[3-9][0-9]{9}`——不写入任何真实号码，且覆盖任意 11 位手机号，强度高于只查单个号码。
- 联系方式只放邮箱 `1525546469@qq.com`（mailto 链接）。
- 业务数字只允许使用简历已对外表述的口径：1015 万条订单、约 40 名司机、60 天/60 期、2 小时→5 分钟、近 20 份报告、8,242 条对账记录、21 项结算字段、约 159 万条风控样本、40.37%-48.60% 成本下降、10% 复核容量、约 1398 万行（13,979,592）Criteo 数据、212 万条评论（2,128,605）、210 万条精确关联（2,100,939）、3,278 个商品、136,604 条评论、99.87% 文本覆盖率。
- 证据边界（来自知识库项目卡，文案必须遵守）：ECom 项目用"本地证据决策原型 / 阶段性工程验证"，**不**声称已上线、已节省工时或改善业务指标；Criteo 项目用"离线分析完成、线上验证未开始"，**不**声称真实投放、ROI 或用户画像；欺诈检测研究表述为"校级重点项目 · 第一作者 · 论文投稿中"。
- 视觉：深色科技风（墨蓝底非纯黑），主强调琥珀色，次强调冰蓝；正文对比度 WCAG AA；动效克制并尊重 `prefers-reduced-motion`；无外部字体/CDN 请求（全部系统字体栈）；移动端 375px 完整可用。
- 语言：全站简体中文，`<html lang="zh-CN">`。
- 项目位置：Astro 应用在 `D:\个人知识库\个人网站\site\`；git 仓库根在 `D:\个人知识库\个人网站\`。
- 知识库 vault（`D:\个人知识库\个人知识库\吴柏高_个人知识库_01`）只读，不修改任何文件。
- 本会话 shell 为 cmd.exe（非 bash），无 ls/head/pwd；每次 Bash 调用间环境变量不保留，Node 装完后用全路径 `"C:\Program Files\nodejs\npm.cmd"` 调用。

---

### Task 1: 环境安装与仓库初始化

**Files:**
- Create: `D:\个人知识库\个人网站\.gitignore`

**Interfaces:**
- Produces: 可用的 `node`/`npm`/`git`（Task 2 起全部依赖）；git 仓库根（后续所有 commit）。

- [ ] **Step 1: 安装 Node.js LTS（winget）**

```
"%LOCALAPPDATA%\Microsoft\WindowsApps\winget.exe" install OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
```

Expected: 提示成功安装。若 winget 源不可用，备用方案：从 https://nodejs.org/dist/latest-v22.x/ 下载 `node-v22.x-x64.msi` 静默安装（`msiexec /i node.msi /qn`）；再备用：下载 zip 便携版解压到 `D:\个人知识库\个人网站\.tools\node\` 并在后续命令中用其全路径。

- [ ] **Step 2: 验证 Node**

```
"C:\Program Files\nodejs\node.exe" --version
"C:\Program Files\nodejs\npm.cmd" --version
```

Expected: node ≥ v22.x，npm ≥ 10.x。若 PATH 未生效属正常（本会话 cmd 不继承新 PATH），用全路径即可。

- [ ] **Step 3: 安装 Git（winget）并验证**

```
"%LOCALAPPDATA%\Microsoft\WindowsApps\winget.exe" install Git.Git --accept-source-agreements --accept-package-agreements
"C:\Program Files\Git\cmd\git.exe" --version
```

Expected: git ≥ 2.4x。

- [ ] **Step 4: 初始化仓库**

```
cd /d "D:\个人知识库\个人网站"
"C:\Program Files\Git\cmd\git.exe" init
"C:\Program Files\Git\cmd\git.exe" config user.name "吴柏高"
"C:\Program Files\Git\cmd\git.exe" config user.email "1525546469@qq.com"
```

注意：config 不加 `--global`，只作用于本仓库。

- [ ] **Step 5: 写 `.gitignore`（项目根）**

```gitignore
node_modules/
dist/
.astro/
.tools/
*.local
.DS_Store
Thumbs.db
```

- [ ] **Step 6: 首次提交**

```
cd /d "D:\个人知识库\个人网站"
"C:\Program Files\Git\cmd\git.exe" add .gitignore docs
"C:\Program Files\Git\cmd\git.exe" commit -m "docs: 设计文档与实施计划"
```

- [ ] **Step 7: 验证仓库无手机号**

```
cd /d "D:\个人知识库\个人网站"
"C:\Program Files\Git\cmd\git.exe" grep -nE "1[3-9][0-9]{9}" -- .
```

Expected: 无输出（exit code 1）。

---

### Task 2: Astro 项目脚手架

**Files:**
- Create: `site/package.json`、`site/astro.config.mjs`、`site/tsconfig.json`、`site/src/pages/index.astro`（占位）、`site/public/favicon.svg`
- Create: `site/node_modules/`（npm install 产物，不入库）

**Interfaces:**
- Consumes: Task 1 的 npm/git。
- Produces: 可 `dev`/`build`/`preview` 的 Astro 7 项目；`npm` 命令入口（后续任务全部依赖）。

- [ ] **Step 1: 写 `site/package.json`**

```json
{
  "name": "wubogao-personal-site",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^7.2.9"
  }
}
```

- [ ] **Step 2: 写 `site/astro.config.mjs`**

```js
// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://wubogao.example.com',
});
```

说明：`site` 仅占位，将来部署时替换为真实域名；纯静态输出是 Astro 默认，无需额外配置。

- [ ] **Step 3: 写 `site/tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/base",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 4: 写占位首页 `site/src/pages/index.astro`**

```astro
---
---
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>吴柏高 · 个人网站</title>
  </head>
  <body>
    <main><h1>吴柏高</h1><p>搭建中</p></main>
  </body>
</html>
```

- [ ] **Step 5: 写 `site/public/favicon.svg`（墨蓝底琥珀曲线的极简标）**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#0B1220"/>
  <path d="M8 50 C 22 48, 34 40, 44 28 S 56 12, 56 12" stroke="#E8A33D" stroke-width="4" fill="none" stroke-linecap="round"/>
  <circle cx="44" cy="28" r="4" fill="#E8A33D"/>
</svg>
```

- [ ] **Step 6: 安装依赖**

```
cd /d "D:\个人知识库\个人网站\site"
"C:\Program Files\nodejs\npm.cmd" install
```

Expected: 依赖安装成功、无 error（warning 可忽略）。

- [ ] **Step 7: 构建冒烟**

```
cd /d "D:\个人知识库\个人网站\site"
"C:\Program Files\nodejs\npm.cmd" run build
```

Expected: `dist/` 生成，构建完成无 error。若 Astro 7 对 `astro/tsconfigs/base` 或配置结构有变化报错，以 `npx astro --help` 与 https://docs.astro.build 当前文档为准修正后再继续。

- [ ] **Step 8: Commit**

```
cd /d "D:\个人知识库\个人网站"
"C:\Program Files\Git\cmd\git.exe" add site/package.json site/astro.config.mjs site/tsconfig.json site/src site/public
"C:\Program Files\Git\cmd\git.exe" commit -m "feat: Astro 7 项目脚手架"
```

---

### Task 3: 设计令牌、全局样式与基础布局

**Files:**
- Create: `site/src/styles/global.css`
- Create: `site/src/layouts/BaseLayout.astro`
- Modify: `site/src/pages/index.astro`（改用 BaseLayout）

**Interfaces:**
- Consumes: Task 2 的 Astro 项目。
- Produces: `BaseLayout.astro`（props: `{ title: string; description: string }`），全站 CSS 令牌（下表）；后续所有组件在此令牌体系上写样式。

**设计令牌（唯一权威来源，全站不得出现表外色值）：**

| 令牌 | 值 | 用途 |
|---|---|---|
| `--c-ink` | `#0B1220` | 页面底色（墨蓝，非纯黑） |
| `--c-panel` | `#121B2D` | 卡片/面板底 |
| `--c-line` | `#23304A` | 边框、分隔线 |
| `--c-amber` | `#E8A33D` | 主强调：关键数字、标记点、链接 hover（信号琥珀，呼应风险决策主题） |
| `--c-ice` | `#8FB8D8` | 次强调：标签、图表性装饰、副标题（数据冷色） |
| `--c-mist` | `#C6CFDC` | 正文 |
| `--c-paper` | `#F2F5F9` | 标题、高亮文字 |
| `--font-sans` | `"Segoe UI", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif` | 正文 |
| `--font-mono` | `"Cascadia Code", Consolas, "Courier New", monospace` | 数字、技术标签、eyebrow |

**签名元素（全站唯一的视觉大胆之处）**：Hero 底部一条 SVG"成本-容量曲线"细线，带一个琥珀标记点（文案：`10% 复核容量 · 成本 ↓40.37%–48.60%`）——它编码了用户研究的真实命题（容量约束下的成本最优），并复用为 section 间分隔装饰。其余区域保持安静。

- [ ] **Step 1: 写 `site/src/styles/global.css`（令牌 + 基础样式 + 通用组件类）**

```css
:root {
  --c-ink: #0B1220;
  --c-panel: #121B2D;
  --c-line: #23304A;
  --c-amber: #E8A33D;
  --c-ice: #8FB8D8;
  --c-mist: #C6CFDC;
  --c-paper: #F2F5F9;
  --font-sans: "Segoe UI", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
  --font-mono: "Cascadia Code", Consolas, "Courier New", monospace;
  --w-max: 1080px;
  --space-1: 8px; --space-2: 16px; --space-3: 24px;
  --space-4: 40px; --space-5: 64px; --space-6: 96px;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
body {
  margin: 0; background: var(--c-ink); color: var(--c-mist);
  font-family: var(--font-sans); font-size: 16px; line-height: 1.75;
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3 { color: var(--c-paper); line-height: 1.3; margin: 0 0 var(--space-2); }
a { color: var(--c-ice); text-decoration: none; }
a:hover { color: var(--c-amber); }
:focus-visible { outline: 2px solid var(--c-amber); outline-offset: 3px; }
.container { max-width: var(--w-max); margin: 0 auto; padding: 0 var(--space-3); }
.section { padding: var(--space-6) 0; border-top: 1px solid var(--c-line); }
.eyebrow {
  font-family: var(--font-mono); font-size: 13px; letter-spacing: 0.12em;
  color: var(--c-ice); text-transform: uppercase; display: block; margin-bottom: var(--space-2);
}
.card {
  background: var(--c-panel); border: 1px solid var(--c-line);
  border-radius: 10px; padding: var(--space-3);
}
.tag {
  font-family: var(--font-mono); font-size: 12px; color: var(--c-ice);
  border: 1px solid var(--c-line); border-radius: 4px; padding: 2px 8px;
}
.num { font-family: var(--font-mono); color: var(--c-amber); }
@media (max-width: 640px) {
  .section { padding: var(--space-5) 0; }
}
```

- [ ] **Step 2: 写 `site/src/layouts/BaseLayout.astro`**

```astro
---
interface Props { title: string; description: string; }
const { title, description } = Astro.props;
const nav = [
  ["关于", "#about"], ["实习", "#experience"], ["项目", "#projects"],
  ["研究", "#research"], ["联系", "#contact"],
] as const;
---
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>
  </head>
  <body>
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="#top">吴柏高<span class="brand-dot">.</span></a>
        <nav aria-label="主导航">
          {nav.map(([label, href]) => <a href={href}>{label}</a>)}
        </nav>
      </div>
    </header>
    <main id="top">
      <slot />
    </main>
    <footer class="site-footer">
      <div class="container">
        <p>© 2026 吴柏高 · <a href="mailto:1525546469@qq.com">1525546469@qq.com</a></p>
      </div>
    </footer>
  </body>
</html>
<style>
  .site-header {
    position: sticky; top: 0; z-index: 10;
    background: color-mix(in srgb, var(--c-ink) 88%, transparent);
    backdrop-filter: blur(8px); border-bottom: 1px solid var(--c-line);
  }
  .header-inner { display: flex; align-items: center; justify-content: space-between; height: 56px; }
  .brand { color: var(--c-paper); font-weight: 600; }
  .brand-dot { color: var(--c-amber); }
  nav { display: flex; gap: var(--space-3); }
  nav a { font-size: 14px; color: var(--c-mist); }
  nav a:hover { color: var(--c-amber); }
  .site-footer { border-top: 1px solid var(--c-line); padding: var(--space-4) 0; color: var(--c-mist); font-size: 14px; }
  @media (max-width: 640px) {
    nav { gap: var(--space-2); }
    nav a { font-size: 13px; }
  }
</style>
```

- [ ] **Step 3: 改 `site/src/pages/index.astro` 套用 BaseLayout**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="吴柏高 · 数据分析 / 经营分析 / AI 工作流" description="统计学研究生，专注经营分析与数据策略：金融风控研究、电商数据分析、AI Agent 工作流。">
  <h1>吴柏高</h1>
</BaseLayout>
```

- [ ] **Step 4: 构建验证**

```
cd /d "D:\个人知识库\个人网站\site"
"C:\Program Files\nodejs\npm.cmd" run build
```

Expected: 构建通过，无 error。

- [ ] **Step 5: Commit**

```
cd /d "D:\个人知识库\个人网站"
"C:\Program Files\Git\cmd\git.exe" add site/src site/public
"C:\Program Files\Git\cmd\git.exe" commit -m "feat: 设计令牌与基础布局"
```

---

### Task 4: 内容数据模块（全部正式文案）

**Files:**
- Create: `site/src/data/profile.ts`、`experience.ts`、`projects.ts`、`research.ts`、`skills.ts`、`education.ts`

**Interfaces:**
- Consumes: 无（纯数据）。
- Produces: 下述精确导出，Task 5–7 的组件**只**从这里取文案：

```ts
// profile.ts
export const profile = {
  name: "吴柏高",
  tagline: "统计学研究生 · 用数据回答业务问题，用 AI 工作流放大交付效率",
  intents: ["经营分析", "商业分析", "数据策略"],
  availability: "每周 4-5 天 · 可实习 3 个月以上 · 到岗时间可协商",
  email: "1525546469@qq.com",
  location: "广州",
};
export const heroStats = [
  { value: "1015 万+", label: "出行订单渠道分析" },
  { value: "159 万+", label: "风控建模样本" },
  { value: "60 期", label: "AI 日报连续自动化" },
  { value: "近 20 份", label: "补贴专题报告" },
];
```

```ts
// experience.ts
export interface ExperienceItem { title: string; detail: string; }
export const experience = {
  company: "广州如约出行科技集团有限公司",
  role: "数据分析实习生",
  period: "2026.05 - 至今",
  items: [
    { title: "渠道经营分析", detail: "处理 1015 万条出行订单，围绕哈啰、百度、美团、腾讯四渠道的完单率、客单价、GMV 份额、补贴覆盖率与投入产出比开展评估，输出渠道策略矩阵及管理层汇报口径。" },
    { title: "司机运营策略自动化", detail: "整合历史订单、天气、活动及交通因素，搭建佛山出租车接单指南 AI Agent Skill；连续稳定运行 60 天，累计生成 60 期并每日推送至司机群，覆盖约 40 名司机，将单期制作时间由 2 小时缩短至 5 分钟。" },
    { title: "补贴策略工具化", detail: "针对百度、腾讯渠道，将订单清洗、场景切片、补贴率分档、效率评价及档位推荐固化为可复用 Skill，已支持近 20 份补贴专题报告生成，提升跨月份、跨渠道分析效率与口径一致性。" },
    { title: "出租车抽佣口径", detail: "基于 8,242 条司机钱包对账记录，梳理司机、车企与平台三方资金结算链路，统一车租抵扣、双侧平台抽佣、路桥费回补及同日／跨日调账口径；设计 21 项标准结算字段、边界规则与验证案例，协同研发推进系统实现，支持业务复核与审计追溯。" },
  ] as ExperienceItem[],
};
```

```ts
// projects.ts
export interface ProjectSection { heading: string; body: string; }
export interface Project {
  slug: "olist" | "ecom-review-agent" | "criteo-uplift";
  eyebrow: string;
  title: string;
  period: string;
  summary: string;
  tags: string[];
  sections: ProjectSection[];
  boundary?: string;
}
export const projects: Project[] = [
  {
    slug: "olist",
    eyebrow: "数据分析 / BI",
    title: "Olist 巴西电商经营分析",
    period: "2024.07 - 2024.09",
    summary: "MySQL + Python 整合 9 张业务表，构建 GMV、客单价、准时履约率等指标体系，并在 Power BI 定位品类与履约环节的经营问题。",
    tags: ["MySQL", "Python · Pandas", "Power BI", "Docker"],
    sections: [
      { heading: "背景与目标", body: "基于 Kaggle 公开的 Olist 电商多表数据，按真实公司的数据链路完整跑通一遍：数据落库 → 宽表 → KPI 分析 → 看板呈现，形成可写入简历的经营分析作品集项目。" },
      { heading: "方法与实现", body: "数据建模：9 张业务表落 MySQL，构建订单级 KPI 宽表、类目月度趋势与商家评分卡。ETL：Docker 化 Python 管道，分批导入、清洗并做 geolocation 聚合。分析：GMV、订单量、AOV、准时履约率、评分、支付结构，以及履约时效与差评的关系。工程化：README、数据字典、pipeline 流程图与 Docker Compose 一键启动。" },
      { heading: "成果与产出", body: "沉淀一套覆盖销售、履约、评价、支付的 KPI 指标体系；从品类、商家与履约环节定位经营问题，识别高贡献品类、慢履约与低评分商家；Python 自动生成图表与 Markdown 经营周报，Power BI 看板沉淀 DAX 指标口径。" },
    ],
  },
  {
    slug: "ecom-review-agent",
    eyebrow: "AI Product / Agent / Data Product",
    title: "ECom Review Intelligence Agent",
    period: "2026 年 · 阶段性工程验证通过，目标用户试用进行中",
    summary: "面向 B 端电商运营的评论证据决策原型：把单品诊断、商品比较、问题分流整理成可回查的本地证据，用受约束 Agent 与 Verifier 保证每条结论可溯源。",
    tags: ["LangGraph", "SQLite / FTS5", "Structured Output", "Verifier", "Agent 评测"],
    sections: [
      { heading: "定位与工作流", body: "围绕品牌方或跨境电商类目运营的三类任务：单 SKU 体验诊断、2–5 个商品的证据比较、问题信号分流。它不根据评论推断真实缺陷率、销量或利润——只把评论整理成可以回查的证据。" },
      { heading: "系统设计", body: "先冻结数据、类目与证据口径，再开发检索与 Agent：约 212 万条评论快照经流式审计，210 万条精确关联到商品；选定 Ice Makers 类目（3,278 个商品、136,604 条评论，文本覆盖率 99.87%）并冻结 8 个体验维度。SQLite/FTS5 本地证据引擎掌握查询，LangGraph 编排澄清、恢复与安全降级，Verifier 校验字段与引用后放行，本地敏感 Trace 与公开聚合 Trace 分离。" },
      { heading: "阶段验证", body: "P0–P6 各阶段 Gate（来源、快照、范围、证据合同、本地引擎、检索基线、受约束 Agent）已按项目手册通过，包括一次澄清恢复、单工具授权与安全降级的 live 验证；P7 运营工作台支持 synthetic 与受控 local 模式，目标运营用户结构化试用进行中。" },
    ],
    boundary: "本文案遵守项目证据边界：表述为「本地证据决策原型 / 阶段性工程验证」，不声称已上线、已节省工时或已改善业务指标。",
  },
  {
    slug: "criteo-uplift",
    eyebrow: "因果推断 / Uplift / 数据策略",
    title: "Criteo 因果增量分析",
    period: "2026 年 · 离线分析完成，线上验证未开始",
    summary: "基于 Criteo 去偏公开随机实验数据（约 1398 万行），完成 ITT → 响应预测 → S/T/DR-Learner Uplift 比较 → AUUC/Qini 评估 → 覆盖策略模拟的完整分析链。",
    tags: ["因果推断", "Uplift", "ITT", "AUUC / Qini", "Python"],
    sections: [
      { heading: "方法链", body: "Criteo 去偏公开数据 → 数据审计与字段边界（约 13,979,592 行、6 列，缺失值审计为 0）→ 以随机分配的 treatment 做总体 ITT → 非因果响应预测基线（HistGradientBoosting）→ S/T/DR-Learner 离线比较 → AUUC、Qini 与分位检查 → IPW 覆盖比例模拟 → 线上实验候选规则。" },
      { heading: "关键方法判断", body: "treatment 是随机分配标签，适合作为总体 ITT 的处理变量；exposure 是实际曝光，受投放与库存影响，不能替代随机分配。响应预测回答「谁本来更可能转化」，Uplift 回答「谁因干预而额外转化」，二者不是同一个问题。匿名特征 f0–f11 只用于建模排序，不解读为用户画像。" },
      { heading: "结果与产出", body: "固定配置下 S-Learner 在 visit 与 conversion 的 validation AUUC 均优于 T-Learner 与 DR-Learner；策略模拟提出 visit 前 40%、conversion 前 50% 的覆盖比例，作为下一轮线上随机实验的候选规则，而非直接投放名单。" },
    ],
    boundary: "本文案遵守项目证据边界：离线分析已完成，线上随机实验未开始；不声称真实投放、收入或 ROI。",
  },
];
```

```ts
// research.ts
export const research = {
  eyebrow: "校级重点项目 · 第一作者 · 论文投稿中",
  title: "金融交易欺诈风险评估与部署策略优化",
  period: "2025.09 - 至今",
  summary: "基于 IEEE-CIS 与 BAF Base 约 159 万条金融交易及申请记录，研究时间一致容量约束下的代价风险评估（TC-CCR）与部署策略：在 10% 人工复核容量下，树模型较默认 0.5 阈值降低 40.37%-48.60% 的未来测试成本。",
  points: [
    "数据建模与验证：按时间先后完成数据划分、历史特征构建与多模型评估，控制随机切分及未来信息泄漏造成的评估偏差。",
    "部署策略优化：综合漏报损失、误报成本、人工复核量与队列容量优化报警策略，形成成本优先、平衡、高召回三类方案。",
    "提出时间一致容量约束代价风险评估框架（TC-CCR）与 TC-MOICR-XGB 部署策略（论文投稿版 V22）。",
  ],
};
```

```ts
// skills.ts
export interface SkillGroup { name: string; items: string[]; }
export const skillGroups: SkillGroup[] = [
  { name: "数据分析", items: ["Python", "Pandas", "NumPy", "Matplotlib", "数据清洗与探索分析"] },
  { name: "SQL / 数据库", items: ["MySQL", "多表连接与聚合", "窗口函数", "基础数据建模"] },
  { name: "BI / 办公", items: ["Power BI 看板", "DAX 指标口径", "Excel 函数与透视表"] },
  { name: "AI 分析提效", items: ["WorkBuddy", "Codex", "AI Agent 工作流", "Skill 固化与质量校验"] },
];
```

```ts
// education.ts
export const education = [
  { school: "广东财经大学", degree: "统计学 · 硕士", period: "2025.09 - 至今", note: "主修：抽样调查、多元统计、统计计算、广义回归、统计机器学习" },
  { school: "广东财经大学", degree: "数据科学与大数据技术 · 本科", period: "2021.09 - 2025.07", note: "主修：机器学习商务分析、数据库原理、Python 可视化、数据结构、算法设计与分析" },
];
export const honors = ["2023 全国大学生数学建模竞赛 省三等奖", "美国大学生数学建模竞赛 H 奖", "CET-4 / CET-6", "优秀先进个人"];
```

- [ ] **Step 1: 按上述内容创建 6 个数据文件（内容逐字采用，不得缩写或改写数字口径）**

- [ ] **Step 2: 类型与构建验证**

```
cd /d "D:\个人知识库\个人网站\site"
"C:\Program Files\nodejs\npm.cmd" run build
```

Expected: 构建通过（TS 接口被 Task 5–7 消费前先保证类型成立；此处暂无消费者，构建通过即视为通过）。

- [ ] **Step 3: 敏感信息扫描**

```
cd /d "D:\个人知识库\个人网站\site"
"C:\Windows\System32\findstr.exe" /R /S /M "1[3-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]" src\*.ts
```

Expected: 无输出。发现即中断并修复。

- [ ] **Step 4: Commit**

```
cd /d "D:\个人知识库\个人网站"
"C:\Program Files\Git\cmd\git.exe" add site/src/data
"C:\Program Files\Git\cmd\git.exe" commit -m "feat: 全站内容数据模块（已脱敏）"
```

---

### Task 5: 首页上半——Hero、关于、实习经历

**Files:**
- Create: `site/src/components/Hero.astro`、`About.astro`、`Experience.astro`
- Modify: `site/src/pages/index.astro`

**Interfaces:**
- Consumes: `profile`/`heroStats`（Task 4）、`experience`（Task 4）、`BaseLayout` 与 `.section/.eyebrow/.card/.tag/.num/.container`（Task 3）。
- Produces: `<section id="about">`、`<section id="experience">` 锚点（Task 3 导航依赖）。

- [ ] **Step 1: 写 `Hero.astro`**

```astro
---
import { profile, heroStats } from '../data/profile';
---
<section class="hero" id="hero">
  <div class="container">
    <span class="eyebrow">WU BOGAO · PORTFOLIO</span>
    <h1>{profile.name}</h1>
    <p class="tagline">{profile.tagline}</p>
    <div class="intents">
      {profile.intents.map((t) => <span class="tag intent">{t}</span>)}
    </div>
    <ul class="stats">
      {heroStats.map((s) => (
        <li><span class="stat-num">{s.value}</span><span class="stat-label">{s.label}</span></li>
      ))}
    </ul>
    <svg class="cost-curve" viewBox="0 0 1080 120" aria-hidden="true">
      <path d="M0 96 C 300 92, 520 74, 720 46 S 1000 14, 1080 10" stroke="var(--c-line)" stroke-width="2" fill="none"/>
      <circle cx="720" cy="46" r="5" fill="var(--c-amber)"/>
      <text x="738" y="42" fill="var(--c-mist)" font-size="14" font-family="var(--font-mono)">10% 复核容量 · 成本 ↓40.37%–48.60%</text>
    </svg>
    <p class="hero-caption">来自在研课题：时间一致容量约束下的金融欺诈报警部署策略</p>
  </div>
</section>
<style>
  .hero { padding: var(--space-6) 0 var(--space-5); }
  .hero h1 { font-size: clamp(40px, 7vw, 64px); letter-spacing: 0.02em; margin-bottom: var(--space-1); }
  .tagline { font-size: clamp(17px, 2.4vw, 21px); color: var(--c-paper); margin: 0 0 var(--space-3); }
  .intents { display: flex; gap: var(--space-2); flex-wrap: wrap; margin-bottom: var(--space-4); }
  .intent { color: var(--c-amber); border-color: var(--c-amber); }
  .stats { list-style: none; display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-2); padding: 0; margin: 0 0 var(--space-4); }
  .stats li { background: var(--c-panel); border: 1px solid var(--c-line); border-radius: 10px; padding: var(--space-2); display: flex; flex-direction: column; gap: 4px; }
  .stat-num { font-family: var(--font-mono); font-size: clamp(20px, 3vw, 28px); color: var(--c-amber); }
  .stat-label { font-size: 13px; color: var(--c-mist); }
  .cost-curve { width: 100%; height: auto; display: block; }
  .hero-caption { font-size: 13px; color: var(--c-ice); margin-top: var(--space-1); }
  @media (max-width: 640px) {
    .stats { grid-template-columns: repeat(2, 1fr); }
  }
</style>
```

- [ ] **Step 2: 写 `About.astro`**

```astro
---
---
<section class="section" id="about">
  <div class="container">
    <span class="eyebrow">关于 / ABOUT</span>
    <h2>用统计训练，按业务问题工作</h2>
    <div class="about-cols">
      <p>广东财经大学统计学硕士在读，本科数据科学与大数据技术。关注金融风控与经营分析的交汇：既做欺诈检测这类建模研究，也做渠道、补贴、抽佣这类贴着业务口径的分析。</p>
      <p>实习中把重复出现的分析流程固化成 AI Agent Skill——司机接单指南日报连续 60 天自动生成、补贴专题报告近 20 份一键成稿。我相信好的分析交付是「口径一致、可回查、能复核」，这也是本站所有项目表述的原则。</p>
    </div>
  </div>
</section>
<style>
  .about-cols { max-width: 760px; display: flex; flex-direction: column; gap: var(--space-2); }
</style>
```

- [ ] **Step 3: 写 `Experience.astro`**

```astro
---
import { experience } from '../data/experience';
---
<section class="section" id="experience">
  <div class="container">
    <span class="eyebrow">实习经历 / EXPERIENCE</span>
    <h2>{experience.company}</h2>
    <p class="role">{experience.role} · <span class="num">{experience.period}</span></p>
    <div class="exp-grid">
      {experience.items.map((item) => (
        <article class="card">
          <h3>{item.title}</h3>
          <p>{item.detail}</p>
        </article>
      ))}
    </div>
  </div>
</section>
<style>
  .role { margin-top: calc(-1 * var(--space-1)); }
  .exp-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-2); margin-top: var(--space-3); }
  .card h3 { font-size: 17px; }
  .card p { font-size: 14.5px; margin: 0; }
  @media (max-width: 640px) { .exp-grid { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 4: 组装进 `index.astro`（BaseLayout 内、`<h1>` 占位移除）**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Experience from '../components/Experience.astro';
---
<BaseLayout title="吴柏高 · 数据分析 / 经营分析 / AI 工作流" description="统计学研究生，专注经营分析与数据策略：金融风控研究、电商数据分析、AI Agent 工作流。">
  <Hero />
  <About />
  <Experience />
</BaseLayout>
```

- [ ] **Step 5: 构建 + 本地视觉冒烟**

```
cd /d "D:\个人知识库\个人网站\site"
"C:\Program Files\nodejs\npm.cmd" run build
"C:\Program Files\nodejs\npm.cmd" run preview
```

用浏览器打开 `http://localhost:4321/`：核对深色底、琥珀强调、统计条 2×2（窄屏）/1×4（宽屏）、曲线标记点文案。确认后 Ctrl+C 停止。

- [ ] **Step 6: Commit**

```
cd /d "D:\个人知识库\个人网站"
"C:\Program Files\Git\cmd\git.exe" add site/src
"C:\Program Files\Git\cmd\git.exe" commit -m "feat: 首页 Hero/关于/实习板块"
```

---

### Task 6: 首页下半——项目卡、研究、技能、教育、联系

**Files:**
- Create: `site/src/components/Projects.astro`、`Research.astro`、`Skills.astro`、`Education.astro`、`Contact.astro`
- Modify: `site/src/pages/index.astro`

**Interfaces:**
- Consumes: `projects`（Task 4，此处只用 `slug/eyebrow/title/period/summary/tags`）、`research`、`skillGroups`、`education`/`honors`、`profile`。
- Produces: `<section id="projects">`、`<section id="research">`、`<section id="contact">` 锚点；项目卡链接指向 `/projects/{slug}/`（Task 7 实现这三个路由）。

- [ ] **Step 1: 写 `Projects.astro`（注意：项目不是序列，不用 01/02/03 编号，用 eyebrow 表类型）**

```astro
---
import { projects } from '../data/projects';
---
<section class="section" id="projects">
  <div class="container">
    <span class="eyebrow">项目作品集 / PROJECTS</span>
    <h2>三个可以深入追问的项目</h2>
    <div class="proj-grid">
      {projects.map((p) => (
        <a class="card proj-card" href={`/projects/${p.slug}/`}>
          <span class="tag">{p.eyebrow}</span>
          <h3>{p.title}</h3>
          <p class="period num">{p.period}</p>
          <p class="summary">{p.summary}</p>
          <span class="more">阅读详情 →</span>
        </a>
      ))}
    </div>
  </div>
</section>
<style>
  .proj-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-2); margin-top: var(--space-3); }
  .proj-card { display: flex; flex-direction: column; gap: var(--space-1); color: var(--c-mist); }
  .proj-card:hover { border-color: var(--c-amber); }
  .proj-card h3 { font-size: 18px; margin: 0; }
  .period { font-size: 13px; margin: 0; }
  .summary { font-size: 14.5px; flex: 1; margin: 0; }
  .more { font-family: var(--font-mono); font-size: 13px; color: var(--c-ice); }
  .proj-card:hover .more { color: var(--c-amber); }
  @media (max-width: 900px) { .proj-grid { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 2: 写 `Research.astro`**

```astro
---
import { research } from '../data/research';
---
<section class="section" id="research">
  <div class="container">
    <span class="eyebrow">研究 / RESEARCH</span>
    <h2>{research.title}</h2>
    <p class="meta">{research.eyebrow} · <span class="num">{research.period}</span></p>
    <p class="summary">{research.summary}</p>
    <ul>{research.points.map((pt) => <li>{pt}</li>)}</ul>
  </div>
</section>
<style>
  .meta { color: var(--c-ice); font-size: 14px; }
  .summary { max-width: 760px; }
  ul { max-width: 760px; padding-left: 20px; }
  li { margin-bottom: var(--space-1); }
</style>
```

- [ ] **Step 3: 写 `Skills.astro`**

```astro
---
import { skillGroups } from '../data/skills';
---
<section class="section" id="skills">
  <div class="container">
    <span class="eyebrow">技能 / SKILLS</span>
    <h2>工具箱</h2>
    <div class="skill-grid">
      {skillGroups.map((g) => (
        <div class="card">
          <h3>{g.name}</h3>
          <div class="tags">{g.items.map((it) => <span class="tag">{it}</span>)}</div>
        </div>
      ))}
    </div>
  </div>
</section>
<style>
  .skill-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-2); margin-top: var(--space-3); }
  .card h3 { font-size: 16px; }
  .tags { display: flex; flex-wrap: wrap; gap: 8px; }
  @media (max-width: 640px) { .skill-grid { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 4: 写 `Education.astro`**

```astro
---
import { education, honors } from '../data/education';
---
<section class="section" id="education">
  <div class="container">
    <span class="eyebrow">教育与荣誉 / EDUCATION</span>
    <h2>教育背景</h2>
    <div class="edu-list">
      {education.map((e) => (
        <div class="edu-item">
          <p class="edu-head"><strong>{e.school}</strong> · {e.degree}</p>
          <p class="num edu-period">{e.period}</p>
          <p class="edu-note">{e.note}</p>
        </div>
      ))}
    </div>
    <h3>荣誉奖项</h3>
    <div class="tags">{honors.map((h) => <span class="tag">{h}</span>)}</div>
  </div>
</section>
<style>
  .edu-list { display: flex; flex-direction: column; gap: var(--space-2); margin-bottom: var(--space-3); }
  .edu-item { border-left: 2px solid var(--c-line); padding-left: var(--space-2); }
  .edu-head { color: var(--c-paper); margin: 0; }
  .edu-period { font-size: 13px; margin: 0; }
  .edu-note { font-size: 14px; margin: 0; }
  .tags { display: flex; flex-wrap: wrap; gap: 8px; }
</style>
```

- [ ] **Step 5: 写 `Contact.astro`**

```astro
---
import { profile } from '../data/profile';
---
<section class="section" id="contact">
  <div class="container contact-inner">
    <span class="eyebrow">联系 / CONTACT</span>
    <h2>简历与项目细节，欢迎邮件索取</h2>
    <p>{profile.location} · {profile.availability}</p>
    <a class="mail" href={`mailto:${profile.email}`}>{profile.email}</a>
  </div>
</section>
<style>
  .contact-inner { text-align: left; }
  .mail { font-family: var(--font-mono); font-size: clamp(18px, 3vw, 24px); color: var(--c-amber); }
</style>
```

- [ ] **Step 6: 组装进 `index.astro`（顺序：Hero → About → Experience → Projects → Research → Skills → Education → Contact）**

- [ ] **Step 7: 构建 + 浏览器核对（锚点跳转、卡片 hover、375px 窄屏单列）**

```
cd /d "D:\个人知识库\个人网站\site"
"C:\Program Files\nodejs\npm.cmd" run build
```

- [ ] **Step 8: Commit**

```
cd /d "D:\个人知识库\个人网站"
"C:\Program Files\Git\cmd\git.exe" add site/src
"C:\Program Files\Git\cmd\git.exe" commit -m "feat: 首页项目/研究/技能/教育/联系板块"
```

---

### Task 7: 三个项目详情页

**Files:**
- Create: `site/src/pages/projects/olist.astro`、`ecom-review-agent.astro`、`criteo-uplift.astro`

**Interfaces:**
- Consumes: `projects`（Task 4，含 `sections` 与 `boundary`）、`BaseLayout`。
- Produces: 路由 `/projects/olist/`、`/projects/ecom-review-agent/`、`/projects/criteo-uplift/`（Task 6 卡片链接的目标）。

- [ ] **Step 1: 写三个页面，共用同一页面结构（以 olist 为例，另两页仅 import 的 slug 不同）**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { projects } from '../../data/projects';
const p = projects.find((x) => x.slug === 'olist')!;
---
<BaseLayout title={`${p.title} · 吴柏高`} description={p.summary}>
  <article class="section">
    <div class="container">
      <a class="back" href="/#projects">← 返回项目列表</a>
      <span class="tag">{p.eyebrow}</span>
      <h1>{p.title}</h1>
      <p class="num period">{p.period}</p>
      {p.sections.map((s) => (
        <section class="block">
          <h2>{s.heading}</h2>
          <p>{s.body}</p>
        </section>
      ))}
      <div class="tags">{p.tags.map((t) => <span class="tag">{t}</span>)}</div>
      {p.boundary && <p class="boundary">{p.boundary}</p>}
    </div>
  </article>
</BaseLayout>
<style>
  .back { font-family: var(--font-mono); font-size: 13px; display: inline-block; margin-bottom: var(--space-3); }
  h1 { font-size: clamp(30px, 5vw, 44px); margin: var(--space-2) 0 var(--space-1); }
  .period { margin-top: 0; }
  .block { margin-top: var(--space-4); max-width: 760px; }
  .block h2 { font-size: 20px; }
  .tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: var(--space-4); }
  .boundary { margin-top: var(--space-4); font-size: 13px; color: var(--c-ice); border-top: 1px dashed var(--c-line); padding-top: var(--space-2); }
</style>
```

`ecom-review-agent.astro` 与 `criteo-uplift.astro`：复制上页，将 `find` 条件分别改为 `'ecom-review-agent'`、`'criteo-uplift'`。

- [ ] **Step 2: 构建 + 链接验证**

```
cd /d "D:\个人知识库\个人网站\site"
"C:\Program Files\nodejs\npm.cmd" run build
```

Expected: `dist/projects/olist/index.html`、`dist/projects/ecom-review-agent/index.html`、`dist/projects/criteo-uplift/index.html` 均生成；浏览器从首页卡片点进每个详情页可回跳。

- [ ] **Step 3: Commit**

```
cd /d "D:\个人知识库\个人网站"
"C:\Program Files\Git\cmd\git.exe" add site/src/pages
"C:\Program Files\Git\cmd\git.exe" commit -m "feat: 三个项目详情页"
```

---

### Task 8: 内容安全扫描（构建产物级）

**Files:**
- Create: `site/scripts/check-dist.mjs`

**Interfaces:**
- Consumes: Task 7 完成的 `dist/`。
- Produces: `node scripts/check-dist.mjs` 可重复执行的安全闸门；Task 9 的验收依赖其通过。

- [ ] **Step 1: 先写脚本并在"未清理"状态下演练（TDD：先确认检查器能抓到问题）**

写 `site/scripts/check-dist.mjs`：

```js
// 扫描 dist 产物中的禁止内容；退出码非 0 即失败
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const FORBIDDEN = [new RegExp('1[3-9]\\d{9}')];
const ROOT = new URL('../dist', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

let hits = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(html|css|js|svg|xml|txt|json)$/.test(name)) {
      const text = readFileSync(p, 'utf8');
      for (const f of FORBIDDEN) if (f.test(text)) hits.push(`${p}: ${f}`);
    }
  }
})(ROOT);

if (hits.length) { console.error('FAIL\n' + hits.join('\n')); process.exit(1); }
console.log(`OK: dist 安全扫描通过（检查 ${FORBIDDEN.length} 项禁止内容）`);
```

- [ ] **Step 2: 演练负例（临时把禁止串写进一个 dist 文件再运行，确认 exit 1 后删除该文件重建）**

```
cd /d "D:\个人知识库\个人网站\site"
"C:\Program Files\nodejs\node.exe" -e "require('fs').writeFileSync('dist/_neg.html','<p>13'+'80'.repeat(4)+'0</p>')"
"C:\Program Files\nodejs\node.exe" scripts\check-dist.mjs
```

Expected: `FAIL` + exit code 1。随后 `del dist\_neg.html` 并重新 `npm run build`。

- [ ] **Step 3: 正式运行**

```
"C:\Program Files\nodejs\node.exe" scripts\check-dist.mjs
```

Expected: `OK`。

- [ ] **Step 4: Commit**

```
cd /d "D:\个人知识库\个人网站"
"C:\Program Files\Git\cmd\git.exe" add site/scripts
"C:\Program Files\Git\cmd\git.exe" commit -m "test: 构建产物安全扫描脚本"
```

---

### Task 9: 视觉验收与修复（渲染 → 审查 → 修复循环）

**Files:**
- Modify: 视验收发现的问题而定（样式/文案微调）

**Interfaces:**
- Consumes: 完整站点 + preview 服务器。
- Produces: 通过验收的最终版本。

- [ ] **Step 1: 启动 preview**

```
cd /d "D:\个人知识库\个人网站\site"
"C:\Program Files\nodejs\npm.cmd" run preview
```

- [ ] **Step 2: 浏览器实测两档宽度**（用 browser-use 能力）：桌面 1280px、移动 375px。

逐项检查清单：
1. 首页 8 个板块顺序与锚点导航 5 项全部可达；
2. Hero：标题、tagline、3 个意向标签、4 个统计数字、签名曲线 + 标记点文案正确；
3. 三张项目卡 hover 变琥珀边、点击进入对应详情页、详情页可返回；
4. 全部文字对比度目测清晰（浅灰字在墨蓝底上不发虚）；
5. 375px：无横向滚动、统计条 2×2、项目卡单列、导航不折行溢出；
6. 文案错别字、数字口径与 spec §2 一致（1015 万、159 万、60 期、40.37%-48.60% 等）。

- [ ] **Step 3: 修复发现的问题并逐项复验，`npm run build` + Task 8 脚本复跑通过**

- [ ] **Step 4: Commit**

```
cd /d "D:\个人知识库\个人网站"
"C:\Program Files\Git\cmd\git.exe" add -A
"C:\Program Files\Git\cmd\git.exe" commit -m "fix: 视觉验收修复"
```

（若本步无修改则跳过 commit。）

---

### Task 10: 使用说明与交付

**Files:**
- Create: `D:\个人知识库\个人网站\README.md`

- [ ] **Step 1: 写 README，内容必须包含：**

1. 本地预览方法（`cd site && npm run dev`，浏览器 http://localhost:4321）；改文案只需编辑 `site/src/data/*.ts`；
2. 构建与安全检查（`npm run build` → `node scripts/check-dist.mjs`）；
3. 部署提示：任何静态托管均可（GitHub Pages / Vercel / Netlify），产物为 `site/dist/`；`astro.config.mjs` 的 `site` 字段需替换为真实域名；
4. 红线提醒：手机号不得进入本仓库与构建产物（`scripts/check-dist.mjs` 会拦截）。

- [ ] **Step 2: 最终验证三连**

```
cd /d "D:\个人知识库\个人网站\site"
"C:\Program Files\nodejs\npm.cmd" run build
"C:\Program Files\nodejs\node.exe" scripts\check-dist.mjs
cd /d "D:\个人知识库\个人网站"
"C:\Program Files\Git\cmd\git.exe" grep -nE "1[3-9][0-9]{9}" -- .
```

Expected: build 成功、扫描 OK、grep 无输出。

- [ ] **Step 3: Commit + 交付**

```
"C:\Program Files\Git\cmd\git.exe" add README.md
"C:\Program Files\Git\cmd\git.exe" commit -m "docs: 使用说明"
```

向用户交付：项目路径、预览方法、已验证项清单、后续部署建议。

---

## Self-Review 记录

1. **Spec 覆盖**：§2 首页 8 板块 → Task 5/6；§2.2 三个详情页 → Task 7；§3 视觉令牌/签名元素 → Task 3/5；§4 架构与位置 → Task 1/2；§5 脱敏红线 → Task 4 Step 3、Task 8、Task 10；§6 验证 → Task 8/9/10；前置 Node/git → Task 1。spec §2.1 表中"素材来源"逐条落到 Task 4 数据模块。✅ 无缺口。
2. **占位符扫描**：所有数据文件给出逐字文案；无 TBD/TODO/"适当处理"。✅
3. **类型一致性**：`Project.slug` 联合类型与 Task 7 三个 `find` 条件、Task 6 链接 `/projects/${slug}/` 一致；`profile.email` 在 BaseLayout/Contact 中为字面量与数据双写（BaseLayout 页脚为静态字面量——与 `profile.ts` 相同值，Task 10 验收时人工核对一次）。✅
