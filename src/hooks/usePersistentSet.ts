import { isArrayEvery } from '@/utils/isArrayEvery'
import { useEffect } from 'react'
import { useSet } from './useSet'

export function usePersistentSet<T>(
	key: string,
	initial: Iterable<T>,
	isValid: (value: unknown) => value is T,
) {
	const { values, setAll, add, remove, toggle, clear } = useSet<T>(initial)

	// 初期読み込み
	useEffect(() => {
		const raw = localStorage.getItem(key)
		if (raw) {
			try {
				const parsed = JSON.parse(raw)

				if (isArrayEvery(parsed, isValid)) {
					setAll(parsed)
				} else {
					console.error(
						`[usePersistentSet] Invalid data for key "${key}".`,
						parsed,
					)
				}
			} catch (error) {
				console.error(
					`[usePersistentSet] Failed to parse JSON for key "${key}".`,
					{ raw, error },
				)
			}
		}
	}, [key, setAll, isValid])

	// 変更時に保存
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(Array.from(values)))
	}, [key, values])

	return { values, setAll, add, remove, toggle, clear }
}
