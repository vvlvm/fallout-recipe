import type { EffectName } from '../types/RecipieType'

export const EFFECT_LABELS: Record<EffectName, string> = {
	HP: 'HP',
	AP: 'AP',
	Weight: 'Weight',
	Value: 'Value',
	MaxHP: '最大HP',
	MaxAP: '最大AP',
	Rads: 'Rads',
	RadResist: 'Rad Resist',
	CarryWeight: '総重量',
	Caffeine: 'カフェイン接種',
	STR: 'STR',
	END: 'END',
	AGI: 'AGI',
	DMGResist: 'DMG Resist',
} as const
