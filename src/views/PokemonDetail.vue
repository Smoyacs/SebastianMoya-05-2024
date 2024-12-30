<template>
  <main class="scale-90 flex items-center justify-center w-full mx-auto -mt-6">
    <TeamCardDetail
      :name="pokemon.name"
      :types="pokemon.types"
      :stats="pokemon.stats"
      :species="pokemon.species"
      :id="pokemon.id"
      :height="pokemon.height"
      :weight="pokemon.weight"
      :cries="pokemon.cries"
      v-if="pokemon"
    />
  </main>
</template>
<script setup lang="ts">
import TeamCardDetail from '@/components/TeamCardDetail.vue'
import { usePokemonStore } from '@/stores/pokemonStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const { getPokemonTeam }  = usePokemonStore()
const pokemon = getPokemonTeam(Number(route.params.id))
</script>

