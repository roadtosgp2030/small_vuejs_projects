<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Favorite Recipes</h1>
    <RecipeList :recipes="store.favoriteRecipes" />
  </div>
</template>

<script lang="ts" setup>
import RecipeList from '@/components/RecipeList.vue'
import { useRecipeStore } from '@/stores/recipe'

const store = useRecipeStore()
</script>
