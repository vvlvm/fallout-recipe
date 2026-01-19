// ===============================
// Chemistry Station Types
// ===============================

export const CHEMISTRY_INGREDIENT_NAMES = [
	'アブラクシオ・クリーナー',
	'酸',
	'アルミニウム',
	'核物質',
	'オイル',
	'布',
	'薬品ベース',
] as const

export type ChemistryIngredientName =
	(typeof CHEMISTRY_INGREDIENT_NAMES)[number]

export const CHEMISTRY_ITEM_NAMES = [
	'スティムパック',
	'ラドアウェイ',
	'メンタス',
	'バフアウト',
	'サイコ',
	'ジェット',
] as const

export type ChemistryItemName = (typeof CHEMISTRY_ITEM_NAMES)[number]

export type ChemistryRecipe = Recipe

export type ChemistryRecipeMap = Partial<
	Record<ChemistryItemName, ChemistryRecipe>
>

// 空の雛形
export const CHEMISTRY_RECIPE_MAP: ChemistryRecipeMap = {}
