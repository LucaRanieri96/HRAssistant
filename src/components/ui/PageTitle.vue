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
  <div class="mb-12">
    <div v-if="showBack" class="mb-6">
      <button @click="emit('back')"
        class="flex items-center gap-3 text-h5 opacity-70 hover:opacity-100 transition-opacity active:scale-95">
        <i class="pi pi-arrow-left text-icon-m" />
        <span>Indietro</span>
      </button>
    </div>
    <h1 :class="[titleClasses, 'font-bold tracking-tight mb-4']">
      {{ title }}
    </h1>
    <p v-if="subtitle" :class="[subtitleClasses, 'opacity-70 mb-6']">
      {{ subtitle }}
    </p>
    <div v-if="showDivider" class="w-32 h-2 bg-secondary-500 rounded-full" />
  </div>
</template>
