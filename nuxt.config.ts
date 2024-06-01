import vuetify, { transformAssetUrls } from "vite-plugin-vuetify"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: { transpile: ["vuetify"] },
  modules: ["@nuxt/ui", "@nuxt/eslint", (_options, nuxt) => {
    nuxt.hooks.hook("vite:extendConfig", (config) => {
      // @ts-expect-error 忽略config的类型
      config.plugins.push(vuetify({ autoImport: true }))
    })
  }],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  typescript: {
    typeCheck: true,
  },
  eslint: {
    config: {
      stylistic: {
        quotes: "double",
      },
    },
  },
})
