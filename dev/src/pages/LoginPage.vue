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
import { useAuthStore } from '@/stores/auth.js'

export default {
  components: { InputComponent, ButtonComponent },
  data () {
    return {
      email: '', // Значение для поля емейл
      password: '', // Значение для поля пароль
      errorMessage: '' // Сообщение об ошибке
    }
  },
  methods: {
    async handleLogin () {
      this.errorMessage = '' // Сбрасываем старое сообщение об ошибке
      const authStore = useAuthStore()

      try {
        await authStore.login(this.email, this.password)
        // Успешный вход
        this.$router.push('/carrer') // или на любую защищенную страницу
      } catch (err) {
        this.errorMessage = err.message || 'Ошибка при входе'
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
  height: 100vh; /* Центрирование по высоте экрана */
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
