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
          <h1 class="v4-main-title v4-fitted-title">跨境电商</h1>
        </div>
      </div>
      <p class="v4-section-desc">收录跨境电商必备的浏览器插件、ERP系统、选品工具和货源平台。</p>

      <!-- 搜索框 -->
      <div class="v4-search-wrapper">
        <div class="v4-search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" class="v4-search-icon">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input v-model="searchQuery" type="text" class="v4-search-input" placeholder="输入关键字搜索资源或描述..." />
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredCategories.length === 0" class="v4-empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
          stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        <p>未找到与 "<span>{{ searchQuery }}</span>" 相关的资源</p>
      </div>

      <!-- 分类卡片区域 -->
      <div v-for="category in filteredCategories" :key="category.category" class="category-block">
        <div class="category-title">
          {{ category.category }}
          <span class="category-count">{{ category.items.length }}</span>
        </div>
        <div class="card-grid">
          <div v-for="(item, iIndex) in category.items" :key="item.title" @click="openLink(item.link)" class="tech-card"
            v-motion :initial="{ opacity: 0, y: 30 }" :visibleOnce="{
              opacity: 1,
              y: 0,
              transition: {
                type: 'spring',
                stiffness: 250,
                damping: 25,
                mass: 1,
                delay: iIndex * 120
              }
            }">
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
import { ref, computed } from 'vue';
import { ecommerceData } from '../data/ecommerceData.js';

// 搜索关键词绑定
const searchQuery = ref('');

// 智能过滤计算属性
const filteredCategories = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();

  // 如果搜索框为空，直接返回原始数据
  if (!query) return ecommerceData;

  return ecommerceData.map(category => {
    return {
      ...category,
      // 双重匹配：只要名称或描述中包含搜索词，就保留该卡片
      items: category.items.filter(item => {
        const matchTitle = item.title && item.title.toLowerCase().includes(query);
        const matchDesc = item.desc && item.desc.toLowerCase().includes(query);
        return matchTitle || matchDesc;
      })
    };
  }).filter(category => category.items.length > 0);
});

