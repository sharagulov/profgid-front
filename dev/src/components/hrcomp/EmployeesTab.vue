<template>
  <div class="employees-tab">
    <div class="top-bar">
      <p class="subtitle">Список пользователей</p>
      <button class="create-btn" @click="isCreateUserOpen = true">
        + Добавить пользователя
      </button>
    </div>

    <div v-if="loadingUsers">Загрузка сотрудников...</div>
    <div v-else-if="usersError">{{ usersError }}</div>

    <table v-else class="users-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Должность</th>
          <th>Участок/подразделение</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="clickable-row" @click="openEditUser(user.raw)">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.profession }}</td>
          <td>{{ user.position }}</td>
          <td>
            <button @click.stop="deleteUser(user.raw.user.uuid)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>

    <EditUserPopup
      v-if="isEditUserOpen"
      :selectedUser="selectedUser"
      :editUser="editUser"
      @close="isEditUserOpen = false"
      @updated="onUserUpdated"
    />

    <CreateUserPopup
      v-if="isCreateUserOpen"
      @close="isCreateUserOpen = false"
      @created="onUserCreated"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EditUserPopup from './EditUserPopup.vue'
import CreateUserPopup from './CreateUserPopup.vue'

const users = ref([])
const loadingUsers = ref(false)
const usersError = ref(null)

const isEditUserOpen = ref(false)
const selectedUser = ref(null)
const editUser = ref(null)

const isCreateUserOpen = ref(false)

const positionNameMap = ref({})

async function fetchAllPositions() {
  try {
    const token = localStorage.getItem('access_token')
    const res = await fetch('http://profguide.leganyst.ru:61180/hr/professions/all', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const professions = await res.json()
    const map = {}
    professions.forEach(prof => {
      (prof.positions || []).forEach(pos => {
        map[pos.id] = pos.name
        map[String(pos.id)] = pos.name
      })
    })
    positionNameMap.value = map
  } catch (err) {
    console.error('Ошибка загрузки позиций:', err)
  }
}

function resolvePositionName(id) {
  return positionNameMap.value[String(id)] || '—'
}

const fetchUsers = async () => {
  loadingUsers.value = true
  usersError.value = null
  try {
    const accessToken = localStorage.getItem('access_token')
    const res = await fetch('http://profguide.leganyst.ru:61180/hr/employees/all', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    const list = await res.json()

    users.value = list.map((entity, index) => ({
      id: index + 1,
      name: entity.user.full_name,
      profession: entity.employee.profession?.name || '—',
      position: entity.employee.position?.name || '—',
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

onMounted(async () => {
  await fetchAllPositions()
  await fetchUsers()
})

const openEditUser = (rawData) => {
  selectedUser.value = rawData
  editUser.value = makeEditUserModel(rawData)
  isEditUserOpen.value = true
}

const onUserUpdated = () => {
  isEditUserOpen.value = false
  fetchUsers()
}

const onUserCreated = () => {
  isCreateUserOpen.value = false
  fetchUsers()
}

function makeEditUserModel(rawData) {
  return {
    user: {
      email: rawData.user.email,
      full_name: rawData.user.full_name,
      role: rawData.user.role,
      uuid: rawData.user.uuid
    },
    employee: {
      company_start: rawData.employee.company_start?.split('T')[0] || '',
      last_promotion: rawData.employee.last_promotion?.split('T')[0] || '',
      current_position_id: rawData.employee.current_position_id,
      overall_experience: rawData.employee.overall_experience,
      status_to_certification: rawData.employee.status_to_certification,
      photo_url: 'http://profguide_back/photos/user_photo2143'
    }
  }
}

async function deleteUser(uuid) {
  if (!confirm('Удалить пользователя безвозвратно?')) return
  try {
    const token = localStorage.getItem('access_token')
    const res = await fetch(`http://profguide.leganyst.ru:61180/hr/employees/${uuid}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!res.ok) throw new Error('Ошибка при удалении пользователя')
    await fetchUsers()
  } catch (err) {
    alert('Не удалось удалить пользователя')
    console.error(err)
  }
}

function calculateExperienceFromCompanyStart(companyStart) {
  if (!companyStart) return ''
  const startDate = new Date(companyStart)
  const now = new Date()
  let totalMonths = (now.getFullYear() - startDate.getFullYear()) * 12
  totalMonths += now.getMonth() - startDate.getMonth()
  if (now.getDate() < startDate.getDate()) totalMonths--
  return convertMonthsToText(Math.max(0, totalMonths))
}

function convertMonthsToText(months) {
  if (!months) return '0 мес.'
  const y = Math.floor(months / 12)
  const m = months % 12
  if (y && m) return `${y} г. ${m} мес.`
  if (y) return `${y} г.`
  return `${m} мес.`
}

function formatDate(d) {
  return d ? new Date(d).toLocaleDateString('ru-RU') : ''
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

    th,
    td {
      text-align: left;
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }

    .clickable-row {
      cursor: pointer;
      &:hover {
        background-color: #f9f9f9;
      }

      td button {
        margin-left: 10px;
      }
    }
  }
}
</style>
