<script setup lang="ts">
import Button from 'primevue/button'

export interface PrimaryButtonProps {
  label: string
  loading?: boolean
  disabled?: boolean
  icon?: string
  fullWidth?: boolean
  size?: 'default' | 'large'
}

withDefaults(defineProps<PrimaryButtonProps>(), {
  fullWidth: false,
  size: 'default'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <Button type="button" :label="label" :loading="loading" :disabled="disabled" :icon="icon" :class="[
    '!rounded-xl btn-bounce',
    fullWidth ? '!w-full' : '!w-[600px]',
    size === 'large' ? '!h-[110px] !text-3xl !font-bold' : '!h-[100px] !text-3xl'
  ]" @click="emit('click', $event)">
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
  </Button>
</template>
