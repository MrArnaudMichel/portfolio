<script lang="ts" setup>
defineProps<{
  orientation: 'horizontal' | 'vertical'
}>()
</script>

<template>
  <div
    :class="orientation === 'vertical' ? 'flex-col space-y-4' : 'flex-row   space-x-4'"
    class="flex items-center justify-between"
  >
    <slot/>
  </div>
</template>
