<template>
  <div class="whole-container">
    <header class="header">
      <div class="container">
        <div class="header-buttons">
          <img src="@/assets/LOGO_RED.png" alt="LOGO_RED">
          <router-link to="/about"><ButtonComponent variant="ghost">О нас</ButtonComponent></router-link>
          <router-link to="/adaptacia"><ButtonComponent variant="ghost">Адаптация</ButtonComponent></router-link>
          <router-link to="/razvitie"><ButtonComponent variant="ghost">Развитие</ButtonComponent></router-link>
        </div>
        <div class="header-buttons-2">
          <span v-if="isAuthenticated" class="user-name">
            {{ authStore.user?.user?.full_name || 'Пользователь' }}
          </span>
          <router-link v-if="!isAuthenticated" to="/login">
            <ButtonComponent variant="ghost">Войти</ButtonComponent>
          </router-link>
          <router-link v-else to="/login">
            <ButtonComponent @click="logout" variant="ghost">Выйти</ButtonComponent>
          </router-link>
        </div>
      </div>
    </header>

    <div class="mobile-header">
      <div class="mobile-header-container">
        <div class="burger-button mobile-header-item" @click.stop="toggleMenu">
          <img src="@/assets/BURGER_BUTTON.png" alt="BURGER_BUTTON">
        </div>
        <div class="mobile-header-item">
          <router-link to="/login"><ButtonComponent variant="ghost">Вход</ButtonComponent></router-link>
        </div>
      </div>
      <div class="menu-container" :class="{ 'menu-container-open': isMenuOpen }">
        <div class="menu">
          <router-link to="/about"><ButtonComponent variant="filler">О нас</ButtonComponent></router-link>
          <router-link to="/adaptacia"><ButtonComponent variant="filler">Адаптация</ButtonComponent></router-link>
          <router-link to="/razvitie"><ButtonComponent variant="filler">Развитие</ButtonComponent></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
const logout = () => {
  authStore.logout()
}


const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = (event) => {
  const menu = document.querySelector('.menu-container')
  if (menu && !menu.contains(event.target)) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeMenu)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenu)
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

* {
  z-index: 999;
}

.header {
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid $low-gray;
  padding: 10px clamp(10px, 5vw, 100px);

  @media (max-width: 1000px) {
    display: none;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header-buttons {
      display: flex;
      flex-direction: row;
      gap: clamp(10px, 5vw, 100px);
      align-items: center;
    }

    .header-buttons-2 {
      display: flex;
      align-items: center;
      gap: 15px;

      .user-name {
        font-weight: bold;
        color: #222;
        white-space: nowrap;
      }
    }
  }
}

.mobile-header-item {
  padding: 20px;
}

.mobile-header {
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  background-color: white;

  @media (min-width: 1000px) {
    display: none;
    z-index: -10;
  }

  .mobile-header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.menu-container {
  display: none;
  width: fit-content;
  z-index: 10;

  &-open {
    position: absolute;
    display: flex;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    left: 30px;
    top: 60px;
    width: fit-content;
    border-radius: 10px;
  }

  .menu {
    min-width: 150px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-inline: 5px;
    padding-block: 5px;
  }

  @media (min-width: 1000px) {
    display: none;
    z-index: -10;
  }
}

.burger-button {
  margin-left: 20px;
  width: 30px;
  height: 30px;
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
  }
}
</style>
