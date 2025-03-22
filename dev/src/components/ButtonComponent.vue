<template>
  <button
    :type="type"
    :class="['container', variantClass]"
  >
    <div class="text">
      <span>
        <slot></slot>
      </span>
    </div>
  </button>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'default',
    validator: value => ['default', 'ghost', 'filler', 'grey'].includes(value)
  }
})

const variantClass = computed(() => {
  return {
    default: 'default-variant',
    ghost: 'ghost-variant',
    filler: 'filler-variant',
    grey: 'grey-variant'
  }[props.variant]
})
</script>


<style lang="scss" scoped>
@import '@/styles/variables.scss';

.container {
  width: fit-content;
  height: fit-content;
  border-radius: 9999px;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s, color 0.2s;

  // Вариант Default
  &.default-variant {
    background-color: $main-red;
    color: white;

    &:hover {
      background-color: $main-red-hover;
    }
  }

  // Вариант Ghost
  &.ghost-variant {
    background-color: transparent;
    color: black;

    &:hover {
      background-color: $main-red;
      color: white;
    }
  }

  // Вариант Filler
  &.filler-variant {
    background-color: transparent;
    color: black;
    padding: 10px 10px;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;

    &:hover {
      background-color: $main-red;
      color: white;
    }
  }

  &.grey-variant {
    background-color: $lowest-gray;
    padding: 7px 20px;

    &:hover {
      background-color: $low-gray;
    }
  }
}
</style>
