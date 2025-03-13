<template>
  <div class="learning-page">
    <main>
      <div class="left-section">
        <span class="t14 achievements-title">Обучение</span>

        <div>
          <p class="section-title">Актуальные статьи</p>
          <div class="articles-container">
            <ArticleComponent class="article" number="07." title="Собачий кайф" description="Не стоит прикармливать животных, которые завелись на производстве. Если это кошка с котятами — ничего не поделаешь." imageSrc="/avatars/avatar3.gif" />
            <ArticleComponent class="article" number="07." title="Собачий кайф" description="Не стоит прикармливать животных, которые завелись на производстве. Если это кошка с котятами — ничего не поделаешь." imageSrc="/avatars/avatar3.gif" />
            <ArticleComponent class="article" number="07." title="Собачий кайф" description="Не стоит прикармливать животных, которые завелись на производстве. Если это кошка с котятами — ничего не поделаешь." imageSrc="/avatars/avatar3.gif" />
            <ArticleComponent class="article" number="07." title="Собачий кайф" description="Не стоит прикармливать животных, которые завелись на производстве. Если это кошка с котятами — ничего не поделаешь." imageSrc="/avatars/avatar3.gif" />
          </div>
        </div>

        <div>
          <p class="section-title">Актуальные тесты</p>
          <div class="articles-container">
            <BlockComponent class="article-block">
              <UserInfoComponent />
            </BlockComponent>
            <BlockComponent class="article-block">
              <UserInfoComponent />
            </BlockComponent>
            <BlockComponent class="article-block">
              <UserInfoComponent />
            </BlockComponent>
          </div>
        </div>

        <p class="section-title">Недавнее посещение</p>
        <div class="articles-container">
          <BlockComponent class="article-block">
            <UserInfoComponent />
          </BlockComponent>
          <BlockComponent class="article-block">
            <UserInfoComponent />
          </BlockComponent>
          <BlockComponent class="article-block">
            <UserInfoComponent />
          </BlockComponent>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import BlockComponent from "@/components/BlockComponent.vue";
import UserInfoComponent from "@/components/UserInfoComponent.vue";
import ArticleComponent from "@/components/ArticleComponent.vue";

export default {
  name: "TrainingPage",
  components: {
    BlockComponent,
    UserInfoComponent,
    ArticleComponent,
  },
};
</script>

<style lang="scss" scoped>
.learning-page {
  padding-block: 130px;
  text-align: left;

  main {
    padding-inline: 160px;
    display: flex;
    flex-direction: column;
    gap: 50px;
    justify-content: center;

    @media (max-width: 1450px) {
      padding-inline: 80px;
    }

    @media (max-width: 1000px) {
      padding-inline: 20px;
    }
  }

  .left-section {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
  }

  .achievements-title {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 30px;
    color: #000;
  }

  .section-title {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
    color: #333;
  }

  .articles-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center; // Центрируем, если карточек меньше 3

  .article {
    flex: 1 1 calc(33.33% - 20px); // 3 в ряд, учитывая gap
    max-width: 500px;
    min-width: 370px;
    border: 1px solid #ddd;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media (max-width: 1200px) {
    .article {
      flex: 1 1 calc(50% - 20px); // 2 в ряд на средних экранах
    }
  }

  @media (max-width: 768px) {
    .article {
      flex: 1 1 100%; // На маленьких экранах в 1 ряд
      max-width: none;
    }
  }
}

}
</style>
