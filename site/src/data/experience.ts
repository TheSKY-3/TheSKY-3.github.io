export interface ExperienceMetric {
  value: string;
  label: string;
}

export interface ExperienceHighlight {
  title: string;
  problem: string;
  actions: string[];
  outcome: string;
  tags: string[];
  metric?: ExperienceMetric;
  layout?: "centered";
}

export const experience = {
  company: "广州如约出行科技集团有限公司",
  role: "数据分析实习生",
  dept: "运营中心 · 数据分析",
  period: "2026.05 - 至今",
  intro:
    "在出行平台的运营中心做经营分析：从 1015 万条订单里回答「补贴给谁、资源压哪」的渠道问题，把重复出现的分析固化成 AI Skill，把三方资金结算口径写成研发可对照的标准——最终把对账本身也做成了自动化程序。",
  stats: [
    { value: "1015 万+", label: "订单分析体量" },
    { value: "4.17", label: "洞察的最高补贴 ROI" },
    { value: "2h→5min", label: "日报自动化提效" },
    { value: "21 项", label: "标准结算字段设计" },
  ],
  highlights: [
    {
      title: "渠道经营与调价分析",
      problem: "哈啰、百度、美团、腾讯四渠道并存，补贴该给谁、资源该压在哪，缺少统一的量化口径。",
      actions: [
        "搭建「规模-质量-收益-补贴」四维评估体系：完单率、客单价、GMV 份额、补贴覆盖率与补贴 ROI",
        "识别哈啰取消分类口径与其他渠道不一致——先统一口径再做对比，防止把口径差异误读成经营差距",
        "百度 7 折调价专项：同期对照 + 同星期对照 + 双重差分评估调价效果",
      ],
      outcome:
        "输出渠道策略矩阵（腾讯稳基本盘 / 百度树质量标杆 / 美团做高 ROI 实验 / 哈啰先诊断后投入）及管理层汇报口径。",
      tags: ["SQL", "Python", "双重差分", "策略矩阵"],
      metric: { value: "4.17", label: "洞察的最高补贴 ROI（美团）" },
    },
    {
      title: "补贴策略工具化",
      problem: "补贴专题分析每月重复：清洗、切片、分档、评价全靠手工，口径容易漂移。",
      actions: [
        "将订单清洗、场景切片、补贴率分档、效率评价与档位推荐固化为可复用 Skill",
        "分档评价同时看效率、量级与质量三个维度，避免单指标误导资源决策",
      ],
      outcome: "支持近 20 份补贴专题报告生成，跨月份、跨渠道口径保持一致。",
      tags: ["Skill 固化", "补贴分档", "口径治理"],
      metric: { value: "近 20 份", label: "补贴专题报告" },
    },
    {
      title: "司机日报自动化（AI Agent Skill）",
      problem: "司机接单指南需每天人工整合天气、活动、交通与历史订单，耗时长且质量不稳定。",
      actions: [
        "搭建 AI Agent Skill 流水线，自动生成日期 / 时段 / 场景化的出车建议",
        "把运营数据翻译成一线司机能直接执行的动作，而不是一份数据报表",
      ],
      outcome:
        "连续稳定运行 60 天、60 期日报每日推送司机群（约 40 名司机），单期制作时间 2 小时 → 5 分钟。",
      tags: ["AI Agent", "Skill", "自动化交付"],
      metric: { value: "2h→5min", label: "单期制作时间" },
    },
    {
      title: "出租车抽佣与车租抵扣口径",
      problem:
        "司机、车企、平台三方资金结算链路长——车租抵扣、双侧平台抽佣与路桥费回补缺少统一口径，研发实现和业务复核容易出现偏差。",
      actions: [
        "梳理车租抵扣、双侧平台抽佣、路桥费回补与跨日调账的结算边界",
        "设计 21 项标准结算字段、边界规则与验证案例，协同研发推进系统实现",
      ],
      outcome:
        "形成研发实现与业务复核共用的结算口径，减少车租、抽佣与回补规则在跨团队传递中的歧义。",
      tags: ["结算口径", "字段设计", "研发协同"],
      metric: { value: "21 项", label: "标准结算字段" },
    },
    {
      title: "财务对账自动化",
      problem: "月度对账依赖人工匹配、填列与分表重建，处理双方结算文件通常需要约一天。",
      actions: [
        "将对账规则固化为本地程序，输入双方结算 xlsx 后自动匹配、填列并生成或更新对账表",
        "历史月份支持一键核验；重复键、缺字段或文件占用时自动中止，避免损坏源文件",
      ],
      outcome: "部门财务实测：月度对账从约 1 天压缩到约 10 分钟。",
      tags: ["自动匹配", "异常拦截", "本地程序"],
      metric: { value: "1天→10min", label: "对账自动化（部门实测）" },
      layout: "centered",
    },
  ] as ExperienceHighlight[],
};
