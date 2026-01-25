import { EFFECT_LABEL_MAP } from '@/nuka-mixer-recipe/EFFECT_LABELS'
import { EFFECT_NAMES } from '@/nuka-mixer-recipe/EFFECT_NAMES'
import {
	isAmountEffect,
	isAmountWithOverTimeEffect,
	isEffect,
	type Recipe,
} from '@/nuka-mixer-recipe/RecipieType'
import Box from '@mui/material/Box'

export function Effects({ effects }: { effects: Recipe['effects'] }) {
	return EFFECT_NAMES.map((effectName) => {
		const effect = effects[effectName]
		if (!effect?.effectName) return

		const effectLabel = EFFECT_LABEL_MAP[effectName]

		if (effect.effectName === 'carryWeight') {
			return (
				<Box>
					{effectLabel}+{effect.amount}
				</Box>
			)
		}
		if (isAmountWithOverTimeEffect(effect)) {
			const { amount, isOverTime } = effect
			return (
				<Box>
					{effectLabel},{amount},{isOverTime}
				</Box>
			)
		} else if (isAmountEffect(effect)) {
			return (
				<Box>
					{effectLabel},{effect.amount}
				</Box>
			)
		} else if (isEffect(effect)) {
			return <Box>{}</Box>
		} else {
			return <Box>error: {JSON.parse(effect)}</Box>
		}
	})
}
