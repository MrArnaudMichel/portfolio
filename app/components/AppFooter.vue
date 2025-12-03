<script lang="ts" setup>
const repoUrl = 'https://github.com/MrArnaudMichel/portfolio'

const columns = [{
  label: 'Docs',
  children: [{
    label: 'Home',
    icon: 'i-lucide-home',
    to: '/'
  }, {
    label: 'Projects',
    icon: 'i-lucide-book',
    to: '/projects'
  }, {
    label: 'Background',
    icon: 'i-lucide-briefcase',
    to: '/background'
  }]
}, {
  label: 'Social',
  children: [{
    label: 'Github',
    icon: 'i-simple-icons-github',
    to: 'https://github.com/MrArnaudMichel',
    target: '_blank'
  }, {
    label: 'Gitlab',
    icon: 'i-simple-icons-gitlab',
    to: 'https://gitlab.com/MrArnaudMichel',
    target: '_blank'
  }, {
    label: 'Linkedin',
    icon: 'i-simple-icons-linkedin',
    to: 'https://www.linkedin.com/in/mrarnaudmichel/',
    target: '_blank'
  }, {
    label: 'CV',
    icon: 'i-simple-icons-readme',
    to: '/cv.pdf',
    target: '_blank'
  }]
}]
</script>

<template>
  <USeparator
    class="h-px"
    icon="i-lucide-chevron-down"
  />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns">
          <template #right>
            <div>
              <div class="space-y-3 md:col-span-2">
                <h2 class="text-lg font-semibold">
                  About this site
                </h2>
                <p class="text-sm text-muted">
                  This is a personal portfolio. The website source code is available on GitHub. Check the repository
                  here:
                </p>
                <UButton
                  :to="repoUrl"
                  class="align-baseline"
                  color="primary"
                  icon="i-simple-icons-github"
                  label="MrArnaudMichel/portfolio"
                  target="_blank"
                  variant="subtle"
                />
              </div>
            </div>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-sm">
        Copyright © {{ new Date().getFullYear() }}. All rights reserved.
      </p>
    </template>

    <template #right>
      <UColorModeButton />

      <UButton
        :to="repoUrl"
        aria-label="GitHub"
        color="neutral"
        icon="i-simple-icons-github"
        target="_blank"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
