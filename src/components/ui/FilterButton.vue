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
  <Button :label="label" :severity="active ? 'warn' : 'secondary'" :outlined="!active"
    class="!px-8 !py-4 !text-[26px] !rounded-2xl" @click="emit('click', $event)" />
</template>
