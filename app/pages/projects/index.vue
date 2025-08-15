<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('projects', () => queryCollection('projects').first())
const { data: posts } = await useAsyncData(route.path, () => queryCollection('posts').all())

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImageComponent('Saas')
</script>

<template>
  <UContainer>
    <UPageHeader
      v-bind="page"
      class="py-[50px]"
    />

    <UPageBody>
      <UBlogPosts>
        <div v-for="(post, index) in posts" :key="index" :class="[index === 0 && 'col-span-full']">
          <UBlogPost
            :to="post.path"
            :title="post.title"
            :description="post.description"
            :image="post.image"
            :date="new Date(post.end_date || post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })"
            :authors="post.authors"
            :badge="post.badge"
            :orientation="index === 0 ? 'horizontal' : 'vertical'"
            variant="naked"
            :ui="{
              description: 'line-clamp-2'
            }"
          />
        </div>
      </UBlogPosts>
    </UPageBody>
  </UContainer>
</template>
