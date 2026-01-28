import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../router'

export const useNavigationStore = defineStore('navigation', () => {
  // Traccia la pagina da cui l'utente è arrivato a Settings
  const previousRoute = ref<string>('/')

  // Mappa del flusso logico dell'app
  const navigationFlow: Record<string, string> = {
    '/job-selection': '/', // Da job selection → home
    '/cv-selection': '/job-selection', // Da cv selection → job selection
    '/results': '/job-selection', // Da results → job selection (ricomincia processo)
  }

  const setPreviousRoute = (path: string) => {
    previousRoute.value = path
  }

  const goBack = (currentPath: string) => {
    // Settings torna sempre alla pagina precedente tracciata
    if (currentPath === '/settings') {
      router.push(previousRoute.value)
      return
    }

    // Normalizza il path (rimuove parametri dinamici come :job)
    const basePath = currentPath.split('/').slice(0, 2).join('/')

    const destination = navigationFlow[basePath] || navigationFlow[currentPath] || '/'
    router.push(destination)
  }

  return {
    goBack,
    setPreviousRoute,
  }
})
