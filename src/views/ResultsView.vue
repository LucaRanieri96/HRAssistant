<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()

interface Result {
  id: string
  name: string
  role: string
  avatar: string
  color: string
  score: number
  rank: number
  skills: string[]
}

const results: Result[] = [
  {
    id: 'cv2',
    name: 'Michael Chen',
    role: 'Ingegnere Full Stack',
    avatar: '👨‍💻',
    color: '#10b981',
    score: 94,
    rank: 1,
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
  },
  {
    id: 'cv1',
    name: 'Sarah Johnson',
    role: 'Sviluppatore Senior',
    avatar: '👩‍💼',
    color: '#3b82f6',
    score: 89,
    rank: 2,
    skills: ['Vue.js', 'Python', 'Docker', 'MongoDB'],
  },
  {
    id: 'cv7',
    name: 'Maria Garcia',
    role: 'Architetto Software',
    avatar: '👩‍💻',
    color: '#ca8a04',
    score: 85,
    rank: 3,
    skills: ['System Design', 'Java', 'Kubernetes', 'SQL'],
  },
  {
    id: 'cv3',
    name: 'Emily Rodriguez',
    role: 'Specialista Frontend',
    avatar: '👩‍🎨',
    color: '#8b5cf6',
    score: 78,
    rank: 4,
    skills: ['React', 'CSS', 'JavaScript', 'Figma'],
  },
  {
    id: 'cv6',
    name: 'James Wilson',
    role: 'Ingegnere DevOps',
    avatar: '👨‍💼',
    color: '#6366f1',
    score: 72,
    rank: 5,
    skills: ['CI/CD', 'Jenkins', 'Terraform', 'Linux'],
  },
]

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return 'pi-trophy'
    case 2:
      return 'pi-star-fill'
    case 3:
      return 'pi-star'
    default:
      return ''
  }
}

const getRankIconColor = (rank: number) => {
  switch (rank) {
    case 1:
      return '#eab308'
    case 2:
      return '#9ca3af'
    case 3:
      return '#ea580c'
    default:
      return '#6b7280'
  }
}

const getScoreColor = (score: number) => {
  if (score >= 85) return 'text-green-600'
  if (score >= 70) return 'text-blue-600'
  return 'text-gray-500'
}

const getScoreBarClass = (score: number) => {
  if (score >= 85) return 'from-green-500 to-green-600'
  if (score >= 70) return 'from-blue-500 to-blue-600'
  return 'from-gray-400 to-gray-500'
}

const handleRestart = () => {
  router.push('/')
}
</script>

<template>
  <div class="flex h-screen flex-col bg-white overflow-hidden">
    <div class="flex-shrink-0 bg-gradient-to-r from-brandBlue to-brandBlueDark px-16 py-6 text-white">
      <h1 class="text-6xl font-bold md:text-7xl mb-2">Risultati dello screening</h1>
      <p class="text-3xl text-white/90">Candidati ordinati per punteggio di corrispondenza</p>
    </div>

    <div class="flex-1 overflow-y-auto px-16 py-4">
      <div class="mx-auto grid max-w-6xl gap-6">
        <div v-for="candidate in results" :key="candidate.id" :class="[
          'relative rounded-3xl border-[3px] p-12 shadow transition-all',
          candidate.rank <= 3
            ? 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-yellow-100/60 shadow-lg'
            : 'border-gray-200 bg-white'
        ]">
          <div v-if="candidate.rank <= 3"
            class="absolute -right-4 -top-4 rounded-full bg-brandYellow px-7 py-4 text-3xl font-bold text-brandGray shadow-lg">
            Top {{ candidate.rank }}
          </div>

          <div class="flex items-start gap-10">
            <div class="flex flex-col items-center gap-4 text-gray-600">
              <i v-if="getRankIcon(candidate.rank)" :class="`pi ${getRankIcon(candidate.rank)}`"
                :style="{ color: getRankIconColor(candidate.rank) }" class="text-5xl"></i>
              <span class="text-3xl font-bold">#{{ candidate.rank }}</span>
            </div>

            <div class="flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full text-6xl"
              :style="{ backgroundColor: candidate.color }">
              {{ candidate.avatar }}
            </div>

            <div class="min-w-0 flex-1">
              <h3 class="text-5xl font-semibold text-gray-900 md:text-6xl">{{ candidate.name }}</h3>
              <p class="mb-6 text-3xl text-gray-600 md:text-4xl">{{ candidate.role }}</p>

              <div class="mb-6">
                <div class="mb-4 flex items-center justify-between">
                  <span class="text-3xl font-medium text-gray-700">Punteggio</span>
                  <span :class="['text-4xl font-bold', getScoreColor(candidate.score)]">{{ candidate.score }}%</span>
                </div>
                <div class="h-7 w-full overflow-hidden rounded-full bg-gray-200">
                  <div class="h-full rounded-full bg-gradient-to-r transition-all duration-700"
                    :class="getScoreBarClass(candidate.score)" :style="{ width: `${candidate.score}%` }"></div>
                </div>
              </div>

              <div class="flex flex-wrap gap-5">
                <span v-for="skill in candidate.skills" :key="skill"
                  class="rounded-full bg-blue-100 px-6 py-3 text-2xl font-medium text-blue-700">{{ skill }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-shrink-0 border-t border-gray-200 bg-gray-50 px-16 py-6">
      <Button @click="handleRestart" label="Nuovo screening" icon="pi pi-refresh" size="large"
        class="w-full !py-10 !text-4xl !font-semibold !min-h-[7rem]" />
    </div>
  </div>
</template>
