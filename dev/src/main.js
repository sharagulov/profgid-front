import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/styles/global.scss'
import { useAuthStore } from '@/stores/auth'

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')

const authStore = useAuthStore()
authStore.loadTokensFromStorage()