<template>
  <div class="about-product-page" data-page-type="about-final">
    <!-- 主容器：最大宽度1200px居中 -->
    <div class="about-container">

      <!-- 头部区域 -->
      <header class="about-hero">
        <h1 class="about-hero-title">关于本站</h1>
        <p class="about-hero-desc">
          这是一个聚合了技术开发、新媒体运营和跨境电商资源的综合性导航平台。<br>
          我们致力于为创作者和开发者提供最优质的工具和资源推荐，帮助大家提高工作效率。
        </p>
      </header>

      <!-- 使命卡片 -->
      <section class="about-mission-card">
        <h2 class="about-section-title">我们的使命</h2>
        <p class="about-mission-text">
          在信息爆炸的时代，找到合适的工具往往比使用工具本身更耗时。我们的目标是建立一个精选的资源库，通过严格的筛选机制，只收录真正实用、高效的工具和资源，让每一次搜索都能直达价值。无论你是全栈开发者、自媒体创作者，还是跨境电商从业者，都能在这里找到提升效率的利器。
        </p>
      </section>

      <!-- 三大分类卡片 -->
      <section class="about-features">
        <div class="about-feature-card about-card-blue">
          <div class="about-feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
          <h3 class="about-feature-title">技术开发</h3>
          <p class="about-feature-desc">收录主流前端框架、后端技术栈、UI组件库及开发者常用效能工具。</p>
        </div>

        <div class="about-feature-card about-card-purple">
          <div class="about-feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </div>
          <h3 class="about-feature-title">新媒体运营</h3>
          <p class="about-feature-desc">汇集AI创作工具、内容设计素材、数据分析平台及运营辅助神器。</p>
        </div>

        <div class="about-feature-card about-card-green">
          <div class="about-feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
          <h3 class="about-feature-title">跨境电商</h3>
          <p class="about-feature-desc">精选指纹浏览器、选品分析工具、ERP系统及各类跨境电商必备插件。</p>
        </div>
      </section>

      <!-- 底部双列信息 -->
      <section class="about-footer-info">
        <div class="about-info-col">
          <h3 class="about-info-title">技术栈</h3>
          <ul class="about-tech-list">
            <li>VuePress 2.0 静态站点生成器</li>
            <li>Vue 3.5 前端框架</li>
            <li>Vite 构建工具</li>
            <li>Sass 样式预处理器</li>
          </ul>
        </div>

        <div class="about-info-col">
          <h3 class="about-info-title">联系我们</h3>
          <p class="about-contact-intro">
            如果您有优质的资源推荐，或者对本站有任何建议，欢迎通过以下方式联系我们：
          </p>
          <div class="about-contact-item">
            <svg class="about-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>ada402135@gmail.com</span>
          </div>
          <div class="about-contact-item">
            <svg class="about-contact-icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>cy15205969311</span>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<style lang="scss" scoped>
/* ==========================================
   产品级关于页面 - 完全覆盖VuePress默认样式
   使用全新命名空间 about-product-page
========================================== */

/* 1. 强制隐藏VuePress默认页脚元素 */
:global(.theme-default-content:has([data-page-type="about-final"]) ~ .page-meta),
:global(.theme-default-content:has([data-page-type="about-final"]) ~ .page-nav) {
  display: none !important;
  visibility: hidden !important;
  height: 0 !important;
  overflow: hidden !important;
}

/* 2. 重置VuePress内容容器 */
:global(.theme-default-content:has([data-page-type="about-final"])) {
  max-width: 100vw !important;
  padding: 0 !important;
  margin: 0 !important;
}

/* 3. 页面主容器 */
.about-product-page {
  width: 100%;
  min-height: calc(100vh - 3.6rem);
  background: var(--c-bg, #ffffff);
  padding: 3rem 1.5rem 4rem;
}

/* 4. 内容容器 - 最大宽度1200px居中 */
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* ========== 头部区域 ========== */
.about-hero {
  text-align: center;
  margin-bottom: 3rem;
}

.about-hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 1rem 0;
  padding: 0;
  border: none;
  line-height: 1.2;
}

.about-hero-desc {
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.7;
  max-width: 800px;
  margin: 0 auto;
}

/* ========== 使命卡片 ========== */
.about-mission-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 2rem 2.5rem;
  margin-bottom: 3rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.about-section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 1rem 0;
  padding: 0;
  border: none;
}

