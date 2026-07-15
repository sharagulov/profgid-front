<template>
  <div class="certifications-tab">
    <div class="top-bar">
      <p class="subtitle">Список аттестаций</p>
      <button class="create-btn">+ Добавить аттестацию</button>
    </div>

    <div v-if="loading">Загрузка аттестаций...</div>
    <div v-else-if="error">{{ error }}</div>

    <table v-else class="certifications-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Описание</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in certifications" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMockHrCertifications, withMockFallback } from '@/utils/mock'

const certifications = ref([])
const loading = ref(false)
const error = ref(null)

async function fetchCertifications () {
  loading.value = true
  error.value = null
  try {
    const token = localStorage.getItem('access_token')
    certifications.value = await withMockFallback(
      () => fetch('http://profguide.leganyst.ru:61180/hr/certifications/all', {
        headers: { Authorization: `Bearer ${token}` }
      }),
      () => getMockHrCertifications()
    )
  } catch (err) {
    certifications.value = getMockHrCertifications()
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchCertifications)
</script>

<style scoped lang="scss">
.certifications-tab {
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .certifications-table {
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