// 使用纯 JS 处理跳转
const openLink = (url) => {
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

// 获取所有项目用于页脚跑马灯
const getAllItems = () => {
  const allItems = [];
  ecommerceData.forEach(category => {
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

/* --- 描述文本间距回调 --- */
.v4-section-desc {
  font-size: 0.95rem;
  color: #64748b;
  /* 核心修改：将底部间距从 3rem 缩减到 1.5rem，让它与搜索框产生"亲密感" */
  margin-bottom: 1.5rem !important;
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
  /* 剥夺 CSS 对 transform 和 opacity 的控制权，全权交给 JS 动效引擎，仅保留色彩相关的过渡 */
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
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

/* ==========================================
/* ==========================================
   搜索框组件：极简文档风 (对齐图2标准)
========================================== */
.v4-search-wrapper {
  /* 核心优化：大幅缩小紫色的上下占位空间 */
  margin-top: 1.2rem !important;
  margin-bottom: 2rem !important;
  display: flex !important;
  justify-content: flex-start !important;
  /* 确保靠左对齐 */
  width: 100%;
}

.v4-search-box {
  position: relative;
  width: 100%;
  max-width: 420px !important;
  /* 桌面端黄金宽度 */
}

.v4-search-input {
  width: 100% !important;
  height: 42px !important;
  /* 极简纤细高度 */
  padding: 0 16px 0 38px !important;
  /* 完美的文本内边距 */
  font-size: 0.95rem !important;
  border: 1px solid var(--c-border-soft, #e2e8f0) !important;
  border-radius: 6px !important;
  /* 收敛圆角，增强严谨感 */
  background-color: transparent !important;
  box-shadow: none !important;
  /* 彻底移除阴影，实现绝对扁平 */
  color: #1e293b !important;
  transition: all 0.2s ease !important;
  outline: none;
}

.v4-search-input::placeholder {
  color: #94a3b8;
}

.v4-search-input:focus {
  border-color: #3eaf7c !important;
  box-shadow: 0 0 0 2px rgba(62, 175, 124, 0.1) !important;
  /* 极其微弱的聚焦光环 */
}

.v4-search-icon {
  position: absolute;
  left: 14px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  width: 16px !important;
  /* 缩小图标尺寸 */
  height: 16px !important;
  color: #94a3b8 !important;
  transition: color 0.2s ease;
}

.v4-search-box:focus-within .v4-search-icon {
  color: #3eaf7c !important;
}

.v4-empty-state {
  text-align: center;
  padding: 4rem 1rem;
  color: #64748b;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px dashed #e2e8f0;
  margin-bottom: 4rem;
}

.v4-empty-state svg {
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
  color: #cbd5e1;
}

.v4-empty-state p {
  font-size: 1rem;
  margin: 0;
}

.v4-empty-state span {
  color: #3eaf7c;
  font-weight: 600;
}

:global(html.dark) .v4-search-input,
:global(html[data-theme='dark']) .v4-search-input {
  background-color: rgba(255, 255, 255, 0.05) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
  color: #f8f9fa !important;
}

:global(html.dark) .v4-search-input:focus,
:global(html[data-theme='dark']) .v4-search-input:focus {
  border-color: #4ade80 !important;
  background-color: rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.15) !important;
}

:global(html.dark) .v4-empty-state,
:global(html[data-theme='dark']) .v4-empty-state {
  background: rgba(255, 255, 255, 0.02);
  border-color: rgba(255, 255, 255, 0.08);
  color: #94a3b8;
}

/* ==========================================
   移动端 (手机) 物理边界与安全区强制修复
========================================== */
@media (max-width: 768px) {

  /* 强制恢复左右 20px 的安全区，防止内容贴死屏幕边缘 */
  .v4-content-island {
    padding-left: 20px !important;
    padding-right: 20px !important;
    box-sizing: border-box !important;
    width: 100% !important;
    overflow-x: hidden !important;
    /* 掐断由内边距撑开导致的横向滚动条 */
  }

  /* 移动端面包屑字体微缩，防止过长换行 */
  .v4-breadcrumb-nav {
    font-size: 0.85rem !important;
  }

  /* 移动端搜索框响应式覆盖 */
  .v4-search-wrapper {
    margin-top: 1rem !important;
    margin-bottom: 1.8rem !important;
  }

  .v4-search-box {
    max-width: 85% !important;
    /* 移动端全宽铺满 */
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

/* ==========================================
   面包屑暗黑模式高亮提纯
========================================== */
html.dark .v4-crumb-link,
html[data-theme='dark'] .v4-crumb-link {
  color: #4ade80 !important;
  /* 稍微提亮品牌绿，使其在黑底上更通透 */
}

html.dark .v4-crumb-separator,
html[data-theme='dark'] .v4-crumb-separator {
  color: #64748b !important;
  /* 适中的柔和灰，不抢戏但清晰可见 */
}

html.dark .v4-crumb-current,
html[data-theme='dark'] .v4-crumb-current {
  color: #e2e8f0 !important;
  /* 高亮冷白灰，彻底告别暗沉，确保极佳阅读性 */
}

/* ==========================================
   终极暴力覆盖：全站暗黑背景色强制统一为 #121828
========================================== */
html.dark body,
html[data-theme='dark'] body,
html.dark .navbar,
html[data-theme='dark'] .navbar,
html.dark .sidebar,
html[data-theme='dark'] .sidebar,
html.dark .page,
html[data-theme='dark'] .page {
  background-color: #121828 !important;
  --c-bg: #121828 !important;
}

/* 导航栏底部边框融入暗色 */
html.dark .navbar,
html[data-theme='dark'] .navbar {
  border-bottom-color: rgba(255, 255, 255, 0.05) !important;
}

/* 确保页面最外层包裹器透明，露出 body 的深空蓝灰 */
html.dark .theme-container,
html[data-theme='dark'] .theme-container {
  background: transparent !important;
}

/* ==========================================
   搜索框与缺省页：暗黑模式终极强制适配
========================================== */
html.dark .v4-search-input,
html[data-theme='dark'] .v4-search-input {
  background-color: rgba(255, 255, 255, 0.05) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
  color: #f8f9fa !important;
}

/* 搜索框聚焦状态下的绿色光晕 */
html.dark .v4-search-input:focus,
html[data-theme='dark'] .v4-search-input:focus {
  border-color: #4ade80 !important;
  background-color: rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.15) !important;
}

/* 搜索图标在暗黑下的柔和灰 */
html.dark .v4-search-icon,
html[data-theme='dark'] .v4-search-icon {
  color: #64748b !important;
}

html.dark .v4-search-box:focus-within .v4-search-icon,
html[data-theme='dark'] .v4-search-box:focus-within .v4-search-icon {
  color: #4ade80 !important;
}

/* 搜索无结果时的空状态盒子暗黑化 */
html.dark .v4-empty-state,
html[data-theme='dark'] .v4-empty-state {
  background-color: rgba(255, 255, 255, 0.02) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
  color: #94a3b8 !important;
}

html.dark .v4-empty-state svg,
html[data-theme='dark'] .v4-empty-state svg {
  color: #475569 !important;
}
</style>
