<template>
  <div class="login-page">
    <main>
      <span class="t30">Авторизация</span>
      <form class="login-form" @submit.prevent="handleLogin">
        <InputComponent
          id="email"
          label="Логин"
          type="email"
          placeholder="Введите логин или почту"
          v-model="email"
        />
        <InputComponent
          id="password"
          label="Пароль"
          type="password"
          placeholder="Введите пароль"
          v-model="password"
        />
        <ButtonComponent type="submit">Войти</ButtonComponent>
      </form>

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <div class="info sp">
        Для получения логина и пароля обратитесь в кадровый отдел.
        <br><br>
        <strong>Демо:</strong> ivan@example.com / demo (сотрудник),
        elena@example.com / demo (HR), petr@example.com / demo (admin)
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
  data () {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async handleLogin () {
      this.errorMessage = ''
      const authStore = useAuthStore()

      try {
        await authStore.login(this.email, this.password)
        const role = authStore.user?.role || authStore.user?.user?.role
        if (role === 'hr' || role === 'admin') {
          this.$router.push('/hr')
        } else {
          this.$router.push('/about')
        }
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
      font-size: 0.85rem;
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
