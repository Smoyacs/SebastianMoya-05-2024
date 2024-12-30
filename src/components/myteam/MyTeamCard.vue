<template>
  <section :style="{ backgroundColor: colors[color as keyof typeof colors] }"
    class='group hover:shadow-lg relative h-full w-full max-w-96 pt-3 pr-2 pb-2 pl-3 overflow-hidden border border-gray-200 rounded-3xl shadow'>

    <header class='flex justify-between items-center pb-5 relative'>
      <iconClose class="cursor-pointer" @click.stop="handleRemove(id)" />
      <h2 class='capitalize font-bold tracking-tighter md:text-lg text-sm text-gray-900'>
        {{ name }}
      </h2>
      <h3 class="opacity-55 right-0 top-1 text-xs font-bold md:right-3 md:top-2 md:text-base">
        #{{ String(`${id}`).padStart(3, "0") }}</h3>
    </header>

    <figure class='flex flex-col items-center justify-center '>

      <figcaption class='flex justify-center items-center gap-3 -mt-2'>
        <small v-for="(type, idx) in types" :key="idx"
          class='flex justify-center items-center w-16 md:w-24 md:h-7 font-normal capitalize py-[1.8px] px-0 bg-gray-200 my-1 rounded-full md:text-base text-xs'>
          {{ type.type.name }}
        </small>
      </figcaption>

      <div class='w-1/2 relative mt-5 cursor-pointer' @click="handleClick(id)">
        <img class='relative h-auto w-full'
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`"
          :alt="name" />
      </div>
      <button class="absolute bottom-0 mb-4" @click="playSound(cries)">
        <iconAudio class="w-6 h-6" />
      </button>
    </figure>

  </section>
  <section class="pokeDetails">

    <div v-for="(stat, idx) in stats" :key="idx">
      <!-- Nombre de la estadística -->
      <div :class="`text-base font-medium mb-1 capitalize`">
        {{ stat.stat.name }}:
        {{ stat.base_stat }}
      </div>

      <!-- Barra de progreso con valor -->
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div :class="`h-2.5 bg-red-600 rounded-full`" :style="{ width: `${stat.base_stat}%` }"></div>
      </div>

    </div>
  </section>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { IType, IStat, ICries } from "@/types/pokemon"
import IconClose from '@/components/icons/IconClose.vue'
import IconAudio from '@/components/icons/IconAudio.vue'
import { usePokemonStore } from '@/stores/pokemonStore'
import { colors } from '@/common/constants'
import "./myteam.css"

const props = defineProps<{ name: string, id: number, types: IType[], stats: IStat[], cries: ICries }>()
const color = props.types[0].type?.name || "unknown"
const { removePokemonTeam } = usePokemonStore()
const router = useRouter()
const handleClick = (id: number) => {
  router.push({ name: "teamId", params: { id } })
}
const handleRemove = (id: number) => {
  removePokemonTeam(id)
}

const playSound = (cries: ICries) => {
  const audio = new Audio(cries.latest)
  audio.play()
}
</script>