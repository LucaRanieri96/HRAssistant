<script setup lang="ts">
import { computed } from 'vue'

export interface BlurCardProps {
  padding?: string
  border?: boolean
  rounded?: 'xl' | '2xl' | '3xl'
}

const props = withDefaults(defineProps<BlurCardProps>(), {
  padding: 'p-8',
  border: false,
  rounded: '3xl',
})

const classes = computed(() => {
  const roundedClassMap: Record<NonNullable<BlurCardProps['rounded']>, string> = {
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
  }

  const baseClasses = [
    'relative bg-white/60 dark:bg-neutral-800/60 backdrop-blur-[12px]',
    'shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.25)]',
    roundedClassMap[props.rounded],
    props.padding,
  ]

  if (props.border) {
    baseClasses.push('border border-neutral-200/30 dark:border-neutral-700/30')
  }
  return baseClasses.join(' ')
})
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
