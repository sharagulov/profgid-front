<template>
  <div v-if="errorOccured">
    <span>Не удалось загрузить блок аттестаций.</span>
  </div>
  <div class="attestations-container">
    <AttestationItem
      v-for="attestation in attestations"
      :key="attestation.id"
      :name="attestation.name"
      :desc="attestation.desc"
    />
    <AttestationItem
      v-if="showAttestationsHistory"
      v-for="historyAttestation in historyAttestations"
      :key="historyAttestation.id"
      :name="historyAttestation.name"
      :desc="historyAttestation.desc"
      :passed="historyAttestation.passed"
    />
  </div>
</template>

<script>
import AttestationItem from '@/components/AttestationItem.vue'

export default {
  name: 'AttestationComponent',
  components: { AttestationItem },
  props: {
    currentUserId: {
      type: Number,
      required: false,
      default: 0,
    },
    showAttestationsHistory: { // Получаем showHistory из родителя
      type: Boolean,
      required: false,
      default: false
    },
  },
  data() {
    return {
      attestations: [],
      historyAttestations: [],
      errorOccured: false,
    }
  },
  mounted() {
    this.fetchAttestations()
    this.fetchHistoryAttestations()
  },
  methods: {
    async fetchAttestations() {
      try {
        const response = await fetch(`http://localhost:3000/attestations`);
        const allAttestations = await response.json();
        
        // Фильтруем только те, где userIds включает текущего пользователя
        this.attestations = allAttestations.filter(attestation => 
        attestation.userIds.includes(this.currentUserId)
      );
    } catch (error) {
      this.errorOccured = !this.errorOccured;
      console.error('Ошибка при загрузке аттестаций:', error);
    }
  },
  async fetchHistoryAttestations() {
    try {
      const response = await fetch(`http://localhost:3000/users/${this.currentUserId}`);
      const allHistoryAttestations = await response.json();
      
      this.historyAttestations = allHistoryAttestations.passedAttestationsHistory;
    }
    catch (error) {
      this.errorOccured = !this.errorOccured;
      console.error('Ошибка при загрузке аттестаий', error);
    }
  },
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
