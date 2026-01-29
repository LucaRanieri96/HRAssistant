<script setup lang="ts">
import { computed } from 'vue';

export interface PageTitleProps {
  title: string
  subtitle?: string
  showDivider?: boolean
  showBack?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<PageTitleProps>(), {
  showDivider: true,
  showBack: false,
  size: 'lg',
})

const emit = defineEmits<{
  back: []
}>()

const titleClasses = computed(() => {
  if (props.size === 'sm') return 'text-display-3'
  if (props.size === 'md') return 'text-display-0'
  return 'text-display-1'
})

const subtitleClasses = computed(() => {
  if (props.size === 'sm') return 'text-h5'
  if (props.size === 'md') return 'text-h4'
  return 'text-h4'
})
</script>

<template>
  <div class="mb-10 mt-4">
    <div v-if="showBack" class="mb-8">
      <button @click="emit('back')" class="flex items-center gap-3 text-h5 opacity-70 hover:opacity-100 btn-bounce">
        <i class="pi pi-arrow-left" style="font-size: 1.5rem;" />
        <span class="text-4xl">Indietro</span>
      </button>
    </div>
    <h1 :class="[titleClasses, 'font-bold tracking-tight mb-6']">
      {{ title }}
    </h1>
    <div v-if="subtitle || $slots.actions" class="flex items-center justify-between gap-8 mb-8">
      <p v-if="subtitle" :class="[subtitleClasses, 'opacity-70']">
        {{ subtitle }}
      </p>
      <div v-if="$slots.actions" class="shrink-0">
        <slot name="actions" />
      </div>
    </div>
    <div v-if="showDivider" class="w-full h-1.5 bg-secondary-500 rounded-full opacity-40" />
  </div>
</template>
