import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/pages/LandingPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import CarrerPage from '@/pages/CarrerPage.vue'
import LearningPage from '@/pages/LearningPage.vue'
import HrPage from '@/pages/HrPage.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/carrer',
    name: 'CarrerPage',
    component: CarrerPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/learning',
    name: 'LearningPage',
    component: LearningPage
  },
  {
    path: '/hr',
    name: 'HrPage',
    component: HrPage
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { useAuthStore } = require('@/stores/auth.js') // или импортом на уровне модуля
  const authStore = useAuthStore()

  // Проверяем, загружены ли токены (например, при первой загрузке)
  if (!authStore.accessToken) {
    authStore.loadTokensFromStorage()
  }

  // Если у маршрута стоит requiresAuth, проверяем, авторизован ли пользователь
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Не авторизован — отправляем на логин
    return next({ name: 'LoginPage' })
  }

  // Иначе пропускаем дальше
  next()
})

export default router
