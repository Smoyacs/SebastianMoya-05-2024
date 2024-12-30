<template>
  <div class="bg-yellow-200 p-3 mb-1 text-center">
    <p class="text-yellow-800">Choose 6 pokemon for your team!</p>
  </div>
  <div ref="scrollComponent">
    <PokedexContainer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { usePokemonStore } from '@/stores/pokemonStore'
import PokedexContainer from '@/components/pokedex/PokedexContainer.vue'

const scrollComponent = ref()
const { getPokemons, loadMore } = usePokemonStore()
const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight + 40) {
    loadMore()
  }
}
onMounted( async () => {
  window.addEventListener("scroll", handleScroll)
  await getPokemons()
})
onUnmounted(() => {
window.removeEventListener("scroll", handleScroll)
})
</script>