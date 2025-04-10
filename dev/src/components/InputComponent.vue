<template>
  <div class="input-field">
    <label :for="id">{{ label }}</label>
    <div class="input-wrapper">
      <input
        :type="type"
        :id="id"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        required
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.input-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}

label {
  font-weight: 500;
  font-size: 14px;
}

.input-wrapper {
  display: flex;
  align-items: center;
}

input {
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1px solid #ccc;
  border-radius: 9999px;
  outline: none;
  font-size: 14px;
}
</style>
