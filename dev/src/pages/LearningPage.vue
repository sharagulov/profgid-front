<template>
  <div class="learning-page">
    <main>
      <div class="left-section">
        <span class="t14 achievements-title">Обучение</span>

        <div>
          <p class="section-title">Актуальные статьи</p>
          <div class="articles-container">
            <ArticleComponent
              v-for="article in articles"
              :key="article.id"
              class="article"
              :number="'0' + article.id + '.'"
              :title="article.name"
              :description="article.desc"
              :imageSrc="article.imageSrc"
              @click="openArticle(article.id)"
            />
          </div>
        </div>


        <div>
          <p class="section-title">Актуальные тесты</p>
          
          <div class="articles-container" style="justify-content: flex-start;">
            <TestComponent
              v-for="test in tests"
              :key="test.id"
              class="article"
              :number="'0' + test.id + '.'"
              :title="test.title"
              :description="test.description"
              :imageSrc="test.imageSrc" 
              @click="openTest(test.id)"
            />
          
          </div>
        </div>
                 
      <!--  <TestComponent class="article" number="07." title="Собачий кайф" description="Не стоит прикармливать животных, которые завелись на производстве. Если это кошка с котятами — ничего не поделаешь." imageSrc="/avatars/avatar3.gif" />
            <TestComponent class="article" number="07." title="Собачий кайф" description="Не стоит прикармливать животных, которые завелись на производстве. Если это кошка с котятами — ничего не поделаешь." imageSrc="/avatars/avatar3.gif" />
            <TestComponent class="article" number="07." title="Собачий кайф" description="Не стоит прикармливать животных, которые завелись на производстве. Если это кошка с котятами — ничего не поделаешь." imageSrc="/avatars/avatar3.gif" />
            <TestComponent class="article" number="07." title="Собачий кайф" description="Не стоит прикармливать животных, которые завелись на производстве. Если это кошка с котятами — ничего не поделаешь." imageSrc="/avatars/avatar3.gif" /> -->        
      </div>
    </main>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router';
  import ArticleComponent from "@/components/ArticleComponent.vue";
  import TestComponent from "@/components/TestComponent.vue";

  import data from '@/fake_db/db.json'

  const articles = ref(data.articles)
  const tests = ref(data.tests)
  
  // const fetchArticles = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/articles`)
  //     articles.value = await response.json()
  //   } catch (error) {
  //     console.error('Ошибка при загрузке достижений:', error)
  //   }
  // }

  // onMounted(fetchArticles)


  const router = useRouter();
  const openArticle = (id) => {
    router.push(`/learning/article/${id}`);
  }

  const openTest = (id) => {
  router.push(`/learning/test/${id}`)
}

</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

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
    width: 95%;
  }

  .achievements-title {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .section-title {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  .articles-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: left; // Центрируем, если карточек меньше 3

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
