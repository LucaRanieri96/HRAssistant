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
  const baseClasses = [
    'relative bg-white/60 backdrop-blur-[12px]',
    `rounded-${props.rounded}`,
    props.padding,
  ]

  if (props.border) {
    baseClasses.push('border border-neutral-200/30')
  }

  if (props.shadow === 'sm') {
    baseClasses.push('shadow-sm')
  } else if (props.shadow === 'md') {
    baseClasses.push('shadow-md')
  } else if (props.shadow === 'lg') {
    baseClasses.push('shadow-lg')
  } else if (props.shadow === 'glow') {
    baseClasses.push('shadow-glow-yellow')
  }

  if (props.hover) {
    baseClasses.push('transition-all duration-300 hover:bg-white/80 hover:border-neutral-300')
  }

  return baseClasses.join(' ')
})
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
