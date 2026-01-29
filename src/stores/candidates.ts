import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCandidatesStore = defineStore('candidates', () => {
  // Active candidate IDs (shown in the main list)
  const activeCandidateIds = ref<Set<string>>(new Set())

  // Selected candidate IDs (for processing)
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
      activeCandidateIds.value = new Set(candidateIds)
      selectedIds.value = new Set(candidateIds)
      initialSelectionDone.value = true
    }
  }

  const addCandidate = (candidateId: string) => {
    activeCandidateIds.value.add(candidateId)
    selectedIds.value.add(candidateId)
  }

  const removeCandidate = (candidateId: string) => {
    activeCandidateIds.value.delete(candidateId)
    selectedIds.value.delete(candidateId)
  }

  const isActive = (candidateId: string) => {
    return activeCandidateIds.value.has(candidateId)
  }

  const reset = () => {
    activeCandidateIds.value = new Set()
    selectedIds.value = new Set()
    currentJobId.value = null
    initialSelectionDone.value = false
  }

  return {
    activeCandidateIds,
    selectedIds,
    currentJobId,
    initialSelectionDone,
    toggleCandidate,
    selectAll,
    deselectAll,
    isSelected,
    setJobId,
    initializeWithAll,
    addCandidate,
    removeCandidate,
    isActive,
    reset,
  }
})
