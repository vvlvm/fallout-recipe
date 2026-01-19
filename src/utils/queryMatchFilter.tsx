import { EFFECT_LABEL_MAP } from '@/constants/EFFECT_LABELS'
import { EFFECT_NAMES } from '@/constants/EFFECT_NAMES'
import { INGREDIENT_NAMES } from '@/constants/INGREDIENT_NAMES'
import type { EffectName, IngredientName } from '@/types/RecipieType'

const TOKEN_SEPARATORS = /[&()（）\u3000、,|。]+/

export function ingredientNameQueryMatchFilter(
	query: string,
): IngredientName[] {
	if (!query) return []
	const tokens = query.split(TOKEN_SEPARATORS).filter(Boolean)
	const deduplicatedTokens: string[] = Array.from(new Set(tokens))

	return INGREDIENT_NAMES.filter((name) =>
		deduplicatedTokens.some((token) => {
			// 検索語が'ヌカ・コーラ'の場合はヌカ・コーラそのもののみ対象にする
			if (token === 'ヌカ・コーラ') {
				return name === 'ヌカ・コーラ'
			} else {
				return name.includes(token)
			}
		}),
	)
}

export function effectNameQueryMatchFilter(query: string): EffectName[] {
	if (!query) return []
	const tokens = query.split(TOKEN_SEPARATORS).filter(Boolean)
	const deduplicatedTokens: string[] = Array.from(new Set(tokens))

	return EFFECT_NAMES.filter((name) =>
		deduplicatedTokens.some((token) => {
			const lowerCaseLabel = EFFECT_LABEL_MAP[name].toLocaleLowerCase()
			const lowerCaseTerm = token.toLocaleLowerCase()

			// 検索のときHPが最大HPにかかってしまうので特別に処理
			if (lowerCaseTerm === 'hp' || lowerCaseTerm === 'ap') {
				return lowerCaseLabel === lowerCaseTerm
			} else {
				return lowerCaseLabel.includes(lowerCaseTerm)
			}
		}),
	)
}
