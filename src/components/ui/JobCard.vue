<script setup lang="ts">
import BlurCard from './BlurCard.vue'

export interface Job {
  id: string
  title: string
  department: string
  description?: string
}

export interface JobCardProps {
  job: Job
  index?: number
}

defineProps<JobCardProps>()

const emit = defineEmits<{
  click: [job: Job]
}>()
</script>

<template>
  <div class="relative group cursor-pointer select-none" @click="emit('click', job)">
    <BlurCard padding="p-10" rounded="3xl" class="transition-all duration-300 ease-out active:scale-[0.98]">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <h2 class="text-[52px] font-bold text-neutral-900 mb-3 leading-tight">
            {{ job.title }}
          </h2>
          <p class="text-h5 text-neutral-500">
            {{ job.department }}
          </p>
        </div>

        <div class="ml-6 flex-shrink-0">
          <div
            class="w-24 h-24 rounded-2xl bg-secondary-100 border-2 border-secondary-500 flex items-center justify-center transition-all duration-300">
            <i class="pi pi-file text-secondary-700 text-[48px]" />
          </div>
        </div>
      </div>

      <div class="absolute bottom-6 right-10 text-body-m text-secondary-600 opacity-60 transition-opacity duration-300">
        Tocca per selezionare →
      </div>
    </BlurCard>
  </div>
</template>
