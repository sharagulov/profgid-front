<template>
  <div class="article-page">
    <main>
      <h1 class="article-title">{{ article?.name }}</h1>
      <p class="article-date">Дата публикации: {{ article?.date }}</p>
      <p class="article-text">{{ article?.text }}</p>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router';

const articles = ref([])

const fetchArticles = async () => {
  try {
    const response = await fetch(`http://localhost:3000/articles`)
    articles.value = await response.json()
    console.log(articles.value);
  } catch (error) {
    console.error('Ошибка при загрузке статей:', error)
  }
}

onMounted(fetchArticles)

const route = useRoute();
const articleId = Number(route.params.id);

// Получаем статью по ID
const article = computed(() => {
  return articles.value.find(a => a.id === articleId) || {};
});
</script>
