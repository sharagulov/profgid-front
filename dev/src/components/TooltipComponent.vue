<template>
  <transition name="fade">
    <div v-if="showBlock" class="tooltip-content">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TooltipComponent',
  data() {
    return {
      showBlock: false
    }
  },
  mounted() {
    const parent = this.$el.parentElement
    if (parent) {
      if (window.getComputedStyle(parent).position === 'static') {
        parent.style.position = 'relative'
      }
      parent.addEventListener('mouseenter', this.show)
      parent.addEventListener('mouseleave', this.hide)
    }
  },
  beforeUnmount() {
    const parent = this.$el.parentElement
    if (parent) {
      parent.removeEventListener('mouseenter', this.show)
      parent.removeEventListener('mouseleave', this.hide)
    }
  },
  methods: {
    show() {
      this.showBlock = true
    },
    hide() {
      this.showBlock = false
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.tooltip-content {
  position: absolute;
  background-color: $lowest-gray;
  border-radius: 10px;
  padding: 10px;
  z-index: 10;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  white-space: nowrap;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
