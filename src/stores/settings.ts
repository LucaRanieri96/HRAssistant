import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

type Theme = 'light' | 'dark'
type Locale = 'it' | 'en'

export const useSettingsStore = defineStore('settings', () => {
  // State
  const theme = ref<Theme>((localStorage.getItem('theme') as Theme) || 'light')
  const locale = ref<Locale>((localStorage.getItem('locale') as Locale) || 'it')

  // Apply theme class on mount
  const applyTheme = () => {
    if (theme.value === 'dark') {
      document.documentElement.classList.add('app-dark')
      document.body.classList.add('app-dark')
    } else {
      document.documentElement.classList.remove('app-dark')
      document.body.classList.remove('app-dark')
    }
  }

  // Actions
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
  }

  const setLocale = (newLocale: Locale) => {
    locale.value = newLocale
  }

  // Watch for changes and persist
  watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme)
    applyTheme()
  })

  watch(locale, (newLocale) => {
    localStorage.setItem('locale', newLocale)
  })

  // Apply theme on store creation
  applyTheme()

  return {
    theme,
    locale,
    toggleTheme,
    setTheme,
    setLocale,
  }
})
