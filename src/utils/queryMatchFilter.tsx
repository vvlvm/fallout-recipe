import { EFFECT_LABEL_MAP } from '@/constants/EFFECT_LABELS'
import { EFFECT_NAMES } from '@/constants/EFFECT_NAMES'
import { INGREDIENT_NAMES } from '@/constants/INGREDIENT_NAMES'
import type { EffectName, IngredientName } from '@/types/RecipieType'

const TOKEN_SEPARATORS = /[&()（）\u3000、,|。]+/

export function ingredientNameQueryMatchFilter(
	query: string
): IngredientName[] {
	if (!query) return []
	const tokens = query.split(TOKEN_SEPARATORS).filter(Boolean)
	const deduplicated: string[] = Array.from(new Set(tokens))

	return INGREDIENT_NAMES.filter((name) =>
		deduplicated.some((term) => name.includes(term))
	)
}

export function effectNameQueryMatchFilter(query: string): EffectName[] {
	if (!query) return []
	const tokens = query.split(TOKEN_SEPARATORS).filter(Boolean)
	const deduplicated: string[] = Array.from(new Set(tokens))

	return EFFECT_NAMES.filter((name) =>
		deduplicated.some((term) => {
			const label = EFFECT_LABEL_MAP[name]
			const lowerCaseLabel = EFFECT_LABEL_MAP[name].toLocaleLowerCase()
			const lowerCaseTerm = term.toLocaleLowerCase()

			// 検索のときHPが最大HPにかかってしまうので特別に処理
			if (
				label === 'HP' ||
				label === 'AP' ||
				label === '最大HP' ||
				label === '最大AP'
			) {
				return lowerCaseLabel === lowerCaseTerm
			} else {
				return lowerCaseLabel.includes(lowerCaseTerm)
			}
		})
	)
}
