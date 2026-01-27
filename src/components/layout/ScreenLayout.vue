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
  rootClass: 'relative w-full h-full overflow-hidden',
  containerClass: 'relative h-full min-h-0 flex flex-col px-16 pt-20 pb-48',
  headerClass: '',
  contentClass: 'flex-1',
  footerClass: '',
  scroll: false,
  scrollClass: 'overflow-y-auto pr-6 pb-8 kiosk-scrollbar',
})

const contentClasses = computed(() => [
  'min-h-0',
  props.contentClass,
  props.scroll ? props.scrollClass : '',
])
</script>

<template>
  <div :class="rootClass">
    <div v-if="showLogo" class="absolute top-8 right-16 z-10">
      <Logo :size="logoSize" />
    </div>

    <div :class="containerClass">
      <header v-if="$slots.header" :class="headerClass">
        <slot name="header" />
      </header>

      <div :class="contentClasses">
        <slot />
      </div>

      <footer v-if="$slots.footer" :class="footerClass">
        <slot name="footer" />
      </footer>
    </div>

    <slot name="bottom-nav" />
  </div>
</template>
