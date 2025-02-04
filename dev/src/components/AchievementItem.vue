<template>
  <div class="achievement-item" @mouseenter="show" @mouseleave="hide">
    <img :src="imgUrl" class="achievement-image" alt="achievement" />

    <transition name="fade">
      <div v-if="showBlock" class="popup">
        <div class="content">
          <div class="header">
            <b>{{ name }}</b>
            <span class="date">{{ date }}</span>
          </div>
          <p class="description">{{ desc }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AchievementItem',
  props: {
    imgUrl: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: false,
      default: ''
    },
    desc: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      showBlock: false
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
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.achievement-image {
  width: 40px;
  height: 40px;
  cursor: pointer;
  object-fit: cover;
}

.popup {
  position: absolute;
  background-color: $lowest-gray;
  border-radius: 10px;
  padding: 10px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.header {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  white-space: nowrap;
}

.date {
  color: $middle-gray;
}

.description {
  margin: 0;
  white-space: nowrap;
}
</style>
