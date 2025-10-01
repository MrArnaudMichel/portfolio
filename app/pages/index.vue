<script lang="ts" setup>
const {data: page} = await useAsyncData('index', () => queryCollection('index').first())

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
    <UPageHero
      :description="page.description"
      :links="page.hero.links"
      :title="page.title"
      class="main-title">
      <template #top>
        <div
          class="absolute rounded-full dark:bg-primary blur-[300px] size-60 sm:size-80 transform -translate-x-1/2 left-1/2 -translate-y-80"/>
        <LazyStarsBg/>
      </template>
    </UPageHero>

    <UPageSection
      v-for="(section, index) in page.sections"
      :key="index"
      :description="section.description"
      :features="section.features"
      :orientation="section.orientation"
      :reverse="section.reverse"
      :title="section.title"
    >
      <ImagePlaceholder/>
    </UPageSection>

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
  </div>
</template>
