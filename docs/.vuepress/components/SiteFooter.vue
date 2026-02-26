<template>
  <footer class="site-footer-wrapper">
    <!-- 跑马灯区域 -->
    <div class="marquee-container">
      <div class="marquee-content">
        <div class="marquee-item" v-for="i in 2" :key="i">
          <span>Vue 3</span> <span class="dot">•</span>
          <span>Vite</span> <span class="dot">•</span>
          <span>TypeScript</span> <span class="dot">•</span>
          <span>Shadcn UI</span> <span class="dot">•</span>
          <span>Magic UI</span> <span class="dot">•</span>
          <span>Tailwind CSS</span> <span class="dot">•</span>
          <span>VuePress</span> <span class="dot">•</span>
        </div>
      </div>
    </div>

  </footer>
</template>

<script setup>
// 纯 CSS 动画实现，无需 JS 逻辑
</script>

<style lang="scss" scoped>
/* 越狱全宽外层 */
.site-footer-wrapper {
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 6rem;
  /* 与上方内容拉开距离 */
  background: var(--c-bg-light);
  /* 使用稍微深一点点的底色区分内容区 */
  border-top: 1px solid var(--c-border);
  overflow: hidden;
}

/* --- Magic UI 风格跑马灯 (纯 CSS 实现) --- */
.marquee-container {
  width: 100%;
  padding: 2rem 0;
  display: flex;
  overflow: hidden;
  user-select: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  /* 两侧添加高级的褪晕遮罩，让文字像从虚无中滑出 */
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.marquee-content {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-around;
  min-width: 100%;
  gap: 2rem;
  /* 执行无限滚动动画 */
  animation: scrollX 20s linear infinite;

  &:hover {
    animation-play-state: paused;
    /* 鼠标悬浮时暂停滚动 */
  }
}

.marquee-item {
  display: flex;
  align-items: center;
  gap: 2rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--c-text-light);
  /* 低调的灰色 */
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;

  .dot {
    color: #3eaf7c;
    /* 品牌色点缀 */
  }
}

/* 核心滚动动画关键帧 */
@keyframes scrollX {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-100% - 2rem));
  }
}

/* --- 极简版权区 --- */
.footer-bottom {
  padding: 2rem;
  background: var(--c-bg);
  /* 恢复纯色 */
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  /* 左右两端对齐 */
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-left p,
.footer-right p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--c-text-lighter);
  /* 极度克制的淡灰色 */
  font-weight: 500;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .footer-inner {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .marquee-item {
    font-size: 1rem;
    gap: 1.5rem;
  }
}
</style>
