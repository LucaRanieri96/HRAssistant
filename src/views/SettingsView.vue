<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '../stores/settings'
import ScreenLayout from '../components/layout/ScreenLayout.vue'
import PageTitle from '../components/ui/PageTitle.vue'
import BottomNav from '../components/BottomNav.vue'
import type { Screen } from '../components/BottomNav.vue'

const router = useRouter()
const settingsStore = useSettingsStore()
const { theme, locale } = storeToRefs(settingsStore)
const { locale: i18nLocale } = useI18n()

const currentScreen = ref<Screen>('settings')

const toggleTheme = () => {
  settingsStore.toggleTheme()
}

const toggleLocale = () => {
  const newLocale = locale.value === 'it' ? 'en' : 'it'
  settingsStore.setLocale(newLocale)
  i18nLocale.value = newLocale
}

const getThemeLabel = () => {
  return theme.value === 'light' ? 'settings.themeLight' : 'settings.themeDark'
}

const getLocaleLabel = () => {
  return locale.value === 'it' ? 'settings.languageIt' : 'settings.languageEn'
}

const handleNavigate = (screen: Screen) => {
  currentScreen.value = screen
  if (screen === 'history') {
    // Navigate to history
  } else if (screen === 'settings') {
    // Already on settings
  }
}

const handleHome = () => {
  router.push('/')
}
</script>

<template>
  <ScreenLayout content-class="flex-1 flex flex-col">
    <template #header>
      <PageTitle :title="$t('settings.title')" />
    </template>

    <div class="flex-1 flex flex-col gap-4 pb-8">
      <!-- Theme Setting -->
      <button @click="toggleTheme"
        class="flex items-center justify-between p-8 bg-white dark:bg-neutral-800 rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 transition-all duration-200 active:scale-[0.98] active:bg-neutral-50 dark:active:bg-neutral-700">
        <div class="flex items-center gap-6">
          <i class="pi text-icon-l" :class="theme === 'light' ? 'pi-sun' : 'pi-moon'"></i>
          <div class="text-left">
            <div class="text-h5 font-bold">
              {{ $t('settings.theme') }}
            </div>
            <div class="text-body-l opacity-70">
              {{ $t(getThemeLabel()) }}
            </div>
          </div>
        </div>
        <i class="pi pi-angle-right text-icon-m text-neutral-400"></i>
      </button>

      <!-- Language Setting -->
      <button @click="toggleLocale"
        class="flex items-center justify-between p-8 bg-white dark:bg-neutral-800 rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 transition-all duration-200 active:scale-[0.98] active:bg-neutral-50 dark:active:bg-neutral-700">
        <div class="flex items-center gap-6">
          <i class="pi pi-globe text-icon-l text-neutral-900 dark:text-neutral-50"></i>
          <div class="text-left">
            <div class="text-h5 font-bold text-neutral-900 dark:text-neutral-50">
              {{ $t('settings.language') }}
            </div>
            <div class="text-body-l text-neutral-600 dark:text-neutral-400">
              {{ $t(getLocaleLabel()) }}
            </div>
          </div>
        </div>
        <i class="pi pi-angle-right text-icon-m text-neutral-400"></i>
      </button>
    </div>

    <template #bottom-nav>
      <BottomNav :current-screen="currentScreen" @navigate="handleNavigate" @home="handleHome" />
    </template>
  </ScreenLayout>
</template>
