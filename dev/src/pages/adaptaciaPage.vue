<template>
  <div class="adaptation-page">
    <main class="page-layout">
      <!-- ───────────────── Левая колонка ───────────────── -->
      <div class="sidebar">
        <BlockComponent class="profile-block">
          <UserInfoComponent :user="user" />
        </BlockComponent>

        <BlockComponent class="achievements-block">
          <div class="vertical-flex"><AchievementComponent /></div>
        </BlockComponent>

        <BlockComponent class="stats-block">
          <UserStatisticsComponent />
        </BlockComponent>
      </div>

      <!-- ──────────────── Центр + правая колонка ────────── -->
      <div class="content-wrapper">

        <!-- ---------- контент адаптации ---------- -->
        <div class="adaptacia-content">
          <div style="display:flex; flex-direction:column; gap:10px">
            <span class="t14 achievements-title">Адаптация</span>
            <span class="t14">
              С сегодняшнего дня начинается Ваше увлекательное путешествие на предприятии «Лемакс».
              Ниже представлена вся информация, которая Вам нужна для успешного освоения участка /
              подразделения. Итак…
            </span>
          </div>

          <!-- 1. статьи -->
          <div>
            <h2 class="section-title">1. Прочитайте статьи</h2>

            <div v-if="articlesLoading">Загрузка статей…</div>
            <div v-else-if="articlesError">{{ articlesError }}</div>

            <div v-else class="articles-container">
              <ArticleComponent
                v-for="(article, idx) in articles"
                :key="article.id"
                class="article"
                :number="String(idx + 1).padStart(2,'0') + '.'"
                :title="article.title"
                :description="article.short_description"
                :imageSrc="article.cover_image_url"
                @click="openArticle(article.id)"
              />
            </div>
          </div>

          <!-- 2. тесты -->
          <div>
            <h2 class="section-title">2. Завершите тестирование</h2>
            <div class="articles-container">
              <TestComponent
                v-for="test in tests"
                :key="test.id"
                class="article"
                :number="String(test.id).padStart(2,'0') + '.'"
                :title="test.title"
                :description="test.description"
                :imageSrc="test.imageSrc"
                @click="openTest(test.id)"
              />
            </div>
          </div>

          <!-- 3. аттестации -->
          <div class="attestation-info">
            <h2>3. Пройдите аттестации</h2>
            <div class="articles-container"><AttestationComponent /></div>
          </div>

          <div><h2 class="section-title">Что ждёт дальше… см. «Мои мероприятия»</h2></div>
        </div>

        <!-- ---------- правая колонка ---------- -->
        <div class="right-extra-content">
          <!-- простой статичный календарь‑заглушка -->
          <div class="calendar-widget">
            <div class="calendar-header">
              <span class="nav">&lt;</span>
              <span class="month">Май 2025</span>
              <span class="nav">&gt;</span>
            </div>
            <div class="calendar-grid">
              <div v-for="d in ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']" :key="d" class="day-name">{{ d }}</div>
              <div v-for="n in 31" :key="n" class="day-box" :class="{active:n===19}">{{ n }}</div>
            </div>
          </div>

          <div class="description-list">
            <div class="description-list-item"><span class="t14">Мои мероприятия</span></div>
            <EventComponent />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import ArticleComponent  from '@/components/ArticleComponent.vue'
import TestComponent     from '@/components/TestComponent.vue'
import BlockComponent    from '@/components/BlockComponent.vue'
import UserInfoComponent from '@/components/UserInfoComponent.vue'
import AchievementComponent     from '@/components/AchievementComponent.vue'
import AttestationComponent     from '@/components/AttestationComponent.vue'
import UserStatisticsComponent  from '@/components/UserStatisticsComponent.vue'
import EventComponent           from '@/components/EventComponent.vue'

import fake from '@/fake_db/db.json'      // ← здесь ваши тесты

/* ─────────── reactive state ─────────── */
const user            = ref(null)
const articles        = ref([])
const articlesLoading = ref(true)
const articlesError   = ref(null)

const tests = ref(fake.tests)   // пока оставляем мок

const router = useRouter()

/* ─────────── helpers ─────────── */
const openArticle = id => router.push(`/adaptacia/article/${id}`)
const openTest    = id => router.push(`/adaptacia/test/${id}`)

/* ─────────── initial load ─────────── */
onMounted(async () => {
  try {
    const token = localStorage.getItem('access_token')
    if (!token) return        // не залогинен

    /* 1. пользователь */
    const meRes = await fetch('http://profguide.leganyst.ru:61180/employee/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!meRes.ok) throw new Error('Не удалось получить пользователя')
    const me = await meRes.json()
    user.value = me

    /* 2. статьи для текущей должности */
    const posId = me.employee?.current_position_id
if (!posId) throw new Error('У пользователя не указана должность')

const artRes = await fetch(
  `http://profguide.leganyst.ru:61180/employee/positions/${posId}/articles`,
  { headers: { Authorization: `Bearer ${token}` } }
)
if (!artRes.ok) throw new Error('Не удалось загрузить статьи')

articles.value = (await artRes.json())
  //  ↑  получаем массив
  .sort((a, b) => a.id - b.id)   // ← сортируем по id (возрастание)
  } catch (err) {
    articlesError.value = err.message
    console.error(err)
  } finally {
    articlesLoading.value = false
  }
})
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
    align-items: flex-start;

    .adaptacia-content {
      flex: 1 1 0;
      min-width: 0;
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 50px;

      @media (max-width: 1450px) {
        align-items: center;
      }

      .achievements-title {
        font-size: 30px;
        font-weight: bold;
      }

      .section-title {
        color: $main-red;
        font-size: 22px;
        margin-bottom: 20px;
      }

      > div {
        margin-bottom: 30px;
      }

      .articles-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: flex-start;

        .article {
          flex: 1 1 calc(33.33% - 20px);
          max-width: 500px;
          min-width: 370px;
          border: 1px solid #ddd;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        @media (max-width: 1200px) {
          .article {
            flex: 1 1 calc(50% - 20px);
          }
        }

        @media (max-width: 768px) {
          .article {
            flex: 1 1 100%;
            max-width: none;
          }
        }
      }
    }

    .right-extra-content {
      flex: 0 0 450px;
      max-width: 100%;

      .calendar-widget {
        margin-bottom: 50px;
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
      }
    }

    @media (max-width: 1200px) {
      flex-direction: column;

      .right-extra-content {
        flex: 0 1 auto;
        width: 100%;
      }
    }
  }

  .attestation-info {


    h2 {
      font-size: 20px;
      margin-bottom: 10px;
      color: $main-red;
    }

    ul {
      margin-top: 10px;
      padding-left: 20px;

      li {
        margin-bottom: 6px;
      }
    }

    .highlight {
      margin-top: 15px;
      font-weight: bold;
      color: $main-red;
    }
  }
}
</style>
