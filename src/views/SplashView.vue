<script setup lang="ts">
import { useRouter } from 'vue-router'
import { QrCode } from 'lucide-vue-next'
import GeometricBackground from '@/components/GeometricBackground.vue'
import Logo from '@/components/Logo.vue'

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
    <!-- Geometric Background -->
    <GeometricBackground />

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
          <button @click="handleStart"
            class="w-[750px] h-[110px] bg-transparent border-2 border-secondary-500 rounded-xl text-neutral-900 text-button-xl tracking-wide transition-all duration-300 hover:bg-secondary-500 hover:shadow-glow-yellow active:scale-[0.98]">
            AVVIA ANALISI HR
          </button>
        </div>
      </Transition>

      <!-- Bottom Section - QR Code -->
      <Transition appear @enter="onEnterBottom">
        <div class="flex items-center gap-16 glass-card glass-card-hover rounded-2xl p-8">
          <!-- QR Code -->
          <div class="flex flex-col items-center gap-4">
            <div class="w-40 h-40 bg-white rounded-xl p-3 flex items-center justify-center shadow-lg">
              <div class="w-full h-full bg-neutral-900 rounded-lg flex items-center justify-center">
                <QrCode class="w-24 h-24 text-white" />
              </div>
            </div>
            <p class="text-body-l text-neutral-500 text-center">Scansiona per info</p>
          </div>

          <!-- Info Text -->
          <div class="flex-1 space-y-3">
            <h3 class="text-h5 font-semibold text-neutral-900">Scopri di più su Aidia</h3>
            <p class="text-body-m text-neutral-500 leading-relaxed">
              Visita il nostro sito per conoscere tutte le soluzioni AI per il recruiting e la
              gestione HR
            </p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
