<template>
  <div class="tech-marquee-wrapper">
    <!-- 第一行 - 向左滚动 -->
    <div class="marquee-row">
      <div class="marquee-content marquee-left">
        <div v-for="(tech, index) in row1" :key="`row1-${index}`" class="tech-card">
          <div class="card-header">
            <div class="tech-logo" :style="{ background: tech.color }">
              <span v-if="!tech.logo">{{ tech.icon }}</span>
              <img v-else :src="tech.logo" :alt="tech.name" />
            </div>
            <div class="tech-info">
              <div class="tech-name">{{ tech.name }}</div>
              <div class="tech-type">{{ tech.type }}</div>
            </div>
          </div>
          <div class="tech-desc">{{ tech.desc }}</div>
        </div>
        <!-- 重复 -->
        <div v-for="(tech, index) in row1" :key="`row1-dup-${index}`" class="tech-card">
          <div class="card-header">
            <div class="tech-logo" :style="{ background: tech.color }">
              <span v-if="!tech.logo">{{ tech.icon }}</span>
              <img v-else :src="tech.logo" :alt="tech.name" />
            </div>
            <div class="tech-info">
              <div class="tech-name">{{ tech.name }}</div>
              <div class="tech-type">{{ tech.type }}</div>
            </div>
          </div>
          <div class="tech-desc">{{ tech.desc }}</div>
        </div>
      </div>
    </div>

    <!-- 第二行 - 向右滚动 -->
    <div class="marquee-row">
      <div class="marquee-content marquee-right">
        <div v-for="(tech, index) in row2" :key="`row2-${index}`" class="tech-card">
          <div class="card-header">
            <div class="tech-logo" :style="{ background: tech.color }">
              <span v-if="!tech.logo">{{ tech.icon }}</span>
              <img v-else :src="tech.logo" :alt="tech.name" />
            </div>
            <div class="tech-info">
              <div class="tech-name">{{ tech.name }}</div>
              <div class="tech-type">{{ tech.type }}</div>
            </div>
          </div>
          <div class="tech-desc">{{ tech.desc }}</div>
        </div>
        <!-- 重复 -->
        <div v-for="(tech, index) in row2" :key="`row2-dup-${index}`" class="tech-card">
          <div class="card-header">
            <div class="tech-logo" :style="{ background: tech.color }">
              <span v-if="!tech.logo">{{ tech.icon }}</span>
              <img v-else :src="tech.logo" :alt="tech.name" />
            </div>
            <div class="tech-info">
              <div class="tech-name">{{ tech.name }}</div>
              <div class="tech-type">{{ tech.type }}</div>
            </div>
          </div>
          <div class="tech-desc">{{ tech.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const row1 = ref([
  {
    name: 'Vue.js',
    type: '前端框架',
    desc: 'Vue 官方渐进式 JavaScript 框架，易学易用，性能出色',
    icon: '💚',
    color: 'linear-gradient(135deg, #42b883 0%, #35495e 100%)',
    logo: 'https://api.iconify.design/logos:vue.svg'
  },
  {
    name: 'React',
    type: '前端框架',
    desc: 'Facebook 开源的 UI 库，组件化开发，虚拟 DOM',
    icon: '⚛️',
    color: 'linear-gradient(135deg, #61dafb 0%, #20232a 100%)',
    logo: 'https://api.iconify.design/logos:react.svg'
  },
  {
    name: 'TypeScript',
    type: '编程语言',
    desc: 'JavaScript 的超集，提供静态类型检查，提升代码质量',
    icon: '🔷',
    color: 'linear-gradient(135deg, #3178c6 0%, #235a97 100%)',
    logo: 'https://api.iconify.design/logos:typescript-icon.svg'
  },
  {
    name: 'Vite',
    type: '构建工具',
    desc: '下一代前端构建工具，极速冷启动，即时热更新',
    icon: '⚡',
    color: 'linear-gradient(135deg, #646cff 0%, #747bff 100%)',
    logo: 'https://api.iconify.design/logos:vitejs.svg'
  },
  {
    name: 'Tailwind CSS',
    type: 'CSS 框架',
    desc: '实用优先的 CSS 框架，快速构建现代化界面',
    icon: '🎨',
    color: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    logo: 'https://api.iconify.design/logos:tailwindcss-icon.svg'
  },
  {
    name: 'Pinia',
    type: '状态管理',
    desc: 'Vue 官方推荐的状态管理库，轻量、类型安全',
    icon: '🍍',
    color: 'linear-gradient(135deg, #ffd859 0%, #ffb800 100%)',
    logo: 'https://api.iconify.design/logos:pinia.svg'
  }
])

const row2 = ref([
  {
    name: 'Nginx',
    type: 'Web 服务器',
    desc: '高性能 HTTP 服务器和反向代理，负载均衡',
    icon: '🌐',
    color: 'linear-gradient(135deg, #009639 0%, #007a2f 100%)',
    logo: 'https://api.iconify.design/logos:nginx.svg'
  },
  {
    name: 'Node.js',
    type: '运行时环境',
    desc: '基于 Chrome V8 引擎的 JavaScript 运行时',
    icon: '🟢',
    color: 'linear-gradient(135deg, #68a063 0%, #44883e 100%)',
    logo: 'https://api.iconify.design/logos:nodejs-icon.svg'
  },
  {
    name: 'Docker',
    type: '容器化平台',
    desc: '轻量级容器技术，简化应用部署，保证环境一致性',
    icon: '🐳',
    color: 'linear-gradient(135deg, #2496ed 0%, #0db7ed 100%)',
    logo: 'https://api.iconify.design/logos:docker-icon.svg'
  },
  {
    name: 'Redis',
    type: '缓存数据库',
    desc: '高性能键值存储，支持多种数据结构',
    icon: '🔴',
    color: 'linear-gradient(135deg, #dc382d 0%, #a32422 100%)',
    logo: 'https://api.iconify.design/logos:redis.svg'
  },
  {
    name: 'MongoDB',
    type: 'NoSQL 数据库',
    desc: '文档型数据库，灵活的数据模型，适合快速迭代',
    icon: '🍃',
    color: 'linear-gradient(135deg, #4db33d 0%, #3fa037 100%)',
    logo: 'https://api.iconify.design/logos:mongodb-icon.svg'
  },
  {
    name: 'Git',
    type: '版本控制',
    desc: '分布式版本控制系统，团队协作必备工具',
    icon: '�',
    color: 'linear-gradient(135deg, #f05032 0%, #c9302c 100%)',
    logo: 'https://api.iconify.design/logos:git-icon.svg'
  }
])
</script>

<style scoped>
.tech-marquee-wrapper {
  width: 100%;
  margin: 3rem 0;
  padding: 2rem 0;
  background: linear-gradient(90deg, transparent 0%, rgba(66, 184, 131, 0.02) 50%, transparent 100%);
  overflow: hidden;
}

.marquee-row {
  width: 100%;
  overflow: hidden;
  padding: 0.75rem 0;
}

.marquee-content {
  display: flex;
  gap: 1rem;
  width: fit-content;
}

.marquee-left {
  animation: scroll-left 60s linear infinite;
}

.marquee-right {
  animation: scroll-right 60s linear infinite;
}

.marquee-content:hover {
  animation-play-state: paused;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

@keyframes scroll-right {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(0);
  }
}

.tech-card {
  width: 300px;
  padding: 1.25rem;
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: default;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
}

.tech-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--c-brand);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.tech-logo {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tech-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 4px;
}

.tech-info {
  flex: 1;
  min-width: 0;
}

.tech-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--c-text);
  margin-bottom: 0.125rem;
  line-height: 1.4;
}

.tech-type {
  font-size: 0.8125rem;
  color: var(--c-text-light);
  opacity: 0.7;
  line-height: 1.4;
}

.tech-desc {
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--c-text-light);
  opacity: 0.8;
}

@media (max-width: 768px) {
  .tech-card {
    width: 280px;
    padding: 1rem;
  }

  .tech-logo {
    width: 40px;
    height: 40px;
  }

  .tech-name {
    font-size: 0.9375rem;
  }

  .tech-type {
    font-size: 0.75rem;
  }

  .tech-desc {
    font-size: 0.8125rem;
  }
}
</style>
