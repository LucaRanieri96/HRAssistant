<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { FileUser, CheckCircle2 } from 'lucide-vue-next'
import GeometricBackground from '@/components/GeometricBackground.vue'
import Logo from '@/components/Logo.vue'
import BottomNav from '@/components/BottomNav.vue'
import type { Screen, Candidate } from '@/types'

const router = useRouter()
const route = useRoute()

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

const jobTitle = ref('Senior AI Engineer')

const toggleCandidate = (id: string) => {
  const newSelected = new Set(selectedIds.value)
  if (newSelected.has(id)) {
    newSelected.delete(id)
  } else {
    newSelected.add(id)
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
    <div class="absolute inset-0">
      <GeometricBackground />
    </div>

    <div class="absolute top-8 right-16 z-10">
      <Logo size="medium" />
    </div>

    <div class="relative h-full flex flex-col px-16 pt-20 pb-48">
      <div class="mb-10">
        <h1 class="text-display-1 font-bold text-neutral-900 tracking-tight mb-2">
          POOL CANDIDATI
        </h1>
        <p class="text-h4 text-neutral-500 mb-6">{{ jobTitle }}</p>
        <div class="w-32 h-2 bg-secondary-500 rounded-full" />
      </div>

      <div class="flex gap-4 mb-8">
        <button v-for="(filter, idx) in ['Tutti', 'Alta affinità', 'Media affinità']" :key="idx" :class="[
          'px-8 py-4 rounded-2xl text-[26px] font-medium border transition-all duration-300 select-none',
          idx === 0
            ? 'bg-secondary-500 text-neutral-900 border-secondary-500'
            : 'glass-card text-neutral-600 border-neutral-200 hover:bg-white/80 hover:text-neutral-900 active:scale-95'
        ]">
          {{ filter }}
        </button>
      </div>

      <div class="flex-1 overflow-y-auto pb-8 pr-6 custom-scrollbar">
        <div class="grid grid-cols-1 gap-6">
          <Transition v-for="(candidate, index) in mockCandidates" :key="candidate.id" appear @enter="onEnterCard">
            <div :data-index="index" @click="toggleCandidate(candidate.id)"
              class="relative cursor-pointer group select-none">
              <div :class="[
                'relative glass-card rounded-3xl p-10 transition-all duration-300 ease-out active:scale-[0.98]',
                selectedIds.has(candidate.id)
                  ? 'border-secondary-500 bg-white/90 shadow-glow-yellow'
                  : 'border-neutral-200 hover:border-secondary-400 hover:bg-white/80'
              ]">
                <div v-if="selectedIds.has(candidate.id)" class="absolute top-8 left-8">
                  <CheckCircle2 class="w-12 h-12 text-secondary-600 fill-secondary-500" />
                </div>

                <div class="flex items-start justify-between">
                  <div :class="['flex-1', selectedIds.has(candidate.id) ? 'ml-16' : '']">
                    <h3 class="text-[44px] font-bold text-neutral-900 mb-2">
                      {{ candidate.name }}
                    </h3>

                    <div class="flex items-center gap-4 mb-4">
                      <span class="text-h4 font-bold text-secondary-600">
                        {{ candidate.matchScore }}%
                      </span>
                      <span class="text-[28px] text-neutral-500">Affinità</span>
                    </div>

                    <div class="space-y-2">
                      <p class="text-[26px] text-neutral-700">{{ candidate.experience }}</p>
                      <p class="text-body-m text-neutral-500">{{ candidate.education }}</p>
                    </div>

                    <div class="flex flex-wrap gap-3 mt-4">
                      <span v-for="(skill, i) in candidate.skills.slice(0, 4)" :key="i"
                        class="px-4 py-2 bg-primary-50 border border-primary-200 rounded-xl text-primary-700 text-body-l">
                        {{ skill }}
                      </span>
                    </div>
                  </div>

                  <div class="ml-6 flex-shrink-0">
                    <div
                      class="w-20 h-20 rounded-2xl glass-card border-2 border-neutral-200 flex items-center justify-center group-hover:bg-white/80 transition-all duration-300">
                      <FileUser class="w-10 h-10 text-neutral-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <button @click="handleRank" :disabled="selectedIds.size === 0" :class="[
        'w-full h-[110px] rounded-xl text-button-xl font-medium border-2 mt-8 transition-all duration-300',
        selectedIds.size > 0
          ? 'bg-transparent border-secondary-500 text-neutral-900 hover:bg-secondary-500 hover:shadow-glow-yellow active:scale-[0.98]'
          : 'glass-card border-neutral-200 text-neutral-300 cursor-not-allowed'
      ]">
        CLASSIFICA CANDIDATI ({{ selectedIds.size }})
      </button>
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
