import type { EffectLabel, EffectName } from '@/nuka-mixer-recipe/RecipieType'

export const EFFECT_LABELS = [
	'HP',
	'AP',
	'Weight',
	'Value',
	'最大HP',
	'最大AP',
	'Rads',
	'Rad Resist',
	'総重量',
	'カフェイン摂取',
	'STR',
	'END',
	'AGI',
	'DMG Resist',
] as const

export const EFFECT_LABEL_MAP: Record<EffectName, EffectLabel> = {
	hp: 'HP',
	ap: 'AP',
	weight: 'Weight',
	value: 'Value',
	maxHp: '最大HP',
	maxAp: '最大AP',
	rads: 'Rads',
	radResist: 'Rad Resist',
	carryWeight: '総重量',
	caffeine: 'カフェイン摂取',
	str: 'STR',
	end: 'END',
	agi: 'AGI',
	dmgResist: 'DMG Resist',
} as const
