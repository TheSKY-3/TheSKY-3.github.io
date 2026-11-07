export const profile = {
  name: "吴柏高",
  tagline: "把 AI 落进真实业务：为效果负责，每一步可验证",
  intro:
    "我的做事方式是一条落地链：拆解业务里真实、重复的痛点 → 把 AI 做进流程 → 用可复算的数字验证效果。实习里，司机接单指南 Skill 连续 60 天服务约 40 名司机（制作 2h→5min），月度对账 1 天→10 分钟；开源的财报 RAG 让投资者问一句就拿到带页码的答案（hit@5 34%→86%）。统计学硕士在读，相信能落地的 AI 先要能验证。",
  intents: ["Agent 开发", "LLM 应用开发", "AI 应用工程", "数据分析 / 经营分析"],
  availability: "一周内到岗 · 每周 4-5 天 · 可实习 6 个月以上",
  email: "1525546469@qq.com",
  location: "广州",
  github: "https://github.com/TheSKY-3",
  resumes: [
    { label: "下载简历 · Agent 开发", href: "/resume-wubogao-agent.pdf", primary: true },
    { label: "下载简历 · 经营分析", href: "/resume-wubogao-analysis.pdf", primary: false },
  ],
};

export const heroStats = [
  { value: "86%", label: "财报 RAG 出处命中 hit@5（50 题冻结题库）" },
  { value: "13 节点", label: "LangGraph 诊断状态机（评论 Agent）" },
  { value: "658 项", label: "pytest 全绿 · CI 上跑" },
  { value: "1015 万+", label: "出行订单经营分析（实习）" },
];
