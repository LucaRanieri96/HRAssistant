<script setup lang="ts">
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'

export interface DocumentViewerProps {
  visible: boolean
  title: string
  documentUrl?: string
  documentType?: 'pdf' | 'image'
}

const props = withDefaults(defineProps<DocumentViewerProps>(), {
  documentType: 'pdf'
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()

const localVisible = ref(props.visible)

watch(() => props.visible, (newVal) => {
  localVisible.value = newVal
})

watch(localVisible, (newVal) => {
  emit('update:visible', newVal)
})
</script>

<template>
  <Dialog v-model:visible="localVisible" :header="title" modal maximizable :style="{ width: '90vw', height: '90vh' }"
    :breakpoints="{ '960px': '95vw' }">
    <div class="w-full h-full flex items-center justify-center">
      <div v-if="documentUrl" class="w-full h-[75vh]">
        <!-- PDF Viewer -->
        <iframe v-if="documentType === 'pdf'" :src="documentUrl" class="w-full h-full rounded-xl border-0"
          title="Document viewer" />
        <!-- Image Viewer -->
        <img v-else :src="documentUrl" :alt="title" class="max-w-full max-h-full object-contain mx-auto rounded-xl" />
      </div>
      <div v-else class="flex flex-col items-center gap-6 py-20">
        <i class="pi pi-file text-icon-xxl opacity-30" />
        <p class="text-h5 opacity-50">{{ $t('document.noPreview') }}</p>
      </div>
    </div>
  </Dialog>
</template>
