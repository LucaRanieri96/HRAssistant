<script setup lang="ts">
import { computed } from 'vue'
import Logo from '@/components/Logo.vue'

export interface ScreenLayoutProps {
  showLogo?: boolean
  logoSize?: 'small' | 'medium' | 'large'
  rootClass?: string
  containerClass?: string
  headerClass?: string
  contentClass?: string
  footerClass?: string
  scroll?: boolean
  scrollClass?: string
}

const props = withDefaults(defineProps<ScreenLayoutProps>(), {
  showLogo: true,
  logoSize: 'medium',
  rootClass: 'w-full h-full flex justify-center',
  containerClass: 'h-full flex flex-col px-16 py-12 pb-40 max-w-[1400px] w-full',
  headerClass: '',
  contentClass: '',
  footerClass: '',
  scroll: false,
  scrollClass: 'overflow-y-auto pr-6 pb-8 kiosk-scrollbar',
})

const contentClasses = computed(() => {
  const classes = ['min-h-0', props.contentClass]
  if (props.scroll) {
    classes.push(props.scrollClass)
  }
  return classes.join(' ')
})
</script>

<template>
  <div :class="rootClass">
    <div v-if="showLogo" class="absolute top-8 right-16 z-10">
      <Logo :size="logoSize" />
    </div>

    <!-- Container principale con flex -->
    <div :class="containerClass">
      <header v-if="$slots.header" :class="headerClass">
        <slot name="header" />
      </header>

      <div :class="contentClasses">
        <slot />
      </div>
    </div>

    <!-- Bottom nav fuori dal container -->
    <slot name="bottom-nav" />
  </div>
</template>
