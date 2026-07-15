// src/stores/auth.js
import { defineStore } from 'pinia'
import {
  findDemoCredential,
  getMockAuthTokens,
  getMockUserByEmail,
  saveMockUser,
  loadMockUser,
  clearMockUser,
  isMockToken,
} from '@/utils/mock'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
    user: null // Данные авторизованного пользователя
  }),

  getters: {
    isAuthenticated: (state) => {
      if (!state.accessToken) return false
      if (!state.expiresAt) return false
      
      const now = new Date()
      const tokenExp = new Date(state.expiresAt)

      return now < tokenExp
    },
    getUser: (state) => state.user
  },

  actions: {
    // Сохранение токенов
    setTokens({ accessToken, refreshToken, expiresAt }) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      this.expiresAt = expiresAt

      // Сохраняем в localStorage
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('refresh_token', refreshToken)
      localStorage.setItem('expires_at', expiresAt)
    },

    // Загрузка токенов при старте
    loadTokensFromStorage() {
      const accessToken = localStorage.getItem('access_token')
      const refreshToken = localStorage.getItem('refresh_token')
      const expiresAt = localStorage.getItem('expires_at')

      if (accessToken && expiresAt && new Date() < new Date(expiresAt)) {
        this.accessToken = accessToken
        this.refreshToken = refreshToken
        this.expiresAt = expiresAt
        this.fetchUser()
      } else {
        this.logout()
      }
    },

    // Логин и загрузка данных пользователя
    async login(email, password) {
      try {
        this.logout()
        const response = await fetch('http://profguide.leganyst.ru:61180/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Ошибка при логине')
        }

        clearMockUser()
        this.setTokens({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          expiresAt: data.expires_at
        })

        await this.fetchUser()
      } catch (error) {
        const demo = findDemoCredential(email, password)
        if (!demo) throw error

        const tokens = getMockAuthTokens()
        const user = getMockUserByEmail(email) || getDefaultMockUser()
        saveMockUser(user)

        this.setTokens({
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          expiresAt: tokens.expires_at
        })
        this.user = user
      }
    },

    // Получение данных пользователя после авторизации
    async fetchUser() {
      if (!this.accessToken) return

      if (isMockToken(this.accessToken)) {
        this.user = loadMockUser()
        return
      }

      try {
        const response = await fetch('http://profguide.leganyst.ru:61180/employee/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.accessToken}`
          }
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Ошибка при загрузке пользователя')
        }

        this.user = data
      } catch (error) {
        console.error('Ошибка загрузки пользователя:', error.message)
        this.user = loadMockUser()
      }
    },

    // Выход из аккаунта
    logout() {
      this.accessToken = null
      this.refreshToken = null
      this.expiresAt = null
      this.user = null

      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('expires_at')
      clearMockUser()
    }
  }
})
