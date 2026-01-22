<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()

const jobs = [
  { id: 'frontend', title: 'Sviluppatore Frontend', icon: 'pi-code', color: '#3b82f6' },
  { id: 'backend', title: 'Sviluppatore Backend', icon: 'pi-database', color: '#6366f1' },
  { id: 'fullstack', title: 'Sviluppatore Full Stack', icon: 'pi-server', color: '#8b5cf6' },
  { id: 'uxui', title: 'Designer UX/UI', icon: 'pi-palette', color: '#a855f7' },
  { id: 'hr', title: 'Specialista HR', icon: 'pi-users', color: '#ec4899' },
]

const selectedJob = ref<string | null>(null)

const handleJobSelect = (jobId: string) => {
  selectedJob.value = jobId
}

const handleBack = () => {
  router.push('/')
}

const handleContinue = () => {
  if (selectedJob.value) {
    router.push({ name: 'cv-selection', params: { job: selectedJob.value } })
  }
}
</script>

<template>
  <div class="flex h-screen flex-col bg-white overflow-hidden">
    <div class="flex-shrink-0 bg-gradient-to-r from-brandBlue to-brandBlueDark px-16 py-6 text-white">
      <Button label="Indietro" icon="pi pi-arrow-left" severity="secondary" text class="!mb-4 !text-2xl !py-3 !px-6"
        @click="handleBack" />
      <h1 class="text-6xl font-bold md:text-7xl mb-2">Seleziona la posizione</h1>
      <p class="text-3xl text-white/90">Scegli il ruolo da valutare</p>
    </div>

    <div class="flex-1 overflow-y-auto px-16 py-4">
      <div class="mx-auto grid max-w-6xl gap-6">
        <button v-for="job in jobs" :key="job.id" @click="handleJobSelect(job.id)" :class="[
          'group relative rounded-3xl border-4 p-10 text-left transition-all duration-300 min-h-[10rem]',
          selectedJob === job.id
            ? 'scale-[1.02] border-blue-600 bg-blue-50 shadow-xl'
            : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg'
        ]">
          <div class="flex items-center gap-12">
            <div :class="[
              'flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-2xl transition-all',
              selectedJob === job.id ? 'shadow-lg' : 'bg-gray-100 group-hover:bg-blue-100'
            ]" :style="{ backgroundColor: selectedJob === job.id ? job.color : undefined }">
              <i :class="`pi ${job.icon}`" class="text-6xl"
                :style="{ color: selectedJob === job.id ? 'white' : '#4b5563' }"></i>
            </div>

            <div class="flex-1 text-left">
              <h3 class="text-5xl font-semibold text-gray-900 md:text-6xl">{{ job.title }}</h3>
            </div>

            <div v-if="selectedJob === job.id"
              class="flex h-16 w-16 items-center justify-center rounded-full bg-brandYellow">
              <i class="pi pi-check text-4xl text-brandGray"></i>
            </div>
          </div>
        </button>
      </div>
    </div>

    <div class="flex-shrink-0 border-t border-gray-200 bg-gray-50 px-16 py-6">
      <Button @click="handleContinue" :disabled="!selectedJob" label="Continua alla selezione CV" size="large"
        class="w-full !py-10 !text-4xl !font-semibold !min-h-[7rem]" />
    </div>
  </div>
</template>
