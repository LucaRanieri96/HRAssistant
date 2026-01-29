import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useJobsStore = defineStore('jobs', () => {
  // Active job IDs (shown in the main list)
  const activeJobIds = ref<Set<string>>(new Set())

  // Flag to track if initial selection was done
  const initialSelectionDone = ref(false)

  const addJob = (jobId: string) => {
    activeJobIds.value.add(jobId)
  }

  const removeJob = (jobId: string) => {
    activeJobIds.value.delete(jobId)
  }

  const isActive = (jobId: string) => {
    return activeJobIds.value.has(jobId)
  }

  const initializeWithAll = (jobIds: string[]) => {
    if (!initialSelectionDone.value) {
      activeJobIds.value = new Set(jobIds)
      initialSelectionDone.value = true
    }
  }

  const reset = () => {
    activeJobIds.value = new Set()
    initialSelectionDone.value = false
  }

  return {
    activeJobIds,
    initialSelectionDone,
    addJob,
    removeJob,
    isActive,
    initializeWithAll,
    reset,
  }
})
