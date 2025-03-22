<template>
  <div v-if="errorOccured">
    <span>Не удалось загрузить блок аттестаций.</span>
  </div>
  <div class="attestations-container">
    <AttestationItem v-for="attestation in attestations" :key="attestation.id" :attestation="attestation" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AttestationItem from '@/components/AttestationItem.vue'
import data from '@/fake_db/db.json'

const attestations = ref(data.attestations)
// const errorOccured = ref(false)

// const fetchAttestations = async () => {
//   try {
//     const response = await fetch(`http://localhost:3000/attestations`)
//     attestations.value = await response.json()
//   } catch (error) {
//     errorOccured.value = true
//     console.error('Ошибка при загрузке аттестаций:', error)
//   }
// }

// onMounted(fetchAttestations)


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
