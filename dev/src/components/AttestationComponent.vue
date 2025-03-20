<template>
  <div v-if="errorOccured">
    <span>Не удалось загрузить блок аттестаций.</span>
  </div>
  <div class="attestations-container">
    <AttestationItem v-for="attestation in attestations" :key="attestation.id" :attestation="attestation" />
  </div>
</template>

<script>
import AttestationItem from '@/components/AttestationItem.vue'

export default {
  name: 'AttestationComponent',
  components: { AttestationItem },
  data() {
    return {
      attestations: [],
      errorOccured: false,
    }
  },
  mounted() {
    this.fetchAttestations()
  },
  methods: {
    async fetchAttestations() {
      try {
        const response = await fetch(`http://localhost:3000/attestations`);
        this.attestations = await response.json();
      } catch (error) {
        this.errorOccured = true;
        console.error('Ошибка при загрузке аттестаций:', error);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.attestations-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 10px;
}
</style>
