<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import BottomNav from '@/components/BottomNav.vue'
import PageTitle from '@/components/ui/PageTitle.vue'
import JobCard from '@/components/ui/JobCard.vue'
import ScreenLayout from '@/components/layout/ScreenLayout.vue'
import ScrollArea from '@/components/ui/ScrollArea.vue'
import type { Screen } from '@/components/BottomNav.vue'

const router = useRouter()
const { t } = useI18n()

export interface JobOffer {
  id: string
  title: string
  department: string
  description: string
}

const jobOffers = computed<JobOffer[]>(() => [
  {
    id: '1',
    title: t('jobs.offers.seniorAiEngineer.title'),
    department: t('jobs.offers.seniorAiEngineer.department'),
    description: t('jobs.offers.seniorAiEngineer.description')
  },
  {
    id: '2',
    title: t('jobs.offers.productManager.title'),
    department: t('jobs.offers.productManager.department'),
    description: t('jobs.offers.productManager.description')
  },
  {
    id: '3',
    title: t('jobs.offers.dataScientist.title'),
    department: t('jobs.offers.dataScientist.department'),
    description: t('jobs.offers.dataScientist.description')
  },
  {
    id: '4',
    title: t('jobs.offers.uxUiDesigner.title'),
    department: t('jobs.offers.uxUiDesigner.department'),
    description: t('jobs.offers.uxUiDesigner.description')
  },
  {
    id: '5',
    title: t('jobs.offers.mlResearcher.title'),
    department: t('jobs.offers.mlResearcher.department'),
    description: t('jobs.offers.mlResearcher.description')
  }
])

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
      <Transition v-for="(job, index) in jobOffers" :key="job.id" appear @enter="onEnterCard"
        v-memo="[job.id, job.title]">
        <JobCard :job="job" :index="index" :data-index="index" @click="handleJobSelect" />
      </Transition>
    </ScrollArea>

    <template #bottom-nav>
      <BottomNav :current-screen="currentScreen" @navigate="handleNavigate" @home="handleHome" />
    </template>
  </ScreenLayout>
</template>
