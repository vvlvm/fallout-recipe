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

export type Recipe = {
	itemName: ChemistryItemName
	effects: EffectMap
	requiredItems: RequiredItem[]
}

export type RequiredItem = {
	requiredItemName: ChemistryIngredientName
	amount: number
}

export type EffectMap = {
	hp?: HPEffect
}

type BaseEffect = {
	effectName: EffectName
}

export type Effect = HPEffect

export interface HPEffect extends BaseEffect {
	effectName: 'hp'
	amount: number
	isOverTime: boolean
}

export const EFFECT_NAMES = [
	'hp',
	'ap',
	'weight',
	'value',
	'maxHp',
	'maxAp',
	'rads',
	'radResist',
	'carryWeight',
	'caffeine',
	'str',
	'end',
	'agi',
	'dmgResist',
] as const

export type EffectName = (typeof EFFECT_NAMES)[number]
