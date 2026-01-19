import { EFFECT_NAMES } from '@/nuka-mixer-recipe/EFFECT_NAMES'
import type { ITEM_NAME } from '@/nuka-mixer-recipe/ITEM_NAMES'
import { INGREDIENT_NAMES } from '@/nuka-mixer-recipe/INGREDIENT_NAMES'
import type { EFFECT_LABELS } from '@/nuka-mixer-recipe/EFFECT_LABELS'

/* ItemNameと統合しないほうが
 * レシピで生成できないアイテムとして区別できてよさそう
 */
export type IngredientName = (typeof INGREDIENT_NAMES)[number]

export function isIngredientName(e: unknown): e is IngredientName {
	return INGREDIENT_NAMES.includes(e as IngredientName)
}

export type ItemName = (typeof ITEM_NAME)[number]

export type EffectName = (typeof EFFECT_NAMES)[number]

export type EffectLabel = (typeof EFFECT_LABELS)[number]

export function isEffectName(e: unknown): e is EffectName {
	return EFFECT_NAMES.includes(e as EffectName)
}

type BaseEffect = {
	effectName: EffectName
}

export type Effect =
	| HPEffect
	| APEffect
	| WeightEffect
	| ValueEffect
	| MaxHPEffect
	| MaxAPEffect
	| RadsEffect
	| RadResistEffect
	| CarryWeightEffect
	| CaffeineEffect
	| STREffect
	| ENDEffect
	| AGIEffect
	| DMGResistEffect

export interface HPEffect extends BaseEffect {
	effectName: 'hp'
	amount: number
	isOverTime: boolean
}

export interface APEffect extends BaseEffect {
	effectName: 'ap'
	amount: number
	isOverTime: boolean
}

export interface WeightEffect extends BaseEffect {
	effectName: 'weight'
	amount: number
}

export interface ValueEffect extends BaseEffect {
	effectName: 'value'
	amount: number
}

export interface MaxHPEffect extends BaseEffect {
	effectName: 'maxHp'
	amount: number
	isOverTime: boolean
}

export interface MaxAPEffect extends BaseEffect {
	effectName: 'maxAp'
	amount: number
	isOverTime: boolean
}

export interface RadsEffect extends BaseEffect {
	effectName: 'rads'
	amount: number
	isOverTime: boolean
}

export interface RadResistEffect extends BaseEffect {
	effectName: 'radResist'
	amount: number
	isOverTime: boolean
}

export interface CarryWeightEffect extends BaseEffect {
	effectName: 'carryWeight'
	amount: number
}

export function isCarryWeightEffect(
	effect: Effect,
): effect is CarryWeightEffect {
	return effect.effectName === 'carryWeight'
}

export interface CaffeineEffect extends BaseEffect {
	effectName: 'caffeine'
}

export interface STREffect extends BaseEffect {
	effectName: 'str'
	amount: number
	isOverTime: boolean
}

export interface ENDEffect extends BaseEffect {
	effectName: 'end'
	amount: number
	isOverTime: boolean
}

export interface AGIEffect extends BaseEffect {
	effectName: 'agi'
	amount: number
	isOverTime: boolean
}

export interface DMGResistEffect extends BaseEffect {
	effectName: EffectName
	amount: number
	isOverTime: boolean
}

export type EffectMap = {
	hp?: HPEffect
	ap?: APEffect
	weight?: WeightEffect
	value?: ValueEffect
	maxHp?: MaxHPEffect
	maxAp?: MaxAPEffect
	rads?: RadsEffect
	radResist?: RadResistEffect
	carryWeight?: CarryWeightEffect
	caffeine?: CaffeineEffect
	str?: STREffect
	end?: ENDEffect
	agi?: AGIEffect
	dmgResist?: DMGResistEffect
}

export type Recipe = {
	itemName: ItemName
	effects: EffectMap
	requiredItems: RequiredItem[]
}

export type RecipeMap = Partial<Record<ItemName, Recipe>>

export type RequiredItem = {
	requiredItemName: IngredientName
	amount: number
}
