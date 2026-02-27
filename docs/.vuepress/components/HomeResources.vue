<template>
  <div class="modern-platform-wrapper">
    <section v-for="(section, sIndex) in resourcesData" :key="sIndex" class="full-width-section">
      <div class="content-island">
        <div class="section-header">
          <div class="title-wrap">
            <h2 class="main-title">{{ section.title }}</h2>
          </div>
          <span @click="openLink(section.link)" class="link-view-more">查看更多 &rarr;</span>
        </div>

        <div v-for="(category, cIndex) in section.categories.slice(0, 2)" :key="cIndex" class="sub-category">
          <h3 class="sub-title">{{ category.name }}</h3>
          <div class="flat-grid">
            <div v-for="(item, iIndex) in category.items.slice(0, 4)" :key="iIndex" @click="openLink(item.link)"
              class="pure-flat-card">
              <div class="card-top">
                <div class="icon-wrapper">
                  <img v-if="item.icon" :src="item.icon" :alt="item.name" class="brand-icon">
                  <span v-else class="text-icon">{{ item.name.charAt(0).toUpperCase() }}</span>
                </div>
                <span class="brand-name">{{ item.name }}</span>
              </div>
              <div class="card-bottom">{{ item.desc }}</div>
            </div>
          </div>
        </div>

        <div class="section-footer">
          <span @click="openLink(section.link)" class="solid-cta-btn">查看更多{{ section.title }} &rarr;</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { techData } from '../data/techData.js';
import { mediaData } from '../data/mediaData.js';
import { ecommerceData } from '../data/ecommerceData.js';

/* 数据源：从真实数据文件导入并转换格式 */
const resourcesData = reactive([
  {
    title: '计算机技术',
    link: '/tech/',
    categories: techData.map(cat => ({
      name: cat.category,
      items: cat.items.map(item => ({
        name: item.title,
        desc: item.desc,
        icon: item.icon,
        link: item.link
      }))
    }))
  },
  {
    title: '新媒体运营',
    link: '/media/',
    categories: mediaData.map(cat => ({
      name: cat.category,
      items: cat.items.map(item => ({
        name: item.title,
        desc: item.desc,
        icon: item.icon,
        link: item.link
      }))
    }))
  },
  {
    title: '跨境电商',
    link: '/ecommerce/',
    categories: ecommerceData.map(cat => ({
      name: cat.category,
      items: cat.items.map(item => ({
        name: item.title,
        desc: item.desc,
        icon: item.icon,
        link: item.link
      }))
    }))
  }
]);

// 使用纯 JS 处理跳转，彻底切断 VuePress 自动插入箭头的机制
const openLink = (url) => {
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};
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
  padding: 2.5rem 0;
  /* 适中的上下间距 */
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
  padding-bottom: 10px;
  margin-bottom: 2rem;
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
  // background-color: skyblue;
}

/* 绿线装饰 */
.main-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 44px;
  height: 4px;
  // background: #3eaf7c;
  border-radius: 2px;
}

.link-view-more {
  font-size: 0.95rem;
  color: #3eaf7c;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
}

.link-view-more:hover {
  opacity: 0.8;
}

/* --- 子分类 --- */
.sub-category {
  margin-bottom: 2rem;
}

.sub-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--c-text);
  margin: 0 0 1rem 0;
  /* 标题与网格间距 */
  border: none;
  display: flex;
  align-items: center;
  line-height: 1.3;
  padding: 0.4rem 0;
}

/* 精准对齐的绿点 */
.sub-title::before {
  content: '';
  display: inline-block;
  width: 5px;
  height: 5px;
  background-color: #3eaf7c;
  border-radius: 50%;
  margin-right: 8px;
}

/* --- 网格系统 --- */
.flat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
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

/* --- 卡片：极简真彩大平层 (优化边框和阴影) --- */
.pure-flat-card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: var(--c-bg);
  border: 1px solid #e5e7eb;
  /* 更明显的边框 */
  border-radius: 12px;
  text-decoration: none !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  /* 添加轻微初始阴影 */
  transition: all 0.3s ease;
}

.pure-flat-card:hover {
  transform: translateY(-4px);
  border-color: #3eaf7c;
  /* 悬停时边框变绿 */
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(62, 175, 124, 0.1);
  /* 双层阴影，带绿色光晕 */
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
  cursor: pointer;
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
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

html.dark .pure-flat-card:hover {
  border-color: #3eaf7c;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(62, 175, 124, 0.2);
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
