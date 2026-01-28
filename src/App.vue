<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/stores/settings'
import GeometricBackground from '@/components/GeometricBackground.vue'

const settingsStore = useSettingsStore()
const { locale } = useI18n()

onMounted(() => {
  // Sync i18n locale with settings store
  locale.value = settingsStore.locale
})
</script>

<template>
  <div class="relative h-screen w-full">
    <!-- Background persistente per tutta l'app -->
    <div class="absolute inset-0 z-0 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      <GeometricBackground />
    </div>

    <!-- Content con transizioni -->
    <div class="relative z-10 h-full w-full">
      <RouterView v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<style>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
