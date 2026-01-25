import { IngredientQueryAutoComplete } from '@/components/IngredientQueryAutoComplete'
import { useMarkedIngredients } from '@/components/marked-ingredients/marked-ingredients-context/useMarkedIngredients'
import { Recipes } from '@/components/recipes-from-ingredients/Recipes'
import { usePersistentState } from '@/hooks/usePersistentState'
import { INGREDIENT_NAMES } from '@/nuka-mixer-recipe/INGREDIENT_NAMES'
import { RECIPE_COUNT_BY_INGREDIENT } from '@/nuka-mixer-recipe/RECIPE_COUNT_BY_INGREDIENT'
import { RECIPES_FROM_INGREDIENTS } from '@/nuka-mixer-recipe/RECIPES_FROM_INGREDIENTS'
import type { IngredientName } from '@/nuka-mixer-recipe/RecipieType'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useMemo, useState } from 'react'

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
	const [filterByMarkedIngredients, setFilterByMarkedIngredients] =
		usePersistentState<boolean>(
			'RecipesFromIngredients-filterByMarkedIngredients',
			false,
		)
	const [ingredientQuery, setIngredientQuery] = usePersistentState(
		'RecipesFromIngredients-ingredientQuery',
		'',
	)

	const [filteredIngredients, setFilteredIngredients] = useState<
		IngredientName[]
	>([...INGREDIENT_NAMES])

	const matchedRecipeCount = useMemo(
		() =>
			filteredIngredients.reduce(
				(sum, ingredient) =>
					sum + (RECIPE_COUNT_BY_INGREDIENT.get(ingredient) ?? 0),
				0,
			),
		[filteredIngredients],
	)

	function handleSearchSubmit() {
		setFilteredIngredients(
			filterByMarkedIngredients
				? Array.from(markedIngredients)
				: [...INGREDIENT_NAMES],
		)
	}

	return (
		<Paper component='section' sx={{ p: 2, px: { xs: 0.5, sm: 2 } }}>
			<Typography variant='h2' sx={{ fontSize: '1.5rem', mb: 2 }}>
				検索フォーム
			</Typography>

			<Stack spacing={3}>
				<FormControl fullWidth>
					<FormLabel component='legend'>マークした材料のみ表示する</FormLabel>
					<FormControlLabel
						control={
							<Checkbox
								checked={filterByMarkedIngredients}
								onChange={handleFilterByMarkedIngredients}
							/>
						}
						label={`マークした材料のみ表示する (${markedIngredients.size}件)`}
						sx={{ my: 0, ml: 0 }}
					/>
				</FormControl>
				<FormControl fullWidth>
					<FormLabel component='legend'>素材名で検索</FormLabel>
					<Box sx={{ m: 1 }}>
						<IngredientQueryAutoComplete
							inputValue={ingredientQuery}
							setInputValue={setIngredientQuery}
						/>
					</Box>
				</FormControl>
			</Stack>

			<Button
				variant='contained'
				onClick={handleSearchSubmit}
				sx={{ mt: 2, ml: { xs: 2, sm: 0 } }}
			>
				検索
			</Button>

			<Divider sx={{ my: 4 }} />

			<Typography variant='body1' sx={{ my: 1 }}>
				ヒットした材料数: {filteredIngredients.length} 件
			</Typography>
			<Typography variant='body1' sx={{ my: 1, mb: 4 }}>
				ヒットしたレシピ数: {matchedRecipeCount} 件
			</Typography>

			{filteredIngredients.map((ingredientName) => (
				<Accordion
					slotProps={{ heading: { component: 'h3' } }}
					key={ingredientName}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls={`${ingredientName}-content`}
						id={`${ingredientName}-header`}
					>
						<Typography variant='body1'>{ingredientName}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Recipes recipes={RECIPES_FROM_INGREDIENTS[ingredientName]} />
					</AccordionDetails>
				</Accordion>
			))}
		</Paper>
	)

	function handleFilterByMarkedIngredients(_: unknown, checked: boolean) {
		setFilterByMarkedIngredients(checked)
	}
}
