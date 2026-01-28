<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCandidatesStore } from '@/stores/candidates'
import BottomNav from '@/components/BottomNav.vue'
import PageTitle from '@/components/ui/PageTitle.vue'
import CandidateCard from '@/components/ui/CandidateCard.vue'
import DocumentViewer from '@/components/ui/DocumentViewer.vue'
import SettingCard from '@/components/ui/SettingCard.vue'
import ScreenLayout from '@/components/layout/ScreenLayout.vue'
import ScrollArea from '@/components/ui/ScrollArea.vue'
import type { Screen, Candidate } from '@/types'
import candidatesData from '@/data/candidates.json'

const router = useRouter()
const { t } = useI18n()
const candidatesStore = useCandidatesStore()

const mockCandidates = computed<Candidate[]>(() =>
  candidatesData.map(candidate => ({
    id: candidate.id,
    name: t(candidate.nameKey),
    matchScore: candidate.matchScore,
    experience: t(candidate.experienceKey),
    skills: candidate.skills,
    education: t(candidate.educationKey),
    documentUrl: `/documents/cv-${candidate.id}.pdf`
  }))
)

const currentScreen = ref<Screen>('candidates')
const selectAll = ref(false)

// Document viewer state
const showDocumentViewer = ref(false)
const currentDocument = ref<{ title: string; url: string; type: 'pdf' | 'image' } | null>(null)

const jobTitle = ref('Senior AI Engineer')

// Sync selectAll with store
watch(() => candidatesStore.selectedIds.size, () => {
  selectAll.value = candidatesStore.selectedIds.size === mockCandidates.value.length
}, { immediate: true })

const toggleCandidate = (candidate: Candidate) => {
  candidatesStore.toggleCandidate(candidate.id)
}

const toggleSelectAll = () => {
  if (selectAll.value) {
    candidatesStore.selectAll(mockCandidates.value.map(c => c.id))
  } else {
    candidatesStore.deselectAll()
  }
}

const handleViewDocument = (candidate: Candidate) => {
  currentDocument.value = {
    title: `${t('candidates.cv')}: ${candidate.name}`,
    url: candidate.documentUrl || '',
    type: 'pdf'
  }
  showDocumentViewer.value = true
}

const handleRank = () => {
  if (candidatesStore.selectedIds.size > 0) {
    router.push({
      path: '/processing',
      state: {
        jobId: '1',
        candidateIds: Array.from(candidatesStore.selectedIds)
      }
    })
  }
}

const handleNavigate = (screen: Screen) => {
  currentScreen.value = screen
  if (screen === 'settings') {
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
  htmlEl.style.transition = `opacity 0.4s ease ${index * 0.06}s`
  htmlEl.style.opacity = '1'
  done()
}
</script>

<template>
  <ScreenLayout content-class="flex-1 flex flex-col">
    <template #header>
      <PageTitle :title="$t('candidates.title')" :subtitle="jobTitle" :show-back="true" @back="handleBack" />
    </template>

    <div class="mb-8">
      <SettingCard icon="pi-users" :title="$t('candidates.selectAll')"
        :subtitle="`${candidatesStore.selectedIds.size} / ${mockCandidates.length} ${$t('candidates.selected')}`"
        v-model="selectAll" @update:model-value="toggleSelectAll" :show-toggle="true" />
    </div>

    <ScrollArea class="flex-1 pb-4 pr-6">
      <div class="grid grid-cols-1 gap-6 p-2">
        <Transition v-for="(candidate, index) in mockCandidates" :key="candidate.id" appear @enter="onEnterCard"
          v-memo="[candidatesStore.isSelected(candidate.id), candidate.id, candidate.name]">
          <CandidateCard :candidate="candidate" :selected="candidatesStore.isSelected(candidate.id)" :index="index"
            :data-index="index" @click="toggleCandidate" @view-document="handleViewDocument" />
        </Transition>
      </div>
    </ScrollArea>

    <div class="mt-6">
      <Button @click="handleRank" :disabled="candidatesStore.selectedIds.size === 0"
        :label="`${$t('candidates.ctaRank')} (${candidatesStore.selectedIds.size})`" severity="warn"
        class="!w-full !h-[110px] !text-button-xxl !font-bold !rounded-xl" />
    </div>

    <DocumentViewer v-model:visible="showDocumentViewer" :title="currentDocument?.title || ''"
      :document-url="currentDocument?.url || ''" :document-type="currentDocument?.type || 'pdf'" />

    <template #bottom-nav>
      <BottomNav :current-screen="currentScreen" @navigate="handleNavigate" @home="handleHome" />
    </template>
  </ScreenLayout>
</template>
