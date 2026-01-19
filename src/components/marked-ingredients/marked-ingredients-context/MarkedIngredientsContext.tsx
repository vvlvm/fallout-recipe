import type { MarkedIngredientsValue } from '@/components/marked-ingredients/marked-ingredients-context/MarkedIngredientsValue.tsx'
import { createContext } from 'react'

export const MarkedIngredientsContext = createContext<MarkedIngredientsValue>(
	new Set(),
)
