<template>
  <MyTeamContainer />
</template>

<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemonStore'
import { onMounted } from 'vue'
import MyTeamContainer from '@/components/myteam/MyTeamContainer.vue'

const { getPokemonTeamDetail } = usePokemonStore()

onMounted( async () => {
  await getPokemonTeamDetail()
})
</script>