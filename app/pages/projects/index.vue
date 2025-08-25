<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('projects', () => queryCollection('projects').first())
// Fetch all posts, then sort client-side by end_date (fallback to date) in descending order for robust behavior
const { data: _posts } = await useAsyncData(route.path, () => queryCollection('posts').all())

// Ensure consistent ordering: prefer end_date, fallback to date
const posts = computed(() => {
  const arr = _posts.value || []
  return arr.slice().sort((a, b) => {
    const da = new Date(a.end_date || a.date).getTime()
    const db = new Date(b.end_date || b.date).getTime()
    return db - da
  })
})

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
        <div
          v-for="(post, index) in posts"
          :key="index"
          :class="[index === 0 && 'col-span-full']"
        >
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
