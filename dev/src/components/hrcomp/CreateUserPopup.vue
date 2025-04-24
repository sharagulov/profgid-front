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
            <!-- профессия -->
            <div class="select-group">
              <label>Профессия</label>
              <select v-model="selectedProfessionId">
                <option disabled value="">Выберите профессию</option>
                <option v-for="prof in professions" :key="prof.id" :value="prof.id">
                  {{ prof.name }}
                </option>
              </select>
            </div>

            <!-- должность -->
            <div class="select-group">
              <label>Должность</label>
              <select v-model="newEmployee.current_position_id">
                <option disabled value="">Выберите должность</option>
                <option v-for="pos in availablePositions" :key="pos.id" :value="pos.id">
                  {{ pos.name }}
                </option>
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
import { ref, onMounted, watch } from 'vue'
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
  current_position_id: '',
  current_profession_id: '',
  last_promotion: '',
  overall_experience: 12,
  status_to_certification: "In Progress"
})

const professions = ref([])
const selectedProfessionId = ref('')
const availablePositions = ref([])

onMounted(fetchProfessions)

watch(selectedProfessionId, (id) => {
  const profession = professions.value.find(p => p.id === id)
  newEmployee.value.current_profession_id = id
  availablePositions.value = profession?.positions || []
})

async function fetchProfessions() {
  try {
    const token = localStorage.getItem('access_token')
    const res = await fetch('http://profguide.leganyst.ru:61180/hr/professions/all', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()
    professions.value = data
  } catch (err) {
    console.error('Ошибка загрузки профессий:', err)
  }
}

async function createUser() {
  try {
    const accessToken = localStorage.getItem('access_token')
    const toISODate = (d) => (d ? new Date(d + 'T00:00:00Z').toISOString() : null)

    
    const payload = {
      employee: {
        company_start: toISODate(newEmployee.value.company_start),
        current_position_id: Number(newEmployee.value.current_position_id),
        current_profession_id: Number(newEmployee.value.current_profession_id),
        last_promotion: toISODate(newEmployee.value.last_promotion),
        overall_experience: newEmployee.value.overall_experience,
        status_to_certification: newEmployee.value.status_to_certification
      },
      user: {
        email: newUser.value.email,
        full_name: newUser.value.full_name,
        password: newUser.value.password,
        role: newUser.value.role
      }
    }
    
    console.log("Отправляемый payload:", JSON.stringify(payload, null, 2))

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
    current_position_id: '',
    current_profession_id: '',
    last_promotion: '',
    overall_experience: 12,
    status_to_certification: "In Progress"
  }
  selectedProfessionId.value = ''
  availablePositions.value = []
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
  max-width: 800px;
  margin: 0 auto;
}

.form-columns {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.form-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 250px;
}

.popup-content {
  max-width: 900px;
}
</style>
