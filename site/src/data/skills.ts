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
    name: "AI 工具选型",
    note: "按出错代价选工具：产出内容直接由智能体生成；会动到资金或源数据的，写成可校验、可中止的确定性程序。",
    items: ["WorkBuddy", "Codex", "ZCode", "Qoder"],
  },
  {
    name: "AI 工作流工程化",
    note: "已固化：60 期司机日报、近 20 份专题报告、月度对账流水线",
    items: ["Skill 固化", "质量校验", "跨月口径一致", "结果可回查"],
  },
  {
    name: "业务分析方法",
    note: "全部来自实习真实场景，跨项目复用",
    items: ["渠道质量收益拆解", "补贴分档综合评价", "同期 / 同星期 / DID 对照", "字段覆盖率检查"],
  },
];
