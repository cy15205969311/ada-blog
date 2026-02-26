<template>
  <div class="tech-grid">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.tech-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 1.5rem 0 2.5rem 0;
}

@media (max-width: 768px) {
  .tech-grid {
    grid-template-columns: 1fr;
    gap: 0.875rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .tech-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1025px) and (max-width: 1280px) {
  .tech-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
