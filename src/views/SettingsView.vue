<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '../stores/settings'
import ScreenLayout from '../components/layout/ScreenLayout.vue'
import PageTitle from '../components/ui/PageTitle.vue'
import SettingCard from '../components/ui/SettingCard.vue'
import BottomNav from '../components/BottomNav.vue'
import type { Screen } from '../components/BottomNav.vue'

const router = useRouter()
const settingsStore = useSettingsStore()
const { theme, locale } = storeToRefs(settingsStore)
const { locale: i18nLocale, t } = useI18n()

const currentScreen = ref<Screen>('settings')

const toggleTheme = () => {
  settingsStore.toggleTheme()
}

const toggleLocale = () => {
  const newLocale = locale.value === 'it' ? 'en' : 'it'
  settingsStore.setLocale(newLocale)
  i18nLocale.value = newLocale
}

const getThemeIcon = () => {
  return theme.value === 'light' ? 'pi-sun' : 'pi-moon'
}

const getThemeLabel = () => {
  return t(theme.value === 'light' ? 'settings.themeLight' : 'settings.themeDark')
}

const getLocaleLabel = () => {
  return t(locale.value === 'it' ? 'settings.languageIt' : 'settings.languageEn')
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
      <SettingCard :icon="getThemeIcon()" :title="$t('settings.theme')" :subtitle="getThemeLabel()"
        @click="toggleTheme" />

      <!-- Language Setting -->
      <SettingCard icon="pi-globe" :title="$t('settings.language')" :subtitle="getLocaleLabel()"
        @click="toggleLocale" />
    </div>

    <template #bottom-nav>
      <BottomNav :current-screen="currentScreen" @navigate="handleNavigate" @home="handleHome" />
    </template>
  </ScreenLayout>
</template>
