<script setup lang="ts">
import type { ControlElement, GroupLayout, HorizontalLayout, JsonSchema7, VerticalLayout } from "@jsonforms/core"
import type { JsonFormsChangeEvent } from "@jsonforms/vue"
import { JsonForms } from "@jsonforms/vue"
import { vuetifyRenderers } from "@jsonforms/vue-vuetify"

interface SchemaDefination {
  name: string
  description?: string
  type: string
  minLength?: number
  maxLength?: number
  format?: string
  pattern?: string
  minimum?: number
  exclusiveMinimum?: boolean
  maximumn?: number
  exclusiveMaximum?: boolean
  properties?: SchemaDefination[]
}

const defination = ref<SchemaDefination>({
  name: "",
  type: "string",
})

const baseSchema: JsonSchema7 = {
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "名称",
      description: "使用简短的名称命名该数据模型",
      minLength: 1,
    },
    description: {
      type: "string",
      title: "描述",
      description: "使用更详细的语句描述该数据类型",
    },
    type: {
      type: "string",
      title: "类型",
      description: "使用类型对数据模型进行限制",
      oneOf: [
        { const: "string", title: "文本" },
        { const: "number", title: "数字" },
        { const: "integer", title: "整数" },
        { const: "object", title: "对象" },
        { const: "array", title: "数组" },
        { const: "boolean", title: "布尔" },
        { const: "null", title: "空值" },
      ],
    },
    minLength: {
      type: "number",
      title: "最小长度",
      description: "对文本的字符长度进行限制",
    },
    maxLength: {
      type: "number",
      title: "最大长度",
      description: "对文本字符串的长度进行限制",
    },
    format: {
      type: "string",
      title: "格式",
      description: "使用预设的格式文本进行限制",
      oneOf: [
        { const: "date-time", title: "日期时间" },
        { const: "time", title: "时间" },
        { const: "date", title: "日期" },
        { const: "duration", title: "时间段" },
        { const: "email", title: "电子邮箱" },
        { const: "hostname", title: "主机名" },
        { const: "ipv4", title: "IPV4" },
        { const: "ipv6", title: "IPV6" },
        { const: "uuid", title: "UUID" },
        { const: "uri", title: "URI" },
        { const: "regex", title: "正则表达式" },
      ],
    },
    pattern: {
      type: "string",
      title: "模板",
      description: "使用正则表达式对文本进行检查",
      format: "regex",
    },
    minimum: {
      type: "number",
      title: "最小值",
      description: "限制数字类型的最小值",
    },
    exclusiveMinimum: {
      type: "boolean",
      title: "排除最小值",
      description: "控制数字类型的范围是否排除最小值",
    },
    maximumn: {
      type: "number",
      title: "最大值",
      description: "限制数字类型的最大值",
    },
    exclusiveMaximum: {
      type: "boolean",
      title: "排除最大值",
      description: "控制数字类型的范围是否排除最大值",
    },
  },
  required: ["name", "type"],
}

const schema: JsonSchema7 = {
  ...baseSchema,
  properties: {
    ...baseSchema.properties,
    properties: {
      type: "array",
      title: "成员",
      items: baseSchema,
    },
  },
}

const baseUISchema: VerticalLayout = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Group",
      label: "基本信息",
      elements: [
        {
          type: "Control",
          scope: "#/properties/name",
        },
        {
          type: "Control",
          scope: "#/properties/description",
          options: {
            multi: true,
          },
        },
        {
          type: "Control",
          scope: "#/properties/type",
        },
      ] as ControlElement[],
    } as GroupLayout,
    {
      type: "Group",
      label: "约束",
      elements: [
        { type: "Control", scope: "#/properties/minLength" },
        { type: "Control", scope: "#/properties/maxLength" },
        { type: "Control", scope: "#/properties/format" },
        { type: "Control", scope: "#/properties/pattern" },
      ] as ControlElement[],
      rule: {
        effect: "SHOW",
        condition: {
          scope: "#/properties/type",
          schema: {
            const: "string",
          },
        },
      },
    } as GroupLayout,
    {
      type: "Group",
      label: "约束",
      elements: [
        {
          type: "HorizontalLayout",
          elements: [
            { type: "Control", scope: "#/properties/minimum" },
            { type: "Control", scope: "#/properties/exclusiveMinimum" },
          ] as ControlElement[],
        },
        {
          type: "HorizontalLayout",
          elements: [
            { type: "Control", scope: "#/properties/maximumn" },
            { type: "Control", scope: "#/properties/exclusiveMaximum" },
          ] as ControlElement[],
        },
      ] as HorizontalLayout[],
      rule: {
        effect: "SHOW",
        condition: {
          scope: "#/properties/type",
          schema: {
            enum: ["integer", "number"],
          },
        },
      },
    } as GroupLayout,
  ],
}

const uischema = {
  ...baseUISchema,
  elements: [
    ...baseUISchema.elements,
    {
      type: "Control",
      scope: "#/properties/properties",
      options: {
        detail: baseUISchema,
        elementLabelProp: "name",
        showSortButtons: true,
      },
      rule: {
        effect: "SHOW",
        condition: {
          scope: "#/properties/type",
          schema: {
            const: "object",
          },
        },
      },
    } as ControlElement,
  ],
}

const renderers = markRaw([
  ...vuetifyRenderers,
])

function onChange(event: JsonFormsChangeEvent) {
  if (event.errors) {
    console.error("onChange erros:", event.errors)
  }

  console.debug("On Change data: ", event.data)
  defination.value = event.data
}
</script>

<template>
  <JsonForms
    :data="defination"
    :renderers="renderers"
    :schema="schema"
    :uischema="uischema"
    @change="onChange"
  />
</template>
