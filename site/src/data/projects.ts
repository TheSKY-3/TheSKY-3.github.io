export interface ProjectSection {
  heading: string;
  body: string;
}

export interface ProjectFigure {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: "olist" | "ga4-growth" | "ecom-review-agent" | "criteo-uplift";
  eyebrow: string;
  title: string;
  period: string;
  summary: string;
  tags: string[];
  thumbnail?: { src: string; alt: string };
  sections: ProjectSection[];
  figures?: ProjectFigure[];
  boundary?: string;
}

export const projects: Project[] = [
  {
    slug: "olist",
    eyebrow: "数据分析 / BI",
    title: "Olist 巴西电商经营分析",
    period: "2024.07 - 2024.09",
    summary:
      "把 9 张业务表变成经营决策看板：MySQL + Python 沉淀 KPI 指标体系，用 9.6 万笔订单证明「履约延迟是口碑的头号杀手」——准时送达评分 4.29，迟到 6 天以上只剩 1.74。",
    tags: ["MySQL", "Python · Pandas", "Power BI", "Docker"],
    thumbnail: { src: "/images/banners/olist.svg", alt: "Olist 经营分析项目横幅" },
    figures: [
      { src: "/images/olist/review_by_delay.png", alt: "履约时效与评分的关系", caption: "评分随履约延迟逐档下滑：准时 4.29 → 迟到 6 天以上 1.74" },
      { src: "/images/olist/monthly_gmv.png", alt: "月度 GMV 趋势", caption: "月度 GMV 走势（2018-09 起为数据截断期）" },
      { src: "/images/olist/top_categories_gmv.png", alt: "Top 类目 GMV", caption: "高贡献类目 GMV 排名" },
    ],
    sections: [
      {
        heading: "背景与目标",
        body: "基于 Kaggle 公开的 Olist 电商多表数据，按真实公司的数据链路完整跑通一遍：数据落库 → 数仓视图 → KPI 分析 → 看板呈现，形成可写入简历、可复现、可发布的经营分析作品集项目。",
      },
      {
        heading: "核心发现：履约延迟是口碑的头号杀手",
        body: "把 9.6 万笔有履约时效的订单按延迟程度分桶：准时或提前送达的订单平均评分 4.29（89,936 单）；迟到 1-2 天降到 3.52；迟到 3-5 天 2.47；迟到 6 天以上只剩 1.74（3,764 单）。对运营的含义：差评治理的抓手不在客服话术，在履约时效的最后一公里——把「迟到 6 天+」的订单量压下去，评分大盘自然回来。",
      },
      {
        heading: "数据与建模",
        body: "9 份 CSV（订单、明细、支付、评价、客户、卖家、商品、地理、类目翻译）落入 MySQL，构建三层分析视图：订单级 KPI 宽表（vw_order_kpi）、商家评分卡（vw_seller_scorecard）、类目月度趋势（vw_category_monthly）。地理表约 100 万行，ETL 阶段按邮编前缀聚合（均值坐标 + 众数城市/州）以加速后续分析。",
      },
      {
        heading: "踩过的数据坑",
        body: "客户表里同一自然人多次下单会生成多个 customer_id，复购和留存分析必须改用 customer_unique_id——直接用 customer_id 会把老客算成新客；支付表同一订单可能有多条记录，支付结构分析必须先按 order_id 汇总；地理表同一邮编前缀对应多条坐标，需要先聚合再关联。这三个坑都是在分析中实际撞到后回补到 ETL 规则里的。",
      },
      {
        heading: "经营分析",
        body: "围绕 GMV、订单量、AOV、准时履约率、评分、支付结构与履约时效展开：从品类、商家与履约环节定位经营问题，识别高贡献品类、慢履约订单与低评分商家的关联，并分析履约时效与差评的关系。",
      },
      {
        heading: "工程化与可复现",
        body: "Docker Compose 一键启动 MySQL + ETL 环境；SQL 层拆分建表 DDL 与视图脚本；Python 分批导入、清洗并自动生成图表与 Markdown 分析报告；Power BI 支持直连 MySQL 视图或 CSV 导出两种接入方式，并附看板页面结构与 DAX 指标口径文档。整个仓库按 MIT 协议组织，可直接复现。",
      },
      {
        heading: "成果与产出",
        body: "一套覆盖销售、履约、评价、支付的 KPI 指标体系；三类可复用分析视图；Python 自动生成的经营分析报告与图表；Power BI 看板设计方案（页面结构 + DAX 口径）。",
      },
    ],
  },
  {
    slug: "ga4-growth",
    eyebrow: "增长分析 / 实验设计",
    title: "GA4 电商转化漏斗诊断与增长实验设计",
    period: "2026.08 · 已完成，全链路可复现",
    summary:
      "基于 BigQuery GA4 公共电商数据（429 万事件、27 万用户），完成「测量审计 → 严格漏斗 → 问题定位 → 机会量化 → 实验功效 → 监控设计」的增长分析闭环，17 条 SQL 全部可审计。",
    tags: ["BigQuery", "SQL", "漏斗分析", "Wilson 区间", "实验功效", "LaTeX 报告"],
    thumbnail: { src: "/images/banners/ga4.svg", alt: "GA4 增长分析项目横幅" },
    figures: [
      { src: "/images/ga4/funnel_3_stage.png", alt: "全周期三阶段会话漏斗", caption: "会话级三阶段漏斗：77,020 次浏览商品会话中，13.98% 进入结账，6.05% 完成购买" },
      { src: "/images/ga4/funnel_4_stage_stable.png", alt: "稳定窗口四阶段漏斗损失分解", caption: "稳定窗口四阶段损失分解：浏览→加购流失 78.1%、加购→结账流失 65.8%、结账→购买流失 47.2%——最大瓶颈在漏斗最前端" },
      { src: "/images/ga4/device_conversion.png", alt: "分设备购买转化率与置信区间", caption: "分设备购买转化率（含 Wilson 95% 区间）：移动端 6.26%、桌面端 5.91%、平板端 5.88%——区间重叠，设备差异大部分属抽样噪声而非确定性问题" },
    ],
    sections: [
      {
        heading: "背景与目标",
        body: "面向数据分析与增长岗位、还原真实工作流的作品集项目：不虚构增量，在真实公共数据（GA4 电商样本，2020.11-2021.01，约 429 万事件、27 万用户、36 万会话）上走完增长分析全流程——先审计测量质量，再用严格漏斗定位问题，量化机会后设计可上线的 A/B 实验与监控方案。",
      },
      {
        heading: "测量审计：先确认数据能用",
        body: "发现加购事件存在 18 个零加购日，据此把四阶段漏斗的稳定窗口判定为 2020-11-25 之后；审计 item_id 在浏览与购买事件间的语义不一致，明确禁止恢复商品级购买转化口径。17 条 BigQuery SQL 全部附带查询清单（job ID、dry-run 扫描量、实际计费字节），单条预估扫描超 20 GiB 自动拒绝执行。",
      },
      {
        heading: "漏斗诊断",
        body: "会话级三阶段漏斗：浏览商品 77,020 → 进入结账 13.98% → 完成购买 43.28%，整体转化率 6.05%。稳定窗口四阶段损失分解：浏览→加购流失 78.1%、加购→结账流失 65.8%、结账→购买流失 47.2%——最大瓶颈在漏斗最前端。再按设备、新老访客、获客渠道、商品类目分群，用 Wilson 95% 区间区分真实差异与抽样噪声。",
      },
      {
        heading: "机会量化与实验设计",
        body: "基于分群购买率构建机会场景并计算实验功效：以结账页基线转化 34.18% 计，检测 1 个百分点的绝对提升需要每组 35,559 个样本（会话代理口径约 392 天），而检测 5 个百分点只需约 21 天——并如实标注这是规划近似值，上线时须按真实用户级流量重算。配套上线监控方案与护栏指标。",
      },
      {
        heading: "交付与可复现",
        body: "XeLaTeX 主报告（Overleaf 兼容）+ 21 个聚合结果 CSV + 查询清单 + 交付前完整性审计（SHA-256 文件清单与机器可读结论）；本地脚本一键完成查询、作图与编译；原始事件保留在 BigQuery，不在仓库中再分发。",
      },
      {
        heading: "证据边界",
        body: "历史相关性不等于策略导致的转化提升——漏斗结论描述观察期行为，真实增量必须由在线实验验证；实验设计与功效计算正是为那一步准备的。",
      },
    ],
  },
  {
    slug: "criteo-uplift",
    eyebrow: "因果推断 / Uplift / 数据策略",
    title: "Criteo 因果增量分析",
    period: "2026 年 · 离线分析完成，线上验证未开始",
    summary:
      "基于 Criteo 去偏公开随机实验数据（约 1398 万行），完成 ITT → 响应预测 → S/T/DR-Learner Uplift 比较 → AUUC/Qini 评估 → 覆盖策略模拟的完整分析链。",
    tags: ["因果推断", "Uplift", "ITT", "AUUC / Qini", "Python"],
    thumbnail: { src: "/images/banners/criteo.svg", alt: "Criteo 因果增量分析项目横幅" },
    figures: [
      { src: "/images/criteo/model_comparison.png", alt: "三个 Uplift 模型的验证集 AUUC 对比", caption: "三个 Uplift 模型的验证集 AUUC：固定配置下 S-Learner 在 visit 与 conversion 上均领先 T-Learner 与 DR-Learner" },
      { src: "/images/criteo/decile_checks.png", alt: "预测分位的实际增量检验", caption: "分位检验：第 1 分位（预测增量最高人群）的实际处理-对照差距显著为正，其余分位接近 0——排序头部有真实信号" },
      { src: "/images/criteo/policy_simulation.png", alt: "IPW 覆盖比例策略模拟", caption: "IPW 策略模拟：不同覆盖比例下的单位增量事件（visit 约 0.010、conversion 约 0.001），据此提出 visit 前 40%、conversion 前 50% 的候选覆盖规则" },
    ],
    sections: [
      {
        heading: "核心问题：一条可验证的决策链",
        body: "这个项目的价值不在“训练了三个 Uplift 模型”，而在于把一个容易被误写成预测问题的业务问题，拆成可验证的决策链：干预是否整体有效？→ 谁本来就会行动？→ 谁因干预额外行动？→ 资源有限时先验证哪一部分？→ 线上实验是否带来净价值？前四步的离线版本已完成，最后一步尚未开始。",
      },
      {
        heading: "方法链",
        body: "Criteo 去偏公开数据 → 数据审计与字段边界（约 13,979,592 行、6 列，缺失值审计为 0）→ 以随机分配的 treatment 做总体 ITT → 非因果响应预测基线（HistGradientBoosting）→ S/T/DR-Learner 离线比较 → AUUC、Qini 与分位检查 → IPW 覆盖比例模拟 → 线上实验候选规则。",
      },
      {
        heading: "响应预测 ≠ Uplift",
        body: "响应预测回答 P(Y=1|X)：排序“本来就更可能访问或转化”的人；Uplift 回答 E[Y|T=1,X] − E[Y|T=0,X]：排序“因干预而额外行动”的人。高响应不等于高增量——把高预测分直接当成触达名单，会把自然转化误算成活动功劳，这是营销预算评估里最常见的一类错账。",
      },
      {
        heading: "关键方法判断",
        body: "treatment 是随机分配标签，适合作为总体 ITT 的处理变量；exposure 是实际曝光，受投放与库存影响，不能替代随机分配。test 集只用于固定规则后的后验检查，不能反过来当模型选择依据。匿名特征 f0–f11 只用于建模排序，不解读为用户画像。",
      },
      {
        heading: "结果与产出",
        body: "固定配置下 S-Learner 在 visit 与 conversion 的 validation AUUC 均优于 T-Learner 与 DR-Learner；策略模拟提出 visit 前 40%、conversion 前 50% 的覆盖比例，作为下一轮线上随机实验的候选规则，而非直接投放名单。",
      },
      {
        heading: "下一步验证门",
        body: "补齐真实业务中的单位收益、单位成本、容量、频控与回滚规则；把 visit 前 40%、conversion 前 50% 写成预注册的实验候选；通过线上随机对照实验验证总体增量、成本与护栏指标——只有完成线上验证，才谈实际净价值与 ROI。",
      },
    ],
    boundary:
      "本文案遵守项目证据边界：离线分析已完成，线上随机实验未开始；不声称真实投放、收入或 ROI。",
  },
  {
    slug: "ecom-review-agent",
    eyebrow: "AI Product / Agent / Data Product",
    title: "ECom Review Intelligence Agent",
    period: "2026 年 · 工程验证通过，本地真实数据实测跑通，目标用户试用进行中",
    summary:
      "面向 B 端电商运营的评论证据决策原型：136,604 条评论精确关联到 3,278 个商品，受约束 Agent + 本地 Verifier 让每条结论可溯源。三大工作流已在本地真实数据下实测跑通。",
    tags: ["LangGraph", "SQLite / FTS5", "Structured Output", "Verifier", "Agent 评测"],
    thumbnail: { src: "/images/banners/ecom.svg", alt: "电商评论证据 Agent 横幅" },
    figures: [
      { src: "/images/ecom/architecture.svg", alt: "ECom 智能体系统架构图", caption: "系统架构：四层各解决一个不确定性——治理层冻结口径、证据层让代码而非模型掌握事实、智能层逐字段复核模型输出、业务层把能力变成三个可操作的工作流" },
      { src: "/images/ecom/workbench-diagnosis.png", alt: "SKU 诊断工作流实测截图", caption: "SKU 诊断实测（AGLUCKY 制冰机 · 运行噪音）：766 条匹配 → 5 张已校验证据卡（支持 4 / 信息不足 1）+ 人工核查建议；评论原文默认私密，点开单卡才按需返回" },
      { src: "/images/ecom/workbench-comparison.png", alt: "竞品比较工作流实测截图", caption: "竞品比较实测（AGLUCKY vs GE Profile Opal · 制冰质量）：6,325 条匹配 → 信号表「A 占优·强 / B 观察·强」——只陈述证据方向，不替运营宣布谁更好" },
      { src: "/images/ecom/workbench-triage.png", alt: "问题分诊工作流实测截图", caption: "问题分诊实测（三款商品 · 制冰质量）：8,828 条匹配 → 「先核查冰体一致性与形状」的验证顺序，冲突证据显式标出并附责任团队" },
    ],
    sections: [
      {
        heading: "业务问题：运营的判断为什么难",
        body: "品牌方或跨境团队的类目运营每天面对海量评论：AGLUCKY、GE Profile Opal、EUHOMY 这类热销制冰机单品各有三四千条评论。要回答「噪音是不是真问题」「跟竞品比质量谁占优」「先核查哪个投诉」，得跨几十页评论拼证据。Excel 能数星级，聊天模型能给流畅答案——但两者都说不清「这个结论基于哪几条评论、能不能回查」。项目把主问题定为：把评论整理成可复核的证据，而不是替运营下结论。",
      },
      {
        heading: "系统怎么工作：四层架构，每层先回答「为什么这么做」",
        body: "① 治理层：先把 Amazon 评论公开数据集冻结成带 SHA-256 登记的快照，再冻结证据合同（Ice Makers 类目、8 个体验维度、极性/强度/引用规则）——口径先于代码，任何分析不能临时创造标签。② 证据层：约 212 万条评论流式审计、210 万条精确关联到商品，装入 SQLite/FTS5 本地引擎——让确定性代码而不是模型掌握事实，模型只拿运行期别名和聚合证据卡，编造与串商品在结构上不可能。③ 智能层：LangGraph 受约束 Agent 只做澄清与规划（单工具授权、可恢复状态、预算单调记账），本地 Verifier 逐字段核对极性、强度、引用并回库校验——prompt 只是要求不是控制，执行控制必须在代码里。④ 业务层：运营工作台把能力变成三个任务流，运营看到的是「766 条匹配中的 5 张已校验证据卡」，而不是一段无法回查的总结。",
      },
      {
        heading: "三大工作流（本地真实数据实测）",
        body: "界面上商品以受控别名出现——这是刻意设计：运行时不泄露内部商品标识，评论原文默认私密、点开单卡才按需返回。实测（见下方截图）：SKU 诊断在 AGLUCKY 的「运行噪音」维度匹配 766 条、返回 5 张已校验证据卡并给出人工核查建议；竞品比较对比 AGLUCKY 与 GE Profile Opal 的「制冰质量」（6,325 条匹配），给出「A 占优、B 观察」的信号表——只陈述证据方向，不宣布谁更好；问题分诊在三款商品共 8,828 条匹配上产出「先核查冰体一致性与形状」的验证顺序，冲突证据被显式标出并附责任团队。",
      },
      {
        heading: "为什么可信：三道防编造设计 + 一道评测门",
        body: "第一道，口径冻结——防「模型或开发者临时创造标签」；第二道，本地引擎——防编造证据、防把别的商品的评论算到当前商品头上；第三道，Verifier 回库校验——防模型改写证据卡的极性和强度（真实教训：JSON 合法不等于业务草稿合法，结构合法不等于字段获得授权）。评测门：30 个冻结案例阻断门 + 真实 DeepSeek 模型 15×2=30 个独立结果，26 次验证通过、4 次按预期降级，未记录越权工具、提示注入成功或伪造标识——安全指标由本地执行记录与集合比较产生，模型「说自己没越权」不算数。",
      },
      {
        heading: "两个值得讲的工程取舍",
        body: "① 检索负结果：冻结案例对比后 FTS5/BM25 没有显示独立优势，项目没有为了「技术栈好看」强行上向量数据库——同时记录该结论的循环偏向边界，若建立独立人工相关性集需重新比较。技术选型服务于问题，而不是简历。② 分层评测：检索、Agent 离线、真实模型、工作台各有独立 Gate 和「能证明什么/不能证明什么」清单——防止一个绿色对勾掩盖所有问题。",
      },
      {
        heading: "边界与状态",
        body: "P0–P6 工程门已按项目手册通过；P7 运营工作台已完成受控验证，目标运营用户的结构化试用进行中（本地受控模式即真实评论数据下的运行形态）。它不根据评论推断真实缺陷率、销量或利润，也不回答「该买哪个」；工程 PASS 不能代替真人试用——这是项目刻意保持的状态标注。",
      },
    ],
    boundary:
      "本文案遵守项目证据边界：表述为「本地证据决策原型 / 阶段性工程验证」，不声称已上线、已节省工时或已改善业务指标。",
  },
];
