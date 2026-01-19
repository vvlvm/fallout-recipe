import { AlignedTwoColumnGrid } from '@/components/aligned-two-column-grid/AlignedTwoColumnGrid'
import { AlignedTwoColumnGridItem } from '@/components/aligned-two-column-grid/AlignedTwoColumnGridItem'
import { useMarkedIngredients } from '@/components/marked-ingredients/marked-ingredients-context/useMarkedIngredients'
import { useToggleMarkedIngredient } from '@/components/marked-ingredients/toggle-marked-ingredient/useToggleMarkedIngredient'
import type {
	IngredientName,
	RequiredItem,
} from '@/nuka-mixer-recipe/RecipieType'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { startTransition, useCallback, useMemo, useOptimistic } from 'react'
import {
	FaStar as FilledStar,
	FaRegStar as OutlinedStar,
} from 'react-icons/fa6'
import { useQueriedIngredientNames } from '../queried-ingredient-names-context/useQueriedIngredientNames'

interface Props {
	requiredItems: RequiredItem[]
}

export function RequiredItems(props: Props) {
	const { requiredItems } = props
	const markedIngredients = useMarkedIngredients()
	const toggleMarked = useToggleMarkedIngredient()
	const memoizedToggleMarked = useCallback(
		(name: IngredientName) => toggleMarked(name),
		[toggleMarked],
	)
	const queriedIngredientNames = useQueriedIngredientNames()

	return (
		<AlignedTwoColumnGrid>
			{requiredItems.map((item) => {
				const isMarked = markedIngredients.has(item.requiredItemName)
				const isHighlighted = queriedIngredientNames.has(item.requiredItemName)

				return (
					<RequiredItem
						item={item}
						isMarked={isMarked}
						key={item.requiredItemName}
						toggleMarked={memoizedToggleMarked}
						isHighlighted={isHighlighted}
					/>
				)
			})}
		</AlignedTwoColumnGrid>
	)
}

interface ItemProps {
	item: RequiredItem
	isMarked: boolean
	toggleMarked: (name: IngredientName) => void
	isHighlighted: boolean
}

function RequiredItem(props: ItemProps) {
	const { item, isMarked, toggleMarked, isHighlighted } = props
	const { requiredItemName, amount } = item
	const textColor = isHighlighted ? 'highlight' : 'text.primary' //text.primaryにしないとButtonのprimary色を継承しちゃう
	const [optimisticMarked, addOptimistic] = useOptimistic<boolean>(isMarked)
	const title = useMemo(() => {
		return requiredItemName + (isMarked ? 'をマークから外す' : 'をマークする')
	}, [isMarked, requiredItemName])

	return (
		<AlignedTwoColumnGridItem>
			<Stack direction='row' alignItems='center'>
				<Button
					title={title}
					onClick={handleToggle}
					variant='text'
					role={undefined}
					startIcon={<StarIcon isMarkedItem={optimisticMarked} />}
					disableRipple
					sx={{
						p: 0,
						mr: 1,
						'& .MuiButton-startIcon': {
							ml: 0,
							mr: 0.5,
						},
						'& .MuiButton-startIcon > *:first-of-type': {
							fontSize: '1em',
						},
					}}
				>
					<Typography sx={{ whiteSpace: 'nowrap' }} color={textColor}>
						{item.requiredItemName}
					</Typography>
				</Button>
			</Stack>
			<Typography color={textColor}>x{amount}</Typography>
		</AlignedTwoColumnGridItem>
	)

	function handleToggle() {
		startTransition(() => {
			addOptimistic(!optimisticMarked)
			toggleMarked(requiredItemName)
		})
	}
}

interface StarIconProps {
	isMarkedItem: boolean
}

function StarIcon({ isMarkedItem }: StarIconProps) {
	const { palette } = useTheme()
	const iconProps = {
		fill: palette.text.secondary,
		stroke: palette.text.secondary,
		// fontSize, width, heightは親Buttonで調整
	}
	return isMarkedItem ? (
		<FilledStar {...iconProps} />
	) : (
		<OutlinedStar {...iconProps} />
	)
}
