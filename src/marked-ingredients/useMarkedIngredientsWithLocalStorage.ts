import { isIngredientName, type IngredientName } from '@/types/RecipieType.ts'
import { useEffect, useState } from 'react'

const KEY = 'markedIngredients'

export function useMarkedIngredientsWithLocalStorage() {
	const [markedIngredients, _setMarkedIngredients] = useState<
		Set<IngredientName>
	>(() => {
		const set = new Set<IngredientName>()
		const saved = localStorage.getItem(KEY)
		if (!saved) return set
		const parsed = JSON.parse(saved)
		if (!Array.isArray(parsed)) return set

		parsed.forEach((e) => {
			if (!isIngredientName(e)) {
				console.warn(`'${e}'はisIngredientNameで判定されなかったため削除します`)
				return
			}
			return set.add(e)
		})

		return set
	})

	function setMarkedIngredients(ingredientName: IngredientName) {
		_setMarkedIngredients((prev) => {
			const next = new Set(prev)
			next.delete(ingredientName)
			return next
		})
	}

	function toggleIngredient(ingredientName: IngredientName) {
		_setMarkedIngredients((prev) => {
			const next = new Set(prev)
			if (next.has(ingredientName)) {
				next.delete(ingredientName)
			} else {
				next.add(ingredientName)
			}
			return next
		})
	}

	useEffect(() => {
		localStorage.setItem(KEY, JSON.stringify(markedIngredients))
	}, [markedIngredients])

	return { markedIngredients, setMarkedIngredients, toggleIngredient }
}
