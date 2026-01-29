<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCandidatesStore } from '@/stores/candidates'
import { useNavigationStore } from '@/stores/navigation'
import Button from 'primevue/button'
import BottomNav from '@/components/BottomNav.vue'
import PageTitle from '@/components/ui/PageTitle.vue'
import DocumentViewer from '@/components/ui/DocumentViewer.vue'
import SettingCard from '@/components/ui/SettingCard.vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import BlurCard from '@/components/ui/BlurCard.vue'
import ScreenLayout from '@/components/layout/ScreenLayout.vue'
import ScrollArea from '@/components/ui/ScrollArea.vue'
import TopDrawer from '@/components/ui/TopDrawer.vue'
import type { Screen, Candidate } from '@/types'
import candidatesData from '@/data/candidates.json'

const router = useRouter()
const { t } = useI18n()
const candidatesStore = useCandidatesStore()
const navigationStore = useNavigationStore()

const allCandidates = computed<Candidate[]>(() =>
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

const activeCandidates = computed<Candidate[]>(() =>
  allCandidates.value.filter(c => candidatesStore.isActive(c.id))
)

const availableCandidates = computed<Candidate[]>(() =>
  allCandidates.value.filter(c => !candidatesStore.isActive(c.id))
)

const currentScreen = ref<Screen>('candidates')
const selectAll = ref(false)
const showAddDrawer = ref(false)

const showDocumentViewer = ref(false)
const currentDocument = ref<{ title: string; url: string; type: 'pdf' | 'image' } | null>(null)

const jobTitle = ref('Senior AI Engineer')

watch(allCandidates, (candidates) => {
  if (candidates.length > 0 && !candidatesStore.initialSelectionDone) {
    candidatesStore.activeCandidateIds = new Set()
    candidatesStore.initialSelectionDone = true
  }
}, { immediate: true })

watch(() => candidatesStore.selectedIds.size, () => {
  selectAll.value = candidatesStore.selectedIds.size === activeCandidates.value.length && activeCandidates.value.length > 0
}, { immediate: true })

const toggleCandidate = (candidate: Candidate) => {
  candidatesStore.toggleCandidate(candidate.id)
}

const toggleSelectAll = () => {
  if (selectAll.value) {
    candidatesStore.selectAll(activeCandidates.value.map(c => c.id))
  } else {
    candidatesStore.deselectAll()
  }
}

const openAddDrawer = () => {
  showAddDrawer.value = true
}

const addCandidateToList = (candidate: Candidate) => {
  candidatesStore.addCandidate(candidate.id)
}

const removeCandidateFromList = (candidate: Candidate) => {
  candidatesStore.removeCandidate(candidate.id)
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
    navigationStore.setPreviousRoute('/cv-selection')
    router.push('/settings')
  }
}

const handleHome = () => {
  router.push('/')
}

const handleBack = () => {
  navigationStore.goBack('/cv-selection')
}

function onEnterCard(el: Element, done: () => void) {
  const htmlEl = el as HTMLElement
  const index = parseInt(htmlEl.dataset.index || '0')
  htmlEl.style.opacity = '0'
  void htmlEl.offsetHeight
  htmlEl.style.transition = `opacity 0.4s ease ${index * 0.06}s`
  htmlEl.style.opacity = '1'
  setTimeout(() => {
    htmlEl.style.transition = '' // Reset inline style after animation
    done()
  }, 400 + index * 60)
}

function onLeaveCard(el: Element, done: () => void) {
  const htmlEl = el as HTMLElement
  htmlEl.style.transition = 'opacity 0.3s ease'
  htmlEl.style.opacity = '0'
  setTimeout(() => {
    done()
  }, 300)
}
</script>

