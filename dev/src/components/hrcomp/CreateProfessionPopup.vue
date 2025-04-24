<template>
  <PopupComponent :visible="true" @close="$emit('close')">
    <template #default>
      <h2 style="text-align:center; margin-bottom: 20px;">Создание должности</h2>

      <form class="popup-form" @submit.prevent="createProfession">
        <InputComponent label="Название" v-model="form.name" required />
        <InputComponent label="Описание" v-model="form.description" required />

        <div class="select-group">
          <label>профессии (ID через запятую)</label>
          <input v-model="positionsInput" placeholder="1,2,3" />
        </div>

        <div style="text-align:center; margin-top:20px">
          <ButtonComponent type="submit">Создать</ButtonComponent>
        </div>
      </form>
    </template>
  </PopupComponent>
</template>

<script setup>
import { ref } from 'vue'
import PopupComponent from '@/components/PopupComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

const emits = defineEmits(['close', 'created'])

const form = ref({ name: '', description: '', position_ids: [] })
const positionsInput = ref('')

async function createProfession() {
  form.value.position_ids = positionsInput.value
    .split(',')
    .map(x => parseInt(x.trim()))
    .filter(n => !isNaN(n))

  try {
    const accessToken = localStorage.getItem('access_token')
    const res = await fetch('http://profguide.leganyst.ru:61180/hr/professions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(form.value)
    })
    if (!res.ok) throw new Error()
    emits('created')
  } catch (err) {
    alert('Ошибка при создании должности')
  }
}
</script>

<style scoped>
.popup-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 500px;
  margin: 0 auto;
}
.select-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>