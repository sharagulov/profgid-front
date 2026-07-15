<template>
  <div class="events-tab">
    <div class="top-bar">
      <p class="subtitle">Список мероприятий</p>
      <button class="create-btn">+ Добавить мероприятие</button>
    </div>

    <div v-if="loading">Загрузка мероприятий...</div>
    <div v-else-if="error">{{ error }}</div>

    <table v-else class="events-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Дата</th>
          <th>Место</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in events" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.location }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMockHrEvents, withMockFallback } from '@/utils/mock'

const events = ref([])
const loading = ref(false)
const error = ref(null)

async function fetchEvents () {
  loading.value = true
  error.value = null
  try {
    const token = localStorage.getItem('access_token')
    events.value = await withMockFallback(
      () => fetch('http://profguide.leganyst.ru:61180/hr/events/all', {
        headers: { Authorization: `Bearer ${token}` }
      }),
      () => getMockHrEvents()
    )
  } catch (err) {
    events.value = getMockHrEvents()
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchEvents)
</script>

<style scoped lang="scss">
.events-tab {
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .events-table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      text-align: left;
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
