import { useEffect, useState } from 'react'

export function usePersistentState<T>(
	key: string,
	initial: T,
	isValid: (data: unknown) => data is T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
	const [value, setValue] = useState<T>(() => {
		const raw = localStorage.getItem(key)
		if (raw !== null) {
			try {
				const parsed = JSON.parse(raw)
				if (isValid(parsed)) {
					return parsed
				} else {
					console.error(
						`[usePersistentState] Invalid data for key "${key}"`,
						parsed,
					)
				}
			} catch (error) {
				console.error(
					`[usePersistentState] Failed to parse JSON for key "${key}".`,
					{ raw, error },
				)
			}
		}
		return initial
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue] as const
}
