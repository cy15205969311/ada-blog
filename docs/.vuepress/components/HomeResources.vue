<template>
  <div class="home-res-v5-wrapper">
    <section v-for="(section, sIndex) in resourcesData" :key="sIndex" class="home-res-v5-section">
      <div class="home-res-v5-container">
        <div class="home-res-v5-header">
          <div class="home-res-v5-title-wrap">
            <h2 class="home-res-v5-title">{{ section.title }}</h2>
          </div>
          <span @click="openLink(section.link)" class="home-res-v5-more">查看更多 &rarr;</span>
        </div>

        <div v-for="(category, cIndex) in section.categories.slice(0, 2)" :key="cIndex" class="home-res-v5-category">
          <h3 class="home-res-v5-subtitle">{{ category.name }}</h3>
          <div class="home-res-v5-grid">
            <div v-for="(item, iIndex) in category.items.slice(0, 4)" :key="iIndex" @click="openLink(item.link)"
              class="home-res-v5-card">
              <div class="home-res-v5-card-top">
                <div class="home-res-v5-icon">
                  <img v-if="item.icon" :src="item.icon" :alt="item.name" class="home-res-v5-img">
                  <span v-else class="home-res-v5-text-icon">{{ item.name.charAt(0).toUpperCase() }}</span>
                </div>
                <span class="home-res-v5-name">{{ item.name }}</span>
              </div>
              <div class="home-res-v5-desc">{{ item.desc }}</div>
            </div>
          </div>
        </div>

        <div class="home-res-v5-footer">
          <span @click="openLink(section.link)" class="home-res-v5-btn">查看更多{{ section.title }} &rarr;</span>
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

const openLink = (url) => {
  if (url) {
    if (url.startsWith('/') && !url.startsWith('//')) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }
};
</script>

<style lang="scss" scoped>
/* 越狱容器 */
.home-res-v5-wrapper {
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  background: transparent;
}

.home-res-v5-section {
  width: 100%;
  padding: 2.5rem 0;
}

.home-res-v5-section:nth-child(even) {
  background-color: #f8f9fa;
}

.home-res-v5-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 头部 */
.home-res-v5-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 10px;
  margin-bottom: 2rem;
}

.home-res-v5-title-wrap {
  position: relative;
}

.home-res-v5-title {
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0;
  color: #1e293b;
  padding-bottom: 14px;
  border: none;
}

.home-res-v5-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 44px;
  height: 4px;
  background: #3eaf7c;
  border-radius: 2px;
}

.home-res-v5-more {
  font-size: 0.95rem;
  color: #3eaf7c;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
}

.home-res-v5-more:hover {
  opacity: 0.8;
}

/* 分类 */
.home-res-v5-category {
  margin-bottom: 2rem;
}

.home-res-v5-subtitle {
  font-size: 0.95rem;
  font-weight: 700;
  color: #334155;
  margin: 0 0 1rem 0;
  border: none;
  display: flex;
  align-items: center;
  line-height: 1.3;
  padding: 0.4rem 0;
}

.home-res-v5-subtitle::before {
  content: '';
  display: inline-block;
  width: 5px;
  height: 5px;
  background-color: #3eaf7c;
  border-radius: 50%;
  margin-right: 8px;
}

/* 网格 */
.home-res-v5-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (max-width: 1024px) {
  .home-res-v5-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .home-res-v5-grid {
    grid-template-columns: 1fr;
  }
}

/* 卡片 */
.home-res-v5-card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.home-res-v5-card:hover {
  transform: translateY(-4px);
  border-color: #3eaf7c;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(62, 175, 124, 0.1);
}

.home-res-v5-card-top {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.home-res-v5-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  background: transparent;
}

.home-res-v5-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.home-res-v5-text-icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 800;
  color: #64748b;
  background: #f8f9fa;
  border-radius: 8px;
}

.home-res-v5-name {
  flex: 1;
  font-size: 1.05rem;
  font-weight: 700;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.home-res-v5-desc {
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 底部按钮 */
.home-res-v5-footer {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.home-res-v5-btn {
  display: inline-block;
  padding: 10px 32px;
  background: #3eaf7c;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.home-res-v5-btn:hover {
  background: #33a06f;
  transform: translateY(-1px);
}

/* 暗黑模式 - 双重选择器 + !important */
html[data-theme='dark'] .home-res-v5-section:nth-child(even),
html.dark .home-res-v5-section:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.02) !important;
}

html[data-theme='dark'] .home-res-v5-header,
html.dark .home-res-v5-header {
  border-bottom-color: rgba(255, 255, 255, 0.15) !important;
}

html[data-theme='dark'] .home-res-v5-title,
html.dark .home-res-v5-title {
  color: #f8f9fa !important;
}

html[data-theme='dark'] .home-res-v5-title::after,
html.dark .home-res-v5-title::after {
  background: #4ade80 !important;
}

html[data-theme='dark'] .home-res-v5-more,
html.dark .home-res-v5-more {
  color: #4ade80 !important;
}

html[data-theme='dark'] .home-res-v5-subtitle,
html.dark .home-res-v5-subtitle {
  color: #e2e8f0 !important;
}

html[data-theme='dark'] .home-res-v5-subtitle::before,
html.dark .home-res-v5-subtitle::before {
  background-color: #4ade80 !important;
}

html[data-theme='dark'] .home-res-v5-card,
html.dark .home-res-v5-card {
  background: rgba(255, 255, 255, 0.06) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4) !important;
}

html[data-theme='dark'] .home-res-v5-card:hover,
html.dark .home-res-v5-card:hover {
  background: rgba(255, 255, 255, 0.09) !important;
  border-color: #4ade80 !important;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(74, 222, 128, 0.3) !important;
}

html[data-theme='dark'] .home-res-v5-name,
html.dark .home-res-v5-name {
  color: #f1f5f9 !important;
}

html[data-theme='dark'] .home-res-v5-desc,
html.dark .home-res-v5-desc {
  color: #cbd5e1 !important;
}

html[data-theme='dark'] .home-res-v5-text-icon,
html.dark .home-res-v5-text-icon {
  background: rgba(255, 255, 255, 0.08) !important;
  color: #e2e8f0 !important;
}

html[data-theme='dark'] .home-res-v5-btn,
html.dark .home-res-v5-btn {
  background: #4ade80 !important;
  color: #0f172a !important;
}

html[data-theme='dark'] .home-res-v5-btn:hover,
html.dark .home-res-v5-btn:hover {
  background: #22c55e !important;
}
</style>
