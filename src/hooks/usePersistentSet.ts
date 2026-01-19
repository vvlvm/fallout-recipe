import { useEffect } from 'react'
import { useSet } from './useSet'

export function usePersistentSet<T>(key: string, initial?: Iterable<T>) {
	const { set, setAll, add, remove, toggle, has, clear } = useSet<T>(initial)

	// 初期読み込み
	useEffect(() => {
		const raw = localStorage.getItem(key)
		if (raw) {
			try {
				const parsed: T[] = JSON.parse(raw)
				setAll(parsed)
			} catch {
				// 壊れたデータは無視
			}
		}
	}, [key, setAll])

	// 変更時に保存
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(Array.from(set)))
	}, [key, set])

	return { set, setAll, add, remove, toggle, has, clear }
}
