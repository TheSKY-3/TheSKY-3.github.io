export interface SkillGroup {
  name: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { name: "数据分析", items: ["Python", "Pandas", "NumPy", "Matplotlib", "数据清洗与探索分析"] },
  { name: "SQL / 数据库", items: ["MySQL", "多表连接与聚合", "窗口函数", "基础数据建模"] },
  { name: "BI / 办公", items: ["Power BI 看板", "DAX 指标口径", "Excel 函数与透视表"] },
  { name: "AI 分析提效", items: ["WorkBuddy", "Codex", "AI Agent 工作流", "Skill 固化与质量校验"] },
];
