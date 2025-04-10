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

<style scoped>
.container {
  width: fit-content;
  border-radius: 9999px;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s, color 0.2s;
}

.container .text {
  text-align: center;
}

.default-variant {
  background-color: #a40000;
  color: white;
}

.default-variant:hover {
  background-color: #800000;
}

.ghost-variant {
  background-color: transparent;
  color: black;
}

.ghost-variant:hover {
  background-color: #a40000;
  color: white;
}

.filler-variant {
  background-color: transparent;
  color: black;
  padding: 10px 10px;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}

.filler-variant:hover {
  background-color: #a40000;
  color: white;
}

.grey-variant {
  background-color: #eee;
  padding: 7px 20px;
}

.grey-variant:hover {
  background-color: #ccc;
}
</style>
