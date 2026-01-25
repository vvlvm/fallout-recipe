export function isArrayEvery<T>(
	value: unknown,
	typeGuard: (item: unknown) => item is T,
): value is T[] {
	return Array.isArray(value) && value.every(typeGuard)
}
