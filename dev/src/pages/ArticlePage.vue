<template>
  <div class="article-page">
    <main>
      <div class="top-block">
        <h2 class="article-title">Статья {{ article?.id }}</h2>
        <span class="article-name">{{ article?.name }}</span>

      </div>
      <div class="article-text" v-html="htmlText" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router';
import data from '@/fake_db/db.json'
import { marked } from 'marked'

const articles = ref(data.articles)

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
const articleId = Number(route.params.id);

// Получаем статью по ID
const article = computed(() => {
  return articles.value.find(a => a.id === articleId) || {};
});

const htmlText = computed(() => marked.parse(article.value.text || ''))
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.article-page {
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
</style>