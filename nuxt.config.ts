// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig(
  {
    modules: [
      '@nuxt/eslint',
      '@vueuse/nuxt',
      '@nuxt/ui',
      '@nuxt/content',
      'nuxt-og-image',
      'nuxt-lucide-icons',
      '@nuxt/image'
    ],

    devtools: {
      enabled: true
    },

    css: ['~/assets/css/main.css'],

    routeRules: {
      '/background': {
        redirect: '/background/schooling/utbm',
        prerender: false
      }
    },

    compatibilityDate: '2025-07-15',

    app: {
      baseURL: '/',
      buildAssetsDir: '_nuxt/'
    },

    nitro: {
      preset: 'github-pages',
      prerender: {
        crawlLinks: true,
        routes: ['/']
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
