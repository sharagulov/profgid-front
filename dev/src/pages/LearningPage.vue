<template>
  <div class="career-page">
    <main>
      <div class="left-section">
        
        <span class="t14 achievements-title">Обучение</span>

        
        <p class="section-title">Актуальные статьи</p>
        <div class="articles-container">
          <BlockComponent class="article-block">
            <UserInfoComponent :currentUserId="1" />
          </BlockComponent>
          <BlockComponent class="article-block">
            <UserInfoComponent :currentUserId="2" />
          </BlockComponent>
          <BlockComponent class="article-block">
            <UserInfoComponent :currentUserId="3" />
          </BlockComponent>
        </div>

        
        <p class="section-title">Актуальные тесты</p>
        <div class="articles-container">
          <BlockComponent class="article-block">
            <UserInfoComponent :currentUserId="1" />
          </BlockComponent>
          <BlockComponent class="article-block">
            <UserInfoComponent :currentUserId="2" />
          </BlockComponent>
          <BlockComponent class="article-block">
            <UserInfoComponent :currentUserId="3" />
          </BlockComponent>
        </div>

        
        <p class="section-title">Недавнее посещение</p>
        <div class="articles-container">
          <BlockComponent class="article-block">
            <UserInfoComponent :currentUserId="1" />
          </BlockComponent>
          <BlockComponent class="article-block">
            <UserInfoComponent :currentUserId="2" />
          </BlockComponent>
          <BlockComponent class="article-block">
            <UserInfoComponent :currentUserId="3" />
          </BlockComponent>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import BlockComponent from "@/components/BlockComponent.vue";
import UserInfoComponent from "@/components/UserInfoComponent.vue";
import UserStatisticsComponent from "@/components/UserStatisticsComponent.vue";

export default {
  name: "TrainingPage",
  components: {
    BlockComponent,
    UserInfoComponent,
    UserStatisticsComponent,
  },
};
</script>

<style lang="scss" scoped>
.career-page {
  padding-block: 130px;
  text-align: left;

  .left-section {
    margin-left: 270px; /* Отступ от левого края */
    margin-right: 270px; /* Отступ от правого края */
  }

  .achievements-title {
    font-size: 30px; /* Увеличиваем размер шрифта */
    font-weight: bold; /* Делаем текст жирным для акцента */
    margin-bottom: 50px; /* Отступ от нижних элементов */
    display: block; /* Гарантируем, что текст занимает всю ширину */
    color: #000000; /* Цвет текста */
  }

  .section-title {
    font-size: 18px; /* Увеличенный размер шрифта */
    font-weight: 400; /* Нормальная жирность */
    margin-bottom: 30px; /* Отступ снизу */
    color: #333; /* Серый цвет текста */
  }

  .articles-container {
    display: flex; /* Включаем Flexbox */
    gap: 20px; /* Расстояние между блоками */
    margin-bottom: 50px; /* Отступ снизу */
    overflow-x: auto; /* Добавляем горизонтальный скроллинг, если блоки не помещаются */
  }

  .article-block {
    flex: 0 0 calc(33.33% - 20px); /* Блок занимает 1/3 ширины контейнера */
    max-width: calc(33.33% - 20px);
    min-width: 300px; /* Минимальная ширина блока */
    border: 1px solid #ddd; /* Обрамление блока */
    border-radius: 20px; /* Закругляем углы */
    overflow: hidden; /* Убираем выходящие за края элементы */
    padding: 20px; /* Внутренние отступы */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 55px;
    
  }

  .profile-block {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 140px;
    color: #333;
    margin-right: 300px;
    border-radius: 20px; /* Закругляем углы для блоков профиля */
    overflow: hidden;
  }
}
</style>
