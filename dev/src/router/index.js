import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/pages/LandingPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import CarrerPage from '@/pages/CarrerPage.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage // Базовая страница
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/carrer',
    name: 'CarrerPage',
    component: CarrerPage // Базовая страница
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
