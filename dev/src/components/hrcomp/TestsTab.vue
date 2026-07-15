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
import TestComponent from '@/components/TestComponent.vue'
import { getMockTests } from '@/utils/mock'

const tests = getMockTests()
</script>

<style scoped lang="scss">
.tests-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.tests-tab .top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
