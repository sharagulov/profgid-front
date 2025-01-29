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
.block-container {
  background-color: transparent;
  border: 1px solid #CCC;
  border-radius: 20px; 
  padding: 30px; 
  display: flex; 
  justify-content: center;
  align-items: center;

  &.transparent {
    background-color: transparent;
  }

  &.grey {
    background-color: #F2F2F2; 
    border: none; 
  }
}

.content {
  width: 100%;
}
</style>