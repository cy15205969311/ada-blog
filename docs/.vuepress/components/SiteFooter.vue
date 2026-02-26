<template>
  <footer class="site-footer-wrapper">
    <!-- 跑马灯区域 -->
    <div class="marquee-container">
      <div class="marquee-content">
        <div class="marquee-item" v-for="i in 2" :key="i">
          <span>Vue 3</span> <span class="sparkle">✦</span>
          <span>Vite</span> <span class="sparkle">✦</span>
          <span>TypeScript</span> <span class="sparkle">✦</span>
          <span>Shadcn UI</span> <span class="sparkle">✦</span>
          <span>Magic UI</span> <span class="sparkle">✦</span>
          <span>Tailwind CSS</span> <span class="sparkle">✦</span>
          <span>VuePress</span> <span class="sparkle">✦</span>
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

/* --- 极其精致的轨道容器 --- */
.marquee-container {
  width: 100%;
  padding: 1.5rem 0;
  /* 关键：大幅收缩上下内边距，从巨大横幅变成精致字条 */
  display: flex;
  overflow: hidden;
  user-select: none;
  /* 增强物理轨道感：加深边框，加入极浅的对比背景色 */
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.015);
  /* 保持两端高级渐隐 */
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}

.marquee-content {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-around;
  min-width: 100%;
  gap: 2.5rem;
  /* 收紧间距配合小字号 */
  animation: scrollX 30s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
}

/* --- 锐利的岩灰文字与品牌星芒 --- */
.marquee-item {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  /* 关键：大幅缩小字号，回归高级感 */
  font-size: 1.05rem;
  font-weight: 700;
  /* 关键修复：明亮模式下的极简岩灰色 (Slate 400) */
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  white-space: nowrap;
  transition: color 0.3s ease;

  /* 悬浮时字体变深 (Slate 600)，增加对比度 */
  &:hover {
    color: #475569;
  }

  /* 精致的星芒点缀 */
  .sparkle {
    font-size: 1rem;
    font-weight: 400;
    color: #3eaf7c;
    /* 品牌绿 */
    opacity: 0.8;
    /* 提高可见度 */
    transition: transform 0.4s ease, filter 0.4s ease;
  }

  &:hover .sparkle {
    transform: rotate(45deg) scale(1.1);
    filter: brightness(1.1);
  }
}

/* 核心滚动动画关键帧 */
@keyframes scrollX {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-100% - 2.5rem));
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
    font-size: 0.9rem;
    gap: 2rem;
  }
}
</style>
