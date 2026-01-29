<script setup lang="ts">
import { ref, onMounted } from 'vue'
import QRCode from 'qrcode'
import BlurCard from './BlurCard.vue'

export interface QRCodeCardProps {
  title: string
  description: string
  qrLabel?: string
  url?: string
}

const props = withDefaults(defineProps<QRCodeCardProps>(), {
  url: 'https://aidia.it/'
})

const qrCodeDataUrl = ref('')

onMounted(async () => {
  try {
    qrCodeDataUrl.value = await QRCode.toDataURL(props.url, {
      width: 240,
      margin: 2,
      color: {
        dark: '#1f2937',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    })
  } catch (error) {
    console.error('Error generating QR code:', error)
  }
})
</script>

<template>
  <div class="cursor-pointer select-none">
    <BlurCard padding="p-10" rounded="3xl">
      <div class="flex items-center gap-12">
        <!-- QR Code -->
        <div class="flex flex-col items-center gap-4 flex-shrink-0">
          <div
            class="w-52 h-52 bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 rounded-3xl p-5 flex items-center justify-center">
            <img v-if="qrCodeDataUrl" :src="qrCodeDataUrl" alt="QR Code" class="w-full h-full rounded-2xl" />
            <div v-else class="w-full h-full bg-white/5 rounded-2xl flex items-center justify-center">
              <i class="pi pi-spinner text-neutral-400 text-icon-xl animate-spin" />
            </div>
          </div>
        </div>

        <!-- Info Text -->
        <div class="flex-1 space-y-4">
          <h3 class="text-h4 font-bold leading-tight">{{ title }}</h3>
          <p class="text-body-xl opacity-70 leading-relaxed">
            {{ description }}
          </p>
        </div>
      </div>
    </BlurCard>
  </div>
</template>
