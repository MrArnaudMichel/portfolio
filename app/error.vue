<script lang="ts" setup>
import type {NuxtError} from '#app'

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
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
</script>

<template>
  <div>
    <AppHeader/>

    <UMain>
      <UContainer>
        <UPage>
          <UError :error="error"/>
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter/>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :fuse="{ resultLimit: 42 }"
        :links="links"
        :navigation="navigation"
        shortcut="meta_k"
      />
    </ClientOnly>

    <UToaster/>
  </div>
</template>
