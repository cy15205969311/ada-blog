<template>
  <div class="tech-breakout-wrapper">
    <div class="tech-inner-container">
      <!-- 顶部标题区域 -->
      <div class="page-header">
        <h1 class="page-title">计算机技术</h1>
        <hr>
        <p class="page-desc">收录常用的技术框架、组件库和开发工具，方便快速查阅。</p>
      </div>

      <!-- 分类卡片区域 -->
      <div v-for="category in techData" :key="category.category" class="category-block">
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
      <SiteFooter />

    </div>
  </div>
</template>

<script setup>
import { techData } from '../data/techData.js';

// 使用纯 JS 处理跳转，彻底切断 VuePress 自动插入箭头的机制
const openLink = (url) => {
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};
</script>

<style lang="scss" scoped>
/* --- 越狱结构保持不变 --- */
.tech-breakout-wrapper {
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  background: transparent;
}

.tech-inner-container {
  width: 100%;
  max-width: 1200px;
  padding: 0rem 1rem 2rem 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  // background-color: #3eaf7c;
}

/* --- 顶部标题区域 --- */
.page-header {
  padding: 0 0 1.5rem 0;
  margin-bottom: 0.5rem;
  // background-color: rebeccapurple;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--c-text);
  margin: 0 0 0.5rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--c-border);
  line-height: 1.3;
}

.page-desc {
  font-size: 0.95rem;
  color: var(--c-text-light);
  margin: 1rem 0 0 0;
  line-height: 1.6;
}

.category-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--c-text);
  margin-bottom: 1rem;
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
  /* 关键修复：移除死板的 #ffffff，改用自适应卡片底色 */
  background: var(--c-bg-light) !important;
  /* 关键修复：使用明确的边框颜色，确保明暗模式都可见 */
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
  /* 强制水平 */
  align-items: center;
  /* 垂直居中 */
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
  /* 关键修复：移除死板的 #111827，使用自适应主文本色 */
  color: var(--c-text) !important;
  margin: 0 !important;
  line-height: 1 !important;
  display: block !important;
}

.desc {
  font-size: 0.85rem !important;
  /* 关键修复：移除死板的 #6b7280，使用自适应次级文本色 */
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
/* 双重选择器保险，确保绝对生效 */
html[data-theme='dark'] .tech-card,
html.dark .tech-card {
  /* 关键修复：提高白色透明度至 0.15，让边框在黑夜中清晰可见 */
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  /* 稍微提亮卡片背景，让卡片比底层背景"浮"起来一层 */
  background: rgba(255, 255, 255, 0.04) !important;

  &:hover {
    border-color: #3eaf7c !important;
    /* 保持 Vue 绿高亮 */
    /* 悬浮时背景再微亮一点点，产生交互呼吸感 */
    background: rgba(255, 255, 255, 0.07) !important;
    /* 更深邃的黑色阴影托底 */
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6) !important;
  }
}
</style>
