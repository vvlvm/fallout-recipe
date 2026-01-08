import type { RequiredItem } from '@/types/RecipieType'
import clsx from 'clsx'
import { useQueriedIngredientNames } from '../queried-ingredient-names-context/useQueriedIngredientNames'
import Typography from '@mui/material/Typography'

interface Props {
	requiredItems: RequiredItem[]
}

export function RequiredItems(props: Props) {
	const { requiredItems } = props

	return (
		<div className='list-like-grid'>
			{requiredItems.map((item) => (
				<RequiredItem item={item} key={item.requiredItemName} />
			))}
		</div>
	)
}

interface ItemProps {
	item: RequiredItem
}

function RequiredItem(props: ItemProps) {
	const { item } = props
	const { requiredItemName, amount } = item
	const queriedIngredientNames = useQueriedIngredientNames()
	const isHighlighted = queriedIngredientNames.some(
		(e) => e === requiredItemName
	)
	const textColor = isHighlighted ? 'highlight' : undefined

	return (
		<div className='item'>
			<Typography color={textColor} className={clsx('item-name')}>
				{item.requiredItemName}
			</Typography>
			<Typography color={textColor}>x{amount}</Typography>
		</div>
	)
}
