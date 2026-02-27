<template>
  <div class="ada-hero-wrapper">
    <div class="hero-sky-bg"></div>
    <div class="yellow-sun"></div>
    <div class="abstract-shapes">
      <div class="shape triangle-1"></div>
      <div class="shape triangle-2"></div>
      <div class="shape triangle-3"></div>
    </div>
    <div class="hero-content">
      <h1 class="main-title">
        <div class="line1">Ada's on a journey to find </div>
        <div class="line2"><span class="highlight">The Tech World</span> </div>
      </h1>
      <p class="sub-title">Follow her as she goes on the hunt for creative ideas and turns all her wonderful ideas into
        reality.</p>
    </div>
    <div class="scroll-indicator">
      <div class="mouse-icon"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';

let navEl = null;

const handleScroll = () => {
  if (!navEl) return;

  if (window.scrollY > 50) {
    // 滚下去时：清洗内联样式，交还给 CSS 毛玻璃控制
    navEl.style.removeProperty('background');
    navEl.style.removeProperty('background-color');
    navEl.style.removeProperty('box-shadow');
    navEl.style.removeProperty('border-bottom');
    navEl.style.removeProperty('backdrop-filter');
    navEl.style.removeProperty('-webkit-backdrop-filter');
    navEl.classList.add('is-nav-frosted'); // 挂载毛玻璃类名
  } else {
    // 在顶部时：使用 !important 内联样式暴力透明，无视任何优先级
    navEl.style.setProperty('background', 'transparent', 'important');
    navEl.style.setProperty('background-color', 'transparent', 'important');
    navEl.style.setProperty('box-shadow', 'none', 'important');
    navEl.style.setProperty('border-bottom', 'none', 'important');
    navEl.style.setProperty('backdrop-filter', 'none', 'important');
    navEl.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
    navEl.classList.remove('is-nav-frosted');
  }
};

onMounted(() => {
  nextTick(() => {
    // 广撒网：兼容 VuePress 2 各种版本的导航栏类名和标签
    navEl = document.querySelector('header.vp-navbar') ||
      document.querySelector('header.navbar') ||
      document.querySelector('.navbar');

    if (navEl) {
      navEl.style.setProperty('transition', 'all 0.4s ease', 'important');
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // 立刻执行一次，消灭白边
    }
  });
});

onUnmounted(() => {
  if (navEl) {
    window.removeEventListener('scroll', handleScroll);
    // 离开首页时彻底打扫战场，恢复原样
    navEl.style.removeProperty('background');
    navEl.style.removeProperty('background-color');
    navEl.style.removeProperty('box-shadow');
    navEl.style.removeProperty('border-bottom');
    navEl.style.removeProperty('backdrop-filter');
    navEl.style.removeProperty('-webkit-backdrop-filter');
    navEl.style.removeProperty('transition');
    navEl.classList.remove('is-nav-frosted');
  }
});
</script>

<style lang="scss" scoped>
/* 越狱容器，占满首屏 */
.ada-hero-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  min-height: 700px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 终极杀招：极其夸张的负边距，绝对确保背景顶到浏览器最上沿 */
  margin-top: -6rem !important;
  /* 把内部内容推回正常位置，防止文字被导航栏遮挡 */
  padding-top: 6rem !important;
}

/* 蓝灰过渡到暖白的柔和天空 */
.hero-sky-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(170deg, #4b8093 0%, #6f9ca7 45%, #d1dbd4 100%);
  z-index: 1;
}

/* 标志性的黄色太阳 */
.yellow-sun {
  position: absolute;
  top: 15%;
  right: 15%;
  width: 160px;
  height: 160px;
  background-color: #d1b028;
  /* 姜黄色 */
  border-radius: 50%;
  z-index: 2;
  /* 微微的发光感 */
  box-shadow: 0 0 60px rgba(209, 176, 40, 0.4);
}

/* 底部抽象几何山影 (用 CSS 伪造图2底部的模糊形状) */
.abstract-shapes {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  z-index: 3;
  opacity: 0.15;
  pointer-events: none;

  .shape {
    position: absolute;
    bottom: -10px;
    width: 0;
    height: 0;
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    border-bottom: 150px solid #2c4a52;
  }

  .triangle-1 {
    left: 10%;
    transform: scale(1.2);
  }

  .triangle-2 {
    left: 40%;
    transform: scale(0.8);
    border-bottom-color: #4b8093;
  }

  .triangle-3 {
    left: 75%;
    transform: scale(1.5);
  }
}

/* 文本排版 */
.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  color: #ffffff;
  margin-top: -5vh;
  /* 微微偏上，避开视觉中心 */
}

.main-title {
  font-size: 4rem !important;
  font-weight: 900 !important;
  line-height: 1.2 !important;
  margin: 0 0 1.5rem 0 !important;
  letter-spacing: 2px !important;
  border: none !important;
  /* 清除默认 H1 底边框 */
  /* 极其重要：弥散阴影让文字在浅色背景上跳脱出来 */
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  .line1 {
    margin-bottom: 5px;
  }

  .highlight {
    /* 标志性的亮绿色 */
    color: #42f593;
    text-shadow: 0 0 40px rgba(66, 245, 147, 0.5), 0 5px 20px rgba(0, 0, 0, 0.3);
  }
}

.sub-title {
  font-size: 1.15rem !important;
  font-weight: 400 !important;
  color: rgba(255, 255, 255, 0.9) !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
  max-width: 600px;
  margin: 0 auto !important;
}

/* 底部滚动鼠标指示器 */
.scroll-indicator {
  position: absolute;
  bottom: 6%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  .mouse-icon {
    width: 26px;
    height: 42px;
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 6px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 8px;
      background: #ffffff;
      border-radius: 2px;
      animation: mouse-scroll 1.5s cubic-bezier(0.15, 0.41, 0.69, 0.94) infinite;
    }
  }
}

@keyframes mouse-scroll {
  0% {
    transform: translate(-50%, 0);
    opacity: 1;
  }

  100% {
    transform: translate(-50%, 15px);
    opacity: 0;
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .main-title {
    font-size: 2.8rem !important;
  }

  .yellow-sun {
    width: 100px;
    height: 100px;
    top: 10%;
    right: 10%;
  }
}
</style>
