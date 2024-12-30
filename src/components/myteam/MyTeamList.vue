<template>
  <section class='grid grid-cols-2 xl:grid-cols-6 md:grid-cols-3 justify-items-center gap-x-2 md:gap-x-4 md:gap-y-5 gap-y-2 md:w-11/12 w-full mx-auto  z-10'>
    <MyTeamCard
      v-for="(pokemon, idx) in pokemonTeamDetail"
      :key="idx"
      :name="pokemon.name"
      :types="pokemon.types"
      :stats="pokemon.stats"
      :cries="pokemon.cries"
      :id="pokemon.id"
    />
  </section>
</template>

<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemonStore'
import MyTeamCard from './MyTeamCard.vue'
import { storeToRefs } from 'pinia'

const pokemonStore = usePokemonStore()
const { pokemonTeamDetail } = storeToRefs(pokemonStore)
</script>