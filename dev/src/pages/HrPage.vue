<template>
  <div class="admin-page">
    <h1 class="title">Управление сайтом</h1>

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

    <!-- Сотрудники -->
    <div class="tab-content" v-if="currentTab === 'Сотрудники'">
      <div class="top-bar">
        <p class="subtitle">Список пользователей</p>
        <button class="create-btn" @click="isCreateUserOpen = true">+ Добавить пользователя</button>
      </div>

      <table class="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Должность</th>
            <th>Стаж</th>
            <th>Последнее изменение</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" @click="selectedUser = user.raw; isEditUserOpen = true">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.position }}</td>
            <td>{{ user.experience }}</td>
            <td>{{ user.lastUpdated }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Статьи -->
    <div class="tab-content" v-if="currentTab === 'Статьи'">
      <div class="top-bar">
        <p class="subtitle">Список статей</p>
        <button class="create-btn" @click="isCreateArticleOpen = true">+ Добавить статью</button>
      </div>

      <table class="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Описание</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in articles" :key="a.id" @click="selectedArticle = a; isEditArticleOpen = true">
            <td>{{ a.id }}</td>
            <td>{{ a.name }}</td>
            <td>{{ a.desc }}</td>
            <td>{{ formatDate(a.date) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Тесты -->
    <div class="tab-content" v-if="currentTab === 'Тесты'">
      <div class="top-bar">
        <p class="subtitle">Список тестов</p>
        <button class="create-btn" @click="isCreateTestOpen = true">+ Добавить тест</button>
      </div>

      <table class="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in tests" :key="t.id" @click="selectedTest = t; isEditTestOpen = true">
            <td>{{ t.id }}</td>
            <td>{{ t.name }}</td>
            <td>{{ t.desc }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Мероприятия -->
    <div class="tab-content" v-if="currentTab === 'Мероприятия'">
      <div class="top-bar">
        <p class="subtitle">Список мероприятий</p>
        <button class="create-btn" @click="isCreateEventOpen = true">+ Добавить мероприятие</button>
      </div>

      <table class="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Дата</th>
            <th>Город</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="e in events" :key="e.id" @click="selectedEvent = e; isEditEventOpen = true">
            <td>{{ e.id }}</td>
            <td>{{ e.name }}</td>
            <td>{{ formatDate(e.date) }}</td>
            <td>{{ e.location }}</td>
            <td>{{ e.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Аттестации -->
    <div class="tab-content" v-if="currentTab === 'Аттестации'">
      <div class="top-bar">
        <p class="subtitle">Список аттестаций</p>
        <button class="create-btn" @click="isCreateAttestationOpen = true">+ Добавить аттестацию</button>
      </div>

      <table class="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Описание</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="att in attestations" :key="att.id" @click="selectedAttestation = att; isEditAttestationOpen = true">
            <td>{{ att.id }}</td>
            <td>{{ att.name }}</td>
            <td>{{ att.desc }}</td>
            <td>{{ formatDate(att.date) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Попапы -->
    <PopupComponent :visible="isEditUserOpen" @close="isEditUserOpen = false">
      <template #default>
        <h2>Редактировать пользователя: {{ selectedUser?.user.full_name }}</h2>
        <p>Почта: {{ selectedUser?.user.email }}</p>
        <p>Роль: {{ selectedUser?.user.role }}</p>
        <p>Опыт: {{ selectedUser?.employee.overall_experience }} мес.</p>
        <p>Дата приёма: {{ formatDate(selectedUser?.employee.company_start) }}</p>
      </template>
    </PopupComponent>

    <PopupComponent :visible="isCreateUserOpen" @close="isCreateUserOpen = false">
      <template #default>
        <h2>Создание нового пользователя</h2>
        <!-- Форма добавления -->
      </template>
    </PopupComponent>

    <PopupComponent :visible="isEditArticleOpen" @close="isEditArticleOpen = false">
      <template #default>
        <h2>Редактировать статью: {{ selectedArticle?.name }}</h2>
        <p>{{ selectedArticle?.desc }}</p>
      </template>
    </PopupComponent>

    <PopupComponent :visible="isCreateArticleOpen" @close="isCreateArticleOpen = false">
      <template #default>
        <h2>Создание статьи</h2>
      </template>
    </PopupComponent>

    <PopupComponent :visible="isEditTestOpen" @close="isEditTestOpen = false">
      <template #default>
        <h2>Редактировать тест: {{ selectedTest?.name }}</h2>
      </template>
    </PopupComponent>

    <PopupComponent :visible="isCreateTestOpen" @close="isCreateTestOpen = false">
      <template #default>
        <h2>Создание теста</h2>
      </template>
    </PopupComponent>

    <PopupComponent :visible="isEditEventOpen" @close="isEditEventOpen = false">
      <template #default>
        <h2>Редактировать мероприятие: {{ selectedEvent?.name }}</h2>
      </template>
    </PopupComponent>

    <PopupComponent :visible="isCreateEventOpen" @close="isCreateEventOpen = false">
      <template #default>
        <h2>Создание мероприятия</h2>
      </template>
    </PopupComponent>

    <PopupComponent :visible="isEditAttestationOpen" @close="isEditAttestationOpen = false">
      <template #default>
        <h2>Редактировать аттестацию: {{ selectedAttestation?.name }}</h2>
      </template>
    </PopupComponent>

    <PopupComponent :visible="isCreateAttestationOpen" @close="isCreateAttestationOpen = false">
      <template #default>
        <h2>Создание аттестации</h2>
      </template>
    </PopupComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import data from '@/fake_db/db.json';
import PopupComponent from '@/components/PopupComponent.vue';

const tabs = ['Сотрудники', 'Статьи', 'Тесты', 'Мероприятия', 'Аттестации'];
const currentTab = ref('Сотрудники');

// Сотрудники
const rawEntities = data.entities || [];
const users = ref(
  rawEntities.map((entity, index) => ({
    id: index + 1,
    name: entity.user.full_name,
    position: mapPosition(entity.employee.current_position_id),
    experience: convertMonthsToText(entity.employee.overall_experience),
    lastUpdated: formatDate(entity.employee.last_promotion),
    raw: entity
  }))
);

// Статьи, тесты, мероприятия, аттестации
const articles = ref(data.articles || []);
const tests = ref(
  data.roadmap?.flatMap(r =>
    r.reqTests?.map(id => ({
      id,
      name: `Тест №${id}`,
      desc: 'Описание теста временно отсутствует'
    }))
  ) || []
);
const events = ref(data.events || []);
const attestations = ref(data.attestations || []);

// Попапы
const isEditUserOpen = ref(false);
const isCreateUserOpen = ref(false);
const isEditArticleOpen = ref(false);
const isCreateArticleOpen = ref(false);
const isEditTestOpen = ref(false);
const isCreateTestOpen = ref(false);
const isEditEventOpen = ref(false);
const isCreateEventOpen = ref(false);
const isEditAttestationOpen = ref(false);
const isCreateAttestationOpen = ref(false);

// Выбранные записи
const selectedUser = ref(null);
const selectedArticle = ref(null);
const selectedTest = ref(null);
const selectedEvent = ref(null);
const selectedAttestation = ref(null);

// Утилиты
function convertMonthsToText(months) {
  if (!months) return '';
  const y = Math.floor(months / 12);
  const m = months % 12;
  return y ? `${y} г. ${m ? m + ' мес.' : ''}` : `${m} мес.`;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('ru-RU');
}

function mapPosition(positionId) {
  const positions = {
    1: 'Слесарь',
    2: 'Сварщик',
    3: 'Инженер',
    4: 'Начальник цеха'
  };
  return positions[positionId] || 'Сотрудник';
}
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

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    .subtitle {
      font-size: 18px;
      font-weight: bold;
    }

    .create-btn {
      padding: 8px 16px;
      border: 1px solid #ccc;
      background: white;
      border-radius: 6px;
      cursor: pointer;
    }
  }

  .users-table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      text-align: left;
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }

    tr {
      cursor: pointer;

      &:hover {
        background-color: #f9f9f9;
      }
    }
  }
}
</style>
