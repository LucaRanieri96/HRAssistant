<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '../stores/settings'
import { useNavigationStore } from '../stores/navigation'
import ScreenLayout from '../components/layout/ScreenLayout.vue'
import PageTitle from '../components/ui/PageTitle.vue'
import SettingCard from '../components/ui/SettingCard.vue'
import BottomNav from '../components/BottomNav.vue'
import type { Screen } from '../components/BottomNav.vue'

const router = useRouter()
const settingsStore = useSettingsStore()
const navigationStore = useNavigationStore()
const { theme, locale } = storeToRefs(settingsStore)
const { locale: i18nLocale, t } = useI18n()

const currentScreen = ref<Screen>('settings')

const isDarkMode = computed({
  get: () => theme.value === 'dark',
  set: (value: boolean) => {
    settingsStore.setTheme(value ? 'dark' : 'light')
  }
})

const isEnglish = computed({
  get: () => locale.value === 'en',
  set: (value: boolean) => {
    const newLocale = value ? 'en' : 'it'
    settingsStore.setLocale(newLocale)
    i18nLocale.value = newLocale
  }
})

const getThemeIcon = () => {
  return theme.value === 'light' ? 'pi-sun' : 'pi-moon'
}

const getThemeSubtitle = () => {
  return t(theme.value === 'light' ? 'settings.themeLight' : 'settings.themeDark')
}

const getLocaleSubtitle = () => {
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

const handleBack = () => {
  navigationStore.goBack('/settings')
}
</script>

<template>
  <ScreenLayout content-class="flex-1 flex flex-col">
    <template #header>
      <PageTitle :title="$t('settings.title')" :show-back="true" @back="handleBack" />
    </template>

    <div class="flex-1 flex flex-col gap-4 pb-8">
      <!-- Theme Setting -->
      <SettingCard :icon="getThemeIcon()" :title="$t('settings.theme')" :subtitle="getThemeSubtitle()"
        v-model="isDarkMode" />

      <!-- Language Setting -->
      <SettingCard icon="pi-globe" :title="$t('settings.language')" :subtitle="getLocaleSubtitle()"
        v-model="isEnglish" />
    </div>

    <template #bottom-nav>
      <BottomNav :current-screen="currentScreen" @navigate="handleNavigate" @home="handleHome" />
    </template>
  </ScreenLayout>
</template>
