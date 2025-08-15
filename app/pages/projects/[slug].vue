<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(route.path, () => queryCollection('posts').path(route.path).first())
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('posts', route.path, {
    fields: ['description']
  })
})

const title = post.value.seo?.title || post.value.title
const description = post.value.seo?.description || post.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

type MinimalPostDetail = { date?: Date | string, start_date?: Date | string, end_date?: Date | string }

const formatDate = (d?: Date | string) => d ? new Date(d).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }) : ''
const dateDisplay = computed(() => {
  const p = post.value as unknown as MinimalPostDetail
  const start = p?.start_date
  const end = p?.end_date || p?.date
  if (start && end) return `${formatDate(start)} – ${formatDate(end)}`
  return formatDate(end || start)
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
      :title="post.title"
      :description="post.description"
    >
      <template #headline>
        <UBadge
          v-bind="post.badge"
          variant="subtle"
        />
        <span class="text-muted">&middot;</span>
        <time class="text-muted">{{ dateDisplay }}</time>
        <span class="text-muted">&middot;</span>
        <UBadge v-if="post.main_language" variant="subtle">
          {{ post.main_language }}
        </UBadge>
      </template>

      <div class="flex items-center gap-3 mt-4">
        <span class="text-muted text-sm">Authors</span>
        <div class="flex items-center gap-2">
          <UTooltip
            v-for="(author, index) in post.authors"
            :key="index"
            :text="author.name"
          >
            <NuxtLink :to="author.to" target="_blank" class="inline-flex">
              <UAvatar
                v-bind="author.avatar"
                alt="Author avatar"
                size="sm"
              />
            </NuxtLink>
          </UTooltip>
        </div>
      </div>

      <div class="flex flex-col gap-3 mt-4">
        <div class="flex items-center gap-2">
          <UBadge v-if="post.role" variant="soft" color="primary" size="sm">
            {{ post.role }}
          </UBadge>
        </div>
        <div class="flex items-center gap-2">
          <UButton
            v-if="post.website"
            :to="post.website"
            target="_blank"
            color="primary"
            variant="soft"
            icon="i-lucide:globe"
            size="sm"
          >
            Voir le site
          </UButton>
          <UButton
            v-if="post.git_repo"
            :to="post.git_repo"
            target="_blank"
            color="neutral"
            variant="soft"
            icon="i-simple-icons:github"
            size="sm"
          >
            Voir le dépôt
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
