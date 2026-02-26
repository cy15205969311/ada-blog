<template>
  <section class="nav-section">
    <h3 class="section-title">{{ title }}</h3>
    <div class="nav-grid">
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="scss">
.nav-section {
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--c-text, #1f2937);
  border-left: 4px solid var(--c-brand, #10b981);
  padding-left: 10px;
  margin: 2.5rem 0 1.2rem 0;
  line-height: 1.2;
  display: flex;
  align-items: center;
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  /* 强行锁定一行 4 个 */
  gap: 1.2rem;
}

/* 必须加上响应式保护 */
@media (max-width: 1024px) {
  .nav-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .nav-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1.05rem;
    margin: 2rem 0 1rem 0;
  }
}

// 暗色模式
@media (prefers-color-scheme: dark) {
  .section-title {
    color: var(--c-text, #e5e7eb);
  }
}
</style>
