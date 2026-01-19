import { ToggleMarkedIngredientContext } from '@/marked-ingredients/toggle-marked-ingredient/ToggleMarkedIngredientContext.tsx'
import type { ToggleMarkedIngredientValue } from '@/marked-ingredients/toggle-marked-ingredient/ToggleMarkedIngredientValue.tsx'
import { type PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
	value: ToggleMarkedIngredientValue
}

export function ToggleMarkedIngredientProvider({ value, children }: Props) {
	return (
		<ToggleMarkedIngredientContext.Provider value={value}>
			{children}
		</ToggleMarkedIngredientContext.Provider>
	)
}
