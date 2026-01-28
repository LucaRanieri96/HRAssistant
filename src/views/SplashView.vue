<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useNavigationStore } from '@/stores/navigation'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import QRCodeCard from '@/components/ui/QRCodeCard.vue'
import ScreenLayout from '@/components/layout/ScreenLayout.vue'

const router = useRouter()
const navigationStore = useNavigationStore()

const handleStart = () => {
  router.push('/job-selection')
}

const handleNavigate = (screen: 'history' | 'settings') => {
  if (screen === 'settings') {
    navigationStore.setPreviousRoute('/')
    router.push('/settings')
  }
}

function onEnterContent(el: Element, done: () => void) {
  const htmlEl = el as HTMLElement
  htmlEl.style.opacity = '0'
  void htmlEl.offsetHeight
  htmlEl.style.transition = 'opacity 0.8s ease'
  htmlEl.style.opacity = '1'
  done()
}

function onEnterBottom(el: Element, done: () => void) {
  const htmlEl = el as HTMLElement
  htmlEl.style.opacity = '0'
  void htmlEl.offsetHeight
  htmlEl.style.transition = 'opacity 0.8s ease 0.3s'
  htmlEl.style.opacity = '1'
  done()
}
</script>

<template>
  <ScreenLayout container-class="flex h-full px-16 py-12" content-class="h-full flex flex-col justify-between">

    <!-- Contenuto centrale centrato -->
    <div class="flex-1 flex items-center justify-center">
      <Transition appear @enter="onEnterContent">
        <div class="flex flex-col items-center justify-center space-y-12 max-w-225">
          <!-- HR Assistant Tagline -->
          <div class="text-center space-y-6">
            <h2 class="text-display-3 font-semibold tracking-tight leading-tight">
              {{ $t('splash.title') }}
            </h2>
            <p class="text-h5 opacity-70 max-w-[850px] leading-relaxed">
              {{ $t('splash.subtitle') }}
            </p>
          </div>

          <!-- CTA Button -->
          <PrimaryButton :label="$t('splash.cta')" @click="handleStart" />
        </div>
      </Transition>
    </div>

    <!-- Bottom Section - QR Code -->
    <Transition appear @enter="onEnterBottom">
      <QRCodeCard :title="$t('splash.qrCard.title')" :description="$t('splash.qrCard.description')" />
    </Transition>
  </ScreenLayout>
</template>
