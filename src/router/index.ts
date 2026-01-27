import { createRouter, createWebHistory } from 'vue-router'

// Lazy loading per ottimizzare il caricamento iniziale su totem
const SplashView = () => import('../views/SplashView.vue')
const JobSelectionView = () => import('../views/JobSelectionView.vue')
const CVSelectionView = () => import('../views/CVSelectionView.vue')
const ResultsView = () => import('../views/ResultsView.vue')
const ProcessingScreen = () => import('../components/ProcessingScreen.vue')
const SettingsView = () => import('../views/SettingsView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'splash',
      component: SplashView,
      meta: { transition: 'fade' },
    },
    {
      path: '/job-selection',
      name: 'job-selection',
      component: JobSelectionView,
      meta: { transition: 'fade' },
    },
    {
      path: '/cv-selection/:job',
      name: 'cv-selection',
      component: CVSelectionView,
      meta: { transition: 'fade' },
    },
    {
      path: '/processing',
      name: 'processing',
      component: ProcessingScreen,
      meta: { transition: 'fade' },
    },
    {
      path: '/results',
      name: 'results',
      component: ResultsView,
      meta: { transition: 'fade' },
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: { transition: 'fade' },
    },
  ],
})

export default router
