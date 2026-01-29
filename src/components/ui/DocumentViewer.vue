<script setup lang="ts">
import { ref, watch } from 'vue'

export interface DocumentViewerProps {
  visible: boolean
  title: string
  documentUrl?: string
  documentType?: 'pdf' | 'image'
}

const props = withDefaults(defineProps<DocumentViewerProps>(), {
  documentType: 'pdf'
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()

const close = () => {
  emit('update:visible', false)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]" @click="close" />
    </Transition>

    <Transition name="slide-up">
      <div v-if="visible" class="fixed inset-4 z-[9999] flex items-center justify-center" @click.stop>
        <div
          class="w-full h-full max-w-[95vw] max-h-[95vh] rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col">
          <div
            class="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/95 dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-900/95" />

          <!-- Header -->
          <div class="relative border-b border-gray-200/50 dark:border-gray-700/50 shrink-0">
            <div class="flex items-center justify-between px-8 py-6">
              <div class="flex items-center gap-4">
                <i class="pi pi-file text-primary-600 dark:text-primary-400" style="font-size: 2rem" />
                <h3 class="text-h3 font-bold">
                  {{ title }}
                </h3>
              </div>

              <div class="flex items-center gap-3">
                <!-- Close Button -->
                <button @click="close"
                  class="p-4 rounded-2xl bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 btn-bounce transition-all flex justify-center items-center">
                  <i class="pi pi-times text-red-600 dark:text-red-400" style="font-size: 1.5rem;" />
                </button>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="relative flex-1 overflow-hidden">
            <div class="w-full h-full p-6">
              <div v-if="documentUrl" class="w-full h-full">
                <!-- PDF Viewer -->
                <iframe v-if="documentType === 'pdf'" :src="documentUrl"
                  class="w-full h-full rounded-2xl border-0 shadow-lg" title="Document viewer" />
                <!-- Image Viewer -->
                <div v-else
                  class="w-full h-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 rounded-2xl">
                  <img :src="documentUrl" :alt="title" class="max-w-full max-h-full object-contain rounded-xl" />
                </div>
              </div>
              <div v-else class="w-full h-full flex flex-col items-center justify-center">
                <i class="pi pi-file text-icon-xxl opacity-30 mb-8" />
                <p class="text-h4 opacity-50">Nessuna anteprima disponibile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-20px);
}
</style>
