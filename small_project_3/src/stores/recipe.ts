import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface Recipe {
  id: string
  name: string
  description: string
}

type NewRecipe = Omit<Recipe, 'id'>

export const useRecipeStore = defineStore('recipe', () => {
  const recipes = ref<Recipe[]>([])
  const favoriteIds = ref<string[]>([])

  const isFavorite = (id: string) => favoriteIds.value.includes(id)

  const toggleFavorite = (id: string) => {
    if (favoriteIds.value.includes(id)) {
      favoriteIds.value = favoriteIds.value.filter((fav) => fav !== id)
    } else {
      favoriteIds.value.push(id)
    }
  }

  const addRecipe = (recipe: NewRecipe) => {
    const newRecipe = {
      id: crypto.randomUUID(),
      ...recipe
    }
    recipes.value.push(newRecipe)
    return newRecipe
  }

  const getRecipeById = (id: string) => {
    return recipes.value.find((recipe) => recipe.id === id)
  }

  const filteredRecipes = (val: string) =>
    recipes.value.filter((recipe) => recipe.name.toLowerCase().includes(val.toLowerCase()))

  const editRecipe = (updatedRecipe: Recipe) => {
    const index = recipes.value.findIndex((recipe) => recipe.id === updatedRecipe.id)
    if (index !== -1) {
      recipes.value[index] = updatedRecipe
    }
  }

  const favoriteRecipes = computed(() =>
    recipes.value.filter((recipe) => favoriteIds.value.includes(recipe.id))
  )

  return {
    recipes,
    favoriteIds,
    addRecipe,
    getRecipeById,
    filteredRecipes,
    editRecipe,
    isFavorite,
    toggleFavorite,
    favoriteRecipes
  }
})
