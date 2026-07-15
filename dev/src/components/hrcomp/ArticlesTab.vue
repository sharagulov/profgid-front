<!-- ArticlesTab.vue -->
<template>
  <div class="articles-tab">
    <div class="top-bar">
      <p class="subtitle">Список статей</p>

      <!-- Кнопка «Добавить» — перед открытием окна всегда сбрасываем editData -->
      <button
        class="create-btn"
        @click="() => { editData = null; isCreateOpen = true }"
      >
        + Добавить
      </button>
    </div>

    <div v-if="loading">Загрузка статей…</div>
    <div v-else-if="error">{{ error }}</div>

    <table v-else class="articles-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Заголовок</th>
          <th>Описание</th>
          <th>Должности</th>
          <th>Действия</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="item in articles"
          :key="item.id"
          class="clickable-row"
          @click="openEdit(item)"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.short_description }}</td>

          <!-- безопасный вывод должностей -->
          <td>{{ item.positions?.map(p => p.position_name).join(', ') || '—' }}</td>

          <td>
            <button @click.stop="deleteArticle(item.id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Окно создания -->
    <CreateArticlePopup
      v-if="isCreateOpen"
      @close="isCreateOpen = false"
      @created="onCreated"
    />

    <!-- Окно редактирования -->
    <EditArticlePopup
      v-if="editData !== null"
      :articleId="editData"
      @close="editData = null"
      @updated="onUpdated"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CreateArticlePopup from './CreateArticlePopup.vue'
import EditArticlePopup from './EditArticlePopup.vue'
import { getMockHrArticles, withMockFallback } from '@/utils/mock'

/* ─ state ─────────────────────────────────────────────────────────────── */
const articles     = ref([])
const loading      = ref(false)
const error        = ref(null)
const isCreateOpen = ref(false)
const editData     = ref(null) // содержит ID статьи или null

/* ─ API helpers ───────────────────────────────────────────────────────── */
async function fetchArticles () {
  loading.value = true
  error.value   = null
  try {
    const token = localStorage.getItem('access_token')
    articles.value = await withMockFallback(
      () => fetch(
        'http://profguide.leganyst.ru:61180/hr/articles/all',
        { headers: { Authorization: `Bearer ${token}` } }
      ),
      () => getMockHrArticles()
    )
  } catch (err) {
    articles.value = getMockHrArticles()
    console.error(err)
  } finally {
    loading.value = false
  }
}

/* ─ UI actions ────────────────────────────────────────────────────────── */
function openEdit (article) {
  // если окно создания было открыто — закрываем
  isCreateOpen.value = false
  editData.value     = article.id
}

function onCreated () {          // кол‑бэк из CreateArticlePopup
  isCreateOpen.value = false
  editData.value     = null
  fetchArticles()
}

function onUpdated () {          // кол‑бэк из EditArticlePopup
  editData.value = null
  fetchArticles()
}

async function deleteArticle (id) {
  if (!confirm('Удалить статью?')) return
  try {
    const token = localStorage.getItem('access_token')
    const res   = await fetch(
      `http://profguide.leganyst.ru:61180/hr/articles/${id}`,
      { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }
    )
    if (!res.ok) throw new Error('Ошибка при удалении статьи')
    fetchArticles()
  } catch (err) {
    alert(err.message)
    console.error(err)
  }
}

onMounted(fetchArticles)
</script>

<style scoped lang="scss">
.articles-tab {
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .articles-table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      text-align: left;
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }

    .clickable-row {
      cursor: pointer;
      transition: background 0.2s;
      &:hover { background: #f9f9f9; }
    }
  }
}
</style>
