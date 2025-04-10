<template>
  <div class="tests-tab">
    <div class="top-bar">
      <p class="subtitle">Список тестов</p>
      <button class="create-btn">+ Добавить тест</button>
    </div>

    <div class="tests-container">
      <TestComponent
        v-for="test in tests"
        :key="test.id"
        :title="test.title"
        :description="test.description"
        :number="test.number"
        :status="test.status"
        :imageSrc="test.imageSrc"
      />
    </div>
  </div>
</template>

<script setup>
// Импортируем карточку теста
import TestComponent from '@/components/TestComponent.vue'

// Массив тестов (пока моковые данные)
const tests = [
  {
    id: 1,
    title: 'Техника безопасности',
    description: 'Пройдите тест по технике безопасности',
    number: '01',
    status: 'completed',
    imageSrc: '/test1.png'
  },
  {
    id: 2,
    title: 'Пожарная безопасность',
    description: 'Ответьте на вопросы о пожарной безопасности',
    number: '02',
    status: 'not-completed',
    imageSrc: '/test2.png'
  },
  {
    id: 3,
    title: 'Электробезопасность',
    description: 'Основные правила работы с электричеством',
    number: '03',
    status: 'completed',
    imageSrc: '/test3.png'
  }
]
</script>

<style scoped lang="scss">
.tests-container {
  display: flex;
  flex-wrap: wrap; /* Чтобы карточки переносились на новую строку */
  gap: 20px; /* Отступ между карточками */
  margin-top: 20px;
}

.tests-tab .top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
