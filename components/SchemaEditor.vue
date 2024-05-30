<script setup lang="ts">
import type { JsonFormsChangeEvent } from "@jsonforms/vue"
import { JsonForms } from "@jsonforms/vue"
import { vuetifyRenderers } from "@jsonforms/vue-vuetify"

const data = ref({
  name: "Send email to Adrian",
  description: "Confirm if you have passed the subject\nHereby ...",
  done: true,
  recurrence: "Daily",
  rating: 3,
})

const schema = {
  properties: {
    name: {
      type: "string",
      minLength: 1,
      description: "The task's name",
    },
    description: {
      title: "Long Description",
      type: "string",
    },
    done: {
      type: "boolean",
    },
    dueDate: {
      type: "string",
      format: "date",
      description: "The task's due date",
    },
    rating: {
      type: "integer",
      maximum: 5,
    },
    recurrence: {
      type: "string",
      enum: ["Never", "Daily", "Weekly", "Monthly"],
    },
    recurrenceInterval: {
      type: "integer",
      description: "Days until recurrence",
    },
  },
}

const uischema = {
  type: "HorizontalLayout",
  elements: [
    {
      type: "VerticalLayout",
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
          scope: "#/properties/done",
        },
      ],
    },
    {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/dueDate",
        },
        {
          type: "Control",
          scope: "#/properties/rating",
        },
        {
          type: "Control",
          scope: "#/properties/recurrence",
        },
        {
          type: "Control",
          scope: "#/properties/recurrenceInterval",
        },
      ],
    },
  ],
}

const renderers = markRaw([
  ...vuetifyRenderers,
])

function onChange(event: JsonFormsChangeEvent) {
  data.value = event.data
}
</script>

<template>
  <JsonForms
    :data="data"
    :renderers="renderers"
    :schema="schema"
    :uischema="uischema"
    @change="onChange"
  />
</template>
