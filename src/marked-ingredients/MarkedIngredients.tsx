import { useMarkedIngredients } from '@/marked-ingredients/marked-ingredients-context/useMarkedIngredients'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Paper from '@mui/material/Paper'

export function MarkedIngredients() {
	const markedIngredients = useMarkedIngredients()

	return (
		<List dense>
			{Array.from(markedIngredients).map((e) => (
				<ListItem component={Paper} sx={{ mb: 1 }} key={e}>
					{e}
				</ListItem>
			))}
		</List>
	)
}
