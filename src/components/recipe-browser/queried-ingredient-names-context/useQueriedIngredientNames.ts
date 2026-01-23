import { useContext } from 'react'
import { QueriedIngredientNamesContext } from './Context'

export function useQueriedIngredientNames() {
	return useContext(QueriedIngredientNamesContext)
}
