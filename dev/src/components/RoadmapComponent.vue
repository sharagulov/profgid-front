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


      <div class="stage-label">
        {{ stage.position }}

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import data from '@/fake_db/db.json'

// Допустим, в db.json у тебя roadmap как сейчас:
// "roadmap": [ { id: 1, from: { position: "...", category: ... }, ... }, ... ]

const roadmap = data.roadmap

// Упрощённый stagesToShow: ровно столько этапов, сколько записей в roadmap
const stagesToShow = computed(() =>
  roadmap.map(item => ({
    // если хочешь показывать from — leave as is,
    // если хочешь показывать to — замени на item.to
    position: item.from.position,
    category: item.from.category
  }))
)
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
  background: linear-gradient(90deg, transparent 0%, $main-red 15%, $low-gray 20%, $low-gray 85%, transparent 100%);
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
  color: white;
}
</style>
