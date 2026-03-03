import { defineClientConfig } from 'vuepress/client'
import { MotionPlugin } from '@vueuse/motion'
import { inject } from '@vercel/analytics'
import NotFound from './components/NotFound.vue'

export default defineClientConfig({
  enhance({ app }) {
    // 全局注册 @vueuse/motion 插件
    app.use(MotionPlugin)

    // 确保只在客户端（真实的浏览器环境）中注入统计脚本
    if (typeof window !== 'undefined') {
      inject()
    }
  },
  layouts: {
    NotFound // 全局覆盖默认的 404 布局，启用恐龙游戏
  }
})
