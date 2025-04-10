<!--
Старый код, при котором было всё в одну колонку
<template>
  <PopupComponent :visible="true" @close="$emit('close')">
    <template #default>
      <h2 style="text-align:center; margin-bottom: 20px">Создание нового пользователя</h2>
      <form class="create-user-form" @submit.prevent="createUser">
        <InputComponent
          id="fullName"
          label="ФИО"
          placeholder="Иван Иванов"
          v-model="newUser.full_name"
          required
        />
        <InputComponent
          id="email"
          label="Email"
          type="email"
          placeholder="ivan@example.com"
          v-model="newUser.email"
          required
        />
        <InputComponent
          id="password"
          label="Пароль"
          type="password"
          placeholder="Пароль"
          v-model="newUser.password"
          required
        />
        <div class="select-group">
          <label for="role">Роль</label>
          <select id="role" v-model="newUser.role">
            <option value="user">Пользователь</option>
            <option value="admin">Администратор</option>
            <option value="hr">HR</option>
          </select>
        </div>
        <div class="select-group">
          <label for="position">Должность</label>
          <select id="position" v-model="newEmployee.current_position_id">
            <option :value="1">Слесарь</option>
            <option :value="2">Сварщик</option>
            <option :value="3">Инженер</option>
            <option :value="4">Начальник цеха</option>
          </select>
        </div>
        <div class="select-group">
          <label>Дата приёма</label>
          <input type="date" v-model="newEmployee.company_start" required />
        </div>
        <div class="select-group">
          <label>Последнее повышение</label>
          <input type="date" v-model="newEmployee.last_promotion" required />
        </div>
        <InputComponent
          id="experience"
          label="Стаж (в месяцах)"
          type="number"
          placeholder="120"
          v-model.number="newEmployee.overall_experience"
          required
        />
        <div style="text-align:center; margin-top:20px;">
          <ButtonComponent type="submit">Создать</ButtonComponent>
        </div>
      </form>
    </template>
  </PopupComponent>
</template>
-->

<template>
  <PopupComponent :visible="true" @close="$emit('close')">
    <template #default>
      <h2 style="text-align:center; margin-bottom: 20px;">Создание нового пользователя</h2>

      <form class="create-user-form" @submit.prevent="createUser">
        <div class="form-columns">
          <!-- Левая колонка -->
          <div class="form-column">
            <InputComponent id="fullName" label="ФИО" v-model="newUser.full_name" required />
            <InputComponent id="email" label="Email" v-model="newUser.email" required />
            <InputComponent id="password" label="Пароль" v-model="newUser.password" required />
            <div class="select-group">
              <label>Роль</label>
              <select v-model="newUser.role">
                <option value="user">Пользователь</option>
                <option value="admin">Администратор</option>
                <option value="hr">HR</option>
              </select>
            </div>
          </div>

          <!-- Правая колонка -->
          <div class="form-column">
            <div class="select-group">
              <label>Должность</label>
              <select v-model="newEmployee.current_position_id">
                <option :value="1">Слесарь</option>
                <option :value="2">Сварщик</option>
                <option :value="3">Инженер</option>
                <option :value="4">Начальник цеха</option>
              </select>
            </div>
            <div class="select-group">
              <label>Дата приёма</label>
              <input type="date" v-model="newEmployee.company_start" required />
            </div>
            <div class="select-group">
              <label>Последнее повышение</label>
              <input type="date" v-model="newEmployee.last_promotion" required />
            </div>
            <InputComponent id="experience" label="Стаж (в месяцах)" v-model.number="newEmployee.overall_experience" required />
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px;">
          <ButtonComponent type="submit">Создать</ButtonComponent>
        </div>
      </form>
    </template>
  </PopupComponent>
</template>


<script setup>
import { ref } from 'vue'
import PopupComponent from '@/components/PopupComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

const emits = defineEmits(['close', 'created'])

const newUser = ref({
  email: '',
  full_name: '',
  password: '',
  role: 'user'
})
const newEmployee = ref({
  company_start: '',
  current_position_id: 1,
  current_profession_id: 1,
  last_promotion: '',
  overall_experience: 12,
  status_to_certification: "In Progress"
})

async function createUser() {
  try {
    const accessToken = localStorage.getItem('access_token')
    const toISODate = (d) => (d ? new Date(d + 'T00:00:00Z').toISOString() : null)

    const payload = {
      employee: {
        company_start: toISODate(newEmployee.value.company_start),
        current_position_id: newEmployee.value.current_position_id,
        current_profession_id: newEmployee.value.current_profession_id,
        last_promotion: toISODate(newEmployee.value.last_promotion),
        overall_experience: newEmployee.value.overall_experience,
        status_to_certification: 'In Progress'
      },
      user: {
        email: newUser.value.email,
        full_name: newUser.value.full_name,
        password: newUser.value.password,
        role: newUser.value.role
      }
    }

    const res = await fetch('http://profguide.leganyst.ru:61180/hr/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error('Ошибка при создании пользователя')

    emits('created')
    resetForm()
  } catch (err) {
    alert('Ошибка при создании пользователя')
    console.error(err)
  }
}

function resetForm() {
  newUser.value = {
    email: '',
    full_name: '',
    password: '',
    role: 'user'
  }
  newEmployee.value = {
    company_start: '',
    current_position_id: 1,
    current_profession_id: 1,
    last_promotion: '',
    overall_experience: 12,
    status_to_certification: "In Progress"
  }
}
</script>

<style scoped>

.select-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.create-user-form {
  width: 100%;
  max-width: 800px; /* Широкая форма */
  margin: 0 auto;
}

.form-columns {
  display: flex;
  gap: 30px; /* Расстояние между колонками */
  flex-wrap: wrap; /* Чтобы на маленьком экране они переходили вниз */
}

.form-column {
  flex: 1; /* Каждая колонка занимает одинаковую ширину */
  display: flex;
  flex-direction: column;
  gap: 15px; /* Расстояние между полями внутри колонки */
  min-width: 250px;
}

.popup-content {
  max-width: 900px; /* Сделать шире! */
}

</style>
