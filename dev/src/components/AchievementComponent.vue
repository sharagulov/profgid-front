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

<script>
import AchievementItem from '@/components/AchievementItem.vue'

export default {
  name: 'AchievementComponent',
  components: { AchievementItem },
  props: {
    currentUserId: {
      type: Number,
      required: false,
      default: 0,
    }
  },
  data() {
    return {
      achievements: [],
    }
  },
  mounted() {
    this.fetchAchievements()
  },
  methods: {
    async fetchAchievements() {
      try {
        const response = await fetch(`http://localhost:3000/achievements?userId=${this.currentUserId}`)
        this.achievements = await response.json()
      } catch (error) {
        console.error('Ошибка при загрузке достижений:', error)
      }
    },
    getImageUrl(path) {
      return new URL(path, import.meta.url).href
    }
  }
}
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
