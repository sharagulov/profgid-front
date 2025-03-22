<template>
  <div>
    <h2>Активность</h2>
    <Line id="activity-chart" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

let lastActivityTime = 0 // Время последнего зафиксированного действия

// 🔹 Получаем ключ для текущего дня
const getTodayKey = () => {
  const today = new Date()
  return today.toISOString().split('T')[0] // YYYY-MM-DD
}

// 🔹 Получаем текущий час (0-23)
const getCurrentHour = () => {
  return new Date().getHours()
}

// 🔹 Фиксируем действие пользователя
const registerActivity = () => {
  const now = Date.now()
  if (now - lastActivityTime < 500) return // Ограничение на частоту (чтобы не спамить события)

  lastActivityTime = now
  const todayKey = getTodayKey()
  const hour = getCurrentHour()
  const activityData = JSON.parse(localStorage.getItem('activityStats')) || {}

  // Увеличиваем счетчик действий за текущий час
  if (!activityData[todayKey]) activityData[todayKey] = Array(24).fill(0)
  activityData[todayKey][hour] += 1

  // Сохраняем в localStorage
  localStorage.setItem('activityStats', JSON.stringify(activityData))

  // Обновляем график
  updateChartData()
}

// 🔹 Загружаем статистику активности за текущий день
const loadActivityData = () => {
  const todayKey = getTodayKey()
  const activityData = JSON.parse(localStorage.getItem('activityStats')) || {}

  return activityData[todayKey] || Array(24).fill(0) // Если данных нет, заполняем нулями
}

// 🔹 Обновляем данные для графика
const updateChartData = () => {
  const activityData = loadActivityData()
  chartData.value.datasets[0].data = activityData
}

// 🔹 Динамические данные для графика
const chartData = ref({
  labels: Array.from({ length: 24 }, (_, i) => `${i}`), // 0:00 - 23:00
  datasets: [
    {
      label: 'Коэффициент активности',
      data: loadActivityData(),
      borderColor: 'rgba(163, 40, 40, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      fill: false,
      tension: 0.3 // Плавные линии
    }
  ]
})

// 🔹 Опции графика
const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: { display: true },
  },
  scales: {
    y: { beginAtZero: true }
  }
})

// 🔹 Фиксируем вход на страницу
onMounted(() => {
  registerActivity() // Фиксируем факт захода на страницу

  // Навешиваем обработчики для отслеживания действий пользователя
  document.addEventListener('click', registerActivity)
  document.addEventListener('keydown', registerActivity)
  document.addEventListener('scroll', registerActivity)
})

// 🔹 Фиксируем выход со страницы
onBeforeUnmount(() => {
  document.removeEventListener('click', registerActivity)
  document.removeEventListener('keydown', registerActivity)
  document.removeEventListener('scroll', registerActivity)
})
</script>

<style scoped>
h2 {
  font-size: 20px;
  margin-bottom: 10px;
  text-align: center;
}
</style>
