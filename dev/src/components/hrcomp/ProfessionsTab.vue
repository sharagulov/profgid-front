<template>
  <div class="professions-tab">
    <div class="top-bar">
      <p class="subtitle">Список должностей</p>
      <button class="create-btn" @click="isCreateOpen = true">
        + Добавить
      </button>
    </div>

    <div v-if="loading">Загрузка должностей...</div>
    <div v-else-if="error">{{ error }}</div>

    <table v-else class="professions-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Описание</th>
          <th>Привязанные участки/подразделения</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in professions"
          :key="item.id"
          @click="openEdit(item)"
          class="clickable-row"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>
            <span v-if="item.position_ids?.length">{{ item.position_ids.join(', ') }}</span>
            <span v-else>Нет</span>
          </td>
          <td>
            <button @click.stop="deleteProfession(item.id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>

    <CreateProfessionPopup v-if="isCreateOpen" @close="isCreateOpen = false" @created="onCreated" />
    <EditProfessionPopup v-if="editData" :profession="editData" @close="editData = null" @updated="onUpdated" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CreateProfessionPopup from './CreateProfessionPopup.vue'
import EditProfessionPopup from './EditProfessionPopup.vue'

const professions = ref([])
const loading = ref(false)
const error = ref(null)
const isCreateOpen = ref(false)
const editData = ref(null)

async function fetchProfessions() {
  loading.value = true
  error.value = null
  try {
    const accessToken = localStorage.getItem('access_token')
    const res = await fetch('http://profguide.leganyst.ru:61180/hr/professions/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!res.ok) throw new Error('Ошибка при загрузке списка должностей')
    professions.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchProfessions)

function openEdit(item) {
  editData.value = JSON.parse(JSON.stringify(item))
}

function onCreated() {
  isCreateOpen.value = false
  fetchProfessions()
}

function onUpdated() {
  editData.value = null
  fetchProfessions()
}

async function deleteProfession(id) {
  if (!confirm('Точно удалить эту профессию?')) return
  try {
    const accessToken = localStorage.getItem('access_token')
    const res = await fetch(`http://profguide.leganyst.ru:61180/hr/professions/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!res.ok) throw new Error('Ошибка при удалении участка/подразделения')
    await fetchProfessions()
  } catch (err) {
    alert(err.message)
  }
}
</script>

<style scoped lang="scss">
.professions-tab {
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .professions-table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      text-align: left;
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }

    .clickable-row {
      cursor: pointer;
      transition: background 0.2s ease;
      &:hover {
        background-color: #f9f9f9;
      }
    }

    td button {
      margin-right: 8px;
    }
  }
}
</style>
