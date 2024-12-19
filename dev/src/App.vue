<template>
  <div id="app">
    <AppHeader />
    <router-view /> <!-- Сюда будут рендериться страницы по маршрутам -->
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'

export default {
  components: { AppHeader }
}
</script>
