<template>
  <div class="flex flex-col">
    <button @click="$router.go(-1)" class="top-0 left-0 ml-1 mt-1">
      <IconArrow class="w-9 h-9"/>
    </button>
    
    <div class='flex flex-col items-center justify-center md:gap-5 -mt-2'>
      <div class='flex items-center justify-center md:gap-5 md:w-8/12 mx-auto'>
        <section :style="{backgroundColor: colors[color as keyof typeof colors]}" class='group hover:shadow-lg relative h-full w-full max-w-96 pt-3 pr-2 pl-3 overflow-hidden border border-gray-200 rounded-3xl shadow'>
          <header class='flex justify-between items-center pb-5 relative mx-1'>
            <h2 class='capitalize font-bold tracking-tighter md:text-lg text-sm text-gray-900'>
              {{name}}
            </h2>
            <h3 class="opacity-55 right-0 top-1 text-xs font-bold md:right-3 md:top-2 md:text-base">#{{String(`${id}`).padStart(3, "0")}}</h3>
          </header>
          
          <figure class='flex flex-col items-center justify-center '>
              <figcaption class='flex justify-center items-center gap-3 -mt-2'>
                <small
                  v-for="(type, idx) in types"
                  :key="idx"
                  class='flex justify-center items-center w-16 md:w-24 md:h-7 font-normal capitalize py-[1.8px] px-0 bg-gray-200 my-1 rounded-full md:text-base text-xs'
                >
                    {{type.type.name}}
                  </small>
              </figcaption>
              <div class='w-1/2 relative cursor-pointer'>
                <img class='relative h-auto w-full'
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`"
                :alt="name" />
              </div>
            <button class="bottom-0 mb-4 mt-3" @click="playSound(cries)">
              <iconAudio class="w-6 h-6"/>
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
              <div :class="`h-2.5 bg-red-600 rounded-full`" :style="{width: `${stat.base_stat}%`}"></div>
            </div>
          </div>
        </section>  
      </div>
      <!-- Altura peso descripcion -->
      <div class="md:w-8/12 sm:w-8/12 mx-auto border-2 border-gray-200 rounded-lg shadow p-3">
        <div class="flex justify-around items-center">
          <div class="flex flex-col items-center">
            <h1 class="md:text-xl text-base font-bold">Height</h1>
            <span class="md:text-base text-xs font-bold">{{ height }} dm</span>
          </div>
          <div class="flex flex-col items-center">
            <h1 class="md:text-xl text-base font-bold">Weight</h1>
            <span class="md:text-base text-xs font-bold">{{ weight }} hg</span>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <h1 class="md:text-xl text-base font-bold">Description</h1>
          <span class="md:text-base text-xs font-bold">{{ pokemonDetail?.description }}</span>
        </div>
      </div>


      <div class="md:w-5/12 sm:w-8/12 mx-auto">
        <h1 class="md:text-xl text-base font-bold text-center">Evolution Chain</h1>
        <div class="flex justify-around items-center">
          <div class='w-1/4 relative text-center' v-for="pokemon in pokemonDetail?.evolutionChain" :key="pokemon.id">
            <img class='relative h-auto right-1 w-full'
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`"
              :alt="pokemon.name" />
            <span class="capitalize md:text-base text-xs font-bold">{{ pokemon.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import type { IType, IStat, IBaseItem, ICries } from "@/types/pokemon"
import { colors } from '@/common/constants'
import { usePokemonStore } from '@/stores/pokemonStore'
import { onMounted, ref } from "vue"
import IconAudio from '@/components/icons/IconAudio.vue'
import IconArrow from '@/components/icons/IconArrow.vue'

const pokemonDetail = ref()

const { getPokemonDetail } = usePokemonStore()
const props = defineProps<{ name: string, id: number, types: IType[], stats: IStat[], species: IBaseItem, weight: number, height: number, cries: ICries }>()
const color = props.types[0].type?.name || "unknown"

const playSound = (cries: ICries) => {
  const audio = new Audio(cries.latest)
  audio.play()
}

onMounted(async () => {
  pokemonDetail.value = await getPokemonDetail(props.species)
})
</script>