.about-mission-text {
  font-size: 1rem;
  color: #475569;
  line-height: 1.8;
  text-align: left;
  margin: 0;
}

/* ========== 三大分类卡片 ========== */
.about-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
}

@media (max-width: 768px) {
  .about-features {
    grid-template-columns: 1fr;
  }
}

.about-feature-card {
  border-radius: 12px;
  padding: 2rem 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.about-feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.about-feature-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
}

.about-feature-icon svg {
  width: 24px;
  height: 24px;
}

.about-feature-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.8rem 0;
  padding: 0;
  border: none;
}

.about-feature-desc {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

/* 马卡龙配色系统 */
.about-card-blue {
  background-color: #f0f6ff;
}

.about-card-blue .about-feature-icon {
  background-color: #dbeafe;
  color: #3b82f6;
}

.about-card-purple {
  background-color: #f5f0ff;
}

.about-card-purple .about-feature-icon {
  background-color: #f3e8ff;
  color: #a855f7;
}

.about-card-green {
  background-color: #f0fdf4;
}

.about-card-green .about-feature-icon {
  background-color: #dcfce7;
  color: #22c55e;
}

/* ========== 底部双列信息 ========== */
.about-footer-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  padding-top: 3rem;
  border-top: 1px solid #e2e8f0;
}

@media (max-width: 768px) {
  .about-footer-info {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.about-info-col {
  /* 列容器 */
}

.about-info-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1.2rem 0;
  padding: 0;
  border: none;
}

/* 技术栈列表 */
.about-tech-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.about-tech-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.8rem;
  font-size: 1rem;
  color: #475569;
  line-height: 1.6;
}

.about-tech-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6rem;
  width: 6px;
  height: 6px;
  background-color: #3eaf7c;
  border-radius: 50%;
}

/* 联系信息 */
.about-contact-intro {
  font-size: 1rem;
  color: #475569;
  line-height: 1.6;
  margin: 0 0 1.2rem 0;
}

.about-contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.about-contact-icon {
  width: 20px;
  height: 20px;
  color: #3eaf7c;
  margin-right: 0.8rem;
  flex-shrink: 0;
}

.about-contact-item span {
  font-size: 1rem;
  color: #475569;
}

/* ========== 暗黑模式适配 ========== */
html.dark .about-product-page {
  background: var(--c-bg, #1a1a1a);
}

html.dark .about-hero-title,
html.dark .about-section-title,
html.dark .about-feature-title,
html.dark .about-info-title {
  color: #f1f5f9;
}

html.dark .about-hero-desc,
html.dark .about-mission-text,
html.dark .about-feature-desc,
html.dark .about-tech-list li,
html.dark .about-contact-intro,
html.dark .about-contact-item span {
  color: #94a3b8;
}

html.dark .about-mission-card {
  background-color: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.1);
}

html.dark .about-card-blue {
  background-color: rgba(59, 130, 246, 0.1);
}

html.dark .about-card-blue .about-feature-icon {
  background-color: rgba(59, 130, 246, 0.2);
}

html.dark .about-card-purple {
  background-color: rgba(168, 85, 247, 0.1);
}

html.dark .about-card-purple .about-feature-icon {
  background-color: rgba(168, 85, 247, 0.2);
}

html.dark .about-card-green {
  background-color: rgba(34, 197, 94, 0.1);
}

html.dark .about-card-green .about-feature-icon {
  background-color: rgba(34, 197, 94, 0.2);
}

html.dark .about-footer-info {
  border-top-color: rgba(255, 255, 255, 0.1);
}

/* ========== 响应式优化 ========== */
@media (max-width: 960px) {
  .about-product-page {
    padding: 2rem 1rem 3rem;
  }

  .about-hero-title {
    font-size: 2rem;
  }

  .about-hero-desc {
    font-size: 1rem;
  }

  .about-mission-card {
    padding: 1.5rem 1.8rem;
  }

  .about-section-title {
    font-size: 1.3rem;
  }
}

@media (max-width: 640px) {
  .about-hero-title {
    font-size: 1.75rem;
  }

  .about-mission-card {
    padding: 1.2rem 1.5rem;
  }

  .about-feature-card {
    padding: 1.5rem 1.2rem;
  }
}
</style>
