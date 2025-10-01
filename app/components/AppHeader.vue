<script lang="ts" setup>
const route = useRoute()

const items = computed(() => [{
  label: 'Home',
  to: '/',
  active: route.path === '/',
  badge: {
    label: '/',
    variant: 'subtle' as const,
    color: 'primary' as const
  },
  class: 'text-md'
}, {
  label: 'Projects',
  active: route.path.startsWith('/projects'),
  to: '/projects',
  class: 'text-md'
}, {
  label: 'Background',
  active: route.path.startsWith('/background'),
  to: '/background',
  class: 'text-md'
}])
</script>

<template>
  <UHeader
    class="lg:w-1/2 lg:max-w-full lg:mx-auto lg:border-0 lg:rounded-xl lg:top-4"
    title=""
  >
    <template #left>
      <NuxtLink to="/">
        <h1 class="text-2xl font-bold text-primary">Arnaud Michel</h1>
      </NuxtLink>
      <!--      <TemplateMenu /> -->
    </template>

    <UNavigationMenu
      :items="items"
      variant="pill"
    />

    <template #right>
      <UColorModeButton/>

      <UButton
        class="hidden lg:inline-flex"
        color="neutral"
        icon="i-simple-icons-github"
        label="My GitHub"
        to="https://github.com/MrArnaudMichel"
        trailing-icon="i-lucide-arrow-right"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        class="-mx-2.5"
        orientation="vertical"
      />
    </template>
  </UHeader>
</template>
