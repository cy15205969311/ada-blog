import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { getDirname, path } from '@vuepress/utils'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Ada Blog',
  description: '现代化个人博客',

  bundler: viteBundler(),

  theme: defaultTheme({
    navbar: [
      { text: '首页', link: '/' },
      { text: '计算机技术', link: '/tech/' },
      { text: '新媒体运营', link: '/media/' },
      { text: '跨境电商', link: '/ecommerce/' },
      { text: '关于', link: '/about/' }
    ],
    sidebar: 'auto'
  }),

  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components')
    })
  ]
})
