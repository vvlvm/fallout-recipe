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
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { memo, useState } from 'react'
import { EffectNameQueryAutoComplete } from './EffectNameQueryAutoComplete.tsx'
import { IngredientQueryAutoComplete } from './IngredientQueryAutoComplete.tsx'
import { QueriedEffectNamesProvider } from './queried-effect-names-context/Provider.tsx'
import { QueriedIngredientNamesProvider } from './queried-ingredient-names-context/Provider.tsx'
import { RecipeGrid } from './recipe-grid/RecipeGrid.tsx'
import Box from '@mui/material/Box'

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
			<Paper component='section' sx={{ p: 2 }}>
				<Typography variant='h2' sx={{ fontSize: '1.5rem', mb: 2 }}>
					検索フォーム
				</Typography>
				<Stack spacing={3}>
					<FormControl fullWidth>
						<FormLabel component='legend'>アイテム名でフィルター</FormLabel>
						<Autocomplete
							options={ITEM_NAME}
							onInputChange={handleItemNameSearchTermChange}
							inputValue={itemNameSearchTerm}
							renderInput={(params) => (
								<TextField {...params} placeholder='アイテム名を入力...' />
							)}
							sx={{ m: 1 }}
						/>
					</FormControl>

					<FormControl fullWidth>
						<FormLabel component='legend'>必要素材(検索クエリ)</FormLabel>
						<Box sx={{ m: 1 }}>
							<IngredientQueryAutoComplete
								inputValue={ingredientQuery}
								setInputValue={setIngredientQuery}
							/>
						</Box>
					</FormControl>

					<FormControl fullWidth>
						<FormLabel component='legend'>効果名でフィルター</FormLabel>
						<Box sx={{ m: 1 }}>
							<EffectNameQueryAutoComplete
								inputValue={effectNameQuery}
								setInputValue={setEffectNameQuery}
							/>
						</Box>
					</FormControl>
				</Stack>

				<Button variant='contained' onClick={handleSearchSubmit} sx={{ mt: 2 }}>
					検索
				</Button>
			</Paper>

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
