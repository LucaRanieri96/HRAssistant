<script setup lang="ts">
import BlurCard from './BlurCard.vue'

export interface QRCodeCardProps {
  title: string
  description: string
  qrLabel?: string
}

withDefaults(defineProps<QRCodeCardProps>(), {
  qrLabel: 'Scansiona per info',
})
</script>

<template>
  <BlurCard padding="p-8" rounded="2xl" hover>
    <div class="flex items-center gap-16">
      <!-- QR Code -->
      <div class="flex flex-col items-center gap-4">
        <div class="w-40 h-40 bg-white rounded-xl p-3 flex items-center justify-center shadow-lg">
          <div class="w-full h-full bg-neutral-900 rounded-lg flex items-center justify-center">
            <i class="pi pi-qrcode text-white text-icon-xxl" />
          </div>
        </div>
        <p class="text-body-l text-neutral-500 text-center">{{ qrLabel }}</p>
      </div>

      <!-- Info Text -->
      <div class="flex-1 space-y-3">
        <h3 class="text-h5 font-semibold text-neutral-900">{{ title }}</h3>
        <p class="text-body-m text-neutral-500 leading-relaxed">
          {{ description }}
        </p>
      </div>
    </div>
  </BlurCard>
</template>
