<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import Logo from '@/components/Logo.vue'
import BottomNav from '@/components/BottomNav.vue'
import PageTitle from '@/components/ui/PageTitle.vue'
import JobCard from '@/components/ui/JobCard.vue'
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

    <!-- Logo in top right -->
    <div class="absolute top-8 right-16 z-10">
      <Logo size="medium" />
    </div>

    <!-- Content -->
    <div class="relative h-full flex flex-col px-16 pt-20 pb-48">
      <!-- Header -->
      <PageTitle title="SELEZIONA POSIZIONE" />

      <!-- Job Cards -->
      <div class="flex-1 overflow-y-auto space-y-6 pb-8 pr-6 custom-scrollbar">
        <Transition v-for="(job, index) in jobOffers" :key="job.id" appear @enter="onEnterCard" v-memo="[job.id]">
          <JobCard :job="job" :index="index" :data-index="index" @click="handleJobSelect" />
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
