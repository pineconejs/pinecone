<script setup lang="ts">
const colorMode = useColorMode()

const headerLinks = computed(() => (
  [
    [{
      icon: "i-heroicons-sparkles",
      label: "Logo",
    }],
    [{
      icon: "i-heroicons-magnifying-glass",
      label: "search",
    },
    {
      icon: { light: "i-heroicons-sun", dark: "i-heroicons-moon" }[colorMode.value],
      label: colorMode.value === "light" ? "Light" : "Dark",
      click: () => { colorMode.preference = (colorMode.value === "light" ? "dark" : "light") },
    },
    {
      label: "Avatar",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/739984?v=4",
      },
    }],
  ]
))

const asideLinks = [
  { icon: "i-heroicons-home", label: "概览", to: "/" },
  { icon: "i-heroicons-circle-stack", label: "数据建模", to: "/schema/list" },
  { icon: "i-heroicons-table-cells", label: "表单设计", to: "/form" },
  { icon: "i-heroicons-puzzle-piece", label: "业务逻辑", to: "/function" },
  { icon: "i-heroicons-rectangle-group", label: "业务流程", to: "process" },
]

const route = useRoute()
type BreadcrumbLink = { icon?: string, label: string, to: string }
const links = computed<BreadcrumbLink[]>(() => {
  return route?.meta?.links as BreadcrumbLink[] || route.matched.map(item => ({
    icon: item?.meta?.icon,
    label: item?.meta?.title || item.name || item.path,
    to: item.path,
  }))
})
</script>

<template>
  <div class="w-screen h-screen flex flex-col">
    <UHorizontalNavigation
      class="w-full flex-0 px-2 border-b border-gray-200 dark:border-gray-800"
      :links="headerLinks"
    />
    <div class="w-full h-full flex-1 flex">
      <UVerticalNavigation
        class="h-full flex-0 px-2 border-r border-gray-200 dark:border-gray-800"
        :links="asideLinks"
      />
      <div class="flex-1 p-2">
        <UBreadcrumb
          class="px-3 border-b border-gray-200 dark:border-gray-700"
          :links="links"
        />
        <slot />
      </div>
    </div>
  </div>
</template>
