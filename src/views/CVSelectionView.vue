<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import BottomNav from '@/components/BottomNav.vue'
import PageTitle from '@/components/ui/PageTitle.vue'
import FilterButton from '@/components/ui/FilterButton.vue'
import CandidateCard from '@/components/ui/CandidateCard.vue'
import ScreenLayout from '@/components/layout/ScreenLayout.vue'
import ScrollArea from '@/components/ui/ScrollArea.vue'
import type { Screen, Candidate } from '@/types'
import candidatesData from '@/data/candidates.json'

const router = useRouter()
const { t } = useI18n()

const mockCandidates = computed<Candidate[]>(() =>
  candidatesData.map(candidate => ({
    id: candidate.id,
    name: t(candidate.nameKey),
    matchScore: candidate.matchScore,
    experience: t(candidate.experienceKey),
    skills: candidate.skills,
    education: t(candidate.educationKey)
  }))
)

const selectedIds = ref<Set<string>>(new Set())
const currentScreen = ref<Screen>('candidates')
const activeFilter = ref(0)

const jobTitle = ref('Senior AI Engineer')

const toggleCandidate = (candidate: Candidate) => {
  const newSelected = new Set(selectedIds.value)
  if (newSelected.has(candidate.id)) {
    newSelected.delete(candidate.id)
  } else {
    newSelected.add(candidate.id)
  }
  selectedIds.value = newSelected
}

const handleRank = () => {
  if (selectedIds.value.size > 0) {
    // Passa i dati tramite router state (nascosto nell'URL)
    router.push({
      path: '/processing',
      state: {
        jobId: '1', // TODO: prendere l'ID del job dalla route precedente
        candidateIds: Array.from(selectedIds.value)
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
      <PageTitle :title="$t('candidates.title')" :subtitle="jobTitle" />
    </template>

    <div class="flex gap-4 mb-8">
      <FilterButton
        v-for="(filter, idx) in [$t('candidates.filter.all'), $t('candidates.filter.recommended'), $t('candidates.filter.experienced')]"
        :key="idx" :label="filter" :active="activeFilter === idx" @click="activeFilter = idx" />
    </div>

    <ScrollArea class="flex-1 pb-4 pr-6">
      <div class="grid grid-cols-1 gap-6 p-2">
        <Transition v-for="(candidate, index) in mockCandidates" :key="candidate.id" appear @enter="onEnterCard"
          v-memo="[selectedIds.has(candidate.id), candidate.id, candidate.name]">
          <CandidateCard :candidate="candidate" :selected="selectedIds.has(candidate.id)" :index="index"
            :data-index="index" @click="toggleCandidate" />
        </Transition>
      </div>
    </ScrollArea>

    <div class="mt-6">
      <Button @click="handleRank" :disabled="selectedIds.size === 0"
        :label="`${$t('candidates.ctaRank')} (${selectedIds.size})`" severity="warn"
        class="!w-full !h-[110px] !text-button-xxl !font-bold !rounded-xl" />
    </div>

    <template #bottom-nav>
      <BottomNav :current-screen="currentScreen" @navigate="handleNavigate" @home="handleHome" />
    </template>
  </ScreenLayout>
</template>
