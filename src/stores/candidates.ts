import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCandidatesStore = defineStore('candidates', () => {
  // Selected candidate IDs
  const selectedIds = ref<Set<string>>(new Set())

  // Current job ID (for context)
  const currentJobId = ref<string | null>(null)

  // Flag to track if initial selection was done
  const initialSelectionDone = ref(false)

  const toggleCandidate = (candidateId: string) => {
    const newSelected = new Set(selectedIds.value)
    if (newSelected.has(candidateId)) {
      newSelected.delete(candidateId)
    } else {
      newSelected.add(candidateId)
    }
    selectedIds.value = newSelected
  }

  const selectAll = (candidateIds: string[]) => {
    selectedIds.value = new Set(candidateIds)
  }

  const deselectAll = () => {
    selectedIds.value = new Set()
  }

  const isSelected = (candidateId: string) => {
    return selectedIds.value.has(candidateId)
  }

  const setJobId = (jobId: string | null) => {
    currentJobId.value = jobId
  }

  const initializeWithAll = (candidateIds: string[]) => {
    if (!initialSelectionDone.value) {
      selectedIds.value = new Set(candidateIds)
      initialSelectionDone.value = true
    }
  }

  const reset = () => {
    selectedIds.value = new Set()
    currentJobId.value = null
    initialSelectionDone.value = false
  }

  return {
    selectedIds,
    currentJobId,
    toggleCandidate,
    selectAll,
    deselectAll,
    isSelected,
    setJobId,
    initializeWithAll,
    reset,
  }
})
