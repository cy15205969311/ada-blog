import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { getDirname, path } from '@vuepress/utils'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  // Vercel 部署配置：使用根域名部署，必须用 '/'
  base: '/',

  lang: 'zh-CN',
  title: 'Ada Blog',
  description: '现代化个人博客',

  // 配置网站头部标签
  head: [
    // 1. 注册主 Favicon (PNG 格式)
    ['link', { rel: 'icon', href: '/favicon.png' }],
    // 2. 适配苹果移动设备的桌面图标
    ['link', { rel: 'apple-touch-icon', href: '/favicon.png' }]
  ],

  bundler: viteBundler(),

  theme: defaultTheme({
    // 导航栏 Logo（使用 favicon 图片）
    logo: '/favicon.png',
    // 暗黑模式下的 Logo
    logoDark: '/favicon.png',

    navbar: [
      { text: '首页', link: '/' },
      { text: '计算机技术', link: '/tech/' },
      { text: '新媒体运营', link: '/media/' },
      { text: '跨境电商', link: '/ecommerce/' },
      { text: '关于', link: '/about/' }
    ],
    sidebar: 'auto',
    // 启用深色模式切换
    colorModeSwitch: true,
    // 隐藏贡献者信息
    contributors: false,
    // 隐藏最近更新时间
    lastUpdated: false
  }),

  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components')
    })
  ]
})
