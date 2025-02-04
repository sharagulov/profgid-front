<template>
  <BlockComponent class="attestation" @click="toggleDescription" :variant="'grey'">
    <div class="attestation-content">
      <div class="attestation-info">
        <span class="attestation-title">{{ name }}</span>
        <span class="attestation-date">{{ passed === '' ? '' : "Завершена " + passed}}</span>
      </div>
      <img 
        class="attestation-expand-icon"
        :class="{ expanded: showDescription }"
        src="@/assets/expand.png"
        alt="Expand"
      />
    </div>

    <transition name="fade">
      <div v-if="showDescription" class="attestation-description">
        {{ desc }}
      </div>
    </transition>
  </BlockComponent>
</template>

<script>
import BlockComponent from '@/components/BlockComponent.vue'

export default {
  name: 'AttestationItem',
  components: {
    BlockComponent
  },
  props: {
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: false,
      default: ''
    },
    passed: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      showDescription: false
    };
  },
  methods: {
    toggleDescription() {
      this.showDescription = !this.showDescription;
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.attestation {
  width: 100%;
  user-select: none;
}

.attestation-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.attestation-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.attestation-date {
  font-size: 10px;
  color: $main-red;
}

.attestation-expand-icon {
  width: 15px;
  height: 15px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.attestation-expand-icon.expanded {
  transform: rotate(0deg); /* Когда описание открыто, стрелка вниз */
}

.attestation-expand-icon:not(.expanded) {
  transform: rotate(180deg); /* Когда описание закрыто, стрелка вверх */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.attestation-description {
  margin-top: 10px;
  font-size: 12px;
}
</style>
