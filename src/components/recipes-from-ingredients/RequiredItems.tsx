import { type Recipe } from '@/nuka-mixer-recipe/RecipieType'
import Box from '@mui/material/Box'

export function RequiredItems({
	requiredItems,
}: {
	requiredItems: Recipe['requiredItems']
}) {
	return requiredItems.map((requiredItem) => {
		const { requiredItemName, amount } = requiredItem

		return (
			<Box>
				<Box>{requiredItemName}</Box>
				<Box>{amount}</Box>
			</Box>
		)
	})
}
