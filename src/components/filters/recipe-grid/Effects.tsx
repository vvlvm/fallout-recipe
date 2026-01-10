import { AlignedTwoColumnGrid } from '@/components/aligned-two-column-grid/AlignedTwoColumnGrid.tsx'
import { AlignedTwoColumnGridItem } from '@/components/aligned-two-column-grid/AlignedTwoColumnGridItem.tsx'
import { EFFECT_LABEL_MAP } from '@/constants/EFFECT_LABELS'
import {
	isCarryWeightEffect,
	type Effect,
	type EffectMap,
} from '@/types/RecipieType'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import { IoIosTimer } from 'react-icons/io'
import { useQueriedEffectNames } from '../queried-effect-names-context/useQueriedIngredientNames'

interface Props {
	effects: EffectMap
}

export function Effects({ effects }: Props) {
	return (
		<AlignedTwoColumnGrid>
			{Object.values(effects).map((effect) => (
				<ListItem effect={effect} key={effect.effectName} />
			))}
		</AlignedTwoColumnGrid>
	)
}

interface TagProps {
	effect: Effect
}

function ListItem({ effect }: TagProps) {
	const { effectName } = effect
	const label = EFFECT_LABEL_MAP[effectName]
	const queriedEffectNames = useQueriedEffectNames()
	const isHighlighted = queriedEffectNames.some(
		(queried) => effectName === queried
	)
	const isSingleColumn =
		effectName === 'Caffeine' || effectName === 'CarryWeight'
	const hasOverTime = 'isOverTime' in effect && effect.isOverTime
	const hasAmount = 'amount' in effect
	const textColor = isHighlighted ? 'highlight' : undefined

	return (
		<AlignedTwoColumnGridItem singleColumn={isSingleColumn}>
			{isSingleColumn && (
				<Typography component='span' color={textColor}>
					{isCarryWeightEffect(effect) ? `${label}+${effect.amount}` : label}
				</Typography>
			)}

			{!isSingleColumn && (
				<>
					<Box>
						<Typography component='span' color={textColor} sx={{ mr: 2 }}>
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
		</AlignedTwoColumnGridItem>
	)
}
