<script setup lang="ts">
// Fetch all projects
const { data: _posts } = await useAsyncData('projects-showcase', () =>
  queryCollection('posts').all()
)

type Project = {
  date?: string | Date
  start_date?: string | Date
  end_date?: string | Date
  path?: string
  title?: string
  description?: string
  image?: { src: string } | string
  badge?: { label: string }
  main_language?: string
}

// Get the 5 most recent projects, sorted by date
const projects = computed(() => {
  const arr = ((_posts.value || []) as Project[]).filter(p =>
    (p.path || '').startsWith('/projects/')
  )

  const toTime = (d: unknown) => {
    if (typeof d === 'string' || d instanceof Date) {
      const t = new Date(d).getTime()
      return Number.isFinite(t) ? t : 0
    }
    return 0
  }

  return arr.slice().sort((a: Project, b: Project) => {
    const aCurrent = !a?.end_date
    const bCurrent = !b?.end_date
    if (aCurrent !== bCurrent) return aCurrent ? -1 : 1

    const aEnd = toTime(a?.end_date ?? a?.date)
    const bEnd = toTime(b?.end_date ?? b?.date)
    if (bEnd !== aEnd) return bEnd - aEnd

    const aStart = toTime(a?.start_date ?? a?.date)
    const bStart = toTime(b?.start_date ?? b?.date)
    return bStart - aStart
  }).slice(0, 5)
})

const getImageSrc = (image: { src: string } | string | undefined) => {
  if (!image) return ''
  if (typeof image === 'string') return image
  return image.src
}

const getLanguageIcon = (lang: string | undefined) => {
  if (!lang) return 'i-lucide-code-2'
  const lower = lang.toLowerCase()
  if (lower.includes('rust')) return 'i-simple-icons-rust'
  if (lower.includes('java') && !lower.includes('javascript')) return 'i-simple-icons-java'
  if (lower.includes('typescript')) return 'i-simple-icons-typescript'
  if (lower.includes('javascript')) return 'i-simple-icons-javascript'
  if (lower.includes('python')) return 'i-simple-icons-python'
  if (lower.includes('c++') || lower.includes('cpp')) return 'i-simple-icons-cplusplus'
  if (lower === 'c') return 'i-simple-icons-c'
  if (lower.includes('gtk')) return 'i-simple-icons-gtk'
  return 'i-lucide-code-2'
}
</script>

<template>
  <div class="grid gap-6">
    <!-- Featured Project (First one, larger) -->
    <NuxtLink
      v-if="projects[0]"
      :to="projects[0].path"
      class="group relative overflow-hidden rounded-xl border border-default bg-default transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
    >
      <div class="flex flex-col lg:flex-row">
        <!-- Image -->
        <div class="relative lg:w-1/2 aspect-video lg:aspect-auto overflow-hidden bg-elevated">
          <img
            v-if="getImageSrc(projects[0].image)"
            :src="getImageSrc(projects[0].image)"
            :alt="projects[0].title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div v-else class="w-full h-full min-h-48 flex items-center justify-center">
            <UIcon name="i-lucide-image" class="w-12 h-12 text-muted" />
          </div>
          <!-- Badge -->
          <div v-if="projects[0].badge?.label" class="absolute top-4 left-4">
            <span class="px-3 py-1 text-xs font-medium rounded-full bg-primary text-white">
              {{ projects[0].badge.label }}
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6 lg:p-8 lg:w-1/2 flex flex-col justify-center">
          <div class="flex items-center gap-2 mb-3">
            <UIcon :name="getLanguageIcon(projects[0].main_language)" class="w-5 h-5 text-primary" />
            <span class="text-sm font-medium text-muted">{{ projects[0].main_language || 'Code' }}</span>
          </div>
          <h3 class="text-2xl lg:text-3xl font-bold text-highlighted mb-3 group-hover:text-primary transition-colors">
            {{ projects[0].title }}
          </h3>
          <p class="text-muted leading-relaxed line-clamp-3">
            {{ projects[0].description }}
          </p>
          <div class="mt-4 flex items-center text-primary font-medium">
            <span>View project</span>
            <UIcon name="i-lucide-arrow-right" class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </NuxtLink>

    <!-- Other Projects Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <NuxtLink
        v-for="project in projects.slice(1)"
        :key="project.path"
        :to="project.path"
        class="group relative overflow-hidden rounded-xl border border-default bg-default transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
      >
        <!-- Image -->
        <div class="relative aspect-video overflow-hidden bg-elevated">
          <img
            v-if="getImageSrc(project.image)"
            :src="getImageSrc(project.image)"
            :alt="project.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <UIcon name="i-lucide-image" class="w-8 h-8 text-muted" />
          </div>
          <!-- Language badge -->
          <div class="absolute top-3 right-3">
            <div class="flex items-center gap-1.5 px-2 py-1 rounded-full bg-default/90 backdrop-blur-sm border border-default">
              <UIcon :name="getLanguageIcon(project.main_language)" class="w-3.5 h-3.5 text-primary" />
              <span class="text-xs font-medium text-highlighted">{{ project.main_language || 'Code' }}</span>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="p-4">
          <h4 class="font-semibold text-highlighted mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {{ project.title }}
          </h4>
          <p class="text-sm text-muted line-clamp-2 leading-relaxed">
            {{ project.description }}
          </p>
        </div>

        <!-- Hover arrow indicator -->
        <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <UIcon name="i-lucide-arrow-up-right" class="w-5 h-5 text-primary" />
        </div>
      </NuxtLink>
    </div>

    <!-- View all button -->
    <div class="flex justify-center mt-4">
      <UButton
        to="/projects"
        color="primary"
        variant="outline"
        size="lg"
        trailing-icon="i-lucide-arrow-right"
        class="font-medium"
      >
        View all projects
      </UButton>
    </div>
  </div>
</template>
