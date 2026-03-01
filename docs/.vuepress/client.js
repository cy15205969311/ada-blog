import { defineClientConfig } from 'vuepress/client'
import { MotionPlugin } from '@vueuse/motion'

export default defineClientConfig({
  enhance({ app }) {
    // 全局注册 @vueuse/motion 插件
    app.use(MotionPlugin)
  },
})
