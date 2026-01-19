import {
	FaStar as FilledStar,
	FaRegStar as OutlinedStar,
} from 'react-icons/fa6'
import type { IngredientName } from '@/nuka-mixer-recipe/RecipieType'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import { useMemo } from 'react'
import Typography from '@mui/material/Typography'

interface Props {
	markedIngredients: Set<IngredientName>
	tempMarkedIngredients: Set<IngredientName>
	toggleTemp: (value: IngredientName) => void
}

/**
 * tempMarkedIngredientsでこのタブを見てる間の★ボタンの点灯を管理する
 */
export function MarkedIngredients(props: Props) {
	const { markedIngredients, tempMarkedIngredients, toggleTemp } = props
	const markedIngredientsAsArray = useMemo(() => {
		return Array.from(markedIngredients)
	}, [markedIngredients])

	return (
		<List dense>
			{markedIngredientsAsArray.map((ingredientName) => {
				const isMarked = tempMarkedIngredients.has(ingredientName)

				return (
					<ListItem component={Paper} sx={{ mb: 1 }} key={ingredientName}>
						<Item
							ingredientName={ingredientName}
							tempIsMarked={isMarked}
							toggleTemp={toggleTemp}
						/>
					</ListItem>
				)
			})}
		</List>
	)
}

interface ItemProps {
	tempIsMarked: boolean
	toggleTemp: (value: IngredientName) => void
	ingredientName: IngredientName
}

function Item(props: ItemProps) {
	const { tempIsMarked, toggleTemp, ingredientName } = props
	const title =
		ingredientName + (tempIsMarked ? 'をマークから外す' : 'をマークする')

	return (
		<Button
			title={title}
			role={undefined}
			onClick={handleClick}
			variant='text'
			disableRipple
			sx={{
				'& .MuiButton-startIcon': {
					ml: 0,
					mr: 0.5,
				},
				'& .MuiButton-startIcon > *:first-of-type': {
					fontSize: '1em',
				},
			}}
			startIcon={<StarIcon isMarkedItem={tempIsMarked} />}
		>
			<Typography
				color='text.primary'
				sx={{
					position: 'relative',
					top: '1px',
				}}
			>
				{ingredientName}
			</Typography>
		</Button>
	)

	function handleClick() {
		toggleTemp(ingredientName)
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
