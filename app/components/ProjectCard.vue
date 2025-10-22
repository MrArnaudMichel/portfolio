<template>
  <NuxtLink
    class="flex flex-col md:flex-row items-start gap-4 group relative my-5 p-4 sm:p-6 border border-default rounded-md bg-default transition-colors hover:bg-primary/10 hover:border-primary"
    :to="to"
  >
    <div class="flex-1">
      <p class="text-highlighted font-semibold">
        <NuxtLink :to="to" class="hover:underline">{{ title }}</NuxtLink>
      </p>
      <p class="leading-7" style="margin: 0" v-html="description" />
    </div>

    <div v-if="image" class="w-full md:w-1/2 flex justify-center">
      <img
        :src="image"
        :alt="title"
        class="rounded-md w-full will-change-transform cursor-zoom-in"
      />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  to: String,
  description: String,
  image: String
})
</script>
