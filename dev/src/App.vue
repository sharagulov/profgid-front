<template>
  <div id="app">
    <AppHeader />
    <router-view /> <!-- Сюда будут рендериться страницы по маршрутам -->
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'
import { useAuthStore } from '@/stores/auth.js'

export default {
  name: 'App',
  components: { AppHeader },
  created() {
    const authStore = useAuthStore()
    authStore.loadTokensFromStorage()
  }
}
</script>
