<template>
  <div v-if="user" class="vertical-flex">
    <img class="avatar" :src="user.avatar || 'LEA.jpg'" alt="LOGO_RED" />
    <h2>{{ user?.user?.full_name }}</h2>

    <div class="info-table">
      <div class="info-row">
        <span class="label">Должность</span>
        <span class="value">{{ user?.employee?.profession?.name || '—' }}</span>
      </div>
      <div class="info-row">
        <span class="label">Участок/подразделение</span>
        <span class="value">{{ user?.employee?.position?.name || '—' }}</span>
      </div>
      <div class="info-row">
        <span class="label">Дата приёма</span>
        <span class="value">{{ companyStartFormatted }}</span>
      </div>
    </div>
  </div>

  <div v-else>
    <span>Загрузка...</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatDate } from '@/utils/utils.js'

const props = defineProps({
  user: Object
})

const companyStartFormatted = computed(() => {
  return props.user?.employee?.company_start
    ? formatDate(props.user.employee.company_start)
    : ''
})
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.vertical-flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  flex: 1 0 0;
  align-self: stretch;
  width: 100%;
}

.avatar {
  width: 155px;
  height: 155px;
  border-radius: 50%;
  object-fit: cover;
}

.info-table {
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
}

.info-row {
  display: flex;
  flex-direction: column; // ⬅️ теперь каждое поле будет друг под другом
  align-items: flex-start;
  gap: 4px;
}

.label {
  font-weight: 500;
  color: #555;
}

.value {
  word-break: break-word;
  white-space: normal;
  font-weight: 600;
  color: #111;
}

</style>
