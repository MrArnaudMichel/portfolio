// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig(
  {
    modules: ['@nuxt/eslint',
      '@vueuse/nuxt',
      '@nuxt/ui',
      '@nuxt/content',
      'nuxt-og-image',
      'nuxt-lucide-icons'],

    devtools: {
      enabled: true
    },

    css: ['~/assets/css/main.css'],

    routeRules: {
      '/background': {
        redirect: '/background/schooling',
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
