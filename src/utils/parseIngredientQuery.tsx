import { INGREDIENT_NAMES } from '@/constants/INGREDIENT_NAMES'
import { type IngredientName } from '@/types/RecipieType'

const TOKEN_SEPARATORS = /[&()（）\u3000、,|]+/

export function parseIngredientQuery(query: string): IngredientName[] {
	if (!query) return []
	const tokens = query
		.split(TOKEN_SEPARATORS)
		.map((t) => t.trim())
		.filter(Boolean)
	const deduplicated: string[] = Array.from(new Set(tokens))

	return INGREDIENT_NAMES.filter((name) =>
		deduplicated.some((term) => name.includes(term))
	)
}
