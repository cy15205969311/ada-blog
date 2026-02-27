<template>
  <div class="ada-hero-wrapper" :class="{ 'is-loaded': isLoaded }">
    <div class="parallax-layer sky-layer" :style="parallaxStyle.sky">
      <div class="hero-sky-bg"></div>
    </div>

    <div class="parallax-layer sun-layer" :style="parallaxStyle.sun">
      <div class="yellow-sun"></div>
    </div>

    <div class="parallax-layer mountain-layer" :style="parallaxStyle.mountain">
      <div class="abstract-shapes">
        <div class="shape triangle-1"></div>
        <div class="shape triangle-2"></div>
        <div class="shape triangle-3"></div>
      </div>
    </div>

    <div class="parallax-layer content-layer" :style="parallaxStyle.content">
      <div class="hero-content">
        <h1 class="main-title">
          <div class="line-wrapper">
            <div class="line1">Ada's on a journey to find </div>
          </div>
          <div class="line-wrapper">
            <div class="line2"><span class="highlight">The Tech World</span> </div>
          </div>
        </h1>
        <div class="sub-wrapper">
          <p class="sub-title">Follow her as she goes on the hunt for creative ideas and turns all her wonderful ideas
            into reality.</p>
        </div>
        <div class="action-buttons">
          <a href="/tech/" class="btn primary-btn">🚀 开始探索</a>
          <a href="/about/" class="btn secondary-btn">👨‍💻 关于我</a>
        </div>
      </div>
    </div>

    <div class="parallax-layer mouse-layer" :style="parallaxStyle.mouse">
      <div class="scroll-indicator">
        <div class="mouse-icon"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue';

const isLoaded = ref(false);
let ticking = false;

const parallaxStyle = reactive({
  sky: { transform: 'translate3d(0,0,0)' },
  sun: { transform: 'translate3d(0,0,0)' },
  mountain: { transform: 'translate3d(0,0,0)' },
  content: { transform: 'translate3d(0,0,0)', opacity: 1 },
  mouse: { opacity: 1 }
});

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;

      /* ==========================================
         核心修复：动态切换导航栏的置顶状态
      ========================================== */
      if (scrollY > 50) {
        document.documentElement.classList.remove('is-hero-top');
      } else {
        document.documentElement.classList.add('is-hero-top');
      }

      if (scrollY > 1200) {
        ticking = false;
        return;
      }

      parallaxStyle.sky.transform = `translate3d(0, ${scrollY * 0.15}px, 0)`;
      parallaxStyle.sun.transform = `translate3d(0, ${scrollY * 0.5}px, 0)`;
      parallaxStyle.mountain.transform = `translate3d(0, ${-scrollY * 0.1}px, 0)`;

      const contentOpacity = Math.max(1 - scrollY / 300, 0);
      parallaxStyle.content.transform = `translate3d(0, ${scrollY * 0.3}px, 0)`;
      parallaxStyle.content.opacity = contentOpacity;

      parallaxStyle.mouse.opacity = Math.max(1 - scrollY / 100, 0);

      ticking = false;
    });
    ticking = true;
  }
};

onMounted(() => {
  // 初始化：强制给 html 加上置顶类名
  document.documentElement.classList.add('is-hero-top');

  setTimeout(() => { isLoaded.value = true; }, 100);

  nextTick(() => { window.addEventListener('scroll', handleScroll, { passive: true }); });
});

onUnmounted(() => {
  // 离开首屏组件时：务必清理掉类名，恢复正常导航栏
  document.documentElement.classList.remove('is-hero-top');
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="scss" scoped>
/* ==========================================
   1. 核心架构：绝对满屏叠层布局
========================================== */
.ada-hero-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  min-height: 700px;
  left: 50%;
  /* 抵消掉父级的可能的 padding/margin */
  margin-left: -50vw;
  overflow: hidden;
  /* 抵消导航栏高度，向上穿透 */
  margin-top: -6rem;
  padding-top: 6rem;
  /* 兜底背景色，防止加载闪白 */
  background: #4b8093;
}

/* 所有视差图层的通用样式：强制铺满全屏，开启硬件加速 */
.parallax-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  /* 默认鼠标穿透，防止挡住交互 */
  will-change: transform, opacity;
  /* GPU 加速提示 */
}

/* 严格的 Z-Index 层级管理 */
.sky-layer {
  z-index: 1;
}

.sun-layer {
  z-index: 2;
}

