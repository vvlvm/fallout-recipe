import { SetMarkedIngredientsContext } from './SetMarkedIngredientsContext'
import { useContext } from 'react'

export function useSetMarkedIngredients() {
	return useContext(SetMarkedIngredientsContext)
}
