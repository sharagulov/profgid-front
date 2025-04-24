<template>
  <div class="positions-tab">
    <div class="top-bar">
      <p class="subtitle">Список участок/подразделение</p>
      <button class="create-btn" @click="isCreateOpen = true">
        + Добавить
      </button>
    </div>

    <div v-if="loading">Загрузка должностей...</div>
    <div v-else-if="error">{{ error }}</div>

    <table v-else class="positions-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Описание</th>
          <th>Следующие участки/подразделения</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in positions"
          :key="item.id"
          @click="openEdit(item)"
          class="clickable-row"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>
            <span v-if="item.next_position_ids?.length">
              {{ item.next_position_ids.join(', ') }}
            </span>
            <span v-else>Нет</span>
          </td>
          <td>
            <button @click.stop="deletePosition(item.id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>

    <CreatePositionPopup
      v-if="isCreateOpen"
      @close="isCreateOpen = false"
      @created="onCreated"
    />

    <EditPositionPopup
      v-if="editData"
      :position="editData"
      @close="editData = null"
      @updated="onUpdated"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import CreatePositionPopup from './CreatePositionPopup.vue'
import EditPositionPopup from './EditPositionPopup.vue'

const positions = ref([])
const loading = ref(false)
const error = ref(null)

const isCreateOpen = ref(false)
const editData = ref(null)

async function fetchPositions() {
  loading.value = true
  error.value = null
  try {
    const accessToken = localStorage.getItem('access_token')
    const res = await fetch('http://profguide.leganyst.ru:61180/hr/positions/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!res.ok) throw new Error('Ошибка при загрузке списка должностей')
    const data = await res.json()
    positions.value = data
  } catch (err) {
    error.value = err.message
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchPositions)

function openEdit(item) {
  editData.value = JSON.parse(JSON.stringify(item))
}

function onCreated() {
  isCreateOpen.value = false
  fetchPositions()
}

function onUpdated() {
  editData.value = null
  fetchPositions()
}

async function deletePosition(id) {
  if (!confirm('Точно удалить эту должность?')) return
  try {
    const accessToken = localStorage.getItem('access_token')
    const res = await fetch(`http://profguide.leganyst.ru:61180/hr/positions/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!res.ok) throw new Error('Ошибка при удалении участки/подразделения')
    await fetchPositions()
  } catch (err) {
    alert(err.message)
    console.error(err)
  }
}
</script>

<style scoped lang="scss">
.positions-tab {
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .positions-table {
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
