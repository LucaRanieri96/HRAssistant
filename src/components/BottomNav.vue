<template>
  <Transition appear @enter="onEnter">
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-neutral-200 z-50">
      <div class="relative h-full flex items-stretch justify-stretch">
        <button v-for="item in navItems" :key="item.id" @click="item.action" :class="[
          'flex-1 flex flex-col items-center justify-center gap-2 py-6 border-r-2 border-neutral-200 last:border-r-0',
          'transition-colors duration-200 active:bg-neutral-100',
          currentScreen === item.id
            ? 'bg-secondary-500 border-secondary-600'
            : 'bg-white'
        ]">
          <i :class="[
            'pi',
            item.icon,
            'text-icon-m',
            currentScreen === item.id ? 'text-neutral-900' : 'text-neutral-500'
          ]" />
          <span :class="[
            'text-label-s font-semibold',
            currentScreen === item.id ? 'text-neutral-900' : 'text-neutral-600'
          ]">{{ item.label }}</span>
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
  { id: 'home', icon: 'pi-home', label: 'Home', action: () => emit('home') },
  { id: 'history', icon: 'pi-history', label: 'Storico', action: () => emit('navigate', 'history') },
  { id: 'settings', icon: 'pi-cog', label: 'Impostazioni', action: () => emit('navigate', 'settings') }
]

function onEnter(el: Element, done: () => void) {
  const htmlEl = el as HTMLElement
  htmlEl.style.opacity = '0'
  htmlEl.style.transition = 'opacity 0.5s ease'
  htmlEl.style.opacity = '1'
  done()
}
</script>
