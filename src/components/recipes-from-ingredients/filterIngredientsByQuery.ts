import {
	isIngredientName,
	type IngredientName,
} from '@/nuka-mixer-recipe/RecipieType'

export function filterIngredientsByQuery(
	all: readonly IngredientName[],
	query: string,
): IngredientName[] {
	const q = query.trim()
	if (q === '') return [...all]

	// コンマ、パイプ、句読点で句切る
	const keywords = q
		.split(/[、|,]/)
		.map((s) => s.trim())
		.filter(Boolean)

	return all.filter((name) => {
		return keywords.some((kw) => {
			// 完全なIngredientNameのときは完全一致で試す
			if (isIngredientName(kw)) {
				return name === kw
			}
			return name.includes(kw)
		})
	})
}
