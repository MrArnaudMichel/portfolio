<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>

<template>
  <div class="flex justify-center my-8">
    <UButton
      :to="to"
      target="_blank"
      icon="i-simple-icons-flathub"
      size="xl"
      color="primary"
      variant="solid"
      class="rounded-full px-8 py-4 font-bold text-lg transition-transform hover:scale-105"
    >
      Download on Flathub
    </UButton>
  </div>
</template>
