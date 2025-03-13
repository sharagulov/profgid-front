<template>
  <div v-if="user" class="vertical-flex">
    <img class="avatar" :src="user.avatar || 'AVATAR.png'" alt="LOGO_RED">
    <span class="t14">{{ user.user.full_name }}</span>

    <div class="info-list">
      <div class="info-list-item" style="font-weight: bold;">
        <span>Должность</span>
        <div class="dotted-line"></div>
        <span>{{ user.employee.current_position_id }}</span>
      </div>

      <div class="info-list-item">
        <span>Разряд</span>
        <div class="dotted-line"></div>
        <span>{{ user.employee.current_position_id }}</span>
      </div>

      <br>

      <div class="info-list-item">
        <span>В штате с</span>
        <div class="dotted-line"></div>
        <span>{{ companyStartFormatted }}</span>
      </div>

      <div class="info-list-item">
        <span>Стаж</span>
        <div class="dotted-line"></div>
        <span>{{ companyExperienceFormatted }}</span>
      </div>

      <div class="info-list-item">
        <span>Последнее повышение</span>
        <div class="dotted-line"></div>
        <span>{{ lastPromotionFormatted }}</span>
      </div>
    </div>
  </div>

  <div v-else>
    <span>Загрузка...</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { formatDate, formatExperience } from '@/utils/utils.js'

const authStore = useAuthStore()

const user = computed(() => authStore.user)

const companyStartFormatted = computed(() => {
  return user.value?.employee?.company_start ? formatDate(user.value.employee.company_start) : ''
})

const companyExperienceFormatted = computed(() => {
  return user.value?.employee?.overall_experience ? formatExperience(user.value.employee.overall_experience) : ''
})

const lastPromotionFormatted = computed(() => {
  return user.value?.employee?.last_promotion ? formatDate(user.value.employee.last_promotion) : ''
})

console.log(user)
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
