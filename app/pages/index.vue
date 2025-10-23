<script lang="ts" setup>
const { data: page } = await useAsyncData('index', () =>
  queryCollection('index').first()
)

// Récupération du changelog (même logique que ta page changelog)
const { data: changelog } = await useAsyncData('changelog', () =>
  queryCollection('changelog').first()
)
const { data: versions } = await useAsyncData('versions', () =>
  queryCollection('versions').order('date', 'DESC').all()
)

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>

<template>
  <div v-if="page">
    <!-- HERO -->
    <UPageHero
      :description="page.description"
      :links="page.hero.links"
      :title="page.title"
      class="main-title"
    >
      <template #top>
        <div
          class="absolute rounded-full dark:bg-primary blur-[300px] size-60 sm:size-80 transform -translate-x-1/2 left-1/2 -translate-y-80"
        />
        <LazyStarsBg />
      </template>
    </UPageHero>

    <!-- SECTIONS DYNAMIQUES -->
    <UPageSection
      v-for="(section, index) in page.sections"
      :key="index"
      :description="section.description"
      :features="section.features"
      :orientation="section.orientation"
      :reverse="section.reverse"
      :title="section.title"
    >
      <ImagePlaceholder />
    </UPageSection>

    <!-- FEATURES -->
    <UPageSection
      :description="page.features.description"
      :title="page.features.title"
    >
      <UPageGrid>
        <UPageCard
          v-for="(item, index) in page.features.items"
          :key="index"
          spotlight
          v-bind="item"
        />
      </UPageGrid>
    </UPageSection>

    <!-- TESTIMONIALS -->
    <UPageSection
      id="testimonials"
      :description="page.testimonials.description"
      :headline="page.testimonials.headline"
      :title="page.testimonials.title"
    >
      <UPageColumns class="xl:columns-4">
        <UPageCard
          v-for="(testimonial, index) in page.testimonials.items"
          :key="index"
          :description="testimonial.quote"
          :ui="{ description: 'before:content-[open-quote] after:content-[close-quote]' }"
          variant="subtle"
        >
          <template #footer>
            <UUser
              size="lg"
              v-bind="testimonial.user"
            />
          </template>
        </UPageCard>
      </UPageColumns>
    </UPageSection>

    <!-- 🆕 SECTION CHANGELOG -->
    <UPageSection
      v-if="changelog"
      id="changelog"
      :title="changelog.title"
      :description="changelog.description"
    >
      <UPageBody>
        <UChangelogVersions>
          <UChangelogVersion
            v-for="(version, index) in versions"
            :key="index"
            v-bind="version"
          >
            <template #body>
              <ContentRenderer :value="version.body"/>
            </template>
          </UChangelogVersion>
        </UChangelogVersions>
      </UPageBody>
    </UPageSection>
  </div>
</template>
