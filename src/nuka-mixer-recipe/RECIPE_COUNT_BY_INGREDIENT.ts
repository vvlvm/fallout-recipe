import { INGREDIENT_NAMES } from '@/nuka-mixer-recipe/INGREDIENT_NAMES'
import { RECIPES_FROM_INGREDIENTS } from '@/nuka-mixer-recipe/RECIPES_FROM_INGREDIENTS'

export const RECIPE_COUNT_BY_INGREDIENT = new Map(
	INGREDIENT_NAMES.map((name) => [name, RECIPES_FROM_INGREDIENTS[name].length]),
)
