<template>
  <div class="employees-tab">
    <div class="top-bar">
      <p class="subtitle">Список пользователей</p>
      <button class="create-btn" @click="isCreateUserOpen = true">
        + Добавить пользователя
      </button>
    </div>

    <!-- Спиннер/ошибки -->
    <div v-if="loadingUsers">Загрузка сотрудников...</div>
    <div v-else-if="usersError">{{ usersError }}</div>

    <table v-else class="users-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Должность</th>
          <th>Участок/подразделение</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
          @click="openEditUser(user.raw)"
        >
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.position }}</td>
          <td>{{ "ШПУ производства радиаторов" }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Попап редактирования -->
    <EditUserPopup
      v-if="isEditUserOpen"
      :selectedUser="selectedUser"
      :editUser="editUser"
      @close="isEditUserOpen = false"
      @updated="onUserUpdated"
    />

    <!-- Попап создания -->
    <CreateUserPopup
      v-if="isCreateUserOpen"
      @close="isCreateUserOpen = false"
      @created="onUserCreated"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Импорт необходимых компонентов
import EditUserPopup from './EditUserPopup.vue'
import CreateUserPopup from './CreateUserPopup.vue'

// Глобальные или локальные компоненты, если нужно подключать:
// import PopupComponent from '@/components/PopupComponent.vue'
// import InputComponent from '@/components/InputComponent.vue'
// import ButtonComponent from '@/components/ButtonComponent.vue'

const users = ref([])
const loadingUsers = ref(false)
const usersError = ref(null)

const isEditUserOpen = ref(false)
const selectedUser = ref(null)
const editUser = ref(null)

const isCreateUserOpen = ref(false)

// --- Загрузка пользователей ---
const fetchUsers = async () => {
  loadingUsers.value = true
  usersError.value = null
  try {
    const accessToken = localStorage.getItem('access_token')
    const res = await fetch('http://profguide.leganyst.ru:61180/hr/employees/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    const list = await res.json()

    users.value = list.map((entity, index) => ({
      id: index + 1,
      name: entity.user.full_name,
      position: mapPosition(entity.employee.current_position_id),
      // Вместо overall_experience вычисляем стаж из company_start:
      experience: calculateExperienceFromCompanyStart(entity.employee.company_start),
      lastUpdated: formatDate(entity.employee.last_promotion),
      raw: entity
    }))
  } catch (err) {
    usersError.value = 'Ошибка загрузки сотрудников'
    console.error(err)
  } finally {
    loadingUsers.value = false
  }
}
onMounted(fetchUsers)

// --- Открытие модалки редактирования ---
const openEditUser = (rawData) => {
  selectedUser.value = rawData
  editUser.value = makeEditUserModel(rawData)
  isEditUserOpen.value = true
}

// --- Колбэк, когда пользователь обновлён (чтоб закрыть попап + рефреш) ---
const onUserUpdated = () => {
  isEditUserOpen.value = false
  fetchUsers()
}

// --- Колбэк, когда пользователь создан (чтоб закрыть попап + рефреш) ---
const onUserCreated = () => {
  isCreateUserOpen.value = false
  fetchUsers()
}

// --- Преобразование исходных данных сервера в модель для формы ---
function makeEditUserModel(rawData) {
  return {
    user: {
      email: rawData.user.email,
      full_name: rawData.user.full_name,
      role: rawData.user.role,
      uuid: rawData.user.uuid
    },
    employee: {
      company_start: rawData.employee.company_start
        ? rawData.employee.company_start.split('T')[0]
        : '',
      last_promotion: rawData.employee.last_promotion
        ? rawData.employee.last_promotion.split('T')[0]
        : '',
      current_position_id: rawData.employee.current_position_id,
      overall_experience: rawData.employee.overall_experience,
      status_to_certification: rawData.employee.status_to_certification,
      photo_url: "http://profguide_back/photos/user_photo2143"
    }
  }
}

// --- Вспомогательные функции для отображения ---

/**
 * Формируем стаж на основе даты приёма (company_start):
 * вычитаем из текущей даты дату приёма, получая количество месяцев,
 * затем переводим в "X г. Y мес." или просто "Y мес.".
 */
function calculateExperienceFromCompanyStart(companyStart) {
  if (!companyStart) return ''
  const startDate = new Date(companyStart)
  const now = new Date()

  // Считаем общее количество месяцев между датами:
  let totalMonths = (now.getFullYear() - startDate.getFullYear()) * 12
  totalMonths += now.getMonth() - startDate.getMonth()

  // Если день в текущем месяце ещё не достигнут дня приёма, отнимаем 1 месяц:
  if (now.getDate() < startDate.getDate()) {
    totalMonths -= 1
  }

  if (totalMonths < 0) {
    totalMonths = 0 // Вдруг companyStart в будущем
  }

  return convertMonthsToText(totalMonths)
}

/**
 * Переводим количество месяцев в строку: "X г. Y мес." или "Y мес.".
 */
function convertMonthsToText(months) {
  if (!months) return '0 мес.'
  const y = Math.floor(months / 12)
  const m = months % 12
  if (y > 0 && m > 0) {
    return `${y} г. ${m} мес.`
  } else if (y > 0) {
    return `${y} г.`
  } else {
    return `${m} мес.`
  }
}

function formatDate(d) {
  return d ? new Date(d).toLocaleDateString('ru-RU') : ''
}

function mapPosition(id) {
  return {
    1: 'Оператор автоматизированной линии',
    2: 'Сварщик',
    3: 'Инженер',
    4: 'Начальник цеха'
  }[id] || 'Сотрудник'
}
</script>

<style scoped lang="scss">
.employees-tab {
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .users-table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      text-align: left;
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }

    tr {
      cursor: pointer;

      &:hover {
        background-color: #f9f9f9;
      }
    }
  }
}
</style>
