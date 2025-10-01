<script lang="ts" setup>
const {data: page} = await useAsyncData('pricing', () => queryCollection('pricing').first())

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImageComponent('Saas')

const isYearly = ref('0')

const items = ref([
  {
    label: 'Monthly',
    value: '0'
  },
  {
    label: 'Yearly',
    value: '1'
  }
])
</script>

<template>
  <div v-if="page">
    <UPageHero
      :description="page.description"
      :title="page.title"
    >
      <template #links>
        <UTabs
          v-model="isYearly"
          :items="items"
          :ui="{
            list: 'ring ring-accented rounded-full',
            indicator: 'rounded-full',
            trigger: 'w-1/2'
          }"
          class="w-48"
          color="neutral"
          size="xs"
        />
      </template>
    </UPageHero>

    <UContainer>
      <UPricingPlans scale>
        <UPricingPlan
          v-for="(plan, index) in page.plans"
          :key="index"
          :billing-cycle="isYearly === '1' ? '/year' : '/month'"
          :price="isYearly === '1' ? plan.price.year : plan.price.month"
          v-bind="plan"
        />
      </UPricingPlans>
    </UContainer>

    <UPageSection>
      <UPageLogos>
        <UIcon
          v-for="icon in page.logos.icons"
          :key="icon"
          :name="icon"
          class="w-12 h-12 flex-shrink-0 text-muted"
        />
      </UPageLogos>
    </UPageSection>

    <UPageSection
      :description="page.faq.description"
      :title="page.faq.title"
    >
      <UPageAccordion
        :items="page.faq.items"
        class="max-w-4xl mx-auto"
        multiple
      />
    </UPageSection>
  </div>
</template>
