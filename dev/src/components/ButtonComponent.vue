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

<script>
export default {
  name: 'ButtonComponent',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'ghost', 'filler'].includes(value)
    }
  },
  computed: {
    variantClass () {
      return {
        default: 'default-variant',
        ghost: 'ghost-variant',
        filler: 'filler-variant'
      }[this.variant]
    }
  }
}
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
    background-color: $primary-color;
    color: white;

    &:hover {
      background-color: $primary-hover-color;
    }
  }

  // Вариант Ghost
  &.ghost-variant {
    background-color: transparent;
    color: black;

    &:hover {
      background-color: $primary-color;
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
      background-color: $primary-color;
      color: white;
    }
  }
}
</style>
