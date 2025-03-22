<template>
  <div class="roadmap-container">
    <!-- Линия с градиентом позади -->
    <div class="roadmap-line"></div>

    <!-- Отображаем до 3 этапов -->
    <div
      class="roadmap-stage"
      v-for="(stage, index) in stagesToShow"
      :key="index"
    >
      <!-- Кружок текущей позиции подсвечиваем красным -->
      <div
        class="stage-circle"
        :class="{ active: index === 0 }"
      ></div>

      <!-- Название должности + разряд -->
      <div class="stage-label">
        {{ stage.position }}
        <div class="stage-rank">
          <span>
          <!-- Если категория == 0, пишем "без разряда", иначе "N разряд" -->
          {{ stage.category === 0 ? 'без разряда' : stage.category + ' разряд' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import data from '@/fake_db/db.json'

const props = defineProps({
  user: {
    type: Object,
    default: () => ({
      position: 'Слесарь',
      rank: 3
    })
  }
})

// Импортируем roadmap из фейковой БД
const roadmap = data.roadmap

/**
 * Находит цепочку переходов для текущего пользователя + следующие шаги.
 * Вернёт массив объектов roadmap в нужном порядке.
 */
function findChain(roadmap, position, category) {
  const result = []

  // Находим текущий шаг (там, где from совпадает с user)
  let current = roadmap.find(
    item =>
      item.from.position === position &&
      item.from.category === category
  )

  // Если не нашли, выходим
  if (!current) {
    return result
  }

  // Помещаем текущий шаг
  result.push(current)

  // Ищем следующий шаг (from = previous.to)
  let next = roadmap.find(
    item =>
      item.from.position === current.to.position &&
      item.from.category === current.to.category
  )
  if (next) {
    result.push(next)
  }

  // Третий шаг, если есть
  if (next) {
    const next2 = roadmap.find(
      item =>
        item.from.position === next.to.position &&
        item.from.category === next.to.category
    )
    if (next2) {
      result.push(next2)
    }
  }

  return result
}

// Находим цепочку из 1–3 шагов
const chain = findChain(roadmap, props.user.position, props.user.rank)

/**
 * Превращаем переходы roadmap в "этапы" для вывода:
 *  - Первый этап: from первого шага
 *  - Второй этап: to первого шага
 *  - Третий этап: to второго шага
 *  (Больше двух последующих этапов не показываем)
 */
const stagesToShow = computed(() => {
  if (!chain.length) {
    // Если вообще не нашли переход, покажем только текущего пользователя
    return [
      { position: props.user.position, category: props.user.rank }
    ]
  }

  const stages = []

  // 1. Текущий (from первого шага)
  stages.push({
    position: chain[0].from.position,
    category: chain[0].from.category
  })

  // 2. to первого шага
  stages.push({
    position: chain[0].to.position,
    category: chain[0].to.category
  })

  // 3. Если есть второй шаг, добавляем его `to`
  if (chain[1]) {
    stages.push({
      position: chain[1].to.position,
      category: chain[1].to.category
    })
  }

  // Больше трёх этапов не показываем
  return stages.slice(0, 3)
})
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.roadmap-container {
  position: relative;
  width: 100%;
  max-width: 100%; /* Не вылезать за родителя */
  min-height: 150px;
  padding: 20px;
  border: 1px solid $low-gray;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  box-sizing: border-box; /* Учитывать padding в ширине */
  overflow: hidden; /* Обрезать выходящие элементы */
}


/* Горизонтальная линия с градиентом позади */
.roadmap-line {
  position: absolute;
  top: 35%;
  left: 5%;
  right: 5%;
  height: 7px;
  background: linear-gradient(90deg, transparent 0%, $main-red 15%, $low-gray 40%, $low-gray 85%, transparent 100%);
  z-index: 1;
}

/* Каждый этап */
.roadmap-stage {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2; /* Выше линии */
  text-align: center;
}

/* Кружок */
.stage-circle {
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background-color: $low-gray; /* Серый по умолчанию */
  margin-bottom: 8px;
}

/* Если это текущая ступень, делаем красной */
.stage-circle.active {
  background-color: $main-red;
}

.stage-label {
  font-weight: bold;
}

.stage-rank {
  font-size: 12px;
  color: $middle-gray;
}
</style>
