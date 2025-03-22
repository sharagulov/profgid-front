<template>
  <label class="toggle-container">
    <input type="checkbox" v-model="checked">
    <span class="label-text">Показать завершенные</span>
  </label>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits()

const checked = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>


<style lang="scss" scoped>
@import '@/styles/variables.scss';

.toggle-container {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  accent-color: $main-red;
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}
</style>
