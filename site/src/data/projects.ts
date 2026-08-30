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
    period: "2026 年 · 阶段性工程验证通过，目标用户试用进行中",
    summary:
      "面向 B 端电商运营的评论证据决策原型：把单品诊断、商品比较、问题分流整理成可回查的本地证据，用受约束 Agent 与 Verifier 保证每条结论可溯源。",
    tags: ["LangGraph", "SQLite / FTS5", "Structured Output", "Verifier", "Agent 评测"],
    sections: [
      {
        heading: "定位与工作流",
        body: "围绕品牌方或跨境电商类目运营的三类任务：单 SKU 体验诊断（围绕指定商品整理支持、反对、冲突、证据不足四类信号）、2–5 个商品的证据比较（不直接宣布“谁最好”）、问题信号分流（给出值得优先核查的调查顺序，而非缺陷严重度排序）。它不根据评论推断真实缺陷率、销量或利润——只把评论整理成可以回查的证据。",
      },
      {
        heading: "为什么做：三层价值",
        body: "起点是实习所在运营中心的真实场景：运营要从海量评论里形成可复核的判断。项目价值分三层——效率层（减少重复筛评论、拼证据的机械工作）、决策支持层（为单品诊断、竞品比较提供可回查的证据输入）、治理层（冻结快照、证据口径、引用与轨迹，降低编造和串商品风险）。治理层是当前工程证据最强的一层。",
      },
      {
        heading: "系统设计",
        body: "先冻结数据、类目与证据口径，再开发检索与 Agent：约 212 万条评论快照经流式审计，210 万条精确关联到商品；选定 Ice Makers 类目（3,278 个商品、136,604 条评论，文本覆盖率 99.87%）并冻结 8 个体验维度。SQLite/FTS5 本地证据引擎掌握查询——外部模型不直接读取原始评论，也不能执行任意查询；LangGraph 只负责一次澄清、可恢复状态与安全降级；Verifier 校验字段与引用后放行；本地敏感 Trace 与公开聚合 Trace 双轨分离。",
      },
      {
        heading: "八阶段路线与工程门",
        body: "开发顺序是一条不可跳步的依赖链：来源可行性 → 冻结快照 → 类目范围与质量审计 → 证据合同 → 本地证据引擎 → 检索基线 → 受约束 Agent → 运营工作台。每一步只解决一个新的不确定性，每一阶段都有明确的 Gate（如 manifest 原子发布、精确关联可审查、证据口径冻结、原子建库），后一步必须继承前一步的输入身份，不能因为界面更完整就改写上游数据事实。",
      },
      {
        heading: "关键决策与踩坑",
        body: "① 检索基线的负结果：冻结 silver 案例比较后，BM25 没有显示独立优势，项目据此没有为了“技术看起来更高级”强行上向量数据库，同时记录了该结论的循环偏向边界。② 防止“假通过”：早期评测曾根据场景名称推断攻击被阻止、引用为空形成真空通过；修复后要求 expected、tool、rendered 三组引用严格相等，响应中的引用逐条回本地库验证，30 个冻结案例全部走阻断门。③ 真实模型的两层教训：JSON 合法不等于业务草稿合法（改用强制 tool call 按固定 schema 提交）；结构合法不等于字段获得授权（模型可能改写证据卡的极性和强度）——prompt 只是要求不是执行控制，最终方案是按本次安全证据卡动态收窄允许值，再由本地 Verifier 逐字段核对，不一致只允许一次修复，再失败即确定性降级。真实模型 15×2 gate 形成 30 个独立结果：26 次验证通过、4 次按预期降级，未记录越权或注入成功。",
      },
      {
        heading: "阶段验证",
        body: "P0–P6 各阶段 Gate（来源、快照、范围、证据合同、本地引擎、检索基线、受约束 Agent）已按项目手册通过，包括一次澄清恢复、单工具授权与安全降级的 live 验证；P7 运营工作台支持 synthetic 与受控 local 模式，目标运营用户结构化试用进行中——工程 PASS 不能代替真人试用，这是项目刻意保持的状态标注。",
      },
    ],
    boundary:
      "本文案遵守项目证据边界：表述为「本地证据决策原型 / 阶段性工程验证」，不声称已上线、已节省工时或已改善业务指标。",
  },
];
