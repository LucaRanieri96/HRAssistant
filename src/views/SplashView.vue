<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()

const handleStart = () => {
  router.push('/job-selection')
}
</script>

<template>
  <div
    class="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-brandBlue via-brandBlueDark to-indigo-900 px-20 text-white">
    <div class="pointer-events-none absolute inset-0 opacity-20">
      <div class="absolute left-10 top-12 h-[28rem] w-[28rem] rounded-full bg-brandYellow blur-3xl"></div>
      <div class="absolute bottom-14 right-10 h-[28rem] w-[28rem] rounded-full bg-white blur-3xl"></div>
    </div>

    <div class="relative z-10 flex flex-col items-center gap-16 text-center">
      <div class="flex flex-col items-center gap-10">
        <div
          class="flex h-56 w-56 items-center justify-center rounded-3xl bg-white text-8xl text-brandBlue shadow-2xl md:h-64 md:w-64 md:text-9xl">
          <i class="pi pi-sparkles"></i>
        </div>
        <h1 class="text-8xl font-bold tracking-tight md:text-[10rem]">AIDIA</h1>
        <p class="text-4xl text-blue-100 md:text-5xl">Assistente HR</p>
      </div>

      <div class="flex flex-col items-center gap-10">
        <p class="max-w-5xl text-4xl leading-snug text-white/90 md:text-5xl">
          Snellisci la selezione del personale con uno screening dei candidati potenziato dall'AI
        </p>
        <Button @click="handleStart" label="Inizia" severity="warning" size="large"
          class="!px-20 !py-12 !text-6xl !font-semibold !leading-none !min-h-[8rem]" />
      </div>
    </div>

    <div class="absolute bottom-16 text-3xl text-blue-100/80 md:text-4xl">Tocca per iniziare</div>
  </div>
</template>
