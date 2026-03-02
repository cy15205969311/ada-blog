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
import { computed, ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isMounted = ref(false);

// 在服务端和客户端都能获取初始路径
const getInitialPath = () => {
  if (typeof window !== 'undefined' && window.location) {
    return window.location.pathname;
  }
  return route?.path || '/';
};

// 使用 ref 缓存路径，防止水合时路由未就绪导致面包屑消失
const currentPath = ref(getInitialPath());

onMounted(() => {
  isMounted.value = true;
  // 确保挂载后立即同步路由路径
  if (route?.path) {
    currentPath.value = route.path;
  }
});

// 监听路由变化，更新缓存的路径
watch(() => route?.path, (newPath) => {
  if (newPath) {
    currentPath.value = newPath;
  }
}, { immediate: true });

const pathTitleMap = {
  '/': '首页',
  '/tech/': '计算机技术',
  '/media/': '新媒体运营',
  '/ecommerce/': '跨境电商',
  '/about/': '关于',
};

const breadcrumbs = computed(() => {
  // 使用缓存的路径，确保即使 route 未就绪也能显示
  let path = currentPath.value || '/';

  // 确保路径格式一致（处理尾斜杠）
  if (path !== '/' && !path.endsWith('/')) {
    path += '/';
  }

  const crumbs = [];

  // 添加首页
  crumbs.push({
    title: '首页',
    path: '/'
  });

  // 如果不是首页，构建面包屑路径
  if (path !== '/') {
    const segments = path.split('/').filter(Boolean);
    let buildPath = '';

    segments.forEach((segment, index) => {
      buildPath += `/${segment}`;

      // 确保目录路径以 / 结尾
      if (index === segments.length - 1 && !buildPath.endsWith('/')) {
        buildPath += '/';
      }

      const title = pathTitleMap[buildPath] || segment;

      crumbs.push({
        title: title,
        path: buildPath
      });
    });
  }

  return crumbs;
});

const navigate = (path) => {
  // 安全检查：确保 path 存在
  if (path && router) {
    try {
      router.push(path);
    } catch (e) {
      console.error('Navigation failed:', e);
    }
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
