import { ToggleMarkedIngredientContext } from './ToggleMarkedIngredientContext'
import { useContext } from 'react'

export function useToggleMarkedIngredient() {
	return useContext(ToggleMarkedIngredientContext)
}
