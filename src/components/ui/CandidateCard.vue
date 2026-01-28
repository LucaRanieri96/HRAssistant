<script setup lang="ts">
import BlurCard from './BlurCard.vue'

export interface Candidate {
  id: string
  name: string
  matchScore: number
  experience: string
  skills: string[]
  education: string
  documentUrl?: string
}

export interface CandidateCardProps {
  candidate: Candidate
  selected?: boolean
  index?: number
}

defineProps<CandidateCardProps>()

const emit = defineEmits<{
  click: [candidate: Candidate]
  'view-document': [candidate: Candidate]
}>()

const handleDocumentClick = (e: Event, candidate: Candidate) => {
  e.stopPropagation()
  emit('view-document', candidate)
}
</script>

<template>
  <div class="relative cursor-pointer group select-none" @click="emit('click', candidate)">
    <BlurCard :padding="'p-8'" :rounded="'3xl'" :class="[
      'transition-all duration-300 ease-out',
      selected ? 'card-elevated-selected' : ''
    ]">
      <div class="flex items-center justify-between gap-6">
        <div class="flex items-center gap-6 flex-1 min-w-0">
          <h3 class="text-h3 font-bold truncate flex-1">
            {{ candidate.name }}
          </h3>

          <div v-if="selected"
            class="flex-shrink-0 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>

        <button @click="(e) => handleDocumentClick(e, candidate)"
          class="flex-shrink-0 w-20 h-20 rounded-xl bg-secondary-500/10 flex items-center justify-center transition-all duration-300 active:bg-secondary-500/30 active:scale-95">
          <i class="pi pi-file text-secondary-700 dark:text-secondary-300 text-icon-xl" />
        </button>
      </div>
    </BlurCard>
  </div>
</template>
