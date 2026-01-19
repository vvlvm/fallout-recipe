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
	HP: 'HP',
	AP: 'AP',
	Weight: 'Weight',
	Value: 'Value',
	MaxHP: '最大HP',
	MaxAP: '最大AP',
	Rads: 'Rads',
	RadResist: 'Rad Resist',
	CarryWeight: '総重量',
	Caffeine: 'カフェイン摂取',
	STR: 'STR',
	END: 'END',
	AGI: 'AGI',
	DMGResist: 'DMG Resist',
} as const
