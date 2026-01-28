<script setup lang="ts">
import BlurCard from './BlurCard.vue'

export interface Candidate {
  id: string
  name: string
  matchScore: number
  experience: string
  skills: string[]
  education: string
}

export interface CandidateCardProps {
  candidate: Candidate
  selected?: boolean
  index?: number
}

defineProps<CandidateCardProps>()

const emit = defineEmits<{
  click: [candidate: Candidate]
}>()
</script>

<template>
  <div class="relative cursor-pointer group select-none" @click="emit('click', candidate)">
    <BlurCard :padding="'p-10'" :rounded="'3xl'" :class="[
      'transition-all duration-300 ease-out',
      selected ? 'card-elevated-selected' : ''
    ]">
      <div v-if="selected" class="absolute top-8 left-8">
        <i class="pi pi-check-circle text-secondary-600 text-icon-l" />
      </div>

      <div class="flex items-start justify-between">
        <div :class="['flex-1', selected ? 'ml-16' : '']">
          <h3 class="text-h3 font-bold mb-2">
            {{ candidate.name }}
          </h3>

          <div class="flex items-center gap-4 mb-4">
            <span class="text-h4 font-bold text-secondary-600">
              {{ candidate.matchScore }}%
            </span>
            <span class="text-label-xl opacity-70">{{ $t('candidates.match') }}</span>
          </div>

          <p class="text-body-xl opacity-70 mb-6">
            {{ candidate.experience }}
          </p>

          <div class="flex flex-wrap gap-3 mb-4">
            <div v-for="skill in candidate.skills.slice(0, 4)" :key="skill"
              class="px-5 py-2 rounded-xl bg-secondary-500/10">
              <span class="text-body-m text-secondary-700 dark:text-secondary-300 font-medium">{{ skill }}</span>
            </div>
          </div>

          <p class="text-body-l opacity-60 italic">
            {{ candidate.education }}
          </p>
        </div>
      </div>
    </BlurCard>
  </div>
</template>
