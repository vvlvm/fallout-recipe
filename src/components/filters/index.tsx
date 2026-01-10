import { ITEM_NAME } from '@/constants/ITEM_NAMES.ts'
import { RECIPE_LIST } from '@/constants/RECIPE_LIST.ts'
import {
	type EffectName,
	type IngredientName,
	type Recipe,
} from '@/types/RecipieType.ts'
import {
	effectNameQueryMatchFilter,
	ingredientNameQueryMatchFilter,
} from '@/utils/queryMatchFilter.tsx'
import { filterRecipes } from '@/utils/recipeFilter.ts'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { memo, useState } from 'react'
import { EffectNameQueryAutoComplete } from './EffectNameQueryAutoComplete.tsx'
import { IngredientQueryAutoComplete } from './IngredientQueryAutoComplete.tsx'
import { QueriedEffectNamesProvider } from './queried-effect-names-context/Provider.tsx'
import { QueriedIngredientNamesProvider } from './queried-ingredient-names-context/Provider.tsx'
import { RecipeGrid } from './recipe-grid/RecipeGrid.tsx'

export const Filters = memo(function Filters() {
	const [itemNameSearchTerm, setItemNameSearchTerm] = useState('')
	const [effectNameQuery, setEffectNameQuery] = useState<string>('')
	const [ingredientQuery, setIngredientQuery] = useState<string>('')

	// フィルタリングロジック
	const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(RECIPE_LIST)

	// 検索された必要素材をハイライトする
	const [queriedIngredientNames, setQueriedIngredientNames] = useState<
		IngredientName[]
	>([])
	const [queriedEffectNames, setQueriedEffectNames] = useState<EffectName[]>([])

	function handleSearchSubmit() {
		setFilteredRecipes(
			filterRecipes({
				ingredientQuery: ingredientQuery,
				itemNameSearchTerm: itemNameSearchTerm,
				effectNameQuery: effectNameQuery,
			})
		)
		setQueriedIngredientNames(ingredientNameQueryMatchFilter(ingredientQuery))
		// HPで検索すると最大HPにもヒットするので
		setQueriedEffectNames(effectNameQueryMatchFilter(effectNameQuery))
	}

	return (
		<>
			<Paper component='section' sx={{ p: 1 }}>
				<Typography variant='h2' sx={{ fontSize: '1.5rem', mb: 2 }}>
					検索フォーム
				</Typography>
				<Grid container spacing={4}>
					<Grid size={{ xs: 12, md: 6 }}>
						<FormControl fullWidth>
							<FormLabel component='legend'>アイテム名でフィルター</FormLabel>
							<Autocomplete
								options={ITEM_NAME}
								onInputChange={handleItemNameSearchTermChange}
								inputValue={itemNameSearchTerm}
								renderInput={(params) => (
									<TextField {...params} placeholder='アイテム名を入力...' />
								)}
							/>
						</FormControl>
					</Grid>

					<Grid size={{ xs: 12, md: 6 }}>
						<FormControl fullWidth>
							<FormLabel component='legend'>必要素材(検索クエリ)</FormLabel>
							<IngredientQueryAutoComplete
								inputValue={ingredientQuery}
								setInputValue={setIngredientQuery}
							/>
						</FormControl>
					</Grid>

					<Grid size={{ xs: 12, md: 6 }}>
						<FormControl fullWidth>
							<FormLabel component='legend'>効果名でフィルター</FormLabel>
							<EffectNameQueryAutoComplete
								inputValue={effectNameQuery}
								setInputValue={setEffectNameQuery}
							/>
						</FormControl>
					</Grid>
				</Grid>
			</Paper>

			<Button variant='contained' onClick={handleSearchSubmit}>
				検索
			</Button>

			<Divider sx={{ my: 4 }} />

			<Typography variant='body1' sx={{ my: 2 }}>
				ヒット数: {filteredRecipes.length} 件
			</Typography>

			<QueriedIngredientNamesProvider value={queriedIngredientNames}>
				<QueriedEffectNamesProvider value={queriedEffectNames}>
					<RecipeGrid filteredRecipes={filteredRecipes} />
				</QueriedEffectNamesProvider>
			</QueriedIngredientNamesProvider>
		</>
	)

	function handleItemNameSearchTermChange(_: unknown, newValue: string) {
		setItemNameSearchTerm(newValue)
	}
})
