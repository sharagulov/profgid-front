 <!--<template>
    <div class="test-page">
      <main>
        <div class="top-block">
          <h2 class="test-title">Тест {{ test?.id }}</h2>
          <span class="test-name">{{ test?.name }}</span>
  
        </div>
        <div class="test-text" v-html="htmlText" />
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router';
  import data from '@/fake_db/db.json'
  import { marked } from 'marked'
  
  const tests = ref(data.tests)
  
  // const fetchArticles = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/articles`)
  //     articles.value = await response.json()
  //     console.log(articles.value);
  //   } catch (error) {
  //     console.error('Ошибка при загрузке статей:', error)
  //   }
  // }
  
  // onMounted(fetchArticles)
  
  const route = useRoute();
  const testId = Number(route.params.id);
  
  // Получаем статью по ID
  const test = computed(() => {
    return tests.value.find(a => a.id === testId) || {};
  });
  
  const htmlText = computed(() => marked.parse(test.value.text || ''))
  </script>
  
  <style lang="scss" scoped>
  @import '@/styles/variables.scss';
  
  .test-page {
    padding-block: 130px;
    margin-inline: 200px;
  }
  
  main {
    display: flex;
    flex-direction: column;
    gap: 20px
  }
  
  .top-block {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  </style> -->

  <template>
    <div class="test-page">
      <main>
        <div class="top-block">
          <h2 class="test-title">Тест {{ test?.id }}</h2>
          <span class="test-name">{{ test?.name }}</span>
        </div>
        <div class="test-description" v-html="htmlDescription" />
        <div class="questions" v-if="test?.questions?.length">
          <div v-for="(question, index) in test.questions" :key="index" class="question">
            <p>{{ question.text }}</p>
            <ul>
              <li v-for="(answer, aIndex) in question.answers" :key="aIndex">
                <label>
                  <input type="radio" :name="'q' + index" :value="answer" v-model="userAnswers[index]" />
                  {{ answer }}
                </label>
              </li>
            </ul>
          </div>
          <button @click="submitTest">Отправить</button>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router';
  import data from '@/fake_db/db.json'
  import { marked } from 'marked'
  
  const tests = ref(data.tests)
  const route = useRoute();
  const testId = Number(route.params.id);
  const userAnswers = ref({});
  
  // Получаем тест по ID
  const test = computed(() => {
    return tests.value.find(t => t.id === testId) || {};
  });
  
  const htmlDescription = computed(() => marked.parse(test.value.description || ''))
  
  const submitTest = () => {
    console.log('Ответы пользователя:', userAnswers.value);
    alert('Тест отправлен!');
  }
  </script>
  
  <style lang="scss" scoped>
  @import '@/styles/variables.scss';
  
  .test-page {
    padding-block: 130px;
    margin-inline: 200px;
  }
  
  main {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .top-block {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  </style>
  
  