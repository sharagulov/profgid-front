<template>
  <div v-if="visible" class="popup-overlay" @click.self="close">
    <div class="popup-content">
      <slot />
      <div class="cadabra">
        <button class="close-btn" @click="close">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  visible: Boolean
});
const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 900px; /* шире попап */
  max-height: 85vh;
  overflow-y: auto;
  box-sizing: border-box;
}

.close-btn {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 9999px;
  background-color: #eee;
  cursor: pointer;
}

.close-btn:hover {
  background-color: #ccc;
}


.cadabra {
  display: flex;
  justify-content: center;
}
</style>
