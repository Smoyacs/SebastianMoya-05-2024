<template>
  <nav class="bg-red-600 p-3 shadow-lg top-0 lef-0 w-full fixed z-50">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center">
        <!-- Logo de Pokémon -->
        <router-link to="/">
          <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="Pokémon Logo" class="h-7 mr-3" />
        </router-link>
      </div>
      <ul class="flex space-x-6">
        <li>
          <router-link to="/" class="text-white hover:text-yellow-300 transition duration-300">Home</router-link>
        </li>
        <li>
          <router-link to="/team" class="text-white hover:text-yellow-300 transition duration-300">Team</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>