import { useState, useCallback } from 'react'

export function useSet<T>(initial?: Iterable<T>) {
	const [set, setSet] = useState(() => new Set(initial))

	const add = useCallback((value: T) => {
		setSet((prev) => {
			const next = new Set(prev)
			next.add(value)
			return next
		})
	}, [])

	const remove = useCallback((value: T) => {
		setSet((prev) => {
			const next = new Set(prev)
			next.delete(value)
			return next
		})
	}, [])

	const toggle = useCallback((value: T) => {
		setSet((prev) => {
			const next = new Set(prev)
			if (next.has(value)) {
				next.delete(value)
			} else {
				next.add(value)
			}
			return next
		})
	}, [])

	const has = useCallback((value: T) => set.has(value), [set])

	const clear = useCallback(() => {
		setSet(() => new Set())
	}, [])

	const setAll = useCallback((values: Iterable<T>) => {
		setSet(new Set(values))
	}, [])

	return { set, setAll, add, remove, toggle, has, clear }
}
