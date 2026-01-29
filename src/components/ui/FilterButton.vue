<script setup lang="ts">
import Button from 'primevue/button'

export interface FilterButtonProps {
  label: string
  active?: boolean
}

defineProps<FilterButtonProps>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <Button type="button" :label="label" :severity="active ? 'warn' : 'secondary'"
    :variant="active ? undefined : 'outlined'" class="!px-8 !py-4 !text-label-l !rounded-2xl btn-bounce"
    @click="emit('click', $event)" />
</template>
