export interface SkillGroup {
  name: string;
  note: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    name: "开发技术",
    note: "从数据处理到服务部署的完整链路，全部在开源项目里实际用过",
    items: ["Python（pandas / numpy）", "SQL（DuckDB / parquet 分块）", "Git", "FastAPI（/health、/ask）", "uvicorn", "Streamlit", "Docker / compose", "Linux", "原生 HTML / CSS / JavaScript（零 CDN 依赖）"],
  },
  {
    name: "工程与测试",
    note: "质量门放在 CI 上自动跑，不靠自觉",
    items: ["pytest（658 项，CI 上跑）", "eval-gate 评测工作流（低于阈值直接失败）", "脱敏 trace", "冻结快照回归"],
  },
  {
    name: "Agent / LLM 应用开发",
    note: "两个开源 Agent 项目的主战场：编排、约束、评测各成一层",
    items: ["LangGraph 状态机（13 节点）", "checkpoint 断点续跑（SqliteSaver）", "MCP 工具封装（stdio）", "请求预算与工具台账", "RAG：BM25 + bge-small-zh 双路召回、RRF、语境增强索引", "拒答重试 · 数字接地", "固定题库评测（hit@5 / 完整率 / 误拒答）", "LoRA 微调（Qwen 4B 基座，5,000 条）"],
  },
  {
    name: "数据分析 / BI",
    note: "实习主战场：渠道经营 / 补贴策略 / 订单履约",
    items: ["Pandas / NumPy / Matplotlib", "MySQL 多表连接与窗口函数", "BigQuery 取数", "Power BI 看板与 DAX", "Excel 透视表", "实验与因果（同期对照 / DID / 功效测算）", "XGBoost / LightGBM / CatBoost"],
  },
  {
    name: "AI 工具",
    note: "重复流程固化成同事可直接调用的 Skill",
    items: ["WorkBuddy", "Codex", "ZCode"],
  },
];
