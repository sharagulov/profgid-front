<template>
  <PopupComponent :visible="true" @close="$emit('close')">
    <template #default>
      <h2>Редактировать пользователя:</h2>
      <h2 style="margin-bottom: 20px">{{ selectedUser?.user.full_name }}</h2>

      <form v-if="editUser" class="edit-user-form" @submit.prevent="updateUser">
        <div class="form-columns">
          <!-- Левая колонка -->
          <div class="form-column">
            <InputComponent
              id="editFullName"
              label="ФИО"
              v-model="editUser.user.full_name"
              required
            />
            <InputComponent
              id="editEmail"
              label="Email"
              type="email"
              v-model="editUser.user.email"
              required
            />
            <div class="select-group">
              <label for="editRole">Роль</label>
              <select id="editRole" v-model="editUser.user.role">
                <option value="user">Пользователь</option>
                <option value="admin">Администратор</option>
                <option value="hr">HR</option>
              </select>
            </div>
          </div>

          <!-- Правая колонка -->
          <div class="form-column">
            <div class="select-group">
              <label for="editPosition">Должность</label>
              <select id="editPosition" v-model="editUser.employee.current_position_id">
                <option :value="4">Оператор автоматизированной линии</option>
                <option :value="2">Сварщик</option>
                <option :value="3">Инженер</option>
                <option :value="5">Начальник цеха</option>
              </select>
            </div>

            <div class="select-group">
              <label>Дата приёма</label>
              <input type="date" v-model="editUser.employee.company_start" required />
            </div>

            <div class="select-group">
              <label>Последнее повышение</label>
              <input type="date" v-model="editUser.employee.last_promotion" required />
            </div>

            <InputComponent
              id="editExperience"
              label="Стаж (в месяцах)"
              type="number"
              v-model.number="editUser.employee.overall_experience"
              required
            />
          </div>
        </div>

        <div style="text-align:center; margin-top:20px;">
          <ButtonComponent type="submit">Сохранить</ButtonComponent>
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

const props = defineProps({
  selectedUser: Object,
  editUser: Object
})
const emits = defineEmits(['close', 'updated'])

async function updateUser() {
  try {
    const accessToken = localStorage.getItem('access_token')
    const toISODate = (d) => (d ? new Date(d + 'T00:00:00Z').toISOString() : null)

    const payload = {
      employee: {
        company_start: toISODate(props.editUser.employee.company_start),
        current_position_id: props.editUser.employee.current_position_id,
        last_promotion: toISODate(props.editUser.employee.last_promotion),
        overall_experience: props.editUser.employee.overall_experience,
        photo_url: props.editUser.employee.photo_url,
        status_to_certification: props.editUser.employee.status_to_certification
      },
      user: {
        email: props.editUser.user.email,
        full_name: props.editUser.user.full_name,
        role: props.editUser.user.role
      }
    }

    const res = await fetch(
      `http://profguide.leganyst.ru:61180/hr/employees/${props.editUser.user.uuid}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload)
      }
    )
    if (!res.ok) throw new Error('Ошибка при обновлении пользователя')

    emits('updated')
  } catch (err) {
    alert('Ошибка при обновлении пользователя')
    console.error(err)
  }
}
</script>

<style scoped>
.edit-user-form {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.form-columns {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.form-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 250px;
}

.select-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
