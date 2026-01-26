<template>
  <Transition appear @enter="onEnter">
    <div class="fixed bottom-0 left-0 right-0 h-32 glass-card border-t border-neutral-200/30 z-50">
      <div class="relative h-full flex items-center justify-around px-20">
        <button v-for="item in navItems" :key="item.id" @click="item.action" :class="[
          'relative flex items-center gap-4 px-8 py-4 rounded-2xl transition-all duration-300',
          currentScreen === item.id
            ? 'bg-secondary-500 text-neutral-900 shadow-glow-yellow'
            : 'text-neutral-400 hover:text-neutral-900 hover:bg-white/60'
        ]">
          <component :is="item.icon" class="w-10 h-10" />
          <span class="text-[28px] font-medium">{{ item.label }}</span>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Home, History, Settings } from 'lucide-vue-next'

export type Screen = 'splash' | 'jobs' | 'candidates' | 'processing' | 'podium' | 'history' | 'settings'

interface Props {
  currentScreen: Screen
}

const props = defineProps<Props>()

const emit = defineEmits<{
  navigate: [screen: Screen]
  home: []
}>()

const navItems = [
  { id: 'home', icon: Home, label: 'Home', action: () => emit('home') },
  { id: 'history', icon: History, label: 'Storico', action: () => emit('navigate', 'history') },
  { id: 'settings', icon: Settings, label: 'Impostazioni', action: () => emit('navigate', 'settings') }
]

function onEnter(el: Element, done: () => void) {
  const htmlEl = el as HTMLElement
  htmlEl.style.opacity = '0'
  htmlEl.offsetHeight // trigger reflow
  htmlEl.style.transition = 'opacity 0.5s ease'
  htmlEl.style.opacity = '1'
  done()
}
</script>
