import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY_ACTIVE = 'hr-assistant-active-candidates'
const STORAGE_KEY_SELECTED = 'hr-assistant-selected-candidates'
const STORAGE_KEY_INIT = 'hr-assistant-candidates-init'

// Helper functions for localStorage with Set
const saveToStorage = (key: string, set: Set<string>) => {
  try {
    localStorage.setItem(key, JSON.stringify(Array.from(set)))
  } catch (e) {
    console.error('Failed to save to localStorage:', e)
  }
}

const loadFromStorage = (key: string): Set<string> => {
  try {
    const stored = localStorage.getItem(key)
    return stored ? new Set(JSON.parse(stored)) : new Set()
  } catch (e) {
    console.error('Failed to load from localStorage:', e)
    return new Set()
  }
}

const loadBoolFromStorage = (key: string): boolean => {
  try {
    const stored = localStorage.getItem(key)
    return stored === 'true'
  } catch (e) {
    return false
  }
}

export const useCandidatesStore = defineStore('candidates', () => {
  // Load from localStorage on init
  const activeCandidateIds = ref<Set<string>>(loadFromStorage(STORAGE_KEY_ACTIVE))
  const selectedIds = ref<Set<string>>(loadFromStorage(STORAGE_KEY_SELECTED))
  const currentJobId = ref<string | null>(null)
  const initialSelectionDone = ref(loadBoolFromStorage(STORAGE_KEY_INIT))

  // Watch and save to localStorage
  watch(activeCandidateIds, (newVal) => saveToStorage(STORAGE_KEY_ACTIVE, newVal), { deep: true })
  watch(selectedIds, (newVal) => saveToStorage(STORAGE_KEY_SELECTED, newVal), { deep: true })
  watch(initialSelectionDone, (newVal) => localStorage.setItem(STORAGE_KEY_INIT, String(newVal)))

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
    const newActive = new Set(activeCandidateIds.value)
    newActive.add(candidateId)
    activeCandidateIds.value = newActive

    const newSelected = new Set(selectedIds.value)
    newSelected.add(candidateId)
    selectedIds.value = newSelected
  }

  const removeCandidate = (candidateId: string) => {
    const newActive = new Set(activeCandidateIds.value)
    newActive.delete(candidateId)
    activeCandidateIds.value = newActive

    const newSelected = new Set(selectedIds.value)
    newSelected.delete(candidateId)
    selectedIds.value = newSelected
  }

  const isActive = (candidateId: string) => {
    return activeCandidateIds.value.has(candidateId)
  }

  const reset = () => {
    activeCandidateIds.value = new Set()
    selectedIds.value = new Set()
    currentJobId.value = null
    initialSelectionDone.value = false

    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY_ACTIVE)
    localStorage.removeItem(STORAGE_KEY_SELECTED)
    localStorage.removeItem(STORAGE_KEY_INIT)
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