<template>
  <ScreenLayout content-class="flex-1 flex flex-col">
    <template #header>
      <PageTitle :title="$t('candidates.title')" :subtitle="jobTitle" :show-back="true" :show-divider="true"
        @back="handleBack">
        <template #actions>
          <Button @click="openAddDrawer" :unstyled="true"
            class="flex items-center gap-3 px-8 py-5 rounded-2xl bg-secondary-500/10 hover:bg-secondary-500/20 active:bg-secondary-500/30 active:scale-[0.97] transition-all duration-200 shrink-0">
            <i class="pi pi-plus text-secondary-700 dark:text-secondary-300 text-2xl" />
            <span class="text-h5 font-bold text-secondary-700 dark:text-secondary-300">{{ $t('candidates.addCandidates')
            }}</span>
          </Button>
        </template>
      </PageTitle>
    </template>

    <div class="mb-8">
      <SettingCard icon="pi-users" :title="$t('candidates.selectAll')"
        :subtitle="`${candidatesStore.selectedIds.size} / ${activeCandidates.length} ${$t('candidates.selected')}`"
        v-model="selectAll" @update:model-value="toggleSelectAll" :show-toggle="true" />
    </div>

    <ScrollArea class="flex-1 pb-4 pr-6">
      <!-- Empty State -->
      <div v-if="activeCandidates.length === 0" class="flex flex-col items-center justify-center py-20 px-6">
        <i class="pi pi-inbox opacity-20 mb-8" style="font-size: 6rem" />
        <h3 class="text-display-3 font-bold mb-4 text-center">
          {{ $t('candidates.noCandidates') }}
        </h3>
        <p class="text-h4 opacity-60 text-center mb-12">
          {{ $t('candidates.tapAddButton') }}
        </p>
        <Button @click="openAddDrawer" :unstyled="true"
          class="flex items-center gap-4 px-10 py-6 rounded-2xl bg-secondary-500/10 hover:bg-secondary-500/20 active:bg-secondary-500/30 active:scale-[0.97] transition-all duration-200">
          <i class="pi pi-plus text-secondary-700 dark:text-secondary-300" style="font-size: 2rem" />
          <span class="text-h3 font-bold text-secondary-700 dark:text-secondary-300">{{ $t('candidates.addCandidates')
            }}</span>
        </Button>
      </div>

      <!-- Active Candidates List with Remove Option -->
      <div v-else class="space-y-6 p-2">
        <TransitionGroup name="list" appear @enter="onEnterCard" @leave="onLeaveCard">
          <div v-for="(candidate, index) in activeCandidates" :key="candidate.id" :data-index="index"
            class="relative cursor-pointer group select-none" @click="toggleCandidate(candidate)">
            <BlurCard padding="p-8" rounded="3xl" :class="[
              'transition-all duration-300 ease-out',
              candidatesStore.isSelected(candidate.id) ? 'card-elevated-selected' : ''
            ]">
              <div class="flex items-center justify-between gap-6">
                <div class="flex items-center gap-6 flex-1 min-w-0">
                  <h3 class="text-h3 font-bold truncate flex-1">
                    {{ candidate.name }}
                  </h3>

                  <div v-if="candidatesStore.isSelected(candidate.id)"
                    class="shrink-0 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="white" stroke-width="3" stroke-linecap="round"
                        stroke-linejoin="round" />
                    </svg>
                  </div>
                </div>

                <Button @click.stop="handleViewDocument(candidate)" :unstyled="true"
                  class="shrink-0 w-20 h-20 rounded-xl bg-secondary-500/10 flex items-center justify-center transition-all duration-200 active:bg-secondary-500/30 active:scale-[0.95]">
                  <i class="pi pi-file text-secondary-700 dark:text-secondary-300 text-icon-xl" />
                </Button>

                <Button @click.stop="removeCandidateFromList(candidate)" :unstyled="true"
                  class="shrink-0 w-20 h-20 rounded-xl bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 flex items-center justify-center transition-all duration-200 active:scale-[0.95]">
                  <i class="pi pi-times text-red-600 dark:text-red-400 text-icon-xl" />
                </Button>
              </div>
            </BlurCard>
          </div>
        </TransitionGroup>
      </div>
    </ScrollArea>

    <div class="my-8">
      <PrimaryButton @click="handleRank" :disabled="candidatesStore.selectedIds.size === 0"
        :label="`${$t('candidates.ctaRank')} (${candidatesStore.selectedIds.size})`" :full-width="true" size="large" />
    </div>

    <DocumentViewer v-model:visible="showDocumentViewer" :title="currentDocument?.title || ''"
      :document-url="currentDocument?.url || ''" :document-type="currentDocument?.type || 'pdf'" />

    <!-- Add Candidates Drawer - Touch Optimized -->
    <TopDrawer v-model:visible="showAddDrawer" :title="$t('candidates.availableCandidates')" :max-height="'75vh'">
      <div class="flex flex-col h-full gap-4 p-4">
        <!-- Available Candidates Grid -->
        <div class="flex-1 overflow-y-auto -mr-4 pr-4">
          <div v-if="availableCandidates.length === 0" class="text-center py-16">
            <i class="pi pi-check-circle text-green-500 mb-6" style="font-size: 4rem" />
            <p class="text-h3 font-bold">{{ $t('candidates.allAdded') }}</p>
          </div>

          <div v-else class="space-y-4">
            <TransitionGroup name="fade">
              <BlurCard v-for="candidate in availableCandidates" :key="candidate.id" padding="p-6" rounded="2xl"
                class="cursor-pointer group hover:card-elevated-selected transition-all duration-300">
                <div class="flex items-center gap-6">
                  <!-- Match Score Badge -->
                  <div
                    class="shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-600 text-white text-2xl font-bold shadow-lg">
                    {{ candidate.matchScore }}
                  </div>

                  <!-- Candidate Info -->
                  <div class="flex-1 min-w-0">
                    <h5 class="text-h4 font-bold truncate mb-1">
                      {{ candidate.name }}
                    </h5>
                    <p class="text-body-lg opacity-70 truncate">
                      {{ candidate.experience }}
                    </p>
                  </div>

                  <!-- Add Button -->
                  <Button @click="addCandidateToList(candidate)" :unstyled="true"
                    class="shrink-0 w-20 h-20 rounded-xl bg-secondary-500/10 hover:bg-secondary-500/20 active:bg-secondary-500/30 flex items-center justify-center transition-all duration-200 active:scale-[0.95]">
                    <i class="pi pi-plus text-secondary-700 dark:text-secondary-300 text-icon-xl font-bold" />
                  </Button>
                </div>
              </BlurCard>
            </TransitionGroup>
          </div>
        </div>
      </div>
    </TopDrawer>

    <template #bottom-nav>
      <BottomNav :current-screen="currentScreen" @navigate="handleNavigate" @home="handleHome" />
    </template>
  </ScreenLayout>
</template>

<style scoped>
/* TransitionGroup animations */
.list-enter-active,
.list-leave-active {
  transition: opacity 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

/* Fade animation for drawer cards */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
