<template>
  <div class="login-page">
    <main>
      <span class="t30">Авторизация</span>
      <form class="login-form" @submit.prevent="handleLogin">
        <!-- Поле Логин -->
        <InputComponent
          id="email"
          label="Логин"
          type="email"
          placeholder="Введите логин или почту"
          v-model="email"
        />
        <!-- Поле Пароль -->
        <InputComponent
          id="password"
          label="Пароль"
          type="password"
          placeholder="Введите пароль"
          v-model="password"
        />

        <!-- Кнопка Войти -->
        <ButtonComponent type="submit">Войти</ButtonComponent>
      </form>

      <!-- Сообщение об ошибке -->
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <!-- Информация для пользователя -->
      <div class="info sp">
        Для получения логина и пароля вам необходимо обратиться в кадровый отдел
      </div>
    </main>
  </div>
</template>

<script>
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import { useAuthStore } from '@/stores/auth'

export default {
  components: { InputComponent, ButtonComponent },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async handleLogin() {
      this.errorMessage = '' // Сбрасываем старое сообщение об ошибке

      try {
        const response = await fetch('http://profguide.leganyst.ru:61180/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        })

        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.message || 'Ошибка при логине')
        }

        // Сохраняем токены в localStorage
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
        localStorage.setItem('expires_at', data.expires_at)

        
const authStore = useAuthStore()

// после успешного fetch:
authStore.setTokens({
  accessToken: data.access_token,
  refreshToken: data.refresh_token,
  expiresAt: data.expires_at
})
await authStore.fetchUser()

        // Перенаправляем пользователя
        this.$router.push('/about')
      } catch (err) {
        this.errorMessage = 'Ошибка при авторизации'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;

  main {
    width: 100%;
    max-width: 350px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;
      align-items: center;
    }

    .info {
      color: $low-gray;
      text-align: center;
      padding-inline: 20px;
    }

    .error-message {
      color: $main-red;
      font-size: 0.9rem;
      text-align: center;
      margin-top: 1rem;
    }
  }
}
</style>
