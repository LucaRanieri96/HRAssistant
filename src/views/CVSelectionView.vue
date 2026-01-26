<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Logo from '@/components/Logo.vue'
import BottomNav from '@/components/BottomNav.vue'
import PageTitle from '@/components/ui/PageTitle.vue'
import FilterButton from '@/components/ui/FilterButton.vue'
import CandidateCard from '@/components/ui/CandidateCard.vue'
import type { Screen, Candidate } from '@/types'

const router = useRouter()

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Alessandro Rossi',
    matchScore: 97,
    experience: '8 anni in AI/ML',
    skills: ['Python', 'TensorFlow', 'Deep Learning', 'NLP'],
    education: 'PhD Informatica - MIT'
  },
  {
    id: '2',
    name: 'Maria Ferrari',
    matchScore: 94,
    experience: '6 anni in Data Science',
    skills: ['Python', 'PyTorch', 'Computer Vision', 'MLOps'],
    education: 'MSc AI - Stanford University'
  },
  {
    id: '3',
    name: 'Giuseppe Bianchi',
    matchScore: 91,
    experience: '7 anni in ML Engineering',
    skills: ['Scala', 'Spark', 'Kubernetes', 'AWS'],
    education: 'MSc Data Engineering - ETH Zurich'
  },
  {
    id: '4',
    name: 'Sofia Romano',
    matchScore: 89,
    experience: '5 anni in Ricerca AI',
    skills: ['Python', 'Ricerca', 'Pubblicazioni', 'Transformers'],
    education: 'PhD Machine Learning - Oxford'
  },
  {
    id: '5',
    name: 'Marco Colombo',
    matchScore: 86,
    experience: '9 anni in Software Engineering',
    skills: ['Java', 'Python', 'System Design', 'Leadership'],
    education: 'MSc Informatica - Politecnico Milano'
  },
  {
    id: '6',
    name: 'Francesca Ricci',
    matchScore: 84,
    experience: '4 anni in ML Development',
    skills: ['Python', 'FastAPI', 'Docker', 'CI/CD'],
    education: 'BSc Ingegneria Informatica - Politecnico Torino'
  }
]

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
  <div class="relative w-full h-full overflow-hidden">

    <div class="absolute top-8 right-16 z-10">
      <Logo size="medium" />
    </div>

    <div class="relative h-full flex flex-col px-16 pt-20 pb-48">
      <PageTitle title="POOL CANDIDATI" :subtitle="jobTitle" />

      <div class="flex gap-4 mb-8">
        <FilterButton v-for="(filter, idx) in ['Tutti', 'Alta affinità', 'Media affinità']" :key="idx" :label="filter"
          :active="activeFilter === idx" @click="activeFilter = idx" />
      </div>

      <div class="flex-1 overflow-y-auto pb-8 pr-6 custom-scrollbar">
        <div class="grid grid-cols-1 gap-6">
          <Transition v-for="(candidate, index) in mockCandidates" :key="candidate.id" appear @enter="onEnterCard"
            v-memo="[selectedIds.has(candidate.id), candidate.id]">
            <CandidateCard :candidate="candidate" :selected="selectedIds.has(candidate.id)" :index="index"
              :data-index="index" @click="toggleCandidate" />
          </Transition>
        </div>
      </div>

      <Button @click="handleRank" :disabled="selectedIds.size === 0"
        :label="`CLASSIFICA CANDIDATI (${selectedIds.size})`" severity="warn"
        class="!w-full !h-[110px] !text-[42px] !font-bold !rounded-xl !mt-8" />
    </div>

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
