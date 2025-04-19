import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '@/pages/LandingPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import razvitiePage from '@/pages/razvitiePage.vue'
import adaptaciaPage from '@/pages/adaptaciaPage.vue'
import ArticlePage from '@/pages/ArticlePage.vue'
import TestPage from '@/pages/TestPage.vue'
import HrPage from '@/pages/HrPage.vue'
import AboutPage from '@/pages/AboutPage.vue'

const routes = [
  // Специальный маршрут для входа в систему — он без компонента
  { path: '/', name: 'RootRedirect', meta: { requiresAuth: true } },

  { path: '/login', name: 'LoginPage', component: LoginPage },
  { path: '/landing', name: 'LandingPage', component: LandingPage },

  // Доступны всем авторизованным пользователям
  { path: '/razvitie', name: 'razvitiePage', component: razvitiePage, meta: { requiresAuth: true }, roles: ['user'] },
  { path: '/adaptacia', name: 'adaptaciaPage', component: adaptaciaPage, meta: { requiresAuth: true, roles: ['user'] } },
  { path: '/about', name: 'AboutPage', component: AboutPage, meta: { requiresAuth: true } },
  { path: '/adaptacia/article/:id', name: 'ArticlePage', component: ArticlePage, meta: { requiresAuth: true, roles: ['user'] } },
  { path: '/adaptacia/test/:id', name: 'TestPage', component: TestPage, meta: { requiresAuth: true, roles: ['user'] } },

  // Только для HR и admin
  { path: '/hr', name: 'HrPage', component: HrPage, meta: { requiresAuth: true, roles: ['hr', 'admin'] } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

function isAuthenticated() {
  const token = localStorage.getItem('access_token')
  const expiresAt = localStorage.getItem('expires_at')
  return token && expiresAt && new Date() < new Date(expiresAt)
}

async function getUserRole() {
  const token = localStorage.getItem('access_token')
  const response = await fetch('http://profguide.leganyst.ru:61180/employee/me', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })


  if (!response.ok) throw new Error('Не удалось получить роль')
  const data = await response.json()
  const role = data.role || (data.user && data.user.role)
  return role

}

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return next({ name: 'LoginPage' })
  }

  // Динамический редирект на / при успешной авторизации
  if (to.name === 'RootRedirect' && isAuthenticated()) {
    try {
      const role = await getUserRole()
      if (['hr', 'admin'].includes(role)) return next({ name: 'HrPage' })
      else return next({ name: 'AboutPage' })
    } catch {
      return next({ name: 'LoginPage' })
    }
  }

  // Если маршрут ограничен по ролям
  if (to.meta.roles && isAuthenticated()) {
    try {
      const role = await getUserRole()
      if (!to.meta.roles.includes(role)) {
        alert('У вас нет доступа к этой странице')
        return next(from.fullPath)
      }
    } catch {
      return next({ name: 'LoginPage' })
    }
  }

  if (to.name === 'LoginPage' && isAuthenticated()) {
    // Уже вошёл — редиректим на нужную страницу по роли
    try {
      const role = await getUserRole()
      if (['hr', 'admin'].includes(role)) {
        return next({ name: 'HrPage' })
      } else {
        return next({ name: 'AboutPage' })
      }
    } catch {
      return next({ name: 'AboutPage' }) // если вдруг ошибка — по умолчанию
    }
  }


  next()
})

export default router
