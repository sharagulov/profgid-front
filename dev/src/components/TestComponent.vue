<template>
  <div class="training-card" @click="onCardClick">
    <img class="training-image" src="avatar3.gif" alt="Изображение">

    <div class="training-content">
      <div class="training-info">
        <b class="training-title">{{ title }}</b>
        <div class="training-description">{{ description }}</div>
      </div>
      <div class="training-number">{{ number }}</div>
    </div>

    <div class="training-status">
      <div class="status-indicator">
        <div class="status-circle" />
        <b class="status-text">!</b>
      </div>
      <b class="status-label" :class="statusClass">{{ statusText }}</b>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrainingCard",
  props: {
    number: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageSrc: { type: String, required: true },
    status: { type: String, default: "not-completed" }
  },
  computed: {
    statusClass() {
      return this.status === "completed" ? "status-green" : "status-orange";
    },
    statusText() {
      return this.status === "completed" ? "Завершен" : "Не завершен";
    }
  },
  methods: {
    onCardClick() {
      console.log(`Открыт курс: ${this.title}`);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.training-card {
  width: 100%;
  max-width: 500px;
  min-width: 370px;
  height: 200px;
  border-radius: 20px;
  border: 1px solid $low-gray;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  background: #fff;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
}

.training-image {
  flex: 1;
  width: 100%;
  height: 55%;
  object-fit: cover;
  z-index: 0;
}

.training-content {
  background-color: #fff;
  height: 90px;
  display: flex;
  flex-wrap: wrap; // Позволяет тексту переноситься
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px; // Уменьшил padding для защиты от переполнения
  box-sizing: border-box; // Учитывает padding внутри блока
  overflow: hidden; // Прячем лишний контент
}

.training-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
  min-width: 0; // Позволяет сжиматься при нехватке места
}

.training-title {
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap; // Текст в одну строку
  overflow: hidden;
  text-overflow: ellipsis; // Обрезка текста, если слишком длинный
}

.training-description {
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.training-number {
  font-size: 14px;
  color: $low-gray;
  flex-shrink: 0;
}

.training-status {
  position: absolute;
  top: 13px;
  left: 13px;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  z-index: 2;
  font-size: 10px;
}

.status-indicator {
  width: 15px;
  height: 15px;
  position: relative;
}

.status-circle {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  background-color: #ed9836;
  width: 15px;
  height: 15px;
}

.status-text {
  position: absolute;
  top: 3.75px;
  left: 6px;
  font-size: 10px;
  font-weight: bold;
  color: #fff;
}

.status-label {
  font-weight: bold;
}

.status-orange {
  color: #ed9836;
}

.status-green {
  color: #2ecc71;
}
</style>
