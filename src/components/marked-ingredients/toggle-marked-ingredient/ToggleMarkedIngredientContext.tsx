import type { ToggleMarkedIngredientValue } from '@/components/marked-ingredients/toggle-marked-ingredient/ToggleMarkedIngredientValue.tsx'
import { createContext } from 'react'

export const ToggleMarkedIngredientContext =
	createContext<ToggleMarkedIngredientValue>(() => {})
