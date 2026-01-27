<script setup lang="ts">
import BlurCard from './BlurCard.vue'

export interface SettingCardProps {
  icon: string
  title: string
  subtitle: string
  showChevron?: boolean
}

withDefaults(defineProps<SettingCardProps>(), {
  showChevron: true
})

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div class="relative cursor-pointer group select-none" @click="emit('click')">
    <BlurCard padding="p-8" rounded="2xl" class="transition-all duration-300 ease-out active:scale-[0.98]">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-6">
          <i :class="['pi text-icon-l transition-colors', icon]" />
          <div class="text-left">
            <div class="text-h5 font-bold">
              {{ title }}
            </div>
            <div class="text-body-l opacity-70">
              {{ subtitle }}
            </div>
          </div>
        </div>
        <i v-if="showChevron" class="pi pi-angle-right text-icon-m opacity-40" />
      </div>
    </BlurCard>
  </div>
</template>
