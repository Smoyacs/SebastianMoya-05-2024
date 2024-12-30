<template>
  <div v-if="show" class="loader-overlay">
    <img src="@/assets/pokeball.jpg" alt="Loader" class="pokeball-loader" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ show: boolean }>()
</script>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Fondo oscuro semitransparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.pokeball-loader {
  width: 50px; /* Tamaño de la Pokebola */
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
