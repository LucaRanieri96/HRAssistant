<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  visible: boolean
  title: string
  maxHeight?: string
}

interface Emits {
  (e: 'update:visible', value: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  maxHeight: '85vh'
})

const emit = defineEmits<Emits>()

const isExpanded = ref(false)

const close = () => {
  isExpanded.value = false
  emit('update:visible', false)
}

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

watch(() => props.visible, (newVal) => {
  if (!newVal) {
    isExpanded.value = false
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]" @click="close" />
    </Transition>

    <Transition name="slide-down">
      <div v-if="visible" class="fixed top-0 left-0 right-0 z-[9999] flex justify-center" @click.stop>
        <div class="w-full max-w-7xl mx-4 mt-4 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl"
          :style="{ maxHeight: isExpanded ? maxHeight : '40vh' }"
          style="transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)">
          <div
            class="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/95 dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-900/95" />

          <div class="relative border-b border-gray-200/50 dark:border-gray-700/50">
            <div class="flex items-center justify-between px-8 py-6">
              <div class="flex items-center gap-4">
                <h3 class="text-h3 font-bold">
                  {{ title }}
                </h3>
              </div>

              <div class="flex items-center gap-3">
                <button @click="toggleExpand"
                  class="p-4 rounded-2xl bg-secondary-500/10 hover:bg-secondary-500/20 active:bg-secondary-500/30 active:scale-95 transition-all flex justify-center items-center"
                  :title="isExpanded ? 'Collapse' : 'Expand'">
                  <i :class="isExpanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
                    class=" text-secondary-700 dark:text-secondary-300" style="font-size: 1.5rem;" />
                </button>

                <!-- Close Button -->
                <button @click="close"
                  class="p-4 rounded-2xl bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 active:scale-95 transition-all flex justify-center items-center">
                  <i class="pi pi-times  text-red-600 dark:text-red-400" style="font-size: 1.5rem;" />
                </button>
              </div>
            </div>

            <!-- Drag indicator -->
            <div class="flex justify-center pb-4">
              <div class="w-20 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
            </div>
          </div>

          <!-- Content -->
          <div class="relative overflow-y-auto"
            :style="{ height: isExpanded ? 'calc(' + maxHeight + ' - 140px)' : 'calc(65vh - 140px)' }"
            style="transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1)">
            <div class="p-6">
              <slot />
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

.slide-down-enter-active {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-down-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.slide-down-enter-from {
  transform: translateY(-100%);
}

.slide-down-leave-to {
  transform: translateY(-100%);
}
</style>
