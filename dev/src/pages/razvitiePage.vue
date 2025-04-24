<template>
  <div class="razvitie-page">
    <main>
      <!-- ─────────── Левая колонка ─────────── -->
      <div class="left-section">
        <BlockComponent class="profile-block">
          <UserInfoComponent :user="user" />
        </BlockComponent>

        <BlockComponent class="achievements-section">
          <div class="vertical-flex">
            <AchievementComponent />
          </div>
        </BlockComponent>

        <BlockComponent class="statistics-section">
          <UserStatisticsComponent />
        </BlockComponent>
      </div>

      <!-- ─────────── Правая часть ─────────── -->
      <div class="right-section">
        <!-- Заголовок + вступление -->
        <div style="display:flex; flex-direction:column; gap:10px">
          <h1>Развитие</h1>
          <span class="t14">
            В данном разделе Вы откроете для себя новые возможности для развития карьеры,
            узнаете о свободных вакансиях и перспективах роста.
          </span>
        </div>

        <!-- Основной контент: карьерный путь + задания + календарь/мероприятия -->
        <div class="right-content">
          <!-- Карьерный путь + задания -->
          <div class="description-list">
            <!-- Карьерный путь -->
            <div class="description-list-item">
              <span class="t14 red">Варианты развития в Вашем подразделении</span>
              <div>
                <img src="@/assets/INFO.png" alt="INFO" />
                <TooltipComponent>
                  <span>Здесь будет отображаться ваша карьера, а также, кем вы можете стать</span>
                </TooltipComponent>
              </div>
            </div>
            <RoadmapComponent />

            <!-- Задания -->
            <div style="margin-top:20px" class="description-list-item">
              <span class="t14">Задания</span>
              <div>
                <img src="@/assets/INFO.png" alt="INFO" />
                <TooltipComponent>
                  <span>Здесь отображаются ваши задания и их статус</span>
                </TooltipComponent>
              </div>
            </div>
            <TasksComponent />
          </div>

          <!-- Календарь + мероприятия -->
          <div class="right-lower-section">
            <!-- Календарь -->
            <div class="calendar-widget">
              <div class="calendar-header">
                <span class="nav">&lt;</span>
                <span class="month">Май 2025</span>
                <span class="nav">&gt;</span>
              </div>
              <div class="calendar-grid">
                <div
                  v-for="day in ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']"
                  :key="day"
                  class="day-name"
                >
                  {{ day }}
                </div>
                <div
                  v-for="n in 31"
                  :key="n"
                  class="day-box"
                  :class="{ active: n === 19 }"
                >
                  {{ n }}
                </div>
              </div>
            </div>

            <!-- Мероприятия -->
            <div class="description-list">
              <div class="description-list-item">
                <span class="t14">Мои мероприятия</span>
              </div>
              <EventComponent />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import TooltipComponent       from '@/components/TooltipComponent.vue'
import AchievementComponent   from '@/components/AchievementComponent.vue'
import BlockComponent         from '@/components/BlockComponent.vue'
import UserInfoComponent      from '@/components/UserInfoComponent.vue'
import UserStatisticsComponent from '@/components/UserStatisticsComponent.vue'
import EventComponent         from '@/components/EventComponent.vue'
import RoadmapComponent       from '@/components/RoadmapComponent.vue'
import TasksComponent         from '@/components/TasksComponent.vue'

export default {
  components: {
    BlockComponent,
    AchievementComponent,
    TooltipComponent,
    UserInfoComponent,
    UserStatisticsComponent,
    EventComponent,
    RoadmapComponent,
    TasksComponent
  },

  setup() {
    const user = ref(null)
    const router = useRouter()

    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem('access_token')
        if (!accessToken) return

        const response = await fetch('http://profguide.leganyst.ru:61180/employee/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        })

        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'Ошибка при загрузке пользователя')

        const role = data.role || (data.user && data.user.role)
        if (role === 'hr' || role === 'admin') {
          router.replace({ name: 'HrPage' })
          return
        }

        user.value = data
      } catch (error) {
        console.error('Ошибка загрузки пользователя:', error.message)
      }
    }

    onMounted(fetchUser)

    return { user }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.razvitie-page {
  padding-block: 130px;
  text-align: left;

  main {
    padding-inline: 50px;
    display: flex;
    gap: 50px;
    justify-content: center;

    @media (max-width: 1450px) {
      flex-direction: column;
      align-items: center;
      padding-inline: 200px;
    }

    @media (max-width: 1000px) {
      padding-inline: 20px;
    }
  }

  /* ─────────── Левая колонка ─────────── */
  .left-section {
    display: flex;
    flex-direction: column;
    width: 400px;
    gap: 14px;

    @media (max-width: 1450px),
           (max-width: 1000px) {
      width: 100%;
    }
  }

  /* ─────────── Правая верхняя часть ─────────── */
  .right-section {
    display: flex;
    flex-direction: column;
    gap: 50px;
    width: 100%;

    @media (max-width: 1450px) {
      align-items: center;
    }
  }

  /* ─────────── Колонки: карьерный путь + календарь ─────────── */
  .right-content {
    display: flex;
    flex-direction: row;
    gap: 30px;
    width: 100%;

    @media (max-width: 1450px) {
      flex-direction: column;
    }
  }

  .description-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 350px;
    width: 100%;

    @media (max-width: 1450px) {
      min-width: 0;
    }
  }

  .description-list-item {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  /* ─────────── Правая нижняя колонка: календарь + мероприятия ─────────── */
  .right-lower-section {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 450px;     /* фиксируем базовую ширину */
    flex-shrink: 0;   /* не даём сжиматься */

    @media (max-width: 1450px) {
      width: 100%;
    }

    /* ——— Календарь ——— */
    .calendar-widget {
      background: #fff;
      border: 1px solid $low-gray;
      border-radius: 6px;
      padding: 15px;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);

      .calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        margin-bottom: 10px;

        .nav   { color: $main-red; cursor: default; }
        .month { font-size: 16px; }
      }

      .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 6px;

        .day-name {
          text-align: center;
          font-size: 12px;
          font-weight: bold;
          color: #777;
        }

        .day-box {
          text-align: center;
          padding: 6px 0;
          font-size: 13px;
          border-radius: 4px;
          background: #f3f3f3;
        }

        .day-box.active {
          background-color: $main-red;
          color: #fff;
          font-weight: bold;
        }
      }
    }

    /* ——— Список мероприятий ——— */
    .description-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }

  /* Вспомогательные блоки */
  .vertical-flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    flex: 1 0 0;
  }
}

.red {
  color: $main-red
}
</style>
