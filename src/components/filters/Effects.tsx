import { EFFECT_LABELS } from '@/constants/EFFECT_LABELS'
import {
	isCarryWeightEffect,
	type Effect,
	type EffectMap,
	type EffectName,
} from '@/types/RecipieType'
import clsx from 'clsx'
import { IoIosTimer } from 'react-icons/io'

interface Props {
	effects: EffectMap
	selectedEffect: EffectName | ''
}

export function Effects({ effects, selectedEffect }: Props) {
	return (
		<div className='list-like-grid'>
			{Object.values(effects).map((effect) => (
				<ListItem
					effect={effect}
					selectedEffect={selectedEffect}
					key={effect.effectName}
				/>
			))}
		</div>
	)
}

interface TagProps {
	effect: Effect
	selectedEffect: EffectName | ''
}

function ListItem({ effect, selectedEffect }: TagProps) {
	const { effectName } = effect
	const label = EFFECT_LABELS[effectName]
	const isHighlighted = effectName === selectedEffect
	const isSingleColumn =
		effectName === 'Caffeine' || effectName === 'CarryWeight'
	const hasOverTime = 'isOverTime' in effect && effect.isOverTime
	const hasAmount = 'amount' in effect

	return (
		<div
			className={clsx(
				'item',
				isHighlighted && 'text-highlight font-bold',
				isSingleColumn && 'single-column'
			)}
			key={effectName}
		>
			{isSingleColumn && (
				<span
					className={clsx(
						'text-nowrap',
						isHighlighted && 'text-highlight font-bold'
					)}
				>
					{isCarryWeightEffect(effect) ? `${label}+${effect.amount}` : label}
				</span>
			)}

			{!isSingleColumn && (
				<>
					<span className='text-nowrap mr-8'>{label}</span>
					<span className='text-right'>
						{hasOverTime && (
							<IoIosTimer
								className={clsx(
									'effect-is-time-over text-gray-400',
									isHighlighted && 'text-highlight font-bold'
								)}
							/>
						)}
						{hasAmount && (
							<span
								className={clsx(isHighlighted && 'text-highlight font-bold')}
							>
								{effect.amount}
							</span>
						)}
					</span>
				</>
			)}
		</div>
	)
}
