<template>
  <div v-if="user" class="vertical-flex">
    <img class="avatar" :src="user.avatar" alt="LOGO_RED">
    <span class="t14">{{user.user.full_name}}</span>
    <div class="info-list">
      <div class="info-list-item" style="font-weight: bold;">
        <span>Должность</span>
        <div class="dotted-line"></div>
        <span>{{user.user.role}}</span>
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
  <div v-else><span></span></div>
</template>

<script>

import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

export default {
  name: 'UserInfoComponent',
  props: {
    currentUserId: {
      type: Number,
      required: false,
      default: 0,
    }
  },
  setup() {
    const authStore = useAuthStore()

    return {
      user: computed(() => authStore.user), // Получаем пользователя из store
      formatDate(date) {
        return date ? new Date(date).toLocaleString() : "Нет данных"
      }
    }
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
    background-color: $lowest-gray;
    height: 1px;
    margin: 0 10px;
  }

  .avatar {
    width: 155px;
    height: 155px;
    border-radius: 50%;
    object-fit: cover;
  }
</style>
