<template>
  <div class="professions-tab">
    <div class="top-bar">
      <p class="subtitle">Список профессий</p>
      <button class="create-btn" @click="isCreateOpen = true">
        + Добавить профессию
      </button>
    </div>

    <div v-if="loading">Загрузка профессий...</div>
    <div v-else-if="error">{{ error }}</div>

    <table v-else class="professions-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Описание</th>
          <th>Привязанные должности</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in professions" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>
            <!-- Просто массив position_ids -->
            <span v-if="item.position_ids && item.position_ids.length">
              {{ item.position_ids.join(', ') }}
            </span>
            <span v-else>Нет</span>
          </td>
          <td>
            <button @click="openEdit(item)">Редактировать</button>
            <button @click="deleteProfession(item.id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Попап создания -->
    <CreateProfessionPopup
      v-if="isCreateOpen"
      @close="isCreateOpen = false"
      @created="onCreated"
    />

    <!-- Попап редактирования -->
    <EditProfessionPopup
      v-if="editData"
      :profession="editData"
      @close="editData = null"
      @updated="onUpdated"
    />
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

// Загрузка списка профессий
async function fetchProfessions() {
  loading.value = true
  error.value = null
  try {
    const accessToken = localStorage.getItem('access_token')
    // Предположим, что GET-эндпоинт: /hr/professions  (или /hr/professions/all, уточните у бэка)
    const res = await fetch('http://profguide.leganyst.ru:61180/hr/professions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!res.ok) throw new Error('Ошибка при загрузке списка профессий')
    const data = await res.json()
    professions.value = data
  } catch (err) {
    error.value = err.message
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchProfessions)

// Открыть попап редактирования
function openEdit(item) {
  // Глубокая копия, чтобы не ломать оригинал сразу
  editData.value = JSON.parse(JSON.stringify(item))
}

// Колбэк после создания профессии
function onCreated() {
  isCreateOpen.value = false
  fetchProfessions()
}

// Колбэк после обновления
function onUpdated() {
  editData.value = null
  fetchProfessions()
}

// Удаление профессии
async function deleteProfession(id) {
  if (!confirm('Точно удалить эту профессию?')) return
  try {
    const accessToken = localStorage.getItem('access_token')
    // По условию удаляем на /hr/professions/{id}
    const res = await fetch(`http://profguide.leganyst.ru:61180/hr/professions/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!res.ok) throw new Error('Ошибка при удалении профессии')
    // Перезагружаем
    await fetchProfessions()
  } catch (err) {
    alert(err.message)
    console.error(err)
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

    td button {
      margin-right: 8px;
    }
  }
}
</style>
