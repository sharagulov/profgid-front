<template>
  <div class="register-page">
    <main>
      <span class="hc">Регистрация</span>
      <form class="register-form" @submit.prevent="createUser">
        
        <!-- Поле Email -->
        <InputComponent
          id="email"
          label="Email"
          type="email"
          placeholder="Введите email"
          v-model="email"
          required
        />
        
        <!-- Поле Полное имя -->
        <InputComponent
          id="fullName"
          label="Полное имя"
          placeholder="Введите ФИО"
          v-model="fullName"
          required
        />
        
        <!-- Поле Пароль -->
        <InputComponent
          id="password"
          label="Пароль"
          type="password"
          placeholder="Введите пароль"
          v-model="password"
          required
        />

        <!-- Выбор роли -->
        <div class="select-group">
          <label for="role">Роль</label>
          <select id="role" v-model="role">
            <option value="user">Пользователь</option>
            <option value="admin">Администратор</option>
          </select>
        </div>

        <!-- Кнопка Зарегистрировать -->
        <ButtonComponent type="submit">Зарегистрировать</ButtonComponent>
      </form>

      <!-- Сообщение об ошибке -->
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <!-- Сообщение об успешной регистрации -->
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>

      <!-- Информация для пользователя -->
      <div class="info sp">
        Для получения доступа обратитесь в кадровый отдел
      </div>
    </main>
  </div>
</template>

<script>
import ButtonComponent from '@/components/ButtonComponent.vue'
import InputComponent from '@/components/InputComponent.vue'

export default {
  components: { InputComponent, ButtonComponent },
  data() {
    return {
      email: '',
      fullName: '',
      password: '',
      role: 'user', // По умолчанию "Пользователь"
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    async createUser() {
      this.errorMessage = ''
      this.successMessage = ''

      try {
        const response = await fetch('http://profguide.leganyst.ru:61180/users/employees', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            employee: {
              company_start: "2023-01-01T00:00:00Z",
              current_position_id: 1,
              overall_experience: 120,
              status_to_certification: "In Progress"
          },
            user: {
              email: this.email,
              full_name: this.fullName,
              password: this.password,
              role: this.role
            }
})

        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Ошибка при создании пользователя')
        }

        console.log(data)

        // Успешно зарегистрирован
        this.successMessage = 'Пользователь успешно создан!'
        
        // Очищаем поля формы
        this.email = ''
        this.fullName = ''
        this.password = ''
        this.role = 'user'
      } catch (error) {
        this.errorMessage = error.message
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.register-page {
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

    .register-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;
      align-items: center;
    }

    .select-group {
      display: flex;
      flex-direction: column;
      width: 100%;

      select {
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
      }
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

    .success-message {
      color: green;
      font-size: 0.9rem;
      text-align: center;
      margin-top: 1rem;
    }
  }
}
</style>
