<script setup lang="ts">
import Button from 'primevue/button'

export interface PrimaryButtonProps {
  label: string
  loading?: boolean
  disabled?: boolean
  icon?: string
}

defineProps<PrimaryButtonProps>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <Button type="button" :label="label" :loading="loading" :disabled="disabled" :icon="icon"
    class="!w-[600px] !h-[100px] !rounded-xl !text-3xl" @click="emit('click', $event)">
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
  </Button>
</template>
