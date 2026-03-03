<template>
  <div class="hero-particles-container">
    <div class="star-field">
      <span v-for="star in stars" :key="star.id" class="star" :style="star.style"></span>
    </div>
    <div class="meteor-effect">
      <span v-for="meteor in meteors" :key="meteor.id" class="meteor" :style="meteor.style"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const stars = ref([]);
const meteors = ref([]);

onMounted(() => {
  if (typeof window === 'undefined') return;

  // 1. 生成 60 颗星星
  const generatedStars = [];
  for (let i = 0; i < 60; i++) {
    const size = 2 + Math.random() * 2;
    generatedStars.push({
      id: `star-${i}`,
      style: {
        width: `${size}px`,
        height: `${size}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${2 + Math.random() * 3}s`,
        animationDelay: `${Math.random() * 5}s`
      }
    });
  }
  stars.value = generatedStars;

  // 2. 生成 20 颗流星
  const generatedMeteors = [];
  for (let i = 0; i < 20; i++) {
    generatedMeteors.push({
      id: `meteor-${i}`,
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${2 + Math.random() * 8}s`,
        animationDelay: `${0.2 + Math.random() * 10}s`
      }
    });
  }
  meteors.value = generatedMeteors;

  // 3. 强化挂载雷达（解决异步渲染问题）
  let attempts = 0;
  const mountTimer = setInterval(() => {
    // 兼容各类 VuePress 主题的 Hero 容器
    const heroSection = document.querySelector('.vp-hero, .home-hero, .hero, .vp-home-hero, .VPHero');
    const container = document.querySelector('.hero-particles-container');

    if (heroSection && container) {
      clearInterval(mountTimer); // 找到后停止轮询

      heroSection.style.position = 'relative';
      heroSection.style.overflow = 'hidden';

      // 寻找并压制主题自带的背景图层
      const bgLayer = heroSection.querySelector('.vp-hero-image, .vp-hero-bg, .hero-bg, .hero-mask');
      if (bgLayer) bgLayer.style.zIndex = '0';

      // 将粒子层插入并设定绝对层级
      heroSection.insertBefore(container, heroSection.firstChild);

      // 提升文字与按钮的层级
      Array.from(heroSection.children).forEach(child => {
        if (child !== container && child !== bgLayer) {
          child.style.position = 'relative';
          child.style.zIndex = '10';
        }
      });
    }

    attempts++;
    if (attempts > 50) clearInterval(mountTimer); // 防死循环
  }, 100);
});
</script>

<style>
/* 容器绝对定位，最高权重穿透 */
.hero-particles-container {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 2 !important;
  /* 压在背景图(0)之上，文字(10)之下 */
  pointer-events: none !important;
  overflow: hidden !important;
}

/* 颜色变量 */
.hero-particles-container {
  --particle-color: #94a3b8;
  /* 白天模式：更深一点的灰色以确保可见度 */
  --meteor-tail: rgba(148, 163, 184, 0);
}

html.dark .hero-particles-container,
html[data-theme='dark'] .hero-particles-container,
[data-theme='dark'] .hero-particles-container {
  --particle-color: #ffffff;
  /* 暗黑模式：纯白色 */
  --meteor-tail: rgba(255, 255, 255, 0);
}

/* 繁星样式与动画 */
.hero-particles-container .star {
  position: absolute;
  background-color: var(--particle-color) !important;
  border-radius: 50%;
  opacity: 0;
  animation: twinkle linear infinite;
}

@keyframes twinkle {

  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.8);
  }

  50% {
    opacity: 1;
    transform: scale(1.5);
    box-shadow: 0 0 6px var(--particle-color);
  }
}

/* 流星样式与动画 */
.hero-particles-container .meteor {
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: var(--particle-color) !important;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2), 0 0 15px var(--particle-color) !important;
  transform: rotate(215deg);
  opacity: 0;
  animation: meteor linear infinite;
}

/* 流星尾巴 */
.hero-particles-container .meteor::before {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 200px !important;
  /* 尾巴加长 */
  height: 1px;
  background: linear-gradient(90deg, var(--particle-color), var(--meteor-tail)) !important;
}

@keyframes meteor {
  0% {
    opacity: 1;
    transform: rotate(215deg) translateX(0);
  }

  70% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: rotate(215deg) translateX(-1500px);
  }
}
</style>
