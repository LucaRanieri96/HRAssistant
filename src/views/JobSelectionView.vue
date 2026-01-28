<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import BottomNav from '@/components/BottomNav.vue'
import PageTitle from '@/components/ui/PageTitle.vue'
import JobCard from '@/components/ui/JobCard.vue'
import DocumentViewer from '@/components/ui/DocumentViewer.vue'
import ScreenLayout from '@/components/layout/ScreenLayout.vue'
import ScrollArea from '@/components/ui/ScrollArea.vue'
import type { Screen } from '@/components/BottomNav.vue'
import jobOffersData from '@/data/jobOffers.json'

const router = useRouter()
const { t } = useI18n()

export interface JobOffer {
  id: string
  title: string
  department: string
  description: string
  documentUrl?: string
}

const jobOffers = computed<JobOffer[]>(() =>
  jobOffersData.map(offer => ({
    id: offer.id,
    title: t(offer.titleKey),
    department: t(offer.departmentKey),
    description: t(offer.descriptionKey),
    documentUrl: `/documents/job-${offer.id}.pdf`
  }))
)

const currentScreen = ref<Screen>('jobs')

// Document viewer state
const showDocumentViewer = ref(false)
const currentDocument = ref<{ title: string; url: string; type: 'pdf' | 'image' } | null>(null)

const handleJobSelect = (job: JobOffer) => {
  router.push({ name: 'cv-selection', params: { job: job.id } })
}

const handleViewDocument = (job: JobOffer) => {
  currentDocument.value = {
    title: `${t('jobs.description')}: ${job.title}`,
    url: job.documentUrl || '',
    type: 'pdf'
  }
  showDocumentViewer.value = true
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

const handleBack = () => {
  router.back()
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
      <PageTitle :title="$t('jobs.title')" :show-back="true" @back="handleBack" />
    </template>

    <ScrollArea class="flex-1 space-y-6 pr-6 pb-8">
      <div class="space-y-6 p-2">
        <Transition v-for="(job, index) in jobOffers" :key="job.id" appear @enter="onEnterCard"
          v-memo="[job.id, job.title]">
          <JobCard :job="job" :index="index" :data-index="index" @click="handleJobSelect"
            @view-document="handleViewDocument" />
        </Transition>
      </div>
    </ScrollArea>

    <DocumentViewer v-model:visible="showDocumentViewer" :title="currentDocument?.title || ''"
      :document-url="currentDocument?.url || ''" :document-type="currentDocument?.type || 'pdf'" />

    <template #bottom-nav>
      <BottomNav :current-screen="currentScreen" @navigate="handleNavigate" @home="handleHome" />
    </template>
  </ScreenLayout>
</template>
