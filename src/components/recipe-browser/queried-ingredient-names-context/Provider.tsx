import { type FC, type PropsWithChildren } from 'react'
import { QueriedIngredientNamesContext } from './Context'
import type { Value } from './Value'

interface ProviderProps extends PropsWithChildren {
	value: Value
}

export const QueriedIngredientNamesProvider: FC<ProviderProps> = ({
	value,
	children,
}) => {
	return (
		<QueriedIngredientNamesContext.Provider value={value}>
			{children}
		</QueriedIngredientNamesContext.Provider>
	)
}
