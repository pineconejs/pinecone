<script setup lang="ts">
import type { JsonSchema7 } from "@jsonforms/core"

const colorMode = useColorMode()

const theme = computed(() => {
  return colorMode.value === "light" ? "vs-light" : "vs-dark"
})

const schema = ref<JsonSchema7>({})

const code = computed<string>({
  get() {
    return JSON.stringify(schema.value)
  },
  set(value) {
    schema.value = JSON.parse(value)
  },
})
const items = [
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
    class="w-full"
    :items="items"
  >
    <template #visual>
      <ClientOnly>
        <SchemaEditor
          v-model="schema"
          class="w-full h-fit"
        />
      </ClientOnly>
    </template>
    <template #code>
      <MonacoEditor
        v-model="code"
        class="w-full h-96"
        lang="json"
        :options="{ theme: theme }"
      />
    </template>
  </UTabs>
</template>
