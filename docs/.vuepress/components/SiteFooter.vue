<template>
  <footer class="site-footer-wrapper">
    <!-- 跑马灯区域 -->
    <div class="marquee-container">
      <div class="marquee-content">
        <div class="marquee-item" v-for="i in 2" :key="i">
          <template v-if="items && items.length > 0">
            <template v-for="(item, index) in items" :key="`item-${i}-${index}`">
              <span>{{ item.title }}</span>
              <span class="sparkle">✦</span>
            </template>
          </template>
          <template v-else>
            <span>Vue 3</span> <span class="sparkle">✦</span>
            <span>Vite</span> <span class="sparkle">✦</span>
            <span>TypeScript</span> <span class="sparkle">✦</span>
            <span>Shadcn UI</span> <span class="sparkle">✦</span>
            <span>Magic UI</span> <span class="sparkle">✦</span>
            <span>Tailwind CSS</span> <span class="sparkle">✦</span>
            <span>VuePress</span> <span class="sparkle">✦</span>
          </template>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 接收外部传入的数据
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
});
</script>

<style lang="scss" scoped>
/* 越狱全宽外层 */
.site-footer-wrapper {
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 6rem;
  background: var(--c-bg-light);
  border-top: 1px solid var(--c-border);
  overflow: hidden;
}

/* --- 极其精致的轨道容器 --- */
.marquee-container {
  width: 100%;
  padding: 1.5rem 0;
  display: flex;
  overflow: hidden;
  user-select: none;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.015);
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
  font-size: 1.05rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  white-space: nowrap;
  transition: color 0.3s ease;

  &:hover {
    color: #475569;
  }

  .sparkle {
    font-size: 1rem;
    font-weight: 400;
    color: #3eaf7c;
    opacity: 0.8;
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
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-left p,
.footer-right p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--c-text-lighter);
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
