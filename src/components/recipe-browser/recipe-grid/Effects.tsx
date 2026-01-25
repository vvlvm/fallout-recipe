import { AlignedTwoColumnGrid } from '@/components/aligned-two-column-grid/AlignedTwoColumnGrid.tsx'
import { AlignedTwoColumnGridItem } from '@/components/aligned-two-column-grid/AlignedTwoColumnGridItem.tsx'
import { EFFECT_LABEL_MAP } from '@/nuka-mixer-recipe/EFFECT_LABELS'
import { type Effect, type EffectMap } from '@/nuka-mixer-recipe/RecipieType'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import { IoIosTimer } from 'react-icons/io'
import { useQueriedEffectNames } from '../queried-effect-names-context/useQueriedEffectNames'

interface Props {
	effects: EffectMap
}

export function Effects({ effects }: Props) {
	const queriedEffectNames = useQueriedEffectNames()

	return (
		<AlignedTwoColumnGrid>
			{Object.values(effects).map((effect) => {
				const isHighlighted = queriedEffectNames.has(effect.effectName)

				return (
					<ListItem
						effect={effect}
						isHighlighted={isHighlighted}
						key={effect.effectName}
					/>
				)
			})}
		</AlignedTwoColumnGrid>
	)
}

interface TagProps {
	effect: Effect
	isHighlighted: boolean
}

function ListItem({ effect, isHighlighted }: TagProps) {
	const { effectName } = effect
	const label = EFFECT_LABEL_MAP[effectName]
	const isSingleColumn =
		effectName === 'caffeine' || effectName === 'carryWeight'
	const hasOverTime = 'isOverTime' in effect && effect.isOverTime
	const hasAmount = 'amount' in effect
	const textColor = isHighlighted ? 'highlight' : undefined

	return (
		<AlignedTwoColumnGridItem singleColumn={isSingleColumn}>
			{isSingleColumn && (
				<Typography component='span' color={textColor}>
					{effect.effectName === 'carryWeight'
						? `${label}+${effect.amount}`
						: label}
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