.mountain-layer {
  z-index: 3;
}

/* 内容层需要恢复鼠标交互 */
.content-layer {
  z-index: 10;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mouse-layer {
  z-index: 20;
}

/* ==========================================
   2. 静态样式定义 (昼夜适配)
========================================== */
/* 天空背景 - 白天 */
.hero-sky-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(170deg, #4b8093 0%, #6f9ca7 45%, #d1dbd4 100%);
  transition: background 1s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 天空背景 - 黑夜 */
html[data-theme='dark'] .hero-sky-bg,
html.dark .hero-sky-bg {
  background: linear-gradient(170deg, #090e17 0%, #141b2d 45%, #1e293b 100%);
}

/* 太阳/月亮 - 白天 */
.yellow-sun {
  position: absolute;
  top: 15%;
  right: 15%;
  width: 14vw;
  height: 14vw;
  min-width: 120px;
  min-height: 120px;
  max-width: 200px;
  max-height: 200px;
  background-color: #d1b028;
  border-radius: 50%;
  box-shadow: 0 0 60px rgba(209, 176, 40, 0.6);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 太阳/月亮 - 黑夜 (化为清冷月亮) */
html[data-theme='dark'] .yellow-sun,
html.dark .yellow-sun {
  background-color: #e2e8f0;
  box-shadow: 0 0 60px rgba(226, 232, 240, 0.3), 0 0 120px rgba(226, 232, 240, 0.1);
}

/* ==========================================
   终极修正：还原几何山峰 + 注入防脱离根系 (Bleed)
========================================== */
/* 抽象山脉前景容器 */
.abstract-shapes {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 25%;
  opacity: 0.15;
  transition: all 1s ease;
}

html[data-theme='dark'] .abstract-shapes,
html.dark .abstract-shapes {
  opacity: 0.3;
}

/* 核心重构：利用 currentColor 实现颜色穿透，不再写死 border-color */
.shape {
  position: absolute;
  bottom: -10px;
  width: 0;
  height: 0;
  border-style: solid;
  border-left: 120px solid transparent;
  border-right: 120px solid transparent;
  border-bottom: 180px solid currentColor;
  /* 动态读取当前类名的 color */
}

/* 魔法防御：为山峰向下延伸出 400px 的巨型实体根系，视差怎么拔都不会漏底！ */
.shape::after {
  content: '';
  position: absolute;
  top: 180px;
  /* 刚好接在三角形的底边 */
  left: -120px;
  /* 覆盖整个三角形的宽度 */
  width: 240px;
  height: 400px;
  /* 巨大的安全余量 */
  background-color: currentColor;
  /* 完美继承山峰的颜色 */
}

/* 赋予各种山峰独立的颜色与缩放 */
.triangle-1 {
  left: 5%;
  transform: scale(1.4);
  color: #2c4a52;
}

.triangle-2 {
  left: 40%;
  transform: scale(1);
  color: #4b8093;
}

.triangle-3 {
  left: 75%;
  transform: scale(1.8);
  color: #2c4a52;
}

/* 山脉黑夜适配 (同步改变 color，根系会自动变色) */
html[data-theme='dark'] .triangle-1,
html.dark .triangle-1 {
  color: #020617;
}

html[data-theme='dark'] .triangle-2,
html.dark .triangle-2 {
  color: #0f172a;
}

html[data-theme='dark'] .triangle-3,
html.dark .triangle-3 {
  color: #020617;
}

/* 内容排版 - 强制物理隔离文字行 */
.hero-content {
  text-align: center;
  color: #ffffff;
  margin-top: -10vh;
  /* 视觉居中补偿 */
  padding: 0 20px;
}

.main-title {
  /* 稍微收紧一点极限大小，防止炸窗 */
  font-size: clamp(2.5rem, 5vw, 4rem) !important;
  font-weight: 900 !important;
  line-height: 1.2 !important;
  margin: 0 0 1.5rem 0 !important;
  letter-spacing: 2px !important;
}

/* 核心修复：利用 line-wrapper 的 margin 强行隔开两行字！ */
.line-wrapper {
  overflow: hidden;
  padding: 4px 0;
}

.main-title .line-wrapper:first-child {
  margin-bottom: 12px;
  /* 强制拉开第一行和第二行的物理距离！绝对不会再撞车 */
}

.highlight {
  color: #42f593;
  text-shadow: 0 0 30px rgba(66, 245, 147, 0.4);
}

.sub-wrapper {
  overflow: hidden;
  padding-top: 15px;
}

.sub-title {
  font-size: clamp(1.05rem, 1.8vw, 1.3rem) !important;
  font-weight: 400 !important;
  color: rgba(255, 255, 255, 0.9) !important;
  max-width: 650px;
  margin: 0 auto !important;
  line-height: 1.6 !important;
}

/* ==========================================
   新增：双轨 CTA 按钮组 (极致毛玻璃与光影交互)
========================================== */
.action-buttons {
  margin-top: 2.5rem;
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  /* 初始隐藏，等待 JS 发令枪触发入场动画 */
  opacity: 0;
  will-change: transform, opacity, filter;
}

.btn {
  padding: 0.8rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none !important;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  pointer-events: auto;
  /* 确保在视差层中可以被点击 */
}

/* 主按钮：品牌绿流光溢彩 */
.primary-btn {
  background: rgba(66, 245, 147, 0.85);
  color: #0f172a !important;
  box-shadow: 0 0 20px rgba(66, 245, 147, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.primary-btn:hover {
  background: #42f593;
  box-shadow: 0 0 40px rgba(66, 245, 147, 0.6), 0 0 80px rgba(66, 245, 147, 0.2);
  transform: translateY(-4px) scale(1.02);
}

/* 次按钮：高级深空毛玻璃 */
.secondary-btn {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* 鼠标指示器 */
.scroll-indicator {
  position: absolute;
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%);
}

.mouse-icon {
  width: 26px;
  height: 42px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  position: relative;
}

.mouse-icon::before {
  content: '';
  position: absolute;
  top: 6px;
  left: 50%;
  margin-left: -2px;
  width: 4px;
  height: 8px;
  background: #ffffff;
  border-radius: 2px;
  animation: mouse-scroll 1.5s cubic-bezier(0.15, 0.41, 0.69, 0.94) infinite;
}

/* ==========================================
   3. 终极动效：电影级入场动画 (CSS Keyframes)
========================================== */
/* 关键帧：通用的向上浮现与模糊对焦 */
@keyframes fade-up-focus {
  0% {
    opacity: 0;
    transform: translateY(50px) scale(0.95);
    filter: blur(10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

/* 关键帧：太阳升起 */
@keyframes sun-rise {
  0% {
    opacity: 0;
    transform: translateY(100px) scale(0.8);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 鼠标滚动提示动画 */
@keyframes mouse-scroll {
  0% {
    transform: translateY(0);
    opacity: 1;
  }

  100% {
    transform: translateY(15px);
    opacity: 0;
  }
}

/* --- 核心：初始隐藏状态 --- */
/* 只有当 JS 添加了 is-loaded 类后，动画才会被触发，彻底解决水合问题 */
.yellow-sun,
.main-title .line1,
.main-title .line2,
.sub-title,
.action-buttons,
.scroll-indicator {
  opacity: 0;
  /* 默认不可见 */
  will-change: transform, opacity, filter;
}

/* --- 核心：触发入场动画 (带瀑布流延迟) --- */
.ada-hero-wrapper.is-loaded {

  /* 1. 太阳最先升起 (持续 2.4s) */
  .yellow-sun {
    animation: sun-rise 2.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  /* 2. 文字行依次浮现 (间隔 0.15s) */
  .main-title .line1 {
    animation: fade-up-focus 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
  }

  .main-title .line2 {
    animation: fade-up-focus 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.45s forwards;
  }

  /* 3. 副标题浮现 */
  .sub-title {
    animation: fade-up-focus 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.7s forwards;
  }

  /* 5. CTA 按钮组接力浮现 (在副标题之后) */
  .action-buttons {
    animation: fade-up-focus 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.85s forwards;
  }

  /* 4. 鼠标指示器最后出现 */
  .scroll-indicator {
    animation: fade-up-focus 1.4s cubic-bezier(0.22, 1, 0.36, 1) 1.6s forwards;
  }
}

/* 移动端适配优化 */
@media (max-width: 768px) {
  .ada-hero-wrapper {
    min-height: 600px;
  }

  .yellow-sun {
    top: 12%;
    right: 10%;
  }

  .hero-content {
    margin-top: -5vh;
    padding: 0 20px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
  }

  .btn {
    width: 100%;
    max-width: 280px;
    padding: 0.75rem 2rem;
    font-size: 1rem;
  }
}
</style>
