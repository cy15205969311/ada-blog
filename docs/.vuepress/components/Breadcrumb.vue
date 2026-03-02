<template>
  <div v-if="breadcrumbs.length > 1" class="v4-breadcrumb-nav">
    <span v-for="(item, index) in breadcrumbs" :key="index" class="v4-crumb-wrapper">
      <span v-if="index < breadcrumbs.length - 1" @click="navigate(item.path)" class="v4-crumb-link">
        <!-- Home 图标（仅在首页显示） -->
        <svg v-if="index === 0" class="v4-home-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
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
import { computed, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isClient = ref(false);

// 确保只在客户端渲染
onMounted(() => {
  isClient.value = true;
});

const pathTitleMap = {
  '/': '首页',
  '/tech/': '计算机技术',
  '/media/': '新媒体运营',
  '/ecommerce/': '跨境电商',
  '/about/': '关于',
};

const breadcrumbs = computed(() => {
  // SSR 安全检查：确保 route 对象存在且在客户端
  if (!isClient.value || !route || !route.path) {
    return [{
      title: '首页',
      path: '/'
    }];
  }

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
  if (path && isClient.value) {
    router.push(path);
  }
};
</script>

<style lang="scss" scoped>
.v4-breadcrumb-nav {
  display: flex !important;
  align-items: center !important;
  flex-wrap: wrap !important;
  /* 【回调间距】从 0.5rem 放宽到 1.2rem，拉开与标题的距离 */
  margin-bottom: 1.2rem !important;
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
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
}

.v4-crumb-link:hover {
  opacity: 0.7 !important;
}

.v4-home-icon {
  width: 16px !important;
  height: 16px !important;
  flex-shrink: 0 !important;
}

.v4-crumb-separator {
  margin: 0 8px !important;
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
