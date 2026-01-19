import { MarkedIngredientsContext } from '@/components/marked-ingredients/marked-ingredients-context/MarkedIngredientsContext.tsx'
import { useContext } from 'react'

export function useMarkedIngredients() {
	return useContext(MarkedIngredientsContext)
}
