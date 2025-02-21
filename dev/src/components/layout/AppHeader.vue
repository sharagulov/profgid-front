<template>
  <div class="whole-container">
    <header class="header">
      <div class="container">
        <div class="header-buttons">
          <img src="@/assets/LOGO_RED.png" alt="LOGO_RED">
          <router-link to="/carrer"><ButtonComponent variant="ghost">Карьера</ButtonComponent></router-link>
          <router-link to="/learning"><ButtonComponent variant="ghost">Обучение</ButtonComponent></router-link>
          <ButtonComponent variant="ghost">Библиотека</ButtonComponent>
          <ButtonComponent variant="ghost">О нас</ButtonComponent>
        </div>
        <div class="header-buttons-2">
          <router-link to="/login"><ButtonComponent variant="ghost">Войти</ButtonComponent></router-link>
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
      <div class="menu-container" :class="{'menu-container-open': isMenuOpen}">
        <div class="menu">
          <ButtonComponent variant="filler">Карьера</ButtonComponent>
          <ButtonComponent variant="filler">Обучение</ButtonComponent>
          <ButtonComponent variant="filler">Библиотека</ButtonComponent>
          <ButtonComponent variant="filler">О нас</ButtonComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComponent from '@/components/ButtonComponent.vue'

export default {
  name: 'AppHeader',
  components: { ButtonComponent },
  data () {
    return {
      isMenuOpen: false // Состояние меню (открыто/закрыто)
    }
  },
  methods: {
    toggleMenu () {
      this.isMenuOpen = !this.isMenuOpen // Переключение состояния
    },
    closeMenu (event) {
      // Проверяем, кликнули ли вне меню
      const menu = this.$el.querySelector('.menu-container')
      if (menu && !menu.contains(event.target)) {
        this.isMenuOpen = false // Закрыть меню
      }
    }
  },
  mounted () {
    // Добавляем слушатель кликов на весь документ
    document.addEventListener('click', this.closeMenu)
  },
  beforeUnmount () {
    // Убираем слушатель кликов при уничтожении компонента
    document.removeEventListener('click', this.closeMenu)
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

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

    .logo {
      height: 1px;
    }

    .header-buttons {
      display: flex;
      flex-direction: row;
      gap: clamp(10px, 5vw, 100px);
      align-items: center;
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
    width:fit-content;
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
