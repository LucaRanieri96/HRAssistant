<template>
  <div class="fixed bottom-0 left-0 right-0 z-50 p-4">
    <div class="card-elevated rounded-3xl overflow-hidden">
      <div class="flex items-stretch justify-stretch">
        <button v-for="item in navItems" :key="item.id" @click="item.action" :class="[
          'flex-1 flex flex-col items-center justify-center gap-3 py-8',
          'transition-all duration-200 active:scale-95',
          'border-r last:border-r-0 border-white/10',
          currentScreen === item.id
            ? 'bg-secondary-500/15'
            : ''
        ]">
          <i :class="[
            'pi',
            item.icon,
            ' transition-colors',
            currentScreen === item.id ? 'text-secondary-600 dark:text-secondary-400' : ''
          ]" style="font-size: 2rem;" />
          <span :class="[
            'text-label-xl font-semibold transition-colors',
            currentScreen === item.id ? 'text-secondary-600 dark:text-secondary-400' : ''
          ]">{{ $t(item.label) }}</span>
        </button>
      </div>
    </div>
  </div>
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
</script>
