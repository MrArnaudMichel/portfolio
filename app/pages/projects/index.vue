<script lang="ts" setup>
const route = useRoute()

const { data: page } = await useAsyncData('projects', () => queryCollection('projects').first())
// Fetch all posts, then sort client-side with custom rules
const { data: _posts } = await useAsyncData(route.path, () => queryCollection('posts').all())

type MinimalPost = {
  date?: string | Date
  start_date?: string | Date
  end_date?: string | Date
  path?: string
  title?: string
  description?: string
  image?: unknown
  authors?: unknown
  badge?: unknown
}

const posts = computed(() => {
  // Only keep items that belong to the projects section
  const arr = ((_posts.value || []) as MinimalPost[]).filter(p => (p.path || '').startsWith('/projects/'))
  const toTime = (d: unknown) => {
    if (typeof d === 'string' || d instanceof Date) {
      const t = new Date(d).getTime()
      return Number.isFinite(t) ? t : 0
    }
    return 0
  }
  return arr.slice().sort((a: MinimalPost, b: MinimalPost) => {
    const aCurrent = !a?.end_date
    const bCurrent = !b?.end_date
    if (aCurrent !== bCurrent) return aCurrent ? -1 : 1

    const aEnd = toTime(a?.end_date ?? a?.date)
    const bEnd = toTime(b?.end_date ?? b?.date)
    if (bEnd !== aEnd) return bEnd - aEnd

    const aStart = toTime(a?.start_date ?? a?.date)
    const bStart = toTime(b?.start_date ?? b?.date)
    return bStart - aStart
  })
})

const formatDate = (d?: string | Date) => (d
  ? new Date(d).toLocaleDateString('en', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  : '')
const dateRange = (p: MinimalPost) => {
  const start = p?.start_date ?? p?.date
  const hasEnd = !!p?.end_date
  if (start && hasEnd) return `${formatDate(start)} – ${formatDate(p.end_date as string | Date)}`
  if (start && !hasEnd) return `${formatDate(start)} – Ongoing`
  // No start date available
  return hasEnd ? formatDate(p.end_date as string | Date) : 'Ongoing'
}
const dateRangeAny = (p: unknown) => dateRange(p as MinimalPost)

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
      class="py-[50px]"
      v-bind="page"
    />

    <UPageBody>
      <UBlogPosts>
        <div
          v-for="(post, index) in posts"
          :key="index"
          :class="[index === 0 && 'col-span-full']"
        >
          <UBlogPost
            :authors="post.authors"
            :badge="post.badge"
            :date="dateRangeAny(post)"
            :description="post.description"
            :image="post.image"
            :orientation="index === 0 ? 'horizontal' : 'vertical'"
            :title="post.title"
            :to="post.path"
            :ui="{
              description: 'line-clamp-2'
            }"
            variant="naked"
          />
        </div>
      </UBlogPosts>
    </UPageBody>
  </UContainer>
</template>
