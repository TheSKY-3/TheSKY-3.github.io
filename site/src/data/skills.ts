export interface SkillGroup {
  name: string;
  note: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    name: "数据分析",
    note: "实习主战场：渠道经营 / 补贴策略 / 订单履约",
    items: ["Python", "Pandas", "NumPy", "Matplotlib", "数据清洗与探索分析"],
  },
  {
    name: "SQL / 数据库",
    note: "1015 万级订单的多表评估查询",
    items: ["MySQL", "多表连接与聚合", "窗口函数", "基础数据建模"],
  },
  {
    name: "BI / 汇报口径",
    note: "从数据到管理层策略矩阵",
    items: ["Power BI 看板", "DAX 指标口径", "Excel 函数与透视表"],
  },
  {
    name: "AI 分析提效",
    note: "实习中沉淀：60 期日报、近 20 份专题报告与月度对账流水线的自动化",
    items: ["WorkBuddy", "Codex", "AI Agent 工作流", "Skill 固化与质量校验"],
  },
  {
    name: "业务分析方法",
    note: "实习复用清单（见知识库「可复用方法」）",
    items: ["渠道质量收益拆解", "补贴分档综合评价", "同期 / 同星期 / DID 对照", "字段覆盖率检查"],
  },
];
