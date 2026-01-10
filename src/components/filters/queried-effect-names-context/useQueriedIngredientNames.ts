import { useContext } from 'react'
import { QueriedEffectNamesContext } from './Context'

export function useQueriedEffectNames() {
	return useContext(QueriedEffectNamesContext)
}
