<template>
  <PopupComponent :visible="true" @close="$emit('close')">
    <template #default>
      <h2 style="text-align:center; margin-bottom: 20px;">Редактировать должность</h2>

      <form class="popup-form" @submit.prevent="updatePosition">
        <InputComponent label="Название" v-model="form.name" required />
        <InputComponent label="Описание" v-model="form.description" required />

        <div class="select-group">
          <label>Мин. опыт (в месяцах)</label>
          <input type="number" v-model.number="form.min_experience" required />
        </div>

        <div class="select-group">
          <label>Следующие позиции (ID через запятую)</label>
          <input v-model="nextPositionsInput" placeholder="2,3" />
        </div>

        <div class="select-group">
          <label>Профессии (ID через запятую)</label>
          <input v-model="professionIdsInput" placeholder="1,2" />
        </div>

        <div class="select-group">
          <label>
            <input type="checkbox" v-model="form.attestation_required" />
            Требует аттестации
          </label>
        </div>

        <div style="text-align:center; margin-top:20px">
          <ButtonComponent type="submit">Сохранить</ButtonComponent>
        </div>
      </form>
    </template>
  </PopupComponent>
</template>

<script setup>
import { ref, watch } from 'vue'
import PopupComponent from '@/components/PopupComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

const props = defineProps({ position: Object })
const emits = defineEmits(['close', 'updated'])

const form = ref({
  name: '',
  description: '',
  min_experience: 0,
  attestation_required: false,
  next_position_ids: [],
  profession_ids: []
})

const nextPositionsInput = ref('')
const professionIdsInput = ref('')

watch(
  () => props.position,
  (val) => {
    form.value = { ...val }
    nextPositionsInput.value = val.next_position_ids?.join(', ') || ''
    professionIdsInput.value = val.profession_ids?.join(', ') || ''
  },
  { immediate: true }
)

async function updatePosition() {
  form.value.next_position_ids = nextPositionsInput.value
    .split(',')
    .map(x => parseInt(x.trim()))
    .filter(n => !isNaN(n))

  form.value.profession_ids = professionIdsInput.value
    .split(',')
    .map(x => parseInt(x.trim()))
    .filter(n => !isNaN(n))

  try {
    const accessToken = localStorage.getItem('access_token')
    const res = await fetch(`http://profguide.leganyst.ru:61180/hr/positions/${props.position.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(form.value)
    })
    if (!res.ok) throw new Error()
    emits('updated')
  } catch (err) {
    alert('Ошибка при обновлении позиции')
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
