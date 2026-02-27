<template>
  <div class="modern-platform-wrapper">
    <section v-for="(section, sIndex) in resourcesData" :key="sIndex" class="full-width-section">
      <div class="content-island">
        <div class="section-header">
          <div class="title-wrap">
            <h2 class="main-title">{{ section.title }}</h2>
          </div>
          <a :href="section.link" class="link-view-more">查看更多 &rarr;</a>
        </div>

        <div v-for="(category, cIndex) in section.categories.slice(0, 2)" :key="cIndex" class="sub-category">
          <h3 class="sub-title">{{ category.name }}</h3>
          <div class="flat-grid">
            <a v-for="(item, iIndex) in category.items.slice(0, 4)" :key="iIndex" :href="item.link || section.link"
              target="_blank" rel="noopener noreferrer" class="pure-flat-card">
              <div class="card-top">
                <div class="icon-wrapper">
                  <img v-if="item.icon" :src="item.icon" :alt="item.name" class="brand-icon">
                  <span v-else class="text-icon">{{ item.name.charAt(0).toUpperCase() }}</span>
                </div>
                <span class="brand-name">{{ item.name }}</span>
              </div>
              <div class="card-bottom">{{ item.desc }}</div>
            </a>
          </div>
        </div>

        <div class="section-footer">
          <a :href="section.link" class="solid-cta-btn">查看更多{{ section.title }} &rarr;</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

/* 数据源：标题已更新为资源平台风格 */
const resourcesData = reactive([
  {
    title: '技术资源',
    link: '/tech/',
    categories: [
      {
        name: '前端开发',
        items: [
          { name: 'Vue.js', desc: '渐进式 JavaScript 框架', icon: 'https://cn.vuejs.org/logo.svg' },
          { name: 'React', desc: '用于构建用户界面的 JavaScript 库', icon: 'https://react.dev/favicon.ico' },
          { name: 'Vite', desc: '下一代前端构建工具', icon: 'https://cn.vitejs.dev/logo.svg' },
          { name: 'TypeScript', desc: 'JavaScript 的超集', icon: 'https://www.typescriptlang.org/favicon.ico' }
        ]
      },
      {
        name: 'UI 组件库',
        items: [
          { name: 'Element Plus', desc: '基于 Vue 3，面向设计师和开发者的组件库', icon: '' },
          { name: 'Vant 4', desc: '轻量、可定制的移动端 Vue 组件库', icon: '' },
          { name: 'Ant Design Vue', desc: 'Ant Design 的 Vue 实现', icon: '' },
          { name: 'Tailwind CSS', desc: '实用优先的 HTML (CSS)，无需离开 CSS 框架', icon: '' }
        ]
      }
    ]
  },
  {
    title: '新媒体资源',
    link: '/media/',
    categories: [
      {
        name: 'AI 视频/图片创作',
        items: [
          { name: '即梦 AI', desc: '一站式AI创作平台，激发无限创意', icon: '' },
          { name: '可灵 AI', desc: '快手推出的新一代 AI 创意生产力平台', icon: '' },
          { name: '索拉 (Sora)', desc: 'OpenAI 发布的文生视频模型，创造逼真场景', icon: '' },
          { name: '稳定扩散 (SD)', desc: '强大的开源 AI 图片生成模型', icon: '' }
        ]
      },
      {
        name: '内容创作与设计',
        items: [
          { name: '豆包', desc: '字节跳动推出的智能助手，辅助内容创作', icon: '' },
          { name: '图怪兽', desc: '在线海报编辑器，海量模板一键出图', icon: '' },
          { name: '一键抠图', desc: '在线一键抠图换背景，专业的快速抠图工具', icon: '' },
          { name: '创客贴', desc: '全能的在线设计平台，提供海量图片素材和模板', icon: '' }
        ]
      }
    ]
  },
  {
    title: '跨境电商资源',
    link: '/ecommerce/',
    categories: [
      {
        name: '浏览器插件',
        items: [
          { name: '大卖家', desc: '产品采集&活动管理，一键采集多平台产品', icon: '' },
          { name: 'FetchV', desc: 'M3U8/HLS视频下载器，轻松下载网页视频', icon: '' },
          { name: 'FigmaEX', desc: 'Figma 增强插件，提升设计效率', icon: '' },
          { name: '沉浸式翻译', desc: '双语对照网页翻译插件，支持PDF翻译', icon: '' }
        ]
      },
      {
        name: '跨境指纹浏览器',
        items: [
          { name: '广告力量', desc: '专业的指纹浏览器，多账号安全管理', icon: '' },
          { name: '紫鸟浏览器', desc: '专为跨境电商卖家打造的安全浏览器', icon: '' },
          { name: 'Hubstudio', desc: '免费的指纹浏览器，多账号环境隔离', icon: '' },
          { name: '飞跨浏览器', desc: '专为跨境电商打造的超级浏览器，安全高效', icon: '' }
        ]
      }
    ]
  }
]);
</script>

