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
  if (lower.includes('ruby')) return 'i-simple-icons-ruby'
  if (lower.includes('go') || lower.includes('golang')) return 'i-simple-icons-go'
  if (lower.includes('php')) return 'i-simple-icons-php'
  if (lower.includes('swift')) return 'i-simple-icons-swift'
  if (lower.includes('kotlin')) return 'i-simple-icons-kotlin'
  if (lower === 'c#' || lower === 'csharp') return 'i-simple-icons-csharp'
  if (lower === 'c') return 'i-simple-icons-c'
  if (lower.includes('gtk')) return 'i-simple-icons-gtk'
  return 'i-lucide-code-2'
}
</script>

<template>
  <div class="grid gap-6 sm:gap-8">
    <!-- Featured Project (First one, larger) -->
    <NuxtLink
      v-if="projects[0]"
      :to="projects[0].path"
      class="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-default bg-default/50 backdrop-blur-sm transition-all hover:shadow-2xl hover:shadow-primary/5"
    >
      <div class="flex flex-col md:flex-row">
        <!-- Image -->
        <div class="relative w-full md:w-1/2 lg:w-3/5 aspect-video overflow-hidden">
          <img
            v-if="getImageSrc(projects[0].image)"
            :src="getImageSrc(projects[0].image)"
            :alt="projects[0].title"
            class="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          >
          <div
            v-else
            class="w-full h-full min-h-40 sm:min-h-56 flex items-center justify-center bg-elevated"
          >
            <UIcon
              name="i-lucide-image"
              class="w-12 h-12 sm:w-16 sm:h-16 text-muted/50"
            />
          </div>
          <!-- Badge -->
          <div
            v-if="projects[0].badge?.label"
            class="absolute top-3 left-3 sm:top-4 sm:left-4"
          >
            <UBadge
              :label="projects[0].badge.label"
              color="primary"
              variant="solid"
              size="md"
            />
          </div>
        </div>

        <!-- Content -->
        <div class="p-4 sm:p-6 lg:p-8 md:w-1/2 lg:w-2/5 flex flex-col justify-center gap-3 sm:gap-4">
          <div class="flex items-center gap-2 sm:gap-3">
            <UBadge
              :label="projects[0].main_language || 'Code'"
              :icon="getLanguageIcon(projects[0].main_language)"
              color="primary"
              variant="subtle"
              size="md"
            />
          </div>
          <div>
            <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold text-highlighted mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-200">
              {{ projects[0].title }}
            </h3>
            <p class="text-sm sm:text-base text-muted leading-relaxed line-clamp-3 sm:line-clamp-4">
              {{ projects[0].description }}
            </p>
          </div>
          <div class="flex items-center gap-2 text-primary font-semibold mt-auto pt-1 sm:pt-2 text-sm sm:text-base">
            <span>Explore project</span>
            <UIcon
              name="i-lucide-arrow-right"
              class="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-2"
            />
          </div>
        </div>
      </div>
    </NuxtLink>

    <!-- Other Projects Grid -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
      <NuxtLink
        v-for="project in projects.slice(1)"
        :key="project.path"
        :to="project.path"
        class="group relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-default bg-default/50 backdrop-blur-sm transition-all duration-200 hover:shadow-xl hover:shadow-primary/5"
      >
        <!-- Image -->
        <div class="relative aspect-video sm:aspect-[16/10] overflow-hidden">
          <img
            v-if="getImageSrc(project.image)"
            :src="getImageSrc(project.image)"
            :alt="project.title"
            class="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
          >
          <div
            v-else
            class="w-full h-full flex items-center justify-center bg-elevated"
          >
            <UIcon
              name="i-lucide-image"
              class="w-8 h-8 sm:w-10 sm:h-10 text-muted/50"
            />
          </div>
          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <!-- Language badge -->
          <div class="absolute top-2 right-2 sm:top-3 sm:right-3">
            <UBadge
              :label="project.main_language || 'Code'"
              :icon="getLanguageIcon(project.main_language)"
              color="neutral"
              variant="solid"
              size="sm"
            />
          </div>
        </div>

        <!-- Content -->
        <div class="flex flex-col flex-1 p-3 sm:p-4 lg:p-5">
          <h4 class="font-bold text-highlighted mb-1.5 sm:mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-1 text-base sm:text-lg">
            {{ project.title }}
          </h4>
          <p class="text-xs sm:text-sm text-muted line-clamp-2 leading-relaxed flex-1">
            {{ project.description }}
          </p>
          <!-- Footer with arrow -->
          <div class="flex items-center justify-between mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-default">
            <span class="text-xs font-medium text-muted group-hover:text-primary transition-colors">View details</span>
            <UIcon
              name="i-lucide-arrow-up-right"
              class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted group-hover:text-primary transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- View all button -->
    <div class="flex justify-center mt-4 sm:mt-6">
      <UButton
        to="/projects"
        color="primary"
        variant="soft"
        size="lg"
        trailing-icon="i-lucide-arrow-right"
        class="sm:text-base"
      >
        View all projects
      </UButton>
    </div>
  </div>
</template>
