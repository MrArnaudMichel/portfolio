<script lang="ts" setup>
const route = useRoute()

const { data: post } = await useAsyncData(
  `post-${route.params.slug}`,
  () => queryCollection('posts').path(route.path).first(),
  { watch: [() => route.params.slug] }
)
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

const { data: surround } = await useAsyncData(
  `surround-${route.params.slug}`,
  () => queryCollectionItemSurroundings('posts', route.path, {
    fields: ['description']
  }),
  { watch: [() => route.params.slug] }
)

const title = post.value.seo?.title || post.value.title
const description = post.value.seo?.description || post.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

type MinimalPostDetail = { date?: Date | string, start_date?: Date | string, end_date?: Date | string }

const formatDate = (d?: Date | string) => d
  ? new Date(d).toLocaleDateString('en', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  : ''
const dateDisplay = computed(() => {
  const p = post.value as unknown as MinimalPostDetail
  const start = p?.start_date ?? p?.date
  const hasEnd = !!p?.end_date
  if (start && hasEnd) return `${formatDate(start)} – ${formatDate(p.end_date as Date | string)}`
  if (start && !hasEnd) return `${formatDate(start)} – Ongoing`
  return hasEnd ? formatDate(p.end_date as Date | string) : 'Ongoing'
})

if (post.value.image?.src) {
  defineOgImage({
    url: post.value.image.src
  })
} else {
  defineOgImageComponent('Saas', {
    headline: 'Blog'
  })
}
</script>

<template>
  <UContainer v-if="post">
    <UPageHeader
      :description="post.description"
      :title="post.title"
    >
      <template #headline>
        <UBadge
          v-bind="post.badge"
          variant="subtle"
        />
        <span class="text-muted">&middot;</span>
        <time class="text-muted">{{ dateDisplay }}</time>
        <span class="text-muted">&middot;</span>
        <UBadge
          v-if="post.main_language"
          variant="subtle"
        >
          {{ post.main_language }}
        </UBadge>
      </template>

      <div class="flex items-center gap-3 mt-4">
        <UButton
          v-for="(author, index) in post.authors"
          :key="index"
          :to="author.to"
          color="neutral"
          size="sm"
          target="_blank"
          variant="subtle"
        >
          <UAvatar
            alt="Author avatar"
            size="2xs"
            v-bind="author.avatar"
          />

          {{ author.name }}
        </UButton>
      </div>

      <div class="flex flex-col gap-3 mt-4">
        <div class="flex items-center gap-2">
          <UButton
            v-if="post.website"
            :to="post.website"
            color="primary"
            icon="i-lucide:globe"
            size="sm"
            target="_blank"
          >
            Website
          </UButton>
          <UButton
            v-if="post.git_repo"
            :to="post.git_repo"
            color="neutral"
            icon="i-simple-icons:github"
            size="sm"
            target="_blank"
            variant="subtle"
          >
            Git Repository
          </UButton>
        </div>
      </div>
    </UPageHeader>

    <UPage>
      <UPageBody>
        <ContentRenderer
          v-if="post"
          :value="post"
        />

        <USeparator v-if="surround?.length" />

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template
        v-if="post?.body?.toc?.links?.length"
        #right
      >
        <UContentToc :links="post.body.toc.links" />
      </template>
    </UPage>
  </UContainer>
</template>
