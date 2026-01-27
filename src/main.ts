import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import router from './router'
import App from './App.vue'
import './assets/tailwind.css'
import 'primeicons/primeicons.css'
import it from './locales/it.json'
import en from './locales/en.json'

const NeutralPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: 'var(--color-primary-50)',
      100: 'var(--color-primary-100)',
      200: 'var(--color-primary-200)',
      300: 'var(--color-primary-300)',
      400: 'var(--color-primary-400)',
      500: 'var(--color-primary-500)',
      600: 'var(--color-primary-600)',
      700: 'var(--color-primary-700)',
      800: 'var(--color-primary-800)',
      900: 'var(--color-primary-900)',
      950: 'var(--color-primary-950)',
    },
    colorScheme: {
      light: {
        primary: {
          color: 'var(--color-primary-500)',
          inverseColor: '#ffffff',
          hoverColor: 'var(--color-primary-600)',
          activeColor: 'var(--color-primary-700)',
        },
        highlight: {
          background: 'var(--color-primary-500)',
          focusBackground: 'var(--color-primary-700)',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
        surface: {
          0: '#ffffff',
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
          950: 'var(--color-neutral-950)',
        },
      },
      dark: {
        primary: {
          color: 'var(--color-primary-200)',
          inverseColor: 'var(--color-primary-950)',
          hoverColor: 'var(--color-primary-100)',
          activeColor: 'var(--color-primary-50)',
        },
        highlight: {
          background: 'var(--color-primary-400)',
          focusBackground: 'var(--color-primary-300)',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
        surface: {
          0: 'var(--color-neutral-950)',
          50: 'var(--color-neutral-900)',
          100: 'var(--color-neutral-800)',
          200: 'var(--color-neutral-700)',
          300: 'var(--color-neutral-600)',
          400: 'var(--color-neutral-500)',
          500: 'var(--color-neutral-400)',
          600: 'var(--color-neutral-300)',
          700: 'var(--color-neutral-200)',
          800: 'var(--color-neutral-100)',
          900: 'var(--color-neutral-50)',
          950: '#ffffff',
        },
      },
    },
  },
})

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

// Setup i18n
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'it',
  fallbackLocale: 'it',
  messages: {
    it,
    en,
  },
})

app.use(i18n)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: NeutralPreset,
    options: {
      darkModeSelector: '.app-dark',
      cssLayer: false,
    },
  },
  ripple: true,
  inputVariant: 'filled',
})

app.mount('#app')
