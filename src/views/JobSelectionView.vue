<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FileText } from 'lucide-vue-next'
import GeometricBackground from '@/components/GeometricBackground.vue'
import Logo from '@/components/Logo.vue'
import BottomNav from '@/components/BottomNav.vue'
import type { Screen } from '@/components/BottomNav.vue'

const router = useRouter()

export interface JobOffer {
  id: string
  title: string
  department: string
  description: string
}

const jobOffers: JobOffer[] = [
  {
    id: '1',
    title: 'Senior AI Engineer',
    department: 'Engineering & Ricerca',
    description: 'Guida lo sviluppo AI e i progetti di ricerca'
  },
  {
    id: '2',
    title: 'Product Manager - Soluzioni AI',
    department: 'Prodotto & Strategia',
    description: 'Definisci la visione del prodotto per soluzioni AI'
  },
  {
    id: '3',
    title: 'Data Scientist',
    department: 'Analytics & Data',
    description: 'Estrai insights e costruisci modelli predittivi'
  },
  {
    id: '4',
    title: 'UX/UI Designer',
    department: 'Design & Experience',
    description: 'Crea interfacce intuitive per applicazioni AI'
  },
  {
    id: '5',
    title: 'Machine Learning Researcher',
    department: 'Engineering & Ricerca',
    description: 'Avanza le capacità e metodologie ML'
  }
]

const currentScreen = ref<Screen>('jobs')

const handleJobSelect = (job: JobOffer) => {
  router.push({ name: 'cv-selection', params: { job: job.id } })
}

const handleNavigate = (screen: Screen) => {
  currentScreen.value = screen
  if (screen === 'history') {
    // Navigate to history
  } else if (screen === 'settings') {
    // Navigate to settings
  }
}

const handleHome = () => {
  router.push('/')
}

function onEnterCard(el: Element, done: () => void) {
  const htmlEl = el as HTMLElement
  const index = parseInt(htmlEl.dataset.index || '0')
  htmlEl.style.opacity = '0'
  htmlEl.offsetHeight
  htmlEl.style.transition = `opacity 0.4s ease ${index * 0.08}s`
  htmlEl.style.opacity = '1'
  done()
}
</script>

<template>
  <div class="relative w-full h-full overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0">
      <GeometricBackground />
    </div>

    <!-- Logo in top right -->
    <div class="absolute top-8 right-16 z-10">
      <Logo size="medium" />
    </div>

    <!-- Content -->
    <div class="relative h-full flex flex-col px-16 pt-20 pb-48">
      <!-- Header -->
      <div class="mb-16">
        <h1 class="text-display-1 font-bold text-neutral-900 tracking-tight mb-4">
          SELEZIONA POSIZIONE
        </h1>
        <div class="w-32 h-2 bg-secondary-500 rounded-full" />
      </div>

      <!-- Job Cards -->
      <div class="flex-1 overflow-y-auto space-y-6 pb-8 pr-6 custom-scrollbar">
        <Transition v-for="(job, index) in jobOffers" :key="job.id" appear @enter="onEnterCard">
          <div :data-index="index" @click="handleJobSelect(job)" class="relative group cursor-pointer select-none">
            <!-- Card -->
            <div
              class="relative glass-card glass-card-hover rounded-3xl p-10 transition-all duration-300 ease-out active:scale-[0.98] hover:border-secondary-500">
              <!-- Job Info -->
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h2 class="text-[52px] font-bold text-neutral-900 mb-3 leading-tight">
                    {{ job.title }}
                  </h2>
                  <p class="text-h5 text-neutral-500">
                    {{ job.department }}
                  </p>
                </div>

                <!-- Document Icon -->
                <div class="ml-6 flex-shrink-0">
                  <div
                    class="w-24 h-24 rounded-2xl bg-secondary-100 border-2 border-secondary-500 flex items-center justify-center group-hover:bg-secondary-200 transition-all duration-300">
                    <FileText class="w-12 h-12 text-secondary-700" />
                  </div>
                </div>
              </div>

              <!-- Hover indicator -->
              <div
                class="absolute bottom-6 right-10 text-body-m text-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Tocca per selezionare →
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <BottomNav :current-screen="currentScreen" @navigate="handleNavigate" @home="handleHome" />
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(195, 201, 208, 0.1);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(248, 203, 70, 0.5);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(248, 203, 70, 0.7);
}
</style>
