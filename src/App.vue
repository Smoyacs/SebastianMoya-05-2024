<template>
  <Loader :show="isLoading" />
  <Navbar />
  <div class="mt-16">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Loader from './components/Loader.vue'
import { usePokemonStore } from './stores/pokemonStore'

const pokemonStore = usePokemonStore()
const isLoading = computed(() => pokemonStore.isLoading)
</script>
