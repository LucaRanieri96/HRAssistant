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
    <BlurCard :padding="'p-10'" :rounded="'3xl'" :shadow="selected ? 'glow' : 'sm'" :class="[
      'transition-all duration-300 ease-out active:scale-[0.98]',
      selected
        ? 'border-secondary-500 bg-white/90!'
        : 'border-neutral-200'
    ]">
      <div v-if="selected" class="absolute top-8 left-8">
        <i class="pi pi-check-circle text-secondary-600 text-[48px]" />
      </div>

      <div class="flex items-start justify-between">
        <div :class="['flex-1', selected ? 'ml-16' : '']">
          <h3 class="text-[44px] font-bold text-neutral-900 mb-2">
            {{ candidate.name }}
          </h3>

          <div class="flex items-center gap-4 mb-4">
            <span class="text-h4 font-bold text-secondary-600">
              {{ candidate.matchScore }}%
            </span>
            <span class="text-[28px] text-neutral-500">Affinità</span>
          </div>

          <p class="text-[24px] text-neutral-500 mb-6">
            {{ candidate.experience }}
          </p>

          <div class="flex flex-wrap gap-3 mb-4">
            <div v-for="skill in candidate.skills.slice(0, 4)" :key="skill"
              class="px-5 py-2 rounded-xl bg-secondary-50 border border-secondary-200">
              <span class="text-[20px] text-secondary-700 font-medium">{{ skill }}</span>
            </div>
          </div>

          <p class="text-[22px] text-neutral-400 italic">
            {{ candidate.education }}
          </p>
        </div>
      </div>
    </BlurCard>
  </div>
</template>
