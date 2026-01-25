import { MarkedIngredientsContext } from '@/components/marked-ingredients/marked-ingredients-context/MarkedIngredientsContext.tsx'
import type { MarkedIngredientsValue } from '@/components/marked-ingredients/marked-ingredients-context/MarkedIngredientsValue'
import { useContext } from 'react'

/**
 * @returns Set<IngredientName>
 */
export function useMarkedIngredients(): MarkedIngredientsValue {
	return useContext(MarkedIngredientsContext)
}
