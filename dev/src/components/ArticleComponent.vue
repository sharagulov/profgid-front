<template>
  <div class="frame" @click="$emit('click')">
    <div class="frame-content">
      <div class="frame-text">
        <div class="frame-number">{{ number }}</div>
        <b class="frame-title">{{ title }}</b>
        <div class="frame-description">{{ description }}</div>
        <img class="eye-icon" src="eye.png" alt="Просмотр">
      </div>
      <img class="frame-image" src="avatar3.gif" alt="Изображение">
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleComponent",
  props: {
    number: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imageSrc: {
      type: String,
      required: true
    }
  },
  methods: {
    onFrameClick() {
      console.log(`Нажали на статью: ${this.title}`);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.frame {
  display: flex;
  width: 100%;
  max-width: 500px;
  min-width: 370px;
  height: 200px;
  border-radius: 20px;
  border: 1px solid $low-gray;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  background: #fff;

  &:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
}

.frame-content {
  display: flex;
  flex: 1;
  align-items: center; // Центрируем содержимое
  justify-content: space-between;
  gap: 15px;
}

.frame-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  gap: 10px;
  text-align: left;
}

.frame-number {
  color: $low-gray;
  font-size: 14px;
}

.frame-title {
  font-size: 16px;
  font-weight: bold;
}

.frame-description {
  font-size: 12px;
}

.eye-icon {
  width: 20px;
  height: 20px;
  opacity: 0.3;
}

.frame-image {
  flex: 0.8; // Контролируем ширину изображения
  max-width: 200px; // Ограничиваем максимальную ширину
  min-width: 150px;
  object-fit: cover;
  height: 100%;
  border-radius: 0 20px 20px 0; // Делаем сглаживание справа
}
</style>
