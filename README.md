# 吴柏高 · 个人介绍网站

基于 Obsidian 个人知识库构建的求职作品集网站。设计文档见 `docs/specs/`，实施计划见 `docs/plans/`。

## 本地预览

```
cd site
npm run dev
```

浏览器打开 http://localhost:4321/ 即可（首次需先 `npm install`）。

## 怎么改内容

所有文案都在 `site/src/data/` 下的 6 个数据文件里，改文字即可，不用碰页面代码：

| 文件 | 内容 |
| --- | --- |
| `profile.ts` | 姓名、一句话定位、求职意向、邮箱、首屏统计数字 |
| `experience.ts` | 实习经历（公司、职位、4 段经历） |
| `projects.ts` | 三个项目（卡片摘要 + 详情页各小节 + 证据边界声明） |
| `research.ts` | 研究亮点 |
| `skills.ts` | 技能分组标签 |
| `education.ts` | 教育背景与荣誉 |

改完保存，`npm run dev` 页面会热更新；正式发布前跑一次构建。

## 构建与安全检查

```
cd site
npm run build
node scripts/check-dist.mjs
```

- `npm run build`：产出静态文件到 `site/dist/`。
- `node scripts/check-dist.mjs`：扫描构建产物中是否泄漏手机号（用大陆手机号正则匹配，任何 11 位手机号都会被拦截），输出 `OK` 才算通过。

**红线：手机号不得出现在本仓库任何文件与构建产物中。**（设计文档与实施计划刻意不记录号码原文。）

## 后续部署（当前未部署）

产物是纯静态文件（`site/dist/`），任何静态托管都能直接用：

- **GitHub Pages**：仓库推到 GitHub 后，用 Action 或手动把 `site/dist/` 发布到 gh-pages 分支；
- **Vercel / Netlify**：导入仓库，构建命令 `cd site && npm run build`，输出目录 `site/dist`。

部署前把 `site/astro.config.mjs` 里的 `site` 字段（当前是占位 `https://wubogao.example.com`）替换为真实域名。

## 目录结构

```
个人网站/
├── docs/               设计文档（specs）与实施计划（plans）
└── site/               Astro 站点
    ├── public/         favicon
    ├── scripts/        check-dist.mjs 安全扫描
    └── src/
        ├── data/       全部文案（改内容只动这里）
        ├── components/ 首页 8 个板块组件
        ├── layouts/    BaseLayout（顶栏导航 + 页脚）
        ├── pages/      首页 + projects/ 三个详情页
        └── styles/     global.css 设计令牌（配色/字体/间距都在这里）
```

## 技术栈

Astro 7（纯静态输出）· 原生 CSS 设计令牌 · 零外部请求（系统字体栈）· TypeScript
