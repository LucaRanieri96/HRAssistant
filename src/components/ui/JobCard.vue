<script setup lang="ts">
import BlurCard from './BlurCard.vue'
import type { JobOffer } from '@/types'

export interface JobCardProps {
  job: JobOffer
  index?: number
}

defineProps<JobCardProps>()

const emit = defineEmits<{
  click: [job: JobOffer]
}>()
</script>

<template>
  <div class="relative group cursor-pointer select-none" @click="emit('click', job)">
    <BlurCard padding="p-10" rounded="3xl">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <h2 class="text-display-3 font-bold mb-3 leading-tight">
            {{ job.title }}
          </h2>
          <p class="text-h5 opacity-70">
            {{ job.department }}
          </p>
        </div>

        <div class="ml-6 flex-shrink-0">
          <div
            class="w-24 h-24 rounded-2xl bg-secondary-100 dark:bg-secondary-950 flex items-center justify-center transition-all duration-300">
            <i class="pi pi-file text-secondary-700 dark:text-secondary-300 text-icon-l" />
          </div>
        </div>
      </div>
    </BlurCard>
  </div>
</template>
