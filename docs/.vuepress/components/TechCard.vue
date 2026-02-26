<template>
  <a :href="url" target="_blank" rel="noopener noreferrer" class="tech-card">
    <div class="card-icon">
      <span v-if="emoji">{{ emoji }}</span>
      <img v-else-if="icon" :src="icon" :alt="title" />
    </div>
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-desc">{{ description }}</p>
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
.tech-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.25rem 1rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  cursor: pointer;
  min-height: 120px;

  &:hover {
    border-color: #d1d5db;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
}

.card-icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 0.75rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.card-title {
  font-size: 0.9375rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
  color: #1f2937;
  line-height: 1.4;
}

.card-desc {
  font-size: 0.8125rem;
  margin: 0;
  color: #6b7280;
  line-height: 1.5;
  flex: 1;
}

// 暗色模式
@media (prefers-color-scheme: dark) {
  .tech-card {
    background: #1f1f1f;
    border-color: #2d2d2d;

    &:hover {
      border-color: #3d3d3d;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
  }

  .card-title {
    color: #e5e7eb;
  }

  .card-desc {
    color: #9ca3af;
  }
}
</style>
