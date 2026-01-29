import { defineStore } from 'pinia'
import { ref, watch, triggerRef } from 'vue'

const STORAGE_KEY_ACTIVE = 'hr-assistant-active-jobs'
const STORAGE_KEY_SELECTED = 'hr-assistant-selected-job'
const STORAGE_KEY_INIT = 'hr-assistant-jobs-init'

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

const loadStringFromStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key)
  } catch (e) {
    return null
  }
}

export const useJobsStore = defineStore('jobs', () => {
  // Load from localStorage on init
  const activeJobIds = ref<Set<string>>(loadFromStorage(STORAGE_KEY_ACTIVE))
  const selectedJobId = ref<string | null>(loadStringFromStorage(STORAGE_KEY_SELECTED))
  const initialSelectionDone = ref(loadBoolFromStorage(STORAGE_KEY_INIT))

  // Watch and save to localStorage
  watch(activeJobIds, (newVal) => saveToStorage(STORAGE_KEY_ACTIVE, newVal), { deep: true })
  watch(selectedJobId, (newVal) => {
    if (newVal) {
      localStorage.setItem(STORAGE_KEY_SELECTED, newVal)
    } else {
      localStorage.removeItem(STORAGE_KEY_SELECTED)
    }
  })
  watch(initialSelectionDone, (newVal) => localStorage.setItem(STORAGE_KEY_INIT, String(newVal)))

  const addJob = (jobId: string) => {
    const newActive = new Set(activeJobIds.value)
    newActive.add(jobId)
    activeJobIds.value = newActive
    triggerRef(activeJobIds)
  }

  const removeJob = (jobId: string) => {
    const newActive = new Set(activeJobIds.value)
    newActive.delete(jobId)
    activeJobIds.value = newActive
    triggerRef(activeJobIds)
  }

  const isActive = (jobId: string) => {
    return activeJobIds.value.has(jobId)
  }

  const selectJob = (jobId: string) => {
    selectedJobId.value = jobId
  }

  const deselectJob = () => {
    selectedJobId.value = null
  }

  const isSelected = (jobId: string) => {
    return selectedJobId.value === jobId
  }

  const toggleJob = (jobId: string) => {
    if (selectedJobId.value === jobId) {
      selectedJobId.value = null
    } else {
      selectedJobId.value = jobId
    }
  }

  const initializeWithAll = (jobIds: string[]) => {
    if (!initialSelectionDone.value) {
      activeJobIds.value = new Set(jobIds)
      initialSelectionDone.value = true
    }
  }

  const reset = () => {
    activeJobIds.value = new Set()
    selectedJobId.value = null
    initialSelectionDone.value = false

    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY_ACTIVE)
    localStorage.removeItem(STORAGE_KEY_SELECTED)
    localStorage.removeItem(STORAGE_KEY_INIT)
  }

  return {
    activeJobIds,
    selectedJobId,
    initialSelectionDone,
    addJob,
    removeJob,
    isActive,
    selectJob,
    deselectJob,
    isSelected,
    toggleJob,
    initializeWithAll,
    reset,
  }
})
