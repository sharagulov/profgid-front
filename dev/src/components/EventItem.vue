<template>
  <BlockComponent class="event" :variant="'grey'">
    <div class="event-content">
      <div class="event-info">
        <span class="event-title">{{ event.name }}</span>
        <span class="event-date">{{ formattedDate }}</span>
      </div>
      <div class="event-description">{{ event.description }}</div>
    </div>
  </BlockComponent>
</template>

<script setup>
import { computed } from 'vue'
import BlockComponent from '@/components/BlockComponent.vue'

const props = defineProps({
  event: Object // Пропс, который передает данные события
})

const formattedDate = computed(() => {
  const eventDate = new Date(props.event.date)
  const currentDate = new Date()

  // Если дата прошла
  if (eventDate < currentDate) {
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
  return eventDate.toLocaleString('ru-RU', options)
})
</script>


<style scoped lang="scss">
@import '@/styles/variables.scss';

.event {
  width: 100%;
}

.event-content {
  display: flex;
  flex-direction: column;
}

.event-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.event-date {
  font-size: 10px;
  color: $main-red;
}

.event-description {
  margin-top: 10px;
  font-size: 12px;
  color: #555;
}
</style>
