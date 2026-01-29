<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useNavigationStore } from '@/stores/navigation'
import { useJobsStore } from '@/stores/jobs'

import BottomNav from '@/components/BottomNav.vue'
import PageTitle from '@/components/ui/PageTitle.vue'
import DocumentViewer from '@/components/ui/DocumentViewer.vue'
import BlurCard from '@/components/ui/BlurCard.vue'
import ScreenLayout from '@/components/layout/ScreenLayout.vue'
import ScrollArea from '@/components/ui/ScrollArea.vue'
import TopDrawer from '@/components/ui/TopDrawer.vue'
import type { Screen } from '@/components/BottomNav.vue'
import jobOffersData from '@/data/jobOffers.json'

const router = useRouter()
const { t } = useI18n()
const navigationStore = useNavigationStore()
const jobsStore = useJobsStore()

export interface JobOffer {
  id: string
  title: string
  department: string
  description: string
  documentUrl?: string
}

const allJobOffers = computed<JobOffer[]>(() =>
  jobOffersData.map(offer => ({
    id: offer.id,
    title: t(offer.titleKey),
    department: t(offer.departmentKey),
    description: t(offer.descriptionKey),
    documentUrl: `/documents/job-${offer.id}.pdf`
  }))
)

// Active jobs (shown in main list)
const activeJobs = computed<JobOffer[]>(() =>
  allJobOffers.value.filter(j => jobsStore.isActive(j.id))
)

// Available jobs (shown in drawer)
const availableJobs = computed<JobOffer[]>(() =>
  allJobOffers.value.filter(j => !jobsStore.isActive(j.id))
)

// Initialize with NO jobs active (all available in drawer)
watch(allJobOffers, (jobs) => {
  if (jobs.length > 0 && !jobsStore.initialSelectionDone) {
    // Start with empty active list - user will add from drawer
    jobsStore.activeJobIds = new Set()
    jobsStore.initialSelectionDone = true
  }
}, { immediate: true })

const currentScreen = ref<Screen>('jobs')
const showAddDrawer = ref(false)

// Document viewer state
const showDocumentViewer = ref(false)
const currentDocument = ref<{ title: string; url: string; type: 'pdf' | 'image' } | null>(null)

const handleJobSelect = (job: JobOffer) => {
  router.push({ name: 'cv-selection', params: { job: job.id } })
}

const openAddDrawer = () => {
  showAddDrawer.value = true
}

const addJobToList = (job: JobOffer) => {
  jobsStore.addJob(job.id)
}

const removeJobFromList = (job: JobOffer) => {
  jobsStore.removeJob(job.id)
}

const handleViewDocument = (job: JobOffer) => {
  currentDocument.value = {
    title: job.title,
    url: job.documentUrl || '',
    type: 'pdf'
  }
  showDocumentViewer.value = true
}

const handleNavigate = (screen: Screen) => {
  currentScreen.value = screen
  if (screen === 'settings') {
    navigationStore.setPreviousRoute('/job-selection')
    router.push('/settings')
  }
}

const handleHome = () => {
  router.push('/')
}

const handleBack = () => {
  navigationStore.goBack('/job-selection')
}

function onEnterCard(el: Element, done: () => void) {
  const htmlEl = el as HTMLElement
  const index = parseInt(htmlEl.dataset.index || '0')
  htmlEl.style.opacity = '0'
  void htmlEl.offsetHeight // Force reflow
  htmlEl.style.transition = `opacity 0.4s ease ${index * 0.06}s`
  htmlEl.style.opacity = '1'
  done()
}
</script>

