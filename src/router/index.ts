import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { usePokemonStore } from '@/stores/pokemonStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('@/views/TeamView.vue'),
      beforeEnter: (to, from, next) => {
        const { total } = usePokemonStore()
        if (total === 0) {
          alert('You must have at least one Pokémon in your team to access the Team route!')
          next({ name: 'home' })
        } else {
          next()
        }
      }
    },
    {
      path: '/team/:id',
      name: 'teamId',
      component: () => import('@/views/PokemonDetail.vue')
    }
  ]
})

export default router
