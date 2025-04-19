<template>
  <div class="adaptacia-page">
    <main class="main-wrapper">
      <!-- Левая колонка с профилем -->
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

      <!-- Контент обучения -->
      <div class="adaptacia-content">
        <div style="display:flex; flex-direction:column; gap: 10px">
          <span class="t14 achievements-title">Адаптация</span>
          <span class="t14">
            С сегодняшнего дня начинается Ваше увлекательное путешествие на предприятии «Лемакс».
            Ниже представлена вся информация, которая Вам нужна для успешного освоения должности. Итак…
          </span>
        </div>

        <div>
          <h2 class="section-title">1. Прочитайте статьи</h2>
          <div class="articles-container">
            <ArticleComponent
              v-for="article in articles"
              :key="article.id"
              class="article"
              :number="'0' + article.id + '.'"
              :title="article.name"
              :description="article.desc"
              :imageSrc="article.imageSrc"
              @click="openArticle(article.id)"
            />
          </div>
        </div>

        <div>
          <h2 class="section-title">2. Завершите тестирование</h2>
          <div class="articles-container" style="justify-content: flex-start;">
            <TestComponent
              v-for="test in tests"
              :key="test.id"
              class="article"
              :number="'0' + test.id + '.'"
              :title="test.title"
              :description="test.description"
              :imageSrc="test.imageSrc"
              @click="openTest(test.id)"
            />
          </div>
        </div>

        <!-- Блок с обычным форматированным текстом -->
        <div class="attestation-info">
          <h2>3. Пройдите аттестации</h2>
          <p>
            Перед вами — список курсов, которые вы уже прошли или должны пройти.
          </p>
          <ul>
            <li>Каждая аттестация проверяет знания по пройденным материалам.</li>
            <li>После прохождения, вы увидите результат и сможете улучшить его при необходимости.</li>
            <li>Некоторые курсы обязательны, другие — рекомендованы.</li>
          </ul>
          <p class="highlight">Удачи! Вы на шаг ближе к уверенной работе.</p>
        </div>

        <AttestationComponent />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import ArticleComponent from "@/components/ArticleComponent.vue"
import TestComponent from "@/components/TestComponent.vue"

import BlockComponent from '@/components/BlockComponent.vue'
import UserInfoComponent from '@/components/UserInfoComponent.vue'
import AchievementComponent from '@/components/AchievementComponent.vue'
import AttestationComponent from '@/components/AttestationComponent.vue'
import UserStatisticsComponent from '@/components/UserStatisticsComponent.vue'

import data from '@/fake_db/db.json'

const articles = ref(data.articles)
const tests = ref(data.tests)

const router = useRouter()

const openArticle = (id) => {
  router.push(`/adaptacia/article/${id}`)
}

const openTest = (id) => {
  router.push(`/adaptacia/test/${id}`)
}

const user = ref(null)

const fetchUser = async () => {
  try {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) return

    const response = await fetch('http://profguide.leganyst.ru:61180/employee/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
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
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.adaptacia-page {
  padding-block: 130px;
  text-align: left;

  .main-wrapper {
    display: flex;
    gap: 50px;
    justify-content: center;
    padding-inline: 50px;

    @media (max-width: 1450px) {
      flex-direction: column;
      padding-inline: 80px;
      align-items: center;
    }

    @media (max-width: 1000px) {
      padding-inline: 20px;
    }
  }

  .left-section {
    display: flex;
    width: 400px;
    flex-direction: column;
    gap: 14px;

    @media (max-width: 1450px) {
      width: 100%;
    }
  }

  .vertical-flex {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex: 1 0 0;
    align-self: stretch;
  }

  .adaptacia-content {
    display: flex;
    flex-direction: column;
    gap: 50px;
    width: 100%;

    @media (max-width: 1450px) {
      align-items: center;
    }

    .achievements-title {
      font-size: 30px;
      font-weight: bold;
    }

    .section-title {
      color: $main-red;
      margin-bottom: 20px;
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

  .attestation-info {
    background-color: #f9f9f9;
    padding: 20px 25px;
    border-left: 4px solid $main-red;
    border-radius: 10px;
    font-size: 16px;
    color: #333;
    line-height: 1.6;

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
