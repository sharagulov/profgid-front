<template>
  <h2>Достижения</h2>
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
import data from '@/fake_db/db.json'

const props = defineProps({
  currentUserId: {
    type: Number,
    required: false,
    default: 1,
  }
})

const achievements = ref(data.achievements)

// const fetchAchievements = async () => {
//   try {
//     const response = await fetch(`http://localhost:3000/achievements`)
//     achievements.value = await response.json()
//     console.log("Ачивки", achievements.value)
//   } catch (error) {
//     console.error('Ошибка при загрузке достижений:', error)
//   }
// }

// onMounted(fetchAchievements)

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
