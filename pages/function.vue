<script setup lang="ts">
definePageMeta({
  title: "业务逻辑",
})

const colorMode = useColorMode()

const theme = computed(() => {
  return colorMode.value === "light" ? "vs-light" : "vs-dark"
})

const code = ref("")

const tabs = [
  {
    key: "visual-editor",
    slot: "visual",
    label: "可视化",
    description: "使用可视化编辑器",
  },
  {
    key: "code-editor",
    slot: "code",
    label: "源代码",
    description: "直接编辑源代码",
  },
]
</script>

<template>
  <UTabs
    class="w-full h-full"
    :items="tabs"
  >
    <template #visual>
      <ClientOnly>
        <FunctionEditor
          v-model="code"
          class="w-full h-96"
        />
      </ClientOnly>
    </template>
    <template #code>
      <MonacoEditor
        v-model="code"
        class="w-full h-96"
        lang="javascript"
        :options="{ theme: theme, readOnly: true }"
      />
    </template>
  </UTabs>
</template>
