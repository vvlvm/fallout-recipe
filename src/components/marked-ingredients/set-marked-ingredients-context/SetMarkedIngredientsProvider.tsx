import { SetMarkedIngredientsContext } from '@/marked-ingredients/set-marked-ingredients-context/SetMarkedIngredientsContext'
import type { SetMarkedIngredientsValue } from '@/marked-ingredients/set-marked-ingredients-context/SetMarkedIngredientsValue.tsx'
import { type FC, type PropsWithChildren } from 'react'

interface ProviderProps extends PropsWithChildren {
	value: SetMarkedIngredientsValue
}

export const SetMarkedIngredientsProvider: FC<ProviderProps> = ({
	value,
	children,
}) => {
	return (
		<SetMarkedIngredientsContext.Provider value={value}>
			{children}
		</SetMarkedIngredientsContext.Provider>
	)
}
