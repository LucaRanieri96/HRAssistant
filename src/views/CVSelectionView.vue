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

const router = useRouter()
const { t } = useI18n()

const mockCandidates = computed<Candidate[]>(() => [
  {
    id: '1',
    name: t('candidates.mockData.alessandroRossi.name'),
    matchScore: 97,
    experience: t('candidates.mockData.alessandroRossi.experience'),
    skills: ['Python', 'TensorFlow', 'Deep Learning', 'NLP'],
    education: t('candidates.mockData.alessandroRossi.education')
  },
  {
    id: '2',
    name: t('candidates.mockData.mariaFerrari.name'),
    matchScore: 94,
    experience: t('candidates.mockData.mariaFerrari.experience'),
    skills: ['Python', 'PyTorch', 'Computer Vision', 'MLOps'],
    education: t('candidates.mockData.mariaFerrari.education')
  },
  {
    id: '3',
    name: t('candidates.mockData.giuseppeBianchi.name'),
    matchScore: 91,
    experience: t('candidates.mockData.giuseppeBianchi.experience'),
    skills: ['Scala', 'Spark', 'Kubernetes', 'AWS'],
    education: t('candidates.mockData.giuseppeBianchi.education')
  },
  {
    id: '4',
    name: t('candidates.mockData.sofiaRomano.name'),
    matchScore: 89,
    experience: t('candidates.mockData.sofiaRomano.experience'),
    skills: ['Python', 'Ricerca', 'Pubblicazioni', 'Transformers'],
    education: t('candidates.mockData.sofiaRomano.education')
  },
  {
    id: '5',
    name: t('candidates.mockData.marcoColombo.name'),
    matchScore: 86,
    experience: t('candidates.mockData.marcoColombo.experience'),
    skills: ['Java', 'Python', 'System Design', 'Leadership'],
    education: t('candidates.mockData.marcoColombo.education')
  },
  {
    id: '6',
    name: t('candidates.mockData.francescaRicci.name'),
    matchScore: 84,
    experience: t('candidates.mockData.francescaRicci.experience'),
    skills: ['Python', 'FastAPI', 'Docker', 'CI/CD'],
    education: t('candidates.mockData.francescaRicci.education')
  }
])

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
    router.push('/processing')
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

    <ScrollArea class="flex-1 pb-8 pr-6">
      <div class="grid grid-cols-1 gap-6">
        <Transition v-for="(candidate, index) in mockCandidates" :key="candidate.id" appear @enter="onEnterCard"
          v-memo="[selectedIds.has(candidate.id), candidate.id, candidate.name]">
          <CandidateCard :candidate="candidate" :selected="selectedIds.has(candidate.id)" :index="index"
            :data-index="index" @click="toggleCandidate" />
        </Transition>
      </div>
    </ScrollArea>

    <Button @click="handleRank" :disabled="selectedIds.size === 0"
      :label="`${$t('candidates.ctaRank')} (${selectedIds.size})`" severity="warn"
      class="!w-full !h-[110px] !text-button-xxl !font-bold !rounded-xl !mt-8" />

    <template #bottom-nav>
      <BottomNav :current-screen="currentScreen" @navigate="handleNavigate" @home="handleHome" />
    </template>
  </ScreenLayout>
</template>
