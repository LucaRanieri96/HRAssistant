<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Checkbox from 'primevue/checkbox'
import ToggleSwitch from 'primevue/toggleswitch'
import Button from 'primevue/button'

const router = useRouter()
const route = useRoute()

const candidates = [
  { id: 'cv1', name: 'Sarah Johnson', role: 'Sviluppatore Senior', avatar: '👩‍💼', color: '#3b82f6' },
  { id: 'cv2', name: 'Michael Chen', role: 'Ingegnere Full Stack', avatar: '👨‍💻', color: '#10b981' },
  { id: 'cv3', name: 'Emily Rodriguez', role: 'Specialista Frontend', avatar: '👩‍🎨', color: '#8b5cf6' },
  { id: 'cv4', name: 'David Kim', role: 'Sviluppatore Backend', avatar: '👨‍🔧', color: '#f97316' },
  { id: 'cv5', name: 'Lisa Wang', role: 'Sviluppatore UI/UX', avatar: '👩‍🎨', color: '#ec4899' },
  { id: 'cv6', name: 'James Wilson', role: 'Ingegnere DevOps', avatar: '👨‍💼', color: '#6366f1' },
  { id: 'cv7', name: 'Maria Garcia', role: 'Architetto Software', avatar: '👩‍💻', color: '#ca8a04' },
  { id: 'cv8', name: 'Robert Taylor', role: 'Responsabile Tecnico', avatar: '👨‍🏫', color: '#ef4444' },
]

const selectedCVs = ref<Set<string>>(new Set())
const useAllCVs = ref(false)

const selectedCount = computed(() => selectedCVs.value.size)

const handleToggleCV = (cvId: string) => {
  const newSelected = new Set(selectedCVs.value)
  if (newSelected.has(cvId)) {
    newSelected.delete(cvId)
  } else {
    newSelected.add(cvId)
  }
  selectedCVs.value = newSelected

  if (newSelected.size < candidates.length) {
    useAllCVs.value = false
  }
}

const handleToggleAll = (checked: boolean) => {
  useAllCVs.value = checked
  if (checked) {
    selectedCVs.value = new Set(candidates.map((c) => c.id))
  } else {
    selectedCVs.value = new Set()
  }
}

const handleBack = () => {
  router.push('/job-selection')
}

const handleContinue = () => {
  if (selectedCVs.value.size > 0) {
    router.push({ name: 'results', params: { job: route.params.job } })
  }
}
</script>

<template>
  <div class="flex h-screen flex-col bg-white overflow-hidden">
    <div class="flex-shrink-0 bg-gradient-to-r from-brandBlue to-brandBlueDark px-16 py-6 text-white">
      <Button label="Indietro" icon="pi pi-arrow-left" severity="secondary" text class="!mb-4 !text-2xl !py-3 !px-6"
        @click="handleBack" />
      <h1 class="text-6xl font-bold md:text-7xl mb-2">Seleziona i candidati</h1>
      <p class="text-3xl text-white/90">Scegli i CV da analizzare per questa posizione</p>
    </div>

    <div class="flex-shrink-0 border-b border-gray-200 bg-gray-50 px-16 py-5">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-10">
        <div class="flex items-center gap-4">
          <ToggleSwitch v-model="useAllCVs" @change="handleToggleAll" class="scale-[1.7]" />
          <span class="text-4xl font-semibold text-gray-900 md:text-5xl">Usa tutti i CV</span>
        </div>
        <div class="text-3xl text-gray-600 md:text-4xl">
          {{ selectedCount }} / {{ candidates.length }} selezionati
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto px-16 py-4">
      <div class="mx-auto grid max-w-6xl gap-5">
        <div v-for="candidate in candidates" :key="candidate.id" @click="handleToggleCV(candidate.id)" :class="[
          'group cursor-pointer rounded-2xl border-[3px] p-8 transition-all duration-200 min-h-[8rem]',
          selectedCVs.has(candidate.id)
            ? 'border-blue-600 bg-blue-50 shadow-md'
            : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow'
        ]">
          <div class="flex items-center gap-9">
            <div class="flex-shrink-0" @click.stop>
              <Checkbox :modelValue="selectedCVs.has(candidate.id)" @update:modelValue="handleToggleCV(candidate.id)"
                :binary="true" />
            </div>

            <div class="flex h-24 w-24 items-center justify-center rounded-full text-5xl"
              :style="{ backgroundColor: candidate.color }">
              {{ candidate.avatar }}
            </div>

            <div class="min-w-0 flex-1 text-left">
              <h3 class="truncate text-4xl font-semibold text-gray-900 md:text-5xl">{{ candidate.name }}</h3>
              <p class="text-3xl text-gray-600 md:text-4xl">{{ candidate.role }}</p>
            </div>

            <div v-if="selectedCVs.has(candidate.id)" class="h-10 w-10 rounded-full bg-brandYellow"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-shrink-0 border-t border-gray-200 bg-gray-50 px-16 py-6">
      <Button @click="handleContinue" :disabled="selectedCount === 0" label="Avvia screening" size="large"
        class="w-full !py-10 !text-4xl !font-semibold !min-h-[7rem]" />
    </div>
  </div>
</template>
