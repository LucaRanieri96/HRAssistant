<script setup lang="ts">
import { computed } from 'vue';

export interface PageTitleProps {
  title: string
  subtitle?: string
  showDivider?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<PageTitleProps>(), {
  showDivider: true,
  size: 'lg',
})

const titleClasses = computed(() => {
  if (props.size === 'sm') return 'text-[52px]'
  if (props.size === 'md') return 'text-[64px]'
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
    <h1 :class="[titleClasses, 'font-bold text-neutral-900 tracking-tight mb-4']">
      {{ title }}
    </h1>
    <p v-if="subtitle" :class="[subtitleClasses, 'text-neutral-500 mb-6']">
      {{ subtitle }}
    </p>
    <div v-if="showDivider" class="w-32 h-2 bg-secondary-500 rounded-full" />
  </div>
</template>
