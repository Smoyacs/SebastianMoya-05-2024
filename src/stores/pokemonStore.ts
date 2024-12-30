import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { IPokemon, IPokemonDetail, ISelectedPokemon, IBaseItem, IFlavorTextEntry } from '@/types/pokemon'
import axios from 'axios'

const baseUrl = 'https://pokeapi.co/api/v2/pokemon'

const ITEMS_PER_PAGE = 25
const POKEDEX_LIMIT = 150
const TEAM_MAX_POKEMON = 6

export const usePokemonStore = defineStore('pokemonStore', () => {
  // lista de pokemons
  const allpokemons = ref<IPokemon[]>([])
  const isLoading = ref(false)
  // Inicializa el equipo de pokémon vacío
  const pokemonTeam = ref<ISelectedPokemon[]>(
    Array(TEAM_MAX_POKEMON)
      .fill(undefined)
      .map((_, i) => ({ name: '??????', id: 999 - i }))
  )

  // detalle del pokemon seleccionado del equipo
  const pokemonTeamDetail = ref<IPokemonDetail[]>([])

  // total de pokemons seleccionados para mostrar en el navbar
  const total = computed(() => pokemonTeam.value.filter((item) => item.name !== '??????').length)

  // obtener pokemons
  const getPokemons = async (limit = ITEMS_PER_PAGE, offset = 0) => {
    isLoading.value = true
    try {
      const response = await axios.get(`${baseUrl}?limit=${limit}&offset=${offset}`)
      const responsePokemons = response.data.results.map((item: IPokemon) => {
        const paths = item.url.split('/').filter((entry) => entry !== '')
        const id = paths[paths.length - 1]
        return {
          ...item,
          id: Number(id),
        }
      })
  
      responsePokemons.forEach((pokemon: IPokemon) => {
        const idx = pokemonTeam.value.findIndex((item) => item.name === pokemon.name)
        if (idx !== -1) {
          pokemon.isSelected = true
        }
      })
  
      if (offset === 0) {
        allpokemons.value = responsePokemons
      }
  
      return responsePokemons
    } catch (e) {
      console.log('Error al obtener Pokémon:', e)
      return [] // Retorna un array vacío en caso de error
    } finally {
      setTimeout(() => {
        isLoading.value = false
      }, 800)
    }
  }
  

  const loadMore = async () => {
    if (isLoading.value) return
  
    const total = allpokemons.value.length
    if (total < POKEDEX_LIMIT) {
      const itemsToFetch = Math.min(ITEMS_PER_PAGE, POKEDEX_LIMIT - total)
      const newPokemons = await getPokemons(itemsToFetch, total)
  
      if (newPokemons) {
        const uniquePokemons = newPokemons.filter(
          (pokemon:IPokemon) => !allpokemons.value.some((p) => p.id === pokemon.id)
        )
        allpokemons.value.push(...uniquePokemons)
      }
    }
  }
  
  

  const getPokemon = async (id: number | string) => {
    try {
      const response = await axios.get(`${baseUrl}/${id}`)
      return response.data as IPokemonDetail
    } catch (e) {
      console.log(e)
    }
  }

  const getPokemonData = async (url: string) => {
    try {
      const { data } = await axios.get(url)
      return data
    } catch (e) {
      console.log(e)
    }
  }

  const selectPokemon = (pokemon: ISelectedPokemon) => {
    const idx = pokemonTeam.value.findIndex((item) => item.id === pokemon.id)

    if (idx !== -1) {
        pokemonTeam.value[idx] = { name: '??????', id: idx } // Marca como vacío
        changeSelectedPokemon(pokemon.id, false)
        return
    }

    // Si el equipo está lleno
    if (total.value >= TEAM_MAX_POKEMON) {
        alert("Your team is full. Please free a space before adding another Pokémon.")
        return
    }

    // Agregar al equipo en la primera posición vacía
    const emptySlotIndex = pokemonTeam.value.findIndex((item) => item.name === '??????')
    if (emptySlotIndex !== -1) {
        pokemonTeam.value[emptySlotIndex] = pokemon
        changeSelectedPokemon(pokemon.id, true)
    }
}

  const changeSelectedPokemon = (id: number | undefined, isSelected: boolean) => {
    if (id === undefined) return

    const pokemon = allpokemons.value.find((item) => item.id === id)
    if (pokemon) {
        pokemon.isSelected = isSelected
    }
  }

  const getPokemonTeamDetail = async () => {
    isLoading.value = true
    try {
      const promises = pokemonTeam.value
        .filter((item) => item.name !== '??????')
        .map(async (pokemon) => {
          return await getPokemon(pokemon.id)
        })
      const results = await Promise.all(promises)
      pokemonTeamDetail.value = results as IPokemonDetail[]
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => {
        isLoading.value = false
      }
      , 800)}
  }

  const getPokemonTeam = (id: number) => {
    return pokemonTeamDetail.value.find((pokemon) => pokemon.id === id)
  }

  const getPokemonDetail = async (specie: IBaseItem) => {
    isLoading.value = true
    try {
      const pokemonSpecie = await getPokemonData(specie.url)
      const { chain } = await getPokemonData(pokemonSpecie.evolution_chain.url)
      const evolutionChain: IPokemon[] = []
      const evol1: IPokemon | undefined = await getPokemonEvolChain(chain.species.name)
      if (evol1) {
        evolutionChain.push(evol1)
      }
      const evol2: IPokemon | undefined = await getPokemonEvolChain(chain.evolves_to[0]?.species.name)
      if (evol2) {
        evolutionChain.push(evol2)
      }
      const evol3: IPokemon | undefined = await getPokemonEvolChain(chain.evolves_to[0]?.evolves_to[0]?.species.name)
      if (evol3) {
        evolutionChain.push(evol3)
      }
  
      const findEnglish = pokemonSpecie.flavor_text_entries.find((item: IFlavorTextEntry) => item.language.name === "en")
      const description = findEnglish.flavor_text
      return { description, evolutionChain }
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => {
        isLoading.value = false
      }, 800)
    }
  }

  const getPokemonEvolChain = async (name: string) => {
    const evolPokemon = allpokemons.value.find((pokemon) => pokemon.name === name)

    if (!evolPokemon && name) {
      const evolInfo = await getPokemon(name)
      if (evolInfo) {
        return { id: evolInfo.id, name: evolInfo.name, url: `${baseUrl}/${evolInfo.id}` }
      }
    } else {
      return evolPokemon
    }
  }

  const removePokemonTeam = (id: number) => {
    pokemonTeamDetail.value = pokemonTeamDetail.value.filter((pokemon) => pokemon.id !== id)
    pokemonTeam.value = pokemonTeam.value.filter((pokemon) => pokemon.id !== id)
    pokemonTeam.value.push({ name: '??????', id: pokemonTeam.value.length + 1 })
  }

  return {
    isLoading,
    allpokemons,
    pokemonTeam,
    pokemonTeamDetail,
    total,
    getPokemons,
    selectPokemon,
    getPokemon,
    loadMore,
    getPokemonTeamDetail,
    getPokemonTeam,
    removePokemonTeam,
    getPokemonDetail
  }
})
