<template>
  <div v-if="breadcrumbs.length > 1" class="v4-breadcrumb-nav">
    <span v-for="(item, index) in breadcrumbs" :key="index" class="v4-crumb-wrapper">
      <span v-if="index < breadcrumbs.length - 1" @click="navigate(item.path)" class="v4-crumb-link">
        {{ item.title }}
      </span>
      <span v-else class="v4-crumb-current">
        {{ item.title }}
      </span>
      <span v-if="index < breadcrumbs.length - 1" class="v4-crumb-separator">
        &gt;
      </span>
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const pathTitleMap = {
  '/': '首页',
  '/tech/': '计算机技术',
  '/media/': '新媒体运营',
  '/ecommerce/': '跨境电商',
  '/about/': '关于',
  '/tools/': '工具导航'
};

const breadcrumbs = computed(() => {
  const path = route.path;
  const crumbs = [];

  crumbs.push({
    title: '首页',
    path: '/'
  });

  if (path !== '/') {
    const segments = path.split('/').filter(Boolean);
    let currentPath = '';

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      if (index === segments.length - 1 && !currentPath.endsWith('/')) {
        currentPath += '/';
      }

      const title = pathTitleMap[currentPath] || segment;

      crumbs.push({
        title: title,
        path: currentPath
      });
    });
  }

  return crumbs;
});

const navigate = (path) => {
  if (path) {
    router.push(path);
  }
};
</script>

<style lang="scss" scoped>
.v4-breadcrumb-nav {
  display: flex !important;
  align-items: center !important;
  flex-wrap: wrap !important;
  margin-bottom: 1.5rem !important;
  font-size: 0.95rem !important;
  font-weight: 500 !important;
  letter-spacing: 0.5px !important;
}

.v4-crumb-wrapper {
  display: inline-flex !important;
  align-items: center !important;
}

.v4-crumb-link {
  color: #3eaf7c !important;
  cursor: pointer !important;
  transition: opacity 0.3s ease !important;
  text-decoration: none !important;
}

.v4-crumb-link:hover {
  opacity: 0.7 !important;
}

.v4-crumb-separator {
  margin: 0 10px !important;
  color: #94a3b8 !important;
  font-size: 0.85rem !important;
  font-weight: 400 !important;
  user-select: none !important;
}

.v4-crumb-current {
  color: var(--c-text-light, #64748b) !important;
  pointer-events: none !important;
}

:global(html.dark) .v4-crumb-link {
  color: #4ade80 !important;
}

:global(html.dark) .v4-crumb-current {
  color: #94a3b8 !important;
}

:global(html.dark) .v4-crumb-separator {
  color: #475569 !important;
}

:global(html[data-theme='dark']) .v4-crumb-link {
  color: #4ade80 !important;
}

:global(html[data-theme='dark']) .v4-crumb-current {
  color: #94a3b8 !important;
}

:global(html[data-theme='dark']) .v4-crumb-separator {
  color: #475569 !important;
}
</style>
