<script setup lang="ts">
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
      <UColorModeButton />

      <UButton
        icon="i-lucide-log-in"
        color="neutral"
        variant="ghost"
        to="/login"
        class="lg:hidden"
      />

      <UButton
        label="My GitHub"
        icon="i-simple-icons-github"
        color="neutral"
        trailing-icon="i-lucide-arrow-right"
        class="hidden lg:inline-flex"
        to="https://github.com/MrArnaudMichel"
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
