<script setup lang="ts">
const route = useRoute()

const items = computed(() => [{
  label: 'Home',
  to: '/docs',
  active: route.path.startsWith('/docs'),
  badge: {
    label: '/',
    variant: 'subtle' as const,
    color: 'primary' as const
  },
  class: 'text-md'
}, {
  label: 'Blog',
  to: '/blog',
  class: 'text-md'
}, {
  label: 'Changelog',
  to: '/changelog',
  badge: {
    label: 'New',
    color: 'primary' as const
  },
  class: 'text-md'
}])
</script>

<template>
  <UHeader
    class="w-1/2 max-w-full mx-auto border-0 rounded-xl top-4"
    title=""
  >
    <template #left>
      <NuxtLink to="/">
        <h1 class="text-2xl font-bold text-primary">am</h1>
<!--        <nuxt-img src="/logo.svg" alt="Logo" width="100" height="24" />-->
      </NuxtLink>
      <!--      <TemplateMenu /> -->
    </template>

    <UNavigationMenu
      :items="items"
      variant="pill"
    />

    <template #right>
      <UColorModeButton />

      <UButton
        icon="i-lucide-log-in"
        color="neutral"
        variant="ghost"
        to="/login"
        class="lg:hidden"
      />

      <UButton
        label="Sign in"
        color="neutral"
        variant="outline"
        to="/login"
        class="hidden lg:inline-flex"
      />

      <UButton
        label="Sign up"
        color="neutral"
        trailing-icon="i-lucide-arrow-right"
        class="hidden lg:inline-flex"
        to="/signup"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />

      <USeparator class="my-6" />

      <UButton
        label="Sign in"
        color="neutral"
        variant="subtle"
        to="/login"
        block
        class="mb-3"
      />
      <UButton
        label="Sign up"
        color="neutral"
        to="/signup"
        block
      />
    </template>
  </UHeader>
</template>
