import { MarkedIngredientsContext } from '@/components/marked-ingredients/marked-ingredients-context/MarkedIngredientsContext'
import type { MarkedIngredientsValue } from '@/components/marked-ingredients/marked-ingredients-context/MarkedIngredientsValue.tsx'
import type { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
	value: MarkedIngredientsValue
}

export function MarkedIngredientsProvider({ value, children }: Props) {
	return (
		<MarkedIngredientsContext.Provider value={value}>
			{children}
		</MarkedIngredientsContext.Provider>
	)
}
