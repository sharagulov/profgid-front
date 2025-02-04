<template>
  <div :class="['block-container', variantClass]">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlockComponent',
  props: {
    variant: {
      type: String,
      default: 'transparent', // Значение по умолчанию
      validator: value => {
        return ['transparent', 'grey'].includes(value);
      }
    }
  },
  computed: {
    variantClass() {
      return this.variant === 'grey' ? 'grey' : 'transparent';
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.block-container {
  box-sizing: border-box;
  background-color: transparent;
  border: 1px solid $low-gray;
  border-radius: 20px; 
  padding: 20px; 
  display: flex; 
  justify-content: center;
  align-items: center;

  &.transparent {
    background-color: transparent;
  }

  &.grey {
    background-color: $lowest-gray; 
    border: none; 
  }
}

.content {
  width: 100%;
}
</style>