<template>
  <ScreenLayout content-class="flex-1 flex flex-col">
    <template #header>
      <div class="flex items-center justify-between gap-4">
        <PageTitle :title="$t('jobs.title')" :subtitle="$t('jobs.subtitle')" :show-back="true" @back="handleBack" />
        <button @click="openAddDrawer"
          class="flex items-center gap-3 px-8 py-5 rounded-2xl bg-secondary-500/10 hover:bg-secondary-500/20 active:bg-secondary-500/30 active:scale-95 transition-all duration-300 shrink-0">
          <i class="pi pi-plus text-secondary-700 dark:text-secondary-300 text-2xl" />
          <span class="text-h5 font-bold text-secondary-700 dark:text-secondary-300">{{ $t('jobs.addJobs') }}</span>
        </button>
      </div>
    </template>

    <ScrollArea class="flex-1 space-y-6 pr-6 pb-8">
      <!-- Empty State -->
      <div v-if="activeJobs.length === 0" class="flex flex-col items-center justify-center py-20 px-6">
        <i class="pi pi-briefcase text-icon-xxxl opacity-20 mb-8" />
        <h3 class="text-display-3 font-bold mb-4 text-center">
          {{ $t('jobs.noJobs') }}
        </h3>
        <p class="text-h4 opacity-60 text-center mb-12">
          {{ $t('jobs.tapAddButton') }}
        </p>
        <button @click="openAddDrawer"
          class="flex items-center gap-4 px-10 py-6 rounded-2xl bg-secondary-500/10 hover:bg-secondary-500/20 active:bg-secondary-500/30 active:scale-95 transition-all duration-300">
          <i class="pi pi-plus text-secondary-700 dark:text-secondary-300 text-3xl" />
          <span class="text-h3 font-bold text-secondary-700 dark:text-secondary-300">{{ $t('jobs.addJobs') }}</span>
        </button>
      </div>

      <!-- Active Jobs List -->
      <div v-else class="space-y-6 p-2">
        <Transition v-for="(job, index) in activeJobs" :key="job.id" appear @enter="onEnterCard"
          v-memo="[job.id, job.title]">
          <div :data-index="index" class="relative group cursor-pointer select-none" @click="handleJobSelect(job)">
            <BlurCard padding="p-10" rounded="3xl">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h2 class="text-display-3 font-bold mb-3 leading-tight">
                    {{ job.title }}
                  </h2>
                  <p class="text-h5 opacity-70">
                    {{ job.department }}
                  </p>
                </div>

                <button @click.stop="handleViewDocument(job)"
                  class="ml-6 shrink-0 w-24 h-24 rounded-2xl bg-secondary-500/10 flex items-center justify-center transition-all duration-300 active:bg-secondary-500/30 active:scale-95">
                  <i class="pi pi-file text-secondary-700 dark:text-secondary-300 text-icon-xxl" />
                </button>

                <button @click.stop="removeJobFromList(job)"
                  class="ml-4 shrink-0 w-24 h-24 rounded-2xl bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 flex items-center justify-center transition-all duration-300 active:scale-95">
                  <i class="pi pi-times text-red-600 dark:text-red-400 text-icon-xxl" />
                </button>
              </div>
            </BlurCard>
          </div>
        </Transition>
      </div>
    </ScrollArea>

    <DocumentViewer v-model:visible="showDocumentViewer" :title="currentDocument?.title || ''"
      :document-url="currentDocument?.url || ''" :document-type="currentDocument?.type || 'pdf'" />

    <!-- Add Jobs Drawer - Touch Optimized -->
    <TopDrawer v-model:visible="showAddDrawer" :title="$t('jobs.availableJobs')" :max-height="'75vh'">
      <div class="flex flex-col h-full gap-4 p-4">
        <!-- Available Jobs Grid -->
        <div class="flex-1 overflow-y-auto -mr-4 pr-4">
          <div v-if="availableJobs.length === 0" class="text-center py-16">
            <i class="pi pi-check-circle text-icon-xxxl text-green-500 mb-6" />
            <p class="text-h3 font-bold">{{ $t('jobs.allAdded') }}</p>
          </div>

          <div v-else class="space-y-4">
            <BlurCard v-for="job in availableJobs" :key="job.id" padding="p-6" rounded="2xl"
              class="cursor-pointer group hover:card-elevated-selected transition-all duration-300">
              <div class="flex items-center gap-6">
                <!-- Job Icon -->
                <div
                  class="shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-600 text-white shadow-lg">
                  <i class="pi pi-briefcase text-3xl" />
                </div>

                <!-- Job Info -->
                <div class="flex-1 min-w-0">
                  <h5 class="text-h4 font-bold truncate mb-1">
                    {{ job.title }}
                  </h5>
                  <p class="text-body-lg opacity-70 truncate">
                    {{ job.department }}
                  </p>
                </div>

                <!-- Add Button -->
                <button @click="addJobToList(job)"
                  class="shrink-0 w-20 h-20 rounded-xl bg-secondary-500/10 hover:bg-secondary-500/20 active:bg-secondary-500/30 flex items-center justify-center transition-all duration-300 active:scale-95">
                  <i class="pi pi-plus text-secondary-700 dark:text-secondary-300 text-icon-xl font-bold" />
                </button>
              </div>
            </BlurCard>
          </div>
        </div>
      </div>
    </TopDrawer>

    <template #bottom-nav>
      <BottomNav :current-screen="currentScreen" @navigate="handleNavigate" @home="handleHome" />
    </template>
  </ScreenLayout>
</template>
