import type { ToggleMarkedIngredientValue } from '@/marked-ingredients/toggle-marked-ingredient/ToggleMarkedIngredientValue.tsx'
import { createContext } from 'react'

export const ToggleMarkedIngredientContext =
	createContext<ToggleMarkedIngredientValue>(() => {})
