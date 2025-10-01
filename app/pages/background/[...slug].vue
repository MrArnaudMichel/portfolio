<script lang="ts" setup>
definePageMeta({
  layout: 'background'
})

const route = useRoute()

// Map /career/... to the corresponding /docs/... path in content
const docsPath = computed(() => route.path.replace(/^\/backgroundr/, '/background'))

const {data: page} = await useAsyncData(docsPath.value, () => queryCollection('background').path(docsPath.value).first())
if (!page.value) {
  throw createError({statusCode: 404, statusMessage: 'Page not found', fatal: true})
}

const {data: surround} = await useAsyncData(`${docsPath.value}-surround`, () => {
  return queryCollectionItemSurroundings('background', docsPath.value, {
    fields: ['description']
  })
})

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImageComponent('Saas')
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :description="page.description"
      :title="page.title"
    />

    <UPageBody>
      <ContentRenderer
        v-if="page.body"
        :value="page"
      />

      <USeparator v-if="surround?.length"/>

      <UContentSurround :surround="surround"/>
    </UPageBody>

    <template
      v-if="page?.body?.toc?.links?.length"
      #right
    >
      <UContentToc :links="page.body.toc.links"/>
    </template>
  </UPage>
</template>
