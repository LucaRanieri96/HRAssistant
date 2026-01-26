<script setup lang="ts">
import { useRouter } from 'vue-router'
import Logo from '@/components/Logo.vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import QRCodeCard from '@/components/ui/QRCodeCard.vue'

const router = useRouter()

const handleStart = () => {
  router.push('/job-selection')
}

function onEnterContent(el: Element, done: () => void) {
  const htmlEl = el as HTMLElement
  htmlEl.style.opacity = '0'
  htmlEl.offsetHeight
  htmlEl.style.transition = 'opacity 0.8s ease'
  htmlEl.style.opacity = '1'
  done()
}

function onEnterBottom(el: Element, done: () => void) {
  const htmlEl = el as HTMLElement
  htmlEl.style.opacity = '0'
  htmlEl.offsetHeight
  htmlEl.style.transition = 'opacity 0.8s ease 0.3s'
  htmlEl.style.opacity = '1'
  done()
}
</script>

<template>
  <div class="relative w-full h-full overflow-hidden">
    <!-- Logo in top right -->
    <div class="absolute top-8 right-16 z-10">
      <Logo size="medium" />
    </div>

    <!-- Content -->
    <div class="relative h-full flex flex-col items-center justify-between py-20 px-16">
      <!-- Top Section - Logo and Tagline -->
      <Transition appear @enter="onEnterContent">
        <div class="flex-1 flex flex-col items-center justify-center space-y-12 max-w-[900px]">
          <!-- Main Logo -->
          <div class="flex flex-col items-center">
            <div
              class="text-display-1 font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent mb-4">
              Aidia</div>
            <div class="text-h5 text-secondary-600 font-medium">Problem Solving with AI</div>
          </div>

          <!-- HR Assistant Tagline -->
          <div class="text-center space-y-6">
            <h2 class="text-[52px] font-semibold text-neutral-900 tracking-tight leading-tight">
              Assistente Intelligente per il Recruiting
            </h2>
            <p class="text-h5 text-neutral-500 max-w-[850px] leading-relaxed">
              Analizza i candidati, classifica i profili e identifica il match perfetto per il tuo
              team con l'intelligenza artificiale
            </p>
          </div>

          <!-- CTA Button -->
          <PrimaryButton label="AVVIA ANALISI HR" @click="handleStart" />
        </div>
      </Transition>

      <!-- Bottom Section - QR Code -->
      <Transition appear @enter="onEnterBottom">
        <QRCodeCard title="Scopri di più su Aidia"
          description="Visita il nostro sito per conoscere tutte le soluzioni AI per il recruiting e la gestione HR" />
      </Transition>
    </div>
  </div>
</template>
