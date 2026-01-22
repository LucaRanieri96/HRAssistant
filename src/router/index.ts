import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '../views/SplashView.vue'
import JobSelectionView from '../views/JobSelectionView.vue'
import CVSelectionView from '../views/CVSelectionView.vue'
import ResultsView from '../views/ResultsView.vue'

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
      meta: { transition: 'slide-left' },
    },
    {
      path: '/cv-selection/:job',
      name: 'cv-selection',
      component: CVSelectionView,
      meta: { transition: 'slide-left' },
    },
    {
      path: '/results/:job',
      name: 'results',
      component: ResultsView,
      meta: { transition: 'slide-left' },
    },
  ],
})

export default router
