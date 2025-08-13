export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    }
  },
  uiPro: {
    changelogVersions: {
      slots: {
        root: 'relative',
        container: 'flex flex-col gap-y-8 sm:gap-y-12 lg:gap-y-16',
        indicator: 'absolute hidden lg:block overflow-hidden inset-y-3 left-32 h-full w-px bg-green-400 dark:bg-green-600 -ml-[8.5px]',
        beam: 'absolute left-0 top-0 w-full bg-primary will-change-[height]'
      }
    }
  }
})
