<template>
  <UDropdownMenu
    v-slot="{ open }"
    :items="[{
      label: 'Starter',
      to: 'https://starter-template.nuxt.dev/'
    }, {
      label: 'Landing',
      to: 'https://landing-template.nuxt.dev/'
    }, {
      label: 'Docs',
      to: 'https://docs-template.nuxt.dev/'
    }, {
      label: 'SaaS',
      to: 'https://saas-template.nuxt.dev/',
      color: 'primary',
      checked: true,
      type: 'checkbox'
    }, {
      label: 'Dashboard',
      to: 'https://dashboard-template.nuxt.dev/'
    }, {
      label: 'Chat',
      to: 'https://chat-template.nuxt.dev/'
    }, {
      label: 'Portfolio',
      to: 'https://portfolio-template.nuxt.dev/'
    }, {
      label: 'Changelog',
      to: 'https://changelog-template.nuxt.dev/'
    }]"
    :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width) min-w-0' }"
    :content="{ align: 'start' }"
    size="xs"
  >
    <UButton
      :class="[open && 'bg-primary/15']"
      :ui="{
        trailingIcon: ['transition-transform duration-200', open ? 'rotate-180' : undefined].filter(Boolean).join(' ')
      }"
      class="-mb-[6px] font-semibold rounded-full truncate"
      label="SaaS"
      size="xs"
      trailing-icon="i-lucide-chevron-down"
      variant="subtle"
    />
  </UDropdownMenu>
</template>
