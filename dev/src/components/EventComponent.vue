<template>
  <div v-if="errorOccured">
    <span>Не удалось загрузить блок событий.</span>
  </div>
  <div class="events-container">
    <EventItem v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EventItem from '@/components/EventItem.vue'
import data from '@/fake_db/db.json'


const events = ref(data.events)


// const fetchEvents = async () => {
//   try {
//     const response = await fetch(`http://localhost:3000/events`)
//     events.value = await response.json()
//   } catch (error) {
//     errorOccured.value = true
//     console.error('Ошибка при загрузке событий:', error)
//   }
// }

// onMounted(fetchEvents)

</script>


<style scoped lang="scss">
.events-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 10px;
}
</style>
