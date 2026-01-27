<script setup lang="ts">
import { computed } from 'vue'

export interface BlurCardProps {
  padding?: string
  border?: boolean
  shadow?: 'sm' | 'md' | 'lg' | 'glow'
  rounded?: 'xl' | '2xl' | '3xl'
  hover?: boolean
}

const props = withDefaults(defineProps<BlurCardProps>(), {
  padding: 'p-8',
  border: true,
  shadow: 'sm',
  rounded: '3xl',
  hover: false,
})

const classes = computed(() => {
  const roundedClassMap: Record<NonNullable<BlurCardProps['rounded']>, string> = {
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
  }

  const shadowClassMap: Record<NonNullable<BlurCardProps['shadow']>, string> = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    glow: 'shadow-glow-yellow',
  }

  const baseClasses = [
    'relative bg-white/60 dark:bg-neutral-800/60 backdrop-blur-[12px]',
    roundedClassMap[props.rounded],
    props.padding,
  ]

  if (props.border) {
    baseClasses.push('border border-neutral-200/30 dark:border-neutral-700/30')
  }

  baseClasses.push(shadowClassMap[props.shadow])

  if (props.hover) {
    baseClasses.push('transition-all duration-300 hover:bg-white/80 dark:hover:bg-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-600')
  }

  return baseClasses.join(' ')
})
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
