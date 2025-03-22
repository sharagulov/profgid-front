<template>
  <BlockComponent class="attestation" :variant="'grey'">
    <div class="attestation-content">
      <div class="attestation-info">
        <span class="attestation-title">{{ attestation.name }}</span>
        <span class="attestation-date">{{ formattedDate }}</span>
      </div>
      <div class="attestation-description">{{ attestation.desc }}</div>
    </div>
  </BlockComponent>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import BlockComponent from '@/components/BlockComponent.vue'

const props = defineProps({
  attestation: Object // Пропс, который передает данные аттестации
})

const formattedDate = computed(() => {
  const attestationDate = new Date(props.attestation.date)
  const currentDate = new Date()

  // Если дата прошла
  if (attestationDate < currentDate) {
    return "Просрочено"
  }

  // Если дата не прошла, форматируем дату в "день месяц год"
  const options = { 
    hour: '2-digit', 
    minute: '2-digit', 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  }
  return attestationDate.toLocaleString('ru-RU', options)
})
</script>


<style scoped lang="scss">
@import '@/styles/variables.scss';

.attestation {
  width: 100%;
}

.attestation-content {
  display: flex;
  flex-direction: column;
}

.attestation-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.attestation-date {
  font-size: 10px;
  color: $main-red;
}

.attestation-description {
  margin-top: 10px;
  font-size: 12px;
  color: #555;
}
</style>
