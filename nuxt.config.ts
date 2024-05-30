// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/eslint"],
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
