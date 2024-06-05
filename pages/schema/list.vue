<script setup lang="ts">
import type { JsonSchema7 } from "@jsonforms/core"

definePageMeta({
  title: "数据模型",
})

const types: Record<string, string> = {
  string: "文本",
  number: "数字",
  integer: "整数",
  object: "对象",
  array: "数组",
  boolean: "布尔",
  null: "空值",
}

const columns = [
  { key: "$id", label: "索引" },
  { key: "title", label: "名称" },
  { key: "description", label: "描述" },
  { key: "type", label: "类型" },
  { key: "operations", label: "操作" },
]

const rows = ref<JsonSchema7[]>([
  { $id: "/schema1", title: "模型1", description: "这是第一个模型", type: "string" },
  { $id: "/schema2", title: "模型2", description: "这是第二个模型", type: "object" },
])

const page = ref(1)
const size = ref(10)
const total = ref(100)
</script>

<template>
  <div>
    <div class="flex px-3 justify-end gap-2">
      <NuxtLink :to="{ path: '/schema/detail', query: { create: 'true' } }">
        <UButton>新增</UButton>
      </NuxtLink>
    </div>
    <UTable
      :columns="columns"
      :rows="rows"
    >
      <template #type-data="{ row }">
        {{ types[row.type] }}
      </template>
      <template #operations-data="{ row }">
        <div class="flex gap-2">
          <NuxtLink :to="{ path: '/schema/detail', query: { $id: row.$id } }">
            <UButton color="gray">
              查看
            </UButton>
          </NuxtLink>
          <UButton color="red">
            删除
          </UButton>
        </div>
      </template>
    </UTable>
    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <UPagination
        v-model="page"
        v-model:page-count="size"
        :total="total"
      />
    </div>
  </div>
</template>
