export const COOKING_INGREDIENT_NAMES = [
	'イグアナの肉',
	'モールラットの肉',
	'ラッドスタッグの肉',
	'マイアラークの肉',
	'マイアラークの卵',
	'デスクローの肉',
	'ヤオ・グアイの肉',
	'ラッドローチの肉',
	'ラッドスコルピオンの肉',
	'マットフルーツ',
	'テイト',
	'汚れた水',
	'きれいな水',
] as const

export type CookingIngredientName = (typeof COOKING_INGREDIENT_NAMES)[number]

export const COOKING_ITEM_NAMES = [
	'イグアナの串焼き',
	'モールラットの焼き肉',
	'ラッドスタッグのステーキ',
	'マイアラークのケーキ',
	'デスクロー・ステーキ',
	'ヤオ・グアイのロースト',
	'ラッドローチのグリル',
	'ラッドスコルピオンの焼き肉',
	'ベジタブルスープ',
	'マットフルーツ・ジュース',
] as const

export type CookingItemName = (typeof COOKING_ITEM_NAMES)[number]

export type CookingRecipe = Recipe

export type CookingRecipeMap = Partial<Record<CookingItemName, CookingRecipe>>

// 空の雛形
export const COOKING_RECIPE_MAP: CookingRecipeMap = {}

export type Recipe = {
	itemName: CookingIngredientName
	effects: EffectMap
	requiredItems: RequiredItem[]
}

export type RequiredItem = {
	requiredItemName: CookingIngredientName
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
