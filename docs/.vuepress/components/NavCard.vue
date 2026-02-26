<template>
  <a :href="url" target="_blank" rel="noopener noreferrer" class="nav-card">
    <div class="card-top">
      <div class="card-header">
        <img v-if="icon && icon.startsWith('http')" :src="icon" class="native-logo" alt="logo" />
        <span v-else-if="icon || emoji" class="text-icon" v-html="icon || emoji"></span>
        <h4 class="title">{{ title }}</h4>
      </div>
      <p class="desc">{{ description }}</p>
    </div>
    <div class="card-footer">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7 17l9.2-9.2M17 17V7H7" />
      </svg>
    </div>
  </a>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  },
  emoji: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.nav-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem;
  background: var(--c-bg-light, #ffffff);
  border: 1px solid var(--c-border, #e5e7eb);
  border-radius: 12px;
  text-decoration: none !important;
  transition: all 0.2s ease;
  height: 100%;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    border-color: var(--c-brand, #10b981);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);

    .card-footer {
      color: var(--c-brand, #10b981);
    }
  }
}

.card-top {
  flex: 1;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0.8rem;
}

/* 极其重要：原生 Logo 样式，绝对不要加背景色！ */
.native-logo {
  width: 24px;
  height: 24px;
  object-fit: contain;
  border-radius: 0;
  background: transparent;
  flex-shrink: 0;
}

.text-icon {
  font-size: 1.5rem;
  line-height: 1;
  flex-shrink: 0;
}

.title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--c-text, #1f2937);
  line-height: 1.2;
  flex: 1;
}

.desc {
  margin: 0;
  font-size: 0.85rem;
  color: var(--c-text-light, #6b7280);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  margin-top: 1rem;
  color: var(--c-text-light, #9ca3af);
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
}

// 暗色模式
@media (prefers-color-scheme: dark) {
  .nav-card {
    background: var(--c-bg-light, #1f1f1f);
    border-color: var(--c-border, #2d2d2d);

    &:hover {
      border-color: var(--c-brand, #10b981);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  .title {
    color: var(--c-text, #e5e7eb);
  }

  .desc {
    color: var(--c-text-light, #9ca3af);
  }

  .card-footer {
    color: var(--c-text-light, #6b7280);
  }
}
</style>
