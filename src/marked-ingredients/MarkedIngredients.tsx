import { useMarkedIngredients } from '@/marked-ingredients/marked-ingredients-context/useMarkedIngredients'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

export function MarkedIngredients() {
	const markedIngredients = useMarkedIngredients()

	return (
		<List>
			{markedIngredients.map((e) => (
				<ListItem key={e}>{e}</ListItem>
			))}
		</List>
	)
}
