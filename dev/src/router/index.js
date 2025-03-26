import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/pages/LandingPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import CarrerPage from '@/pages/CarrerPage.vue'
import LearningPage from '@/pages/LearningPage.vue'
import ArticlePage from '@/pages/ArticlePage.vue'
import TestPage from '@/pages/TestPage.vue'
import HrPage from '@/pages/HrPage.vue'

const routes = [
  { path: '/', redirect: '/carrer' },

  { path: '/', name: 'LandingPage', component: LandingPage },

  { path: '/login', name: 'LoginPage', component: LoginPage },

  { path: '/carrer', name: 'CarrerPage', component: CarrerPage, meta: { requiresAuth: true } },

  { path: '/learning', name: 'LearningPage', component: LearningPage, meta: { requiresAuth: true } },

  { path: '/learning/article/:id', name: 'ArticlePage', component: ArticlePage, meta: { requiresAuth: true } },
  
  { path: '/learning/test/:id', name: 'TestPage', component: TestPage, meta: { requiresAuth: true } },

  { path: '/hr', name: 'HrPage', component: HrPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Проверка аутентификации перед переходом
router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('access_token')
  const expiresAt = localStorage.getItem('expires_at')

  const isAuthenticated = () => {
    if (!accessToken || !expiresAt) return false
    return new Date() < new Date(expiresAt)
  }

  if (to.meta.requiresAuth && !isAuthenticated()) {
    return next({ name: 'LoginPage' })
  }

  next()
})

export default router
