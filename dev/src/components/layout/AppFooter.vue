<template>
  <footer class="footer">
    <p>© 2024 Company Name. All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style lang="scss" scoped>
.footer {
  text-align: center;
  padding: 1rem;
  font-size: 0.8rem;
  background: #f8f8f8;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
}
</style>
