<template>
  <div class="ada-hero-wrapper" :class="{ 'is-loaded': isLoaded }">
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
import { onMounted, onUnmounted, nextTick, ref } from 'vue';

const isLoaded = ref(false);

const handleScroll = () => {
  const root = document.documentElement;
  if (window.scrollY > 50) {
    root.classList.remove('is-hero-top');
  } else {
    root.classList.add('is-hero-top');
  }
};

onMounted(() => {
  nextTick(() => {
    // 发令枪：等待 50ms 后触发动画
    setTimeout(() => {
      isLoaded.value = true;
    }, 50);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始化
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.documentElement.classList.remove('is-hero-top'); // 离开页面时彻底清理
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
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* --- 暗黑模式：深邃夜空 --- */
html[data-theme='dark'] .hero-sky-bg,
html.dark .hero-sky-bg {
  /* 从白天的清新蓝灰，变成夜晚的深渊蓝紫 */
  background: linear-gradient(170deg, #090e17 0%, #141b2d 45%, #1e293b 100%);
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
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* --- 暗黑模式：化日为月 --- */
html[data-theme='dark'] .yellow-sun,
html.dark .yellow-sun {
  background-color: #e2e8f0;
  /* 清冷的白月光 */
  box-shadow: 0 0 60px rgba(226, 232, 240, 0.3), 0 0 120px rgba(226, 232, 240, 0.1);
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
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  .shape {
    position: absolute;
    bottom: -10px;
    width: 0;
    height: 0;
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    border-bottom: 150px solid #2c4a52;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
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

/* --- 暗黑模式：山影沉入夜色 --- */
html[data-theme='dark'] .abstract-shapes,
html.dark .abstract-shapes {
  opacity: 0.3;
  /* 夜晚剪影更浓点 */
}

html[data-theme='dark'] .abstract-shapes .triangle-1,
html.dark .abstract-shapes .triangle-1 {
  border-bottom-color: #020617;
}

html[data-theme='dark'] .abstract-shapes .triangle-2,
html.dark .abstract-shapes .triangle-2 {
  border-bottom-color: #0f172a;
}

html[data-theme='dark'] .abstract-shapes .triangle-3,
html.dark .abstract-shapes .triangle-3 {
  border-bottom-color: #020617;
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


/* ==========================================
终极动效：电影级空灵显现 (Cinematic Reveal)
========================================== */

/* 1. 定义极其丝滑的对焦浮现关键帧 */
@keyframes ethereal-fade-up {
0% {
opacity: 0;
transform: translateY(30px) scale(0.98);
filter: blur(12px); /* 初始高斯模糊，打造朦胧感 */
}
100% {
opacity: 1;
transform: translateY(0) scale(1);
filter: blur(0);
}
}

/* 2. 定义太阳/月亮的极慢升空显现 */
@keyframes sun-rise {
0% {
opacity: 0;
transform: translateY(50px) scale(0.8);
}
100% {
opacity: 1;
transform: translateY(0) scale(1);
}
}

/* 3. 为各个元素绑定动画与精确的延迟时间 (Staggered Delay) */

/* 太阳最早升起 */
.yellow-sun {
animation: sun-rise 2s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
/* 如果它本身有 transition，确保不要被覆盖 */
}

/* 第一行文字：艾达踏上了寻找 */
.main-title .line1 {
opacity: 0; /* 初始隐藏 */
animation: ethereal-fade-up 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
}

/* 第二行文字：科技世界 的旅程 (延迟 0.5s) */
.main-title .line2 {
opacity: 0;
animation: ethereal-fade-up 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards;
}

/* 核心高亮词汇：延迟出现后的额外发光特效 */
.main-title .highlight {
display: inline-block;
opacity: 0;
/* 高亮词语比第二行整体再晚一丢丢显现，形成视觉焦点 */
animation: ethereal-fade-up 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.7s forwards;
}

/* 副标题：娓娓道来 (延迟 0.9s) */
.sub-title {
opacity: 0;
animation: ethereal-fade-up 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.9s forwards;
}

/* 底部跳动鼠标指示器：最后登场指引用户 (延迟 1.5s) */
.scroll-indicator {
opacity: 0;
animation: ethereal-fade-up 1.5s cubic-bezier(0.22, 1, 0.36, 1) 1.5s forwards;
}
