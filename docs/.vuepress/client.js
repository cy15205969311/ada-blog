import { defineClientConfig } from 'vuepress/client'
import { MotionPlugin } from '@vueuse/motion'
import { injectSpeedInsights } from '@vercel/speed-insights'

export default defineClientConfig({
  enhance({ app }) {
    // 全局注册 @vueuse/motion 插件
    app.use(MotionPlugin)
  },
  setup() {
    // 注入 Vercel Speed Insights
    if (typeof window !== 'undefined') {
      injectSpeedInsights()
    }
  },
})
