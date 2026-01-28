<script setup lang="ts">
import { computed } from 'vue'

export interface BlurCardProps {
  padding?: string
  rounded?: 'xl' | '2xl' | '3xl'
}

const props = withDefaults(defineProps<BlurCardProps>(), {
  padding: 'p-8',
  rounded: '3xl',
})

const classes = computed(() => {
  const roundedClassMap: Record<NonNullable<BlurCardProps['rounded']>, string> = {
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
  }

  return [
    'card-elevated',
    roundedClassMap[props.rounded],
    props.padding,
  ].join(' ')
})
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
