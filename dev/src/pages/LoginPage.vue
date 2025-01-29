<template>
  <div class="login-page">
    <main>
      <span class="hc">Авторизация</span>
      <form class="login-form" @submit.prevent="handleLogin">
        
        <!-- Поле Логин -->
        <InputComponent
          id="login"
          label="Логин"
          placeholder="Введите логин"
          v-model="login"
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

export default {
  components: { InputComponent, ButtonComponent },
  data () {
    return {
      login: '', // Значение для поля логин
      password: '', // Значение для поля пароль
      errorMessage: '' // Сообщение об ошибке
    }
  },
  methods: {
    async handleLogin () {
      this.errorMessage = '' // Сбрасываем старое сообщение об ошибке

      try {
        // Отправка данных на сервер
        const response = await fetch('https://example.com/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            login: this.login,
            password: this.password
          })
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.message || 'Неверный логин или пароль')
        }

        // Обработка успешного входа (можно сделать редирект или сохранить токен)
        alert('Успешный вход!')
        this.$router.push('/') // Переход на главную страницу
      } catch (error) {
        // Обработка ошибки и вывод сообщения
        this.errorMessage = error.message
        alert('Система авторизации находится в разработке.')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
      color: #ccc;
      text-align: center;
      padding-inline: 20px;
    }

    .error-message {
      color: #a30000;
      font-size: 0.9rem;
      text-align: center;
      margin-top: 1rem;
    }
  }
}
</style>
