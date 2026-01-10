import { INGREDIENT_NAMES } from '@/constants/INGREDIENT_NAMES.ts'
import { isIngredientName, type IngredientName } from '@/types/RecipieType.ts'
import { useEffect, useState } from 'react'

const KEY = 'markedIngredients'

export function useMarkedIngredientsWithLocalStorage() {
	const [markedIngredients, setMarkedIngredients] = useState<IngredientName[]>(
		() => {
			const saved = localStorage.getItem(KEY)
			if (!saved) return []
			const parsed = JSON.parse(saved)
			if (!Array.isArray(parsed)) return []
			return parsed.filter((e) => {
				if (!isIngredientName(e)) {
					console.warn(
						`'${e}'はisIngredientNameで判定されなかったため削除します`
					)
					return false
				}
				return INGREDIENT_NAMES.includes(e)
			})
		}
	)

	function toggleIngredient(ingredientName: IngredientName) {
		setMarkedIngredients((prev) =>
			prev.includes(ingredientName)
				? prev.filter((n) => n !== ingredientName)
				: [...prev, ingredientName]
		)
	}

	useEffect(() => {
		localStorage.setItem(KEY, JSON.stringify(markedIngredients))
	}, [markedIngredients])

	return { markedIngredients, setMarkedIngredients, toggleIngredient }
}
