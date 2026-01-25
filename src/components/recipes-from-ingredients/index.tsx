import { useMarkedIngredients } from '@/components/marked-ingredients/marked-ingredients-context/useMarkedIngredients'
import { Recipes } from '@/components/recipes-from-ingredients/Recipes'
import { usePersistentState } from '@/hooks/usePersistentState'
import { INGREDIENT_NAMES } from '@/nuka-mixer-recipe/INGREDIENT_NAMES'
import { RECIPES_FROM_INGREDIENTS } from '@/nuka-mixer-recipe/RECIPES_FROM_INGREDIENTS'
import type { IngredientName } from '@/nuka-mixer-recipe/RecipieType'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import { useMemo } from 'react'

/**
 *   <Autocomplete multiple ... />   // 材料入力
  <ToggleButtonGroup ... />       // AND/OR 切り替え
  <Slider ... />                  // 調理時間フィルタ
  <Button variant="contained">検索</Button>

  <Grid container spacing={2}>
    <RecipeCard ... />            // 結果表示
  </Grid>

 */

export function RecipesFromIngredients() {
	const markedIngredients = useMarkedIngredients()
	const filterByMarkedIngredients = usePersistentState<boolean>(
		'RecipesFromIngredients-filterByMarkedIngredients',
		false,
	)
	const [ingredientQuery, setIngredientQuery] = usePersistentState(
		'RecipesFromIngredients-ingredientQuery',
		'',
	)
	const filteredIngredients = useMemo<IngredientName[]>(() => {
		if (filterByMarkedIngredients) {
			return Array.from(markedIngredients)
		} else {
			return [...INGREDIENT_NAMES]
		}
	}, [filterByMarkedIngredients, markedIngredients])

	return (
		<>
			<FormControlLabel control={<Checkbox defaultChecked />} label='Label' />

			{filteredIngredients.map((ingredientName) => (
				<Box>
					<Typography variant='h2'>{ingredientName}</Typography>
					<Recipes recipes={RECIPES_FROM_INGREDIENTS[ingredientName]} />
				</Box>
			))}
		</>
	)
}
