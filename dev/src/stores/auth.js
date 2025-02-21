import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
    user: null // Данные авторизованного пользователя
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
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

    // Загрузка токенов при перезагрузке страницы
    loadTokensFromStorage() {
      this.accessToken = localStorage.getItem('access_token')
      this.refreshToken = localStorage.getItem('refresh_token')
      this.expiresAt = localStorage.getItem('expires_at')

      // Если есть токен, загружаем пользователя
      if (this.accessToken) {
        this.fetchUser()
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

        // Сохранить токены
        this.setTokens({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          expiresAt: data.expires_at
        })

        // Загружаем данные пользователя
        await this.fetchUser()

      } catch (error) {
        throw error
      }
    },

    // Получение данных пользователя после авторизации
    async fetchUser() {
      if (!this.accessToken) return

      try {
        const response = await fetch('http://profguide.leganyst.ru:61180/users/me', {
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

        this.user = data // Сохраняем пользователя

      } catch (error) {
        console.error("Ошибка загрузки пользователя:", error.message)
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
    }
  }
})
