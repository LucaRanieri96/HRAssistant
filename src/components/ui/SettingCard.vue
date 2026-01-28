<script setup lang="ts">
import BlurCard from './BlurCard.vue'
import ToggleSwitch from 'primevue/toggleswitch'

export interface SettingCardProps {
  icon: string
  title: string
  subtitle: string
  modelValue?: boolean
  showToggle?: boolean
}

const props = withDefaults(defineProps<SettingCardProps>(), {
  showToggle: true,
  modelValue: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const handleToggle = (value: boolean) => {
  emit('update:modelValue', value)
}

const handleCardClick = () => {
  if (props.showToggle) {
    emit('update:modelValue', !props.modelValue)
  }
}
</script>

<template>
  <div @click="handleCardClick" class="cursor-pointer select-none">
    <BlurCard padding="p-8" rounded="2xl">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-6">
          <i :class="['pi text-icon-xl transition-colors', icon]" />
          <div class="text-left">
            <div class="text-h5 font-bold">
              {{ title }}
            </div>
            <div class="text-body-l opacity-70">
              {{ subtitle }}
            </div>
          </div>
        </div>
        <div @click.stop>
          <ToggleSwitch v-if="showToggle" :model-value="modelValue" @update:model-value="handleToggle"
            class="scale-125" />
        </div>
      </div>
    </BlurCard>
  </div>
</template>
