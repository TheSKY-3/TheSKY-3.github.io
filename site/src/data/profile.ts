export const profile = {
  name: "吴柏高",
  tagline: "数据分析 / 经营分析：把业务问题拆成可复算的指标与决策",
  intro:
    "统计学硕士在读。上一份实习在出行平台运营中心处理 1,015 万条订单，做渠道调价、补贴档位与留存归因，累计交付 60 余份分析报告；也用 MySQL/Python 做过 Olist 电商经营分析，并独立完成财报 RAG 的检索与评测。习惯先锁口径，再做对照和异常定位，结论保留可回查的证据。",
  intents: ["数据分析 / 经营分析", "商业分析 / 数据策略", "数据运营 / 增长分析", "AI 应用 / RAG"],
  availability: "一周内到岗 · 每周 4-5 天 · 可实习 6 个月以上",
  email: "1525546469@qq.com",
  location: "广州",
  github: "https://github.com/TheSKY-3",
  resumes: [
    { label: "下载简历 · 经营分析", href: "/resume-wubogao-analysis.pdf", primary: true },
    { label: "下载简历 · Agent 开发", href: "/resume-wubogao-agent.pdf", primary: false },
  ],
};

export const heroStats = [
  { value: "1,015 万+", label: "出行订单分析（实习）" },
  { value: "60 余份", label: "网页版分析报告交付" },
  { value: "77.3%", label: "财报 RAG 150 题留出集 hit@5（修正口径 91.9%）" },
  { value: "2h→30min", label: "千万级订单合并提效（实习）" },
];
