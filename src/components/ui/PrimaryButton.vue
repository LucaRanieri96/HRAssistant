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
  <Button :label="label" :loading="loading" :disabled="disabled" :icon="icon" severity="warn"
    class="!w-[750px] !h-[110px] !text-[42px] !font-bold !rounded-xl" @click="emit('click', $event)">
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
  </Button>
</template>
