// 新媒体运营资源数据
export const mediaData = [
  {
    category: "AI 视频/图片创作",
    items: [
      {
        title: "可灵 AI",
        desc: "快手AI助理，一键生成视频工具",
        link: "https://klingai.kuaishou.com/",
        icon: "https://klingai.kuaishou.com/favicon.ico"
      },
      {
        title: "即梦平台",
        desc: "腾讯AI视频生成平台，专业级创作工具",
        link: "https://jimeng.jianying.com/",
        icon: "data:image/png;base64,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"
      },
      {
        title: "LiblibAI",
        desc: "中国领先的AI绘图社区，实时模型分享",
        link: "https://www.liblib.art/",
        icon: "https://www.liblib.art/favicon.ico"
      },
      {
        title: "Viggle AI",
        desc: "让任何角色动起来的AI视频生成工具",
        link: "https://viggle.ai/",
        icon: "https://viggle.ai/favicon.ico"
      },
      {
        title: "百度AI图片助手",
        desc: "百度提供的智能图片处理与编辑工具",
        link: "https://tu.baidu.com/",
        icon: "https://www.baidu.com/favicon.ico"
      },
      {
        title: "PoseMy.Art",
        desc: "专业的3D人体姿态参考生成工具",
        link: "https://posemy.art/",
        icon: "https://posemy.art/favicon.ico"
      }
    ]
  },
  {
    category: "内容创作与设计",
    items: [
      {
        title: "豆包",
        desc: "字节跳动AI助手，辅助内容创作",
        link: "https://www.doubao.com/",
        icon: "https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/doubao/web/logo-icon.png"
      },
      {
        title: "一键抠图",
        desc: "在线一键抠图服务，专业的图像处理工具",
        link: "https://www.remove.bg/zh",
        icon: "https://www.remove.bg/favicon.ico"
      },
      {
        title: "创客贴",
        desc: "全能在线设计平台，提供海量设计模板",
        link: "https://www.chuangkit.com/",
        icon: "https://www.chuangkit.com/favicon.ico"
      },
      {
        title: "图怪兽",
        desc: "在线图片编辑器，海量模板快速设计",
        link: "https://818ps.com/",
        icon: "https://818ps.com/favicon.ico"
      },
      {
        title: "可画",
        desc: "在线设计工具，轻松制作海报和视频",
        link: "https://www.canva.cn/",
        icon: "https://www.canva.cn/favicon.ico"
      },
      {
        title: "noiz.cn",
        desc: "全球领先的AI写作助手工具",
        link: "https://noiz.cn/",
        icon: "https://noiz.cn/favicon.ico"
      }
    ]
  },
  {
    category: "运营辅助与合规",
    items: [
      {
        title: "零克查词",
        desc: "专业的关键词、社交媒体数据分析工具",
        link: "https://www.lingkechaci.com/",
        icon: "https://www.lingkechaci.cn/favicon.ico"
      },
      {
        title: "今日热榜",
        desc: "聚合各大平台热点，追踪全网热点",
        link: "https://tophub.today/",
        icon: "https://tophub.today/favicon.ico"
      },
      {
        title: "营销热点日历",
        desc: "广告营销日历，提供营销节点参考",
        link: "https://www.adguider.com/sv1/calendar/getCalendar?mode=1&startDate=2025/11/03",
        icon: "https://www.adguider.com/favicon.ico"
      }
    ]
  },
  {
    category: "数据与资讯",
    items: [
      {
        title: "新红",
        desc: "小红书数据分析工具，全方位数据监测",
        link: "https://www.newrank.cn/",
        icon: "https://chs.newrank.cn/logo/logo-newrank.svg"
      },
      {
        title: "新榜",
        desc: "内容产业服务平台，提供多平台数据分析",
        link: "https://www.newrank.cn/",
        icon: "https://chs.newrank.cn/logo/logo-newrank.svg"
      },
      {
        title: "SocialBeta",
        desc: "领先的营销创意和数据分析平台",
        link: "https://socialbeta.com/",
        icon: "https://socialbeta.com/favicon.ico"
      },
      {
        title: "市场营销智库",
        desc: "广告、公关、品牌营销资料库",
        link: "https://www.domarketing.cn/",
        icon: "https://www.domarketing.cn/statics/images/domarketing/logo.gif"
      }
    ]
  }
];
