<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('projects', () => queryCollection('projects').first())
const { data: posts } = await useAsyncData(route.path, () => queryCollection('posts').all())

type MinimalPost = { date: Date | string, end_date?: Date | string }

const sortedPosts = computed(() => {
  const items = (posts.value || []) as MinimalPost[]
  return [...items].sort((a: MinimalPost, b: MinimalPost) => {
    const aEnd = a.end_date || a.date
    const bEnd = b.end_date || b.date
    // Newest end date first
    return new Date(bEnd).getTime() - new Date(aEnd).getTime()
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
        <div v-for="(post, index) in sortedPosts" :key="index" :class="[index === 0 && 'col-span-full']">
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
          <div class="flex items-center gap-2 mt-2">
            <UBadge v-if="post.main_language" variant="soft" color="neutral" size="xs">
              {{ post.main_language }}
            </UBadge>
          </div>
        </div>
      </UBlogPosts>
    </UPageBody>
  </UContainer>
</template>
