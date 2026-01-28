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
          <div v-if="selected" class="flex-shrink-0">
            <i class="pi pi-check-circle text-secondary-600 text-icon-l" />
          </div>

          <h3 class="text-h3 font-bold truncate flex-1">
            {{ candidate.name }}
          </h3>
        </div>

        <button @click="(e) => handleDocumentClick(e, candidate)"
          class="flex-shrink-0 w-20 h-20 rounded-xl bg-secondary-500/10 flex items-center justify-center transition-all duration-300">
          <i class="pi pi-file text-secondary-700 dark:text-secondary-300 text-icon-xl" />
        </button>
      </div>
    </BlurCard>
  </div>
</template>
