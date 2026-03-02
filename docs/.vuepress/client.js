import { defineClientConfig } from 'vuepress/client'
import { MotionPlugin } from '@vueuse/motion'
import { Analytics } from '@vercel/analytics/vue'

export default defineClientConfig({
  enhance({ app }) {
    // 全局注册 @vueuse/motion 插件
    app.use(MotionPlugin)
  },
  rootComponents: [Analytics],
})
