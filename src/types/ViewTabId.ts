export type ViewTabId =
	| 'recipeBrowser'
	| 'unmakeableIngredients'
	| 'markedIngredients'
	| 'recipesFromIngredients'

const VIEW_TAB_ID: Readonly<ViewTabId>[] = [
	'recipeBrowser',
	'markedIngredients',
	'unmakeableIngredients',
	'recipesFromIngredients',
] as const

export function isViewTabId(e: unknown): e is ViewTabId {
	return VIEW_TAB_ID.includes(e as ViewTabId)
}
