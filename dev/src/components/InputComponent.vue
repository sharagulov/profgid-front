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
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputField',
  props: {
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
  },
  emits: ['update:modelValue']
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.input-field {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;

  label {
      margin-left: 15px;
    }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    input {
      width: 100%;
      padding: 0.7rem 1rem;
      border: 1px solid $low-gray;
      border-radius: 9999px;
      outline: none;
      font-size: 14px;
    }
  }
}
</style>
