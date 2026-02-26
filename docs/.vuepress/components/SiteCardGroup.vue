<template>
  <div class="site-card-group">
    <slot></slot>
  </div>
</template>

<style scoped>
.site-card-group {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

@media (max-width: 768px) {
  .site-card-group {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
