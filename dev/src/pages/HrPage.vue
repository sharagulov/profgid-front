<template>
  <div class="admin-page">
    <h1 class="title">Управление сайтом</h1>

    <!-- Вкладки -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="{ active: currentTab === tab }"
        @click="currentTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Подключаем нужный компонент по текущей вкладке -->
    <component :is="currentTabComponent" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Импортируем компоненты с вкладками
import EmployeesTab from '@/components/hrcomp/EmployeesTab.vue'
import ArticlesTab from '@/components/hrcomp/ArticlesTab.vue'
import TestsTab from '@/components/hrcomp/TestsTab.vue'
import EventsTab from '@/components/hrcomp/EventsTab.vue'
import CertificationsTab from '@/components/hrcomp/CertificationsTab.vue'

const tabs = ['Сотрудники', 'Статьи', 'Тесты', 'Мероприятия', 'Аттестации']
const currentTab = ref('Сотрудники')

// Привязка названия вкладки к соответствующему компоненту
const tabComponents = {
  'Сотрудники': EmployeesTab,
  'Статьи': ArticlesTab,
  'Тесты': TestsTab,
  'Мероприятия': EventsTab,
  'Аттестации': CertificationsTab
}

// Вычисляемый параметр, возвращающий нужный компонент
const currentTabComponent = computed(() => {
  return tabComponents[currentTab.value] || EmployeesTab
})
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.admin-page {
  padding: 100px 40px;
  font-family: sans-serif;

  .title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;

    button {
      padding: 10px 20px;
      border: none;
      background: $lowest-gray;
      cursor: pointer;
      border-radius: 5px;

      &.active {
        background: $main-red;
        color: white;
      }
    }
  }
}
</style>
