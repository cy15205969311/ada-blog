<template>
  <div class="v4-platform-wrapper">
    <!-- 幽灵垫片：动态计算导航栏高度 + 呼吸感 -->
    <div class="v4-navbar-spacer"></div>

    <div class="v4-content-island">
      <!-- 动态面包屑导航 -->
      <Breadcrumb />

      <!-- 顶部标题区域（紧凑版） -->
      <div class="v4-section-header v4-tight-header">
        <div class="v4-title-wrap">
          <h1 class="v4-main-title v4-fitted-title">新媒体运营</h1>
        </div>
      </div>
      <p class="v4-section-desc">收录常用的AI创作工具、运营辅助平台和数据分析工具，方便快速查阅。</p>

      <!-- 分类卡片区域 -->
      <div v-for="category in mediaData" :key="category.category" class="category-block">
        <div class="category-title">
          {{ category.category }}
          <span class="category-count">{{ category.items.length }}</span>
        </div>
        <div class="card-grid">
          <div v-for="item in category.items" :key="item.title" @click="openLink(item.link)" class="tech-card">
            <div class="card-header">
              <img v-if="item.icon" :src="item.icon" class="native-logo" alt="logo" />
              <div class="title">{{ item.title }}</div>
            </div>
            <div class="desc">{{ item.desc }}</div>
            <!-- 右上角外链图标 -->
            <div class="external-link-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter :items="getAllItems()" />
    </div>
  </div>
</template>

<script setup>
import { mediaData } from '../data/mediaData.js';

// 使用纯 JS 处理跳转
const openLink = (url) => {
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

// 获取所有项目用于页脚跑马灯
const getAllItems = () => {
  const allItems = [];
  mediaData.forEach(category => {
    allItems.push(...category.items);
  });
  return allItems;
};
</script>

<style lang="scss" scoped>
/* ==========================================
   V4 全局容器宽度接管与安全区修复
========================================== */
:global(.theme-default-content:has(.v4-platform-wrapper)) {
  max-width: 100vw !important;
  padding: 0 !important;
  margin: 0 !important;
}

.v4-platform-wrapper {
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  background: transparent;
}

/* 核心杀招：幽灵垫片，动态计算导航栏高度并加上额外的留白 */
.v4-navbar-spacer {
  width: 100%;
  height: calc(var(--navbar-height, 3.6rem) + 2rem) !important;
  display: block;
}

.v4-content-island {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 3rem;
}

/* ==========================================
   微调后：面包屑与大标题的黄金呼吸距
========================================== */

.v4-navbar-spacer {
  width: 100%;
  height: calc(var(--navbar-height, 3.6rem) + 1.2rem) !important;
  display: block;
}

.v4-tight-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 0 !important;
  border-bottom: 1px solid var(--c-border-soft, #f1f3f5);
  padding-bottom: 4px !important;
  margin-bottom: 1.5rem !important;
}

.v4-title-wrap {
  position: relative;
}

.v4-fitted-title {
  font-size: 1.6rem !important;
  font-weight: 800 !important;
  margin: 0 !important;
  color: #1e293b !important;
  border: none !important;
  line-height: 1.3 !important;
  padding-top: 4px !important;
  padding-bottom: 12px !important;
}

.v4-fitted-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 36px;
  height: 4px;
  background: #3eaf7c;
  border-radius: 2px;
}

.v4-section-desc {
  font-size: 0.95rem;
  color: #64748b;
  margin-bottom: 3rem !important;
  line-height: 1.6;
  transition: color 0.3s;
}

/* --- 暗黑模式终极适配 --- */
:global(html.dark) .v4-crumb-current,
:global(html.dark) .v4-section-desc {
  color: #94a3b8 !important;
}

:global(html.dark) .v4-crumb-separator {
  color: #475569 !important;
}

/* 核心修复：精准狙击 v4-fitted-title，强制在暗黑模式下反转为纯白 */
:global(html.dark) .v4-main-title,
:global(html.dark) .v4-fitted-title,
:global(html[data-theme='dark']) .v4-fitted-title {
  color: #f8f9fa !important;
}

:global(html.dark) .v4-tight-header {
  border-bottom-color: rgba(255, 255, 255, 0.08) !important;
}

/* ==========================================
   子分类大模块间距调整（解决红框拥挤问题）
========================================== */
.category-block {
  /* 将底部间距大幅拉开，提供两个大模块之间的视觉缓冲 (建议 3.5rem 到 4.5rem) */
  margin-bottom: 4rem !important;
}

/* 细节优化：最后一个分类不需要底部间距，避免撑大整个页面的底部留白 */
.category-block:last-child {
  margin-bottom: 1rem !important;
}

/* 顺便微调一下小标题和下方卡片网格的间距（让标题和自己的卡片稍微贴紧一点，显得更有关联性） */
.category-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--c-text);
  margin-bottom: 1.2rem !important;
  padding-left: 10px;
  border-left: 4px solid #3eaf7c;
  line-height: 1.2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 8px;
  background: #3eaf7c;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 12px;
  line-height: 1;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

/* --- 修复一：卡片容器全面拥抱自适应变量 --- */
.tech-card {
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
  padding: 1.5rem !important;
  background: var(--c-bg-light) !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  border-radius: 8px !important;
  text-decoration: none !important;
  transition: all 0.2s ease !important;
  box-sizing: border-box !important;
  min-height: 120px !important;
  position: relative !important;
  cursor: pointer !important;

  &:hover {
    border-color: #3eaf7c !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
    transform: translateY(-2px) !important;

    .external-link-icon {
      opacity: 1 !important;
    }
  }
}

/* --- 右上角外链图标 --- */
.external-link-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0;
  transition: opacity 0.2s ease;
  color: #3eaf7c;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  svg {
    width: 16px;
    height: 16px;
  }
}

.card-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.native-logo {
  width: 24px;
  height: 24px;
  object-fit: contain;
  flex-shrink: 0;
  border-radius: 0;
  background: transparent;
}

/* --- 修复二：文字颜色解除硬编码 --- */
.title {
  font-size: 1.05rem !important;
  font-weight: 600 !important;
  color: var(--c-text) !important;
  margin: 0 !important;
  line-height: 1 !important;
  display: block !important;
}

.desc {
  font-size: 0.85rem !important;
  color: var(--c-text-light) !important;
  margin: 0 !important;
  line-height: 1.5 !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
}

/* --- 终极质感：暗黑模式专属微调 (兼容 VuePress 2) --- */
html[data-theme='dark'] .tech-card,
html.dark .tech-card {
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  background: rgba(255, 255, 255, 0.04) !important;

  &:hover {
    border-color: #3eaf7c !important;
    background: rgba(255, 255, 255, 0.07) !important;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6) !important;
  }
}
</style>

<style>
html.dark .v4-main-title,
html.dark .v4-fitted-title,
html[data-theme='dark'] .v4-fitted-title {
  color: #f8f9fa !important;
}

html.dark .v4-tight-header,
html[data-theme='dark'] .v4-tight-header {
  border-bottom-color: rgba(255, 255, 255, 0.08) !important;
}

/* 确保描述文字也完美反转 */
html.dark .v4-section-desc,
html[data-theme='dark'] .v4-section-desc {
  color: #94a3b8 !important;
}
</style>