<style lang="scss" scoped>
/* ==========================================
   终极对策 1：猎杀 VuePress 原生跳转箭头
========================================== */
.modern-platform-wrapper :deep(.vp-external-link-icon),
.modern-platform-wrapper :deep(.external-link-icon),
.modern-platform-wrapper :deep(svg.icon.outbound) {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

/* ==========================================
   终极对策 2：无视父级限制的 100vw 物理爆破
========================================== */
.modern-platform-wrapper {
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  background: transparent;
}

/* ==========================================
   区块视觉系统：交替背景条
========================================== */
.full-width-section {
  width: 100%;
  padding: 4.5rem 0;
  /* 更大的上下呼吸感 */
}

/* 偶数项铺设浅灰背景，实现物理分层 */
.full-width-section:nth-child(even) {
  background-color: #f8f9fa;
}

/* 居中内容岛 (完美对齐顶部 Navbar) */
.content-island {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* --- 大标题 --- */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid var(--c-border-soft, #f1f3f5);
  padding-bottom: 12px;
  margin-bottom: 3.5rem;
}

.title-wrap {
  position: relative;
}

.main-title {
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0;
  color: var(--c-text);
  padding-bottom: 14px;
  border: none;
}

/* 绿线装饰 */
.main-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 44px;
  height: 4px;
  background: #3eaf7c;
  border-radius: 2px;
}

.link-view-more {
  font-size: 0.95rem;
  color: #3eaf7c;
  font-weight: 500;
  text-decoration: none;
}

/* --- 子分类 --- */
.sub-category {
  margin-bottom: 3.5rem;
}

.sub-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--c-text);
  margin: 0 0 1.5rem 0;
  /* 更大的标题与网格间距 */
  border: none;
  display: flex;
  align-items: center;
}

/* 精准对齐的绿点 */
.sub-title::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #3eaf7c;
  border-radius: 50%;
  margin-right: 10px;
}

/* --- 网格系统 --- */
.flat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  /* 卡片之间的间距 */
}

@media (max-width: 1024px) {
  .flat-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .flat-grid {
    grid-template-columns: 1fr;
  }
}

/* --- 卡片：极简真彩大平层 (无阴影、极浅边框) --- */
.pure-flat-card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: var(--c-bg);
  border: 1px solid var(--c-border-soft, #f1f3f5);
  /* 极浅色边框 */
  border-radius: 10px;
  text-decoration: none !important;
  box-shadow: none !important;
  /* 强制去阴影 */
  transition: all 0.25s ease;
}

.pure-flat-card:hover {
  transform: translateY(-2px);
  border-color: #e2e8f0;
  /* 悬停时边框微深 */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04) !important;
  /* 极微弱高级感阴影 */
}

/* 顶部：真彩图标释放 */
.card-top {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.icon-wrapper {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  background: transparent;
  /* 真彩释放，绝无强制绿底 */
}

.brand-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 没有图标时的首字母极简占位 */
.text-icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 800;
  color: #64748b;
  /* 采用高级灰，而非原先的绿色 */
  background: #f8f9fa;
  /* 极浅灰底座 */
  border-radius: 8px;
}

.brand-name {
  flex: 1;
  font-size: 1.05rem;
  font-weight: 700;
  color: #2c3e50;
  /* 更深邃的标题黑 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 底部描述 */
.card-bottom {
  font-size: 0.85rem;
  color: #86909c;
  /* 现代灰色 */
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* --- 底部主引导按钮 --- */
.section-footer {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.solid-cta-btn {
  display: inline-block;
  padding: 10px 32px;
  background: #3eaf7c;
  color: #fff !important;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none !important;
  transition: all 0.3s ease;
}

.solid-cta-btn:hover {
  background: #33a06f;
  transform: translateY(-1px);
}

/* --- 暗黑模式无缝适配 --- */
html.dark .full-width-section:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.02);
}

html.dark .pure-flat-card {
  background: var(--c-bg-light);
  border-color: rgba(255, 255, 255, 0.05);
}

html.dark .pure-flat-card:hover {
  border-color: rgba(255, 255, 255, 0.12);
}

html.dark .brand-name {
  color: #f1f5f9;
}

html.dark .card-bottom {
  color: #94a3b8;
}

html.dark .text-icon {
  background: rgba(255, 255, 255, 0.05);
  color: #cbd5e1;
}
</style>
