<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import BottomNav from '@/components/BottomNav.vue'
import PageTitle from '@/components/ui/PageTitle.vue'
import JobCard from '@/components/ui/JobCard.vue'
import ScreenLayout from '@/components/layout/ScreenLayout.vue'
import ScrollArea from '@/components/ui/ScrollArea.vue'
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
    router.push('/settings')
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
  <ScreenLayout content-class="flex-1 flex flex-col">
    <template #header>
      <PageTitle :title="$t('jobs.title')" />
    </template>

    <ScrollArea class="flex-1 space-y-6 pr-6 pb-8">
      <Transition v-for="(job, index) in jobOffers" :key="job.id" appear @enter="onEnterCard" v-memo="[job.id]">
        <JobCard :job="job" :index="index" :data-index="index" @click="handleJobSelect" />
      </Transition>
    </ScrollArea>

    <template #bottom-nav>
      <BottomNav :current-screen="currentScreen" @navigate="handleNavigate" @home="handleHome" />
    </template>
  </ScreenLayout>
</template>
