<template>
  <div class="achievements-container">
    <AchievementItem
      v-for="achievement in achievements"
      :key="achievement.id"
      :name="achievement.name"
      :date="achievement.date"
      :desc="achievement.desc"
      :imgUrl="achievement.imgUrl"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AchievementItem from '@/components/AchievementItem.vue'

const props = defineProps({
  currentUserId: {
    type: Number,
    required: false,
    default: 1,
  }
})

const achievements = ref([])

const fetchAchievements = async () => {
  try {
    const response = await fetch(`http://localhost:3000/achievements?userId=${props.currentUserId}`)
    achievements.value = await response.json()
    console.log("Ачивки", achievements.value)
  } catch (error) {
    console.error('Ошибка при загрузке достижений:', error)
  }
}

onMounted(fetchAchievements)
</script>

<style scoped lang="scss">
.achievements-container {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 10px;
}
</style>
