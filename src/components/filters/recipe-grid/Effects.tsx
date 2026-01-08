import { EFFECT_LABELS } from '@/constants/EFFECT_LABELS'
import {
	isCarryWeightEffect,
	type Effect,
	type EffectMap,
	type EffectName,
} from '@/types/RecipieType'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
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
	const textColor = isHighlighted ? 'highlight' : undefined

	return (
		<Box
			className={clsx('item', isSingleColumn && 'single-column')}
			key={effectName}
		>
			{isSingleColumn && (
				<Typography
					component='span'
					color={textColor}
					className={clsx('item-name')}
				>
					{isCarryWeightEffect(effect) ? `${label}+${effect.amount}` : label}
				</Typography>
			)}

			{!isSingleColumn && (
				<>
					<Box>
						<Typography
							component='span'
							color={textColor}
							className={clsx('item-name')}
						>
							{label}
						</Typography>
					</Box>
					<Box sx={{ textAlign: 'right' }}>
						{hasOverTime && (
							<SvgIcon
								color={textColor}
								component={IoIosTimer}
								inheritViewBox
								sx={{
									position: 'relative',
									top: '2px',
									marginRight: '2px',
									strokeWidth: '10px',
									fontSize: '1em',
								}}
							/>
						)}
						{hasAmount && (
							<Typography
								component='span'
								color={textColor}
								sx={{ justifySelf: 'right' }}
							>
								{effect.amount}
							</Typography>
						)}
					</Box>
				</>
			)}
		</Box>
	)
}
