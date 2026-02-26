<template>
  <a 
    :href="link" 
    class="site-card"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div class="card-icon">{{ icon }}</div>
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-desc">{{ desc }}</p>
  </a>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '🔗'
  }
})
</script>

<style scoped>
.site-card {
  display: block;
  padding: 1.5rem;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  background: var(--c-bg);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.site-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: var(--c-brand);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: var(--c-text);
}

.card-desc {
  font-size: 0.875rem;
  color: var(--c-text-light);
  margin: 0;
  line-height: 1.5;
}
</style>
