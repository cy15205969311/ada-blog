<template>
  <div class="tech-breakout-wrapper">
    <div class="tech-inner-container">
      <div v-for="category in techData" :key="category.category" class="category-block">
        <div class="category-title">{{ category.category }}</div>
        <div class="card-grid">
          <div v-for="item in category.items" :key="item.title" @click="openLink(item.link)" class="tech-card">
            <div class="card-header">
              <img v-if="item.icon" :src="item.icon" class="native-logo" alt="logo" />
              <div class="title">{{ item.title }}</div>
            </div>
            <div class="desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
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
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.category-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--c-text);
  margin-bottom: 1.25rem;
  padding-left: 10px;
  border-left: 4px solid #3eaf7c;
  line-height: 1.2;
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

/* --- 纯净的卡片样式 --- */
.tech-card {
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  background: var(--c-bg-light);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  cursor: pointer;
  /* 补充指针样式 */
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    border-color: #3eaf7c;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
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

.title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--c-text);
  line-height: 1;
}

.desc {
  font-size: 0.85rem;
  color: var(--c-text-light);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
