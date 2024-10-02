<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">{{ recipe?.name }}</h1>
    <p class="mb-4">{{ recipe?.description }}</p>
    <div class="flex items-center gap-4">
      <RouterLink :to="{ name: 'edit-recipe', params: { id: recipe?.id } }" class="hover:underline"
        >Edit</RouterLink
      >
      <button
        v-if="recipe"
        @click="toggleFavorite(recipe.id)"
        class="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
      >
        {{ isFavor ? 'Remove from favorites' : 'Add to favorites' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRecipeStore } from '@/stores/recipe'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const { getRecipeById, isFavorite, toggleFavorite } = useRecipeStore()
const recipe = computed(() => getRecipeById(route.params.id as string))

const isFavor = computed(() => (recipe.value ? isFavorite(recipe.value.id) : false))
</script>
