import { type FC, type PropsWithChildren } from 'react'
import { QueriedEffectNamesContext } from './Context'
import type { Value } from './Value'

interface ProviderProps extends PropsWithChildren {
	value: Value
}

export const QueriedEffectNamesProvider: FC<ProviderProps> = ({
	value,
	children,
}) => {
	return (
		<QueriedEffectNamesContext.Provider value={value}>
			{children}
		</QueriedEffectNamesContext.Provider>
	)
}
