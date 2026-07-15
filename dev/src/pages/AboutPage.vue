<template>
  <div class="adaptation-page">
    <main class="page-layout">
      <!-- Левая колонка -->
      <div class="sidebar">
        <BlockComponent class="profile-block">
          <UserInfoComponent :user="user" />
        </BlockComponent>  

        <BlockComponent class="achievements-block">
          <div class="vertical-flex">
            <AchievementComponent />
          </div>
        </BlockComponent>  

        <BlockComponent class="stats-block">
          <UserStatisticsComponent />
        </BlockComponent>  
      </div>

      <!-- Основной контент + мероприятия -->
      <div class="content-wrapper">
        <!-- Markdown -->
        <div class="info-panel">
          <div class="section-title">О нас</div>
          <div class="markdown-block" v-html="markdownHtml" />
        </div>

        <!-- Правая колонка: календарь + мероприятия -->
        <div class="right-extra-content">
          <!-- Календарь -->
          <div class="calendar-widget">
            <div class="calendar-header">
              <span class="nav">&lt;</span>
              <span class="month">Май 2025</span>
              <span class="nav">&gt;</span>
            </div>
            <div class="calendar-grid">
              <div v-for="day in ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']" :key="day" class="day-name">{{ day }}</div>
              <div v-for="n in 31" :key="n" class="day-box" :class="{ active: n === 19 }">{{ n }}</div>
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
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { marked } from 'marked'

import BlockComponent from '@/components/BlockComponent.vue'
import UserInfoComponent from '@/components/UserInfoComponent.vue'
import AchievementComponent from '@/components/AchievementComponent.vue'
import AttestationComponent from '@/components/AttestationComponent.vue'
import UserStatisticsComponent from '@/components/UserStatisticsComponent.vue'
import EventComponent from '@/components/EventComponent.vue'
import { isMockToken, loadMockUser, withMockFallback } from '@/utils/mock'

const router = useRouter()
const user = ref(null)

const fetchUser = async () => {
  try {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) return

    if (isMockToken(accessToken)) {
      user.value = loadMockUser()
      const role = user.value.role || user.value.user?.role
      if (role === 'hr' || role === 'admin') {
        router.replace({ name: 'HrPage' })
      }
      return
    }

    const data = await withMockFallback(
      () => fetch('http://profguide.leganyst.ru:61180/employee/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }),
      () => loadMockUser()
    )

    const role = data.role || (data.user && data.user.role)
    if (role === 'hr' || role === 'admin') {
      router.replace({ name: 'HrPage' })
      return
    }

    user.value = data
  } catch (error) {
    console.error('Ошибка загрузки пользователя:', error.message)
    user.value = loadMockUser()
  }
}

onMounted(fetchUser)

const markdownRaw = `
## Иванова Анна Михайловна!

Добро пожаловать в Ваш личный кабинет сотрудника **«Лемакс»**!  
Мы рады, что Вы стали частью нашей дружной команды!

Здесь Вы найдёте всю необходимую информацию, которая поможет быстрее освоиться, начать эффективно работать и быть в курсе основных событий предприятия.

Если у Вас возникнут вопросы или понадобится помощь, не стесняйтесь обращаться к коллегам своего подразделения или в службу управления персоналом:  
📞 **+7 (928) 62-33-555** (АБК-1, 2 этаж)

---

Желаем Вам успешной работы!

---

<span style="color:#a30000; font-weight: bold; font-size: 20px"> 🔧 Инструкция к личному кабинету</span>

Ваш личный кабинет — это **надёжный помощник** и проводник в адаптации и развитии.

---

### 📌 Вкладка **«Адаптация»**

На этой вкладке мы собрали всю важную информацию о введении в должность:

- кто МЫ?
- наша культура и ценности;
- правила и процедуры;
- должностные инструкции и обязанности;
- другие обучающие материалы и полезные советы.

> ⏱ **В течение первых 5 дней** рекомендуется ознакомиться со всеми материалами — это позволит Вам быстрее влиться в коллектив и эффективно выполнять рабочие задачи.

---

### 🚀 Вкладка **«Развитие»**

Здесь Вы сможете узнать о том, какие профессиональные и карьерные возможности у Вас есть в **«Лемакс»**:

- направления развития в Вашем подразделении;
- варианты развития в смежных подразделениях;
- корпоративная программа развития;
- история достижений;
- актуальные вакансии.

---

Мы поддерживаем стремление наших сотрудников развиваться вместе с предприятием.

Надеемся, что личный кабинет станет Вашим верным спутником во время работы в **«Лемакс»**!
`

const markdownHtml = computed(() => marked.parse(markdownRaw))
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.adaptation-page {
  padding-block: 130px;
  text-align: left;

  .page-layout {
    display: flex;
    gap: 50px;
    justify-content: center;
    padding-inline: 50px;

    @media (max-width: 1400px) {
      flex-direction: column;
      align-items: center;
      padding-inline: 30px;
    }
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    width: 380px;
    gap: 14px;

    @media (max-width: 1400px) {
      width: 100%;
    }
  }

  .vertical-flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    flex: 1 0 0;
  }

  .content-wrapper {
    display: flex;
    gap: 40px;
    width: 100%;

    @media (max-width: 1200px) {
      flex-direction: column;
    }
  }

  .info-panel {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-width: 100%;
  }

  .right-extra-content {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 100%;

    .calendar-widget {
      background: white;
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

        .nav {
          cursor: default;
          color: $main-red;
        }

        .month {
          font-size: 16px;
        }
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
          color: white;
          font-weight: bold;
        }
      }
    }

    .description-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .description-list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 18px;
        height: 18px;
      }
    }

    .info-icon {
      display: flex;
      align-items: center;
    }
  }

  .section-title {
    font-size: 30px;
    font-weight: bold;
  }

  .markdown-block {
    background-color: #f9f9f9;
    padding: 30px;
    border-radius: 12px;
    line-height: 1.6;
    font-size: 16px;
    color: #333;
    max-width: 100%;

    h2 {
      color: $main-red;
      font-size: 22px;
      margin-bottom: 10px;
    }

    ul {
      margin-top: 10px;
      padding-left: 20px;

      li {
        margin-bottom: 6px;
      }
    }

    blockquote {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #eee;
      border-left: 4px solid $main-red;
      color: #555;
      font-style: italic;
    }
  }
}
</style>
