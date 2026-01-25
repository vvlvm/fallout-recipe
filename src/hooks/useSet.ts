import { useCallback, useState } from 'react'

export function useSet<T>(initial: Iterable<T>) {
	const [values, setValues] = useState(() => new Set(initial))

	const add = useCallback((value: T) => {
		setValues((prev) => {
			const next = new Set(prev)
			next.add(value)
			return next
		})
	}, [])

	const remove = useCallback((value: T) => {
		setValues((prev) => {
			const next = new Set(prev)
			next.delete(value)
			return next
		})
	}, [])

	const toggle = useCallback((value: T) => {
		setValues((prev) => {
			const next = new Set(prev)
			if (next.has(value)) {
				next.delete(value)
			} else {
				next.add(value)
			}
			return next
		})
	}, [])

	const clear = useCallback(() => {
		setValues(() => new Set())
	}, [])

	const setAll = useCallback((values: Iterable<T>) => {
		setValues(() => new Set(values))
	}, [])

	return { values, setAll, add, remove, toggle, clear }
}
