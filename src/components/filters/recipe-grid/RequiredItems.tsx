import { AlignedTwoColumnGrid } from '@/components/aligned-two-column-grid/AlignedTwoColumnGrid'
import { AlignedTwoColumnGridItem } from '@/components/aligned-two-column-grid/AlignedTwoColumnGridItem'
import type { RequiredItem } from '@/types/RecipieType'
import Typography from '@mui/material/Typography'
import { useQueriedIngredientNames } from '../queried-ingredient-names-context/useQueriedIngredientNames'

interface Props {
	requiredItems: RequiredItem[]
}

export function RequiredItems(props: Props) {
	const { requiredItems } = props

	return (
		<AlignedTwoColumnGrid>
			{requiredItems.map((item) => (
				<RequiredItem item={item} key={item.requiredItemName} />
			))}
		</AlignedTwoColumnGrid>
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
		<AlignedTwoColumnGridItem>
			<Typography sx={{ whiteSpace: 'nowrap', mr: 1 }} color={textColor}>
				{item.requiredItemName}
			</Typography>
			<Typography color={textColor}>x{amount}</Typography>
		</AlignedTwoColumnGridItem>
	)
}
