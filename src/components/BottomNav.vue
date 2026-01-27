<template>
  <Transition appear @enter="onEnter">
    <div
      class="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 border-t-2 border-neutral-200 dark:border-neutral-700 z-50">
      <div class="relative h-full flex items-stretch justify-stretch">
        <button v-for="item in navItems" :key="item.id" @click="item.action" :class="[
          'flex-1 flex flex-col items-center justify-center gap-3 py-8 border-r-2 last:border-r-0',
          'transition-colors duration-200 active:bg-neutral-100 dark:active:bg-neutral-700',
          currentScreen === item.id
            ? 'bg-secondary-500 border-secondary-600'
            : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'
        ]">
          <i :class="[
            'pi',
            item.icon,
            'text-icon-l',
            currentScreen === item.id ? '' : ''
          ]" />
          <span :class="[
            'text-label-m font-semibold',
            currentScreen === item.id ? '' : ''
          ]">{{ $t(item.label) }}</span>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">

export type Screen = 'splash' | 'jobs' | 'candidates' | 'processing' | 'podium' | 'history' | 'settings'

interface Props {
  currentScreen: Screen
}

defineProps<Props>()

const emit = defineEmits<{
  navigate: [screen: Screen]
  home: []
}>()

const navItems = [
  { id: 'home', icon: 'pi-home', label: 'bottomNav.home', action: () => emit('home') },
  { id: 'history', icon: 'pi-history', label: 'bottomNav.history', action: () => emit('navigate', 'history') },
  { id: 'settings', icon: 'pi-cog', label: 'bottomNav.settings', action: () => emit('navigate', 'settings') }
]

function onEnter(el: Element, done: () => void) {
  const htmlEl = el as HTMLElement
  htmlEl.style.opacity = '0'
  htmlEl.style.transition = 'opacity 0.5s ease'
  htmlEl.style.opacity = '1'
  done()
}
</script>
