<template>
  <div v-if="stats" class="vertical-flex">
    <div class="info-list">
      <div class="info-list-item" style="font-weight: bold;">
        <span>Пройденные тесты</span>
        <div class="dotted-line"></div>
        <span>{{stats.passedTests}}</span>
      </div>
      <div class="info-list-item">
        <span>Прочитанные статьи</span>
        <div class="dotted-line"></div>
        <span>{{stats.passerArticles}}</span>
      </div>
      <br>
      <div class="info-list-item">
        <span>Посещенные мероприятия</span>
        <div class="dotted-line"></div>
        <span>{{stats.passedEvents}}</span>
      </div>
      <div class="info-list-item">
        <span>Завершенные аттестации</span>
        <div class="dotted-line"></div>
        <span>{{stats.passedAttestations}}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UserStatisticsComponent',
  props: {
    currentUserId: {
      type: Number,
      required: false,
      default: 0,
    }
  },
  data() {
    return {
      stats: null,
    }
  },
  mounted() {
    this.fetchUserStats()
  },
  methods: {
    async fetchUserStats() {
      try {
        const response = await fetch(`http://localhost:3000/users/${this.currentUserId}`)
        this.stats = await response.json()
        console.log(this.stats)
      } catch (error) {
        console.error('Ошибка при загрузке достижений:', error)
      }
    },
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

  .vertical-flex {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex: 1 0 0;
    align-self: stretch;
  }

  .info-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
  }
  
  .info-list-item {
    display: flex;
    align-items: center; 
    width: 100%;
  }
  
  .dotted-line {
    flex-grow: 1; 
    height: 1px;
    background-image: radial-gradient(circle, $low-gray 5px, transparent 5px);
    background-size: 5px 5px; 
    margin: 0 10px; 
  }

  .avatar {
    width: 155px;
    height: 155px;
    border-radius: 50%;
    object-fit: cover;
  }
</style>
