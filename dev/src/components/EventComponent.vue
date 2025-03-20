<template>
  <div v-if="errorOccured">
    <span>Не удалось загрузить блок событий.</span>
  </div>
  <div class="events-container">
    <EventItem v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventItem from '@/components/EventItem.vue'

export default {
  name: 'EventComponent',
  components: { EventItem },
  data() {
    return {
      events: [],
      errorOccured: false,
    }
  },
  mounted() {
    this.fetchEvents()
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await fetch(`http://localhost:3000/events`);
        this.events = await response.json();
      } catch (error) {
        this.errorOccured = true;
        console.error('Ошибка при загрузке событий:', error);
      }
    }
  }
}
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
