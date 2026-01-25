import { RECIPE_LIST } from '@/nuka-mixer-recipe/RECIPE_LIST'
import type { IngredientName, Recipe } from '@/nuka-mixer-recipe/RecipieType'

export type RecipesFromIngredients = Record<IngredientName, Recipe[]>

export const RECIPES_FROM_INGREDIENTS: RecipesFromIngredients =
	RECIPE_LIST.reduce((acc, recipe) => {
		recipe.requiredItems.forEach(({ requiredItemName }) => {
			if (acc[requiredItemName] === undefined) {
				acc[requiredItemName] = []
			}
			acc[requiredItemName] = [...acc[requiredItemName], recipe]
		})

		return acc
	}, {} as RecipesFromIngredients)
