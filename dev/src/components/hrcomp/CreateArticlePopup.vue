<template>
  <PopupComponent :visible="true" @close="$emit('close')">
    <template #default>
      <h2 style="text-align: center; margin-bottom: 20px;">Создание новой статьи</h2>

      <form class="create-article-form" @submit.prevent="createArticle">
        <InputComponent label="Заголовок" v-model="form.title" required />
        <InputComponent label="Краткое описание" v-model="form.short_description" required />

        <div class="select-group">
          <label>Markdown-контент</label>
          <textarea v-model="form.markdown_content" rows="10" required></textarea>
        </div>

        <div class="select-group">
          <label>Участки/подразделения</label>
          <div v-for="position in allPositions" :key="position.id" class="checkbox-row">
            <input
              type="checkbox"
              :id="'pos-' + position.id"
              v-model="selected[position.id]"
            />
            <label :for="'pos-' + position.id">{{ position.name }}</label>
            <select
              v-if="selected[position.id]"
              v-model="requiredMap[position.id]"
            >
              <option :value="true">Обязательно</option>
              <option :value="false">Необязательно</option>
            </select>
          </div>
        </div>

        <div class="select-group">
          <label>Обложка (jpeg/png)</label>
          <input type="file" accept="image/*" @change="handleFileUpload" />
        </div>

        <div style="text-align: center; margin-top: 20px;">
          <ButtonComponent type="submit">Создать</ButtonComponent>
        </div>
      </form>
    </template>
  </PopupComponent>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PopupComponent from '@/components/PopupComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

const emits = defineEmits(['close', 'created'])

const form = ref({
  title: '',
  short_description: '',
  markdown_content: ''
})

const allPositions = ref([])
const selected = ref({})
const requiredMap = ref({})
const file = ref(null)

onMounted(fetchPositions)

async function fetchPositions() {
  try {
    const token = localStorage.getItem('access_token')
    const res = await fetch('http://profguide.leganyst.ru:61180/hr/positions/all', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) throw new Error('Ошибка загрузки позиций')
    allPositions.value = await res.json()
  } catch (err) {
    alert('Ошибка загрузки должностей')
    console.error(err)
  }
}

function handleFileUpload(e) {
  file.value = e.target.files[0]
}

async function createArticle() {
  try {
    const token = localStorage.getItem('access_token')

    const positions = Object.entries(selected.value)
      .filter(([id, isChecked]) => isChecked)
      .map(([id]) => ({
        position_id: parseInt(id),
        required: requiredMap.value[id] || false
      }))

    const payload = new FormData()
    payload.append('title', form.value.title)
    payload.append('short_description', form.value.short_description)
    payload.append('markdown_content', form.value.markdown_content)
    payload.append('positions', JSON.stringify(positions))
    if (file.value) {
      payload.append('cover', file.value)
    }

    const res = await fetch('http://profguide.leganyst.ru:61180/hr/articles/', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: payload
    })

    if (!res.ok) throw new Error('Ошибка при создании статьи')

    emits('created')
  } catch (err) {
    alert(err.message)
    console.error(err)
  }
}
</script>

<style scoped lang="scss">
.create-article-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 700px;
  margin: 0 auto;
}

.select-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.checkbox-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
