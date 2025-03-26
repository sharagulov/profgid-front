<template>
  <div class="tasks-container">
    <!-- Заголовок и счетчик -->
    <div class="tasks-header">
      <h2>{{ user?.position }} <span>{{ user?.category }} разряд</span></h2>
      <div class="tasks-counter">1 / 4</div>
    </div>

    <!-- Текущая должность -->
    <div class="current-position">
      
      <p class="tasks-subtitle">Ниже приведены задания, которые необходимо выполнить, чтобы перейти на данный этап</p>
    </div>

    <!-- Блок 1: Статьи -->
    <div class="task-row">
      <div class="task-row-left">
        <span class="checkmark">✓</span> <span>Прочитать связанные статьи:</span>
      </div>
      <div class="task-row-right link-faded">Все статьи</div>
    </div>
    <div class="task-buttons">
      <ButtonComponent
        v-for="(articleId, idx) in roadmapItem?.reqArticles || []"
        :key="'article-' + idx"
        variant="grey"
        @click="goToArticle(articleId)"
      >
        Статья {{ articleId }}
      </ButtonComponent>
    </div>

    <!-- Блок 2: Тесты -->
    <div class="task-row">
      <div class="task-row-left"><span class="checkmark">✓</span><span>Завершить тестирования</span></div>
      <div class="task-row-right link-faded">Все тесты</div>
    </div>
    <div class="task-buttons">
      <ButtonComponent
        v-for="(testId, idx) in roadmapItem?.reqTests || []"
        :key="'test-' + idx"
        variant="grey"
        @click="goToTest(testId)"
      >
        Тестирование {{ testId }}
      </ButtonComponent>
    </div>

    <!-- Блок 3: Мероприятия -->
    <div class="task-row">
      <div class="task-row-left"><span class="checkmark">✓</span><span>Посетить мероприятия</span></div>
      <div class="task-row-right link-faded">Все мероприятия</div>
    </div>
    <div class="task-buttons">
      <ButtonComponent
        v-for="(eventId, idx) in roadmapItem?.reqEvents || []"
        :key="'event-' + idx"
        variant="grey"
      >
        Мероприятие {{ eventId }}
      </ButtonComponent>
    </div>

    <!-- Блок 4: Аттестации -->
    <div class="task-row">
      <div class="task-row-left"><span class="checkmark">✓</span><span>Пройти аттестацию</span></div>
      <div class="task-row-right link-faded">К аттестации</div>
    </div>
    <div class="task-buttons">
      <ButtonComponent
        v-for="(attId, idx) in roadmapItem?.reqAttestations || []"
        :key="'att-' + idx"
        variant="grey"
      >
        Аттестация {{ attId }}
      </ButtonComponent>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import data from '@/fake_db/db.json'

const props = defineProps({
  user: {
    type: Object,
    default: () => ({
      position: "Слесарь",
      category: 3
    })
  }
})

// Для примера ищем подходящий roadmap-объект
const roadmapData = data.roadmap

const roadmapItem = computed(() => {
  if (!props.user) return null;

  const foundItem = roadmapData.find(
    item =>
      item.from.position === props.user.position &&
      item.from.category === Number(props.user.rank)
  );

  return foundItem || {
    reqArticles: [1, 2, 3],
    reqTests: [1, 2],
    reqEvents: [1],
    reqAttestations: [1],
  };
});





import { useRouter } from 'vue-router'
const router = useRouter()

const goToArticle = (id) => {
  router.push(`/learning/article/${id}`)
}

const goToTest = (id) => {
  router.push(`/learning/test/${id}`)
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.tasks-container {
  border: 1px solid $low-gray;
  border-radius: 20px;
  padding: 20px;
  background: #fff;
  position: relative;
}

/* Шапка */
.tasks-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.tasks-title {
  font-size: 18px;
  margin: 0;
}

/* Счётчик в правом верхнем углу: "1 / 4" */
.tasks-counter {
  font-size: 14px;
  color: $low-gray;
}

/* Текущая должность и разряд */
.current-position {
  margin-bottom: 20px;

  b {
    font-size: 16px;
    span {
      font-size: 14px;
      color: $middle-gray;
      margin-left: 5px;
    }
  }

  .tasks-subtitle {
    margin-top: 5px;
    font-size: 14px;
    color: $low-gray;
  }
}

/* Каждая строка: "✓ Прочитать статьи" / "Все статьи" */
.task-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0;
}

.task-row-left {
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
}

.checkmark {
  color: $low-gray;
}

/* Серые ссылки справа */
.task-row-right.link-faded {
  color: $low-gray;
  font-size: 14px;
  cursor: pointer;
}

/* Кнопки с отступами */
.task-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
</style>
