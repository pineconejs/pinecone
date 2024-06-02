import vuetify, { transformAssetUrls } from "vite-plugin-vuetify"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: { transpile: ["vuetify"] },
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "nuxt-monaco-editor",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
      // @ts-expect-error 忽略config的类型
        config.plugins.push(vuetify({ autoImport: false }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  eslint: {
    config: {
      stylistic: {
        quotes: "double",
      },
    },
  },
})
