// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig(
  {
    modules: [
      '@nuxt/eslint',
      '@vueuse/nuxt',
      // '@nuxt/image',
      '@nuxt/ui-pro',
      '@nuxt/content',
      'nuxt-og-image'
    ],

    devtools: {
      enabled: true
    },

    css: ['~/assets/css/main.css'],

    routeRules: {
      '/career': {
        redirect: '/career/schooling',
        prerender: false
      }
    },

    compatibilityDate: '2025-07-15',

    nitro: {
      prerender: {
        routes: [
          '/'
        ],
        crawlLinks: true
      }
    },
    vite: {
      plugins: [
        tailwindcss()
      ]
    },

    eslint: {
      config: {
        stylistic: {
          commaDangle: 'never',
          braceStyle: '1tbs'
        }
      }
    }
  }
)
