<template>
  <main class="px-2 w-full mx-auto pb-8 ">
    <button @click="$router.push({name: 'home'})" class="top-0 left-0 ml-4 mb-3">
      <IconArrow class="w-8 h-8"/>
    </button>
    <MyTeamList />
  </main>
</template>

<script setup lang="ts">
import MyTeamList from './MyTeamList.vue'
import  IconArrow  from '@/components/icons/IconArrow.vue'
</script>
