import type { MarkedIngredientsValue } from '@/marked-ingredients/marked-ingredients-context/MarkedIngredientsValue.tsx'
import { createContext } from 'react'

export const MarkedIngredientsContext = createContext<MarkedIngredientsValue>(
	[]
)
