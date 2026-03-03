import { defineClientConfig } from 'vuepress/client'
import { MotionPlugin } from '@vueuse/motion'
import { inject } from '@vercel/analytics'
import NotFound from './components/NotFound.vue'
import HeroParticles from './components/HeroParticles.vue'

export default defineClientConfig({
  enhance({ app }) {
    // 全局注册 @vueuse/motion 插件
    app.use(MotionPlugin)

    // 全局注册 HeroParticles 组件
    app.component('HeroParticles', HeroParticles)

    // 确保只在客户端（真实的浏览器环境）中注入统计脚本
    if (typeof window !== 'undefined') {
      inject()
    }
  },
  layouts: {
    NotFound // 全局覆盖默认的 404 布局，启用恐龙游戏
  }
})
