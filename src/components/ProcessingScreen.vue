<template>
  <ScreenLayout container-class="relative h-full flex flex-col items-center justify-center px-16"
    content-class="w-full">
    <div class="max-w-[900px] w-full">
      <h1 class="text-display-0 font-bold text-neutral-900 text-center mb-16">
        Elaborazione AI in corso
      </h1>

      <div class="mb-20">
        <div class="w-full h-4 bg-neutral-200/30 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-secondary-500 to-secondary-300 transition-all duration-300"
            :style="{ width: `${progress}%` }" />
        </div>
        <p class="text-h5 text-secondary-600 text-center mt-6 font-bold">{{ progress }}%</p>
      </div>

      <div class="space-y-8">
        <div v-for="(step, index) in steps" :key="index" :class="[
          'flex items-center gap-6 p-6 rounded-2xl border-2 transition-all duration-500',
          currentStep >= index
            ? 'border-secondary-500 bg-secondary-50'
            : 'border-neutral-200 glass-card'
        ]">
          <div :class="[
            'w-20 h-20 rounded-full flex items-center justify-center',
            currentStep >= index ? 'bg-secondary-500' : 'bg-neutral-200'
          ]">
            <i :class="[
              step.icon,
              'pi text-icon-m',
              currentStep >= index ? 'text-neutral-900' : 'text-neutral-300'
            ]" />
          </div>

          <span :class="[
            'text-h4 transition-colors duration-500',
            currentStep >= index ? 'text-neutral-900' : 'text-neutral-300'
          ]">
            {{ step.label }}
          </span>

          <div v-if="currentStep > index"
            class="ml-auto w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>

          <div v-else-if="currentStep === index"
            class="ml-auto w-12 h-12 border-4 border-secondary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>

      <p class="text-h6 font-normal text-neutral-500 text-center mt-16">
        Attendere prego, il sistema sta elaborando i dati...
      </p>
    </div>
  </ScreenLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ScreenLayout from '@/components/layout/ScreenLayout.vue'

const router = useRouter()
const progress = ref(0)
const currentStep = ref(0)

const steps = [
  { icon: 'pi-file-edit', label: 'Analisi competenze in corso', delay: 0 },
  { icon: 'pi-bolt', label: 'Calcolo affinità candidati', delay: 1000 },
  { icon: 'pi-chart-line', label: 'Generazione ranking finale', delay: 2000 }
]

onMounted(() => {
  const progressInterval = setInterval(() => {
    progress.value += 2
    if (progress.value >= 100) {
      clearInterval(progressInterval)
      setTimeout(() => {
        router.push({ name: 'results', params: { job: 'ai-engineer' } })
      }, 500)
    }
  }, 30)

  steps.forEach((step, index) => {
    setTimeout(() => {
      currentStep.value = index
    }, step.delay)
  })
})
</script>
