<template>
  <div v-if="user" class="vertical-flex">
    <img class="avatar" :src="user.avatar" alt="LOGO_RED">
    <span class="t14">{{user.name}}</span>
    <div class="info-list">
      <div class="info-list-item" style="font-weight: bold;">
        <span>Должность</span>
        <div class="dotted-line"></div>
        <span>{{user.position}}</span>
      </div>
      <div class="info-list-item">
        <span>Разряд</span>
        <div class="dotted-line"></div>
        <span>{{user.rank}}</span>
      </div>
      <br>
      <div class="info-list-item">
        <span>В штате с</span>
        <div class="dotted-line"></div>
        <span>{{user.joined}}</span>
      </div>
      <div class="info-list-item">
        <span>Стаж</span>
        <div class="dotted-line"></div>
        <span>{{user.experience}}</span>
      </div>
      <div class="info-list-item">
        <span>Последнее повышение</span>
        <div class="dotted-line"></div>
        <span>{{user.lastPromoted}}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UserInfoComponent',
  props: {
    currentUserId: {
      type: Number,
      required: false,
      default: 0,
    }
  },
  data() {
    return {
      user: null,
    }
  },
  mounted() {
    this.fetchUserInfo()
  },
  methods: {
    async fetchUserInfo() {
      try {
        const response = await fetch(`http://localhost:3000/users/${this.currentUserId}`)
        this.user = await response.json()
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
