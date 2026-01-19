import type { SetMarkedIngredientsValue } from './SetMarkedIngredientsValue'
import { createContext } from 'react'

export const SetMarkedIngredientsContext =
	createContext<SetMarkedIngredientsValue>(() => {})
