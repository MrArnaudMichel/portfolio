<script lang="ts" setup>
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

useHead({
  meta: [
    {charset: 'utf-8'},
    {name: 'viewport', content: 'width=device-width, initial-scale=1'},
    {key: 'theme-color', name: 'theme-color', content: color}
  ],
  link: [
    {rel: 'icon', href: '/logo.svg'}
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: '%s - Portfolio',
  ogImage: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3NhYXMtdGVtcGxhdGUubnV4dC5kZXYiLCJpYXQiOjE3Mzk0NjM0NDh9.tgzUQaw6XswUPPVbOXazuWwoTHJODg155CYt1xfzIdM.jpg?theme=light',
  twitterImage: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3NhYXMtdGVtcGxhdGUubnV4dC5kZXYiLCJpYXQiOjE3Mzk0NjM0NDh9.tgzUQaw6XswUPPVbOXazuWwoTHJODg155CYt1xfzIdM.jpg?theme=light',
  twitterCard: 'summary_large_image'
})

const {data: navigation} = await useAsyncData('navigation', () => queryCollectionNavigation('background'), {
  transform: data => data.find(item => item.path === '/background')?.children || []
})
const {data: files} = useLazyAsyncData('search', () => queryCollectionSearchSections('background'), {
  server: false
})

const links = [{
  label: 'Background',
  icon: 'i-lucide-book',
  to: '/background/schooling'
}, {
  label: 'Projects',
  icon: 'i-lucide-layout-grid',
  to: '/projects'
}]

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator/>

    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :fuse="{ resultLimit: 42 }"
        :links="links"
        :navigation="navigation"
        shortcut="meta_k"
      />
    </ClientOnly>
  </UApp>
</template>
