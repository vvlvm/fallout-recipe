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
	effectName: 'HP'
	amount: number
	isOverTime: boolean
}

export interface APEffect extends BaseEffect {
	effectName: 'AP'
	amount: number
	isOverTime: boolean
}

export interface WeightEffect extends BaseEffect {
	effectName: 'Weight'
	amount: number
}

export interface ValueEffect extends BaseEffect {
	effectName: 'Value'
	amount: number
}

export interface MaxHPEffect extends BaseEffect {
	effectName: 'MaxHP'
	amount: number
	isOverTime: boolean
}

export interface MaxAPEffect extends BaseEffect {
	effectName: 'MaxAP'
	amount: number
	isOverTime: boolean
}

export interface RadsEffect extends BaseEffect {
	effectName: 'Rads'
	amount: number
	isOverTime: boolean
}

export interface RadResistEffect extends BaseEffect {
	effectName: 'RadResist'
	amount: number
	isOverTime: boolean
}

export interface CarryWeightEffect extends BaseEffect {
	effectName: 'CarryWeight'
	amount: number
}

export function isCarryWeightEffect(
	effect: Effect,
): effect is CarryWeightEffect {
	return effect.effectName === 'CarryWeight'
}

export interface CaffeineEffect extends BaseEffect {
	effectName: 'Caffeine'
}

export interface STREffect extends BaseEffect {
	effectName: 'STR'
	amount: number
	isOverTime: boolean
}

export interface ENDEffect extends BaseEffect {
	effectName: 'END'
	amount: number
	isOverTime: boolean
}

export interface AGIEffect extends BaseEffect {
	effectName: 'AGI'
	amount: number
	isOverTime: boolean
}

export interface DMGResistEffect extends BaseEffect {
	effectName: EffectName
	amount: number
	isOverTime: boolean
}

export type EffectMap = {
	HP?: HPEffect
	AP?: APEffect
	Weight?: WeightEffect
	Value?: ValueEffect
	MaxHP?: MaxHPEffect
	MaxAP?: MaxAPEffect
	Rads?: RadsEffect
	RadResist?: RadResistEffect
	CarryWeight?: CarryWeightEffect
	Caffeine?: CaffeineEffect
	STR?: STREffect
	END?: ENDEffect
	AGI?: AGIEffect
	DMGResist?: DMGResistEffect
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
