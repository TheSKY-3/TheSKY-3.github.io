export interface ProjectSection {
  heading: string;
  body: string;
}

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
    summary:
      "MySQL + Python 整合 9 张业务表，构建 GMV、客单价、准时履约率等指标体系，并在 Power BI 定位品类与履约环节的经营问题。",
    tags: ["MySQL", "Python · Pandas", "Power BI", "Docker"],
    sections: [
      {
        heading: "背景与目标",
        body: "基于 Kaggle 公开的 Olist 电商多表数据，按真实公司的数据链路完整跑通一遍：数据落库 → 宽表 → KPI 分析 → 看板呈现，形成可写入简历的经营分析作品集项目。",
      },
      {
        heading: "方法与实现",
        body: "数据建模：9 张业务表落 MySQL，构建订单级 KPI 宽表、类目月度趋势与商家评分卡。ETL：Docker 化 Python 管道，分批导入、清洗并做 geolocation 聚合。分析：GMV、订单量、AOV、准时履约率、评分、支付结构，以及履约时效与差评的关系。工程化：README、数据字典、pipeline 流程图与 Docker Compose 一键启动。",
      },
      {
        heading: "成果与产出",
        body: "沉淀一套覆盖销售、履约、评价、支付的 KPI 指标体系；从品类、商家与履约环节定位经营问题，识别高贡献品类、慢履约与低评分商家；Python 自动生成图表与 Markdown 经营周报，Power BI 看板沉淀 DAX 指标口径。",
      },
    ],
  },
  {
    slug: "ecom-review-agent",
    eyebrow: "AI Product / Agent / Data Product",
    title: "ECom Review Intelligence Agent",
    period: "2026 年 · 阶段性工程验证通过，目标用户试用进行中",
    summary:
      "面向 B 端电商运营的评论证据决策原型：把单品诊断、商品比较、问题分流整理成可回查的本地证据，用受约束 Agent 与 Verifier 保证每条结论可溯源。",
    tags: ["LangGraph", "SQLite / FTS5", "Structured Output", "Verifier", "Agent 评测"],
    sections: [
      {
        heading: "定位与工作流",
        body: "围绕品牌方或跨境电商类目运营的三类任务：单 SKU 体验诊断、2–5 个商品的证据比较、问题信号分流。它不根据评论推断真实缺陷率、销量或利润——只把评论整理成可以回查的证据。",
      },
      {
        heading: "系统设计",
        body: "先冻结数据、类目与证据口径，再开发检索与 Agent：约 212 万条评论快照经流式审计，210 万条精确关联到商品；选定 Ice Makers 类目（3,278 个商品、136,604 条评论，文本覆盖率 99.87%）并冻结 8 个体验维度。SQLite/FTS5 本地证据引擎掌握查询，LangGraph 编排澄清、恢复与安全降级，Verifier 校验字段与引用后放行，本地敏感 Trace 与公开聚合 Trace 分离。",
      },
      {
        heading: "阶段验证",
        body: "P0–P6 各阶段 Gate（来源、快照、范围、证据合同、本地引擎、检索基线、受约束 Agent）已按项目手册通过，包括一次澄清恢复、单工具授权与安全降级的 live 验证；P7 运营工作台支持 synthetic 与受控 local 模式，目标运营用户结构化试用进行中。",
      },
    ],
    boundary:
      "本文案遵守项目证据边界：表述为「本地证据决策原型 / 阶段性工程验证」，不声称已上线、已节省工时或已改善业务指标。",
  },
  {
    slug: "criteo-uplift",
    eyebrow: "因果推断 / Uplift / 数据策略",
    title: "Criteo 因果增量分析",
    period: "2026 年 · 离线分析完成，线上验证未开始",
    summary:
      "基于 Criteo 去偏公开随机实验数据（约 1398 万行），完成 ITT → 响应预测 → S/T/DR-Learner Uplift 比较 → AUUC/Qini 评估 → 覆盖策略模拟的完整分析链。",
    tags: ["因果推断", "Uplift", "ITT", "AUUC / Qini", "Python"],
    sections: [
      {
        heading: "方法链",
        body: "Criteo 去偏公开数据 → 数据审计与字段边界（约 13,979,592 行、6 列，缺失值审计为 0）→ 以随机分配的 treatment 做总体 ITT → 非因果响应预测基线（HistGradientBoosting）→ S/T/DR-Learner 离线比较 → AUUC、Qini 与分位检查 → IPW 覆盖比例模拟 → 线上实验候选规则。",
      },
      {
        heading: "关键方法判断",
        body: "treatment 是随机分配标签，适合作为总体 ITT 的处理变量；exposure 是实际曝光，受投放与库存影响，不能替代随机分配。响应预测回答「谁本来更可能转化」，Uplift 回答「谁因干预而额外转化」，二者不是同一个问题。匿名特征 f0–f11 只用于建模排序，不解读为用户画像。",
      },
      {
        heading: "结果与产出",
        body: "固定配置下 S-Learner 在 visit 与 conversion 的 validation AUUC 均优于 T-Learner 与 DR-Learner；策略模拟提出 visit 前 40%、conversion 前 50% 的覆盖比例，作为下一轮线上随机实验的候选规则，而非直接投放名单。",
      },
    ],
    boundary:
      "本文案遵守项目证据边界：离线分析已完成，线上随机实验未开始；不声称真实投放、收入或 ROI。",
  },
];
