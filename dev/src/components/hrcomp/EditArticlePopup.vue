<template>
  <PopupComponent :visible="true" @close="$emit('close')">
    <template #default>
      <h2>Редактировать статью:</h2>

      <!-- Показываем «Загрузка…», пока статья не получена -->
      <div v-if="loading" class="loading">Загрузка…</div>

      <form v-else class="edit-article-form" @submit.prevent="updateArticle">
        <InputComponent id="title" label="Заголовок" v-model="form.title" required />
        <InputComponent id="description" label="Краткое описание" v-model="form.short_description" required />

        <div class="select-group">
          <label>Привязанные участки/подразделения:</label>
          <div class="position-list">
            <div v-for="position in allPositions" :key="position.id" class="position-item">
              <input
                type="checkbox"
                :id="'pos-' + position.id"
                :value="position.id"
                v-model="selectedPositions"
              />
              <label :for="'pos-' + position.id">{{ position.name }}</label>
              <input
                type="checkbox"
                v-if="selectedPositions.includes(position.id)"
                v-model="requiredPositionsMap[position.id]"
              />
              <span v-if="selectedPositions.includes(position.id)">обязательно</span>
            </div>
          </div>
        </div>

        <div class="select-group">
          <label>Контент (Markdown)</label>
          <textarea v-model="form.markdown_content" rows="8"></textarea>
        </div>

        <div class="select-group">
          <label>Обложка (URL)</label>
          <input type="text" v-model="form.cover_image_url" />
        </div>

        <div style="text-align:center; margin-top:20px;">
          <ButtonComponent type="submit">Сохранить</ButtonComponent>
        </div>
      </form>
    </template>
  </PopupComponent>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import PopupComponent from '@/components/PopupComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

// ⚠️ теперь передаём только ID статьи
const props = defineProps({
  articleId: { type: Number, required: true }
})
const emits = defineEmits(['close', 'updated'])

const loading = ref(true)

const form = reactive({
  title: '',
  short_description: '',
  markdown_content: '',
  cover_image_url: ''
})

const selectedPositions = ref([])
const requiredPositionsMap = reactive({})
const allPositions = ref([])

onMounted(fetchInitialData)

async function fetchInitialData() {
  try {
    const token = localStorage.getItem('access_token')
    // 1. получаем все позиции (для чек‑листов)
    const posRes = await fetch('http://profguide.leganyst.ru:61180/hr/positions/all', {
      headers: { Authorization: `Bearer ${token}` }
    })
    allPositions.value = await posRes.json()

    // 2. получаем саму статью по ID
    const artRes = await fetch(`http://profguide.leganyst.ru:61180/employee/articles/${props.articleId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!artRes.ok) throw new Error('Не удалось загрузить статью')
    const article = await artRes.json()

    // заполняем форму
    form.title = article.title
    form.short_description = article.short_description
    form.markdown_content = article.markdown_content
    form.cover_image_url = article.cover_image_url || ''

    selectedPositions.value = []
    Object.keys(requiredPositionsMap).forEach(k => delete requiredPositionsMap[k])
    article.positions?.forEach(pos => {
      selectedPositions.value.push(pos.position_id)
      requiredPositionsMap[pos.position_id] = pos.required
    })
  } catch (err) {
    alert(err.message)
    console.error(err)
  } finally {
    loading.value = false
  }
}

async function updateArticle() {
  try {
    const token = localStorage.getItem('access_token')
    const payload = {
      title: form.title,
      short_description: form.short_description,
      markdown_content: form.markdown_content,
      cover_image_url: form.cover_image_url,
      positions: selectedPositions.value.map(id => ({
        position_id: id,
        required: !!requiredPositionsMap[id]
      }))
    }

    const res = await fetch(`http://profguide.leganyst.ru:61180/hr/articles/${props.articleId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error('Ошибка при обновлении статьи')

    emits('updated')
  } catch (err) {
    alert(err.message)
    console.error(err)
  }
}
</script>

<style scoped>
.edit-article-form {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.loading {
  padding: 40px;
  text-align: center;
}

.select-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.position-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.position-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>