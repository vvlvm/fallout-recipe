import { ITEM_NAME } from '@/nuka-mixer-recipe/ITEM_NAMES.ts'
import { RECIPE_LIST } from '@/nuka-mixer-recipe/RECIPE_LIST.ts'
import { usePersistentSet } from '@/hooks/usePersistentSet.ts'
import {
	type EffectName,
	type IngredientName,
	type Recipe,
} from '@/nuka-mixer-recipe/RecipieType'
import {
	effectNameQueryMatchFilter,
	ingredientNameQueryMatchFilter,
} from '@/utils/queryMatchFilter.tsx'
import { filterRecipes } from '@/utils/recipeFilter.ts'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
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
import { IngredientQueryAutoComplete } from '@/components/IngredientQueryAutoComplete.tsx'
import { QueriedEffectNamesProvider } from './queried-effect-names-context/Provider.tsx'
import { QueriedIngredientNamesProvider } from './queried-ingredient-names-context/Provider.tsx'
import { RecipeGrid } from '@/components/recipe-grid/RecipeGrid.tsx'
import { usePersistentState } from '@/hooks/usePersistentState.ts'
import NumberField from '@/components/mui/NumberField'

export const RecipeBrowser = memo(function RecipeBrowser() {
	const [itemNameSearchTerm, setItemNameSearchTerm] = usePersistentState(
		'RecipeBrowser-itemNameSearchTerm',
		'',
	)
	const [effectNameQuery, setEffectNameQuery] = usePersistentState(
		'RecipeBrowser-effectNameQuery',
		'',
	)
	const [ingredientQuery, setIngredientQuery] = usePersistentState(
		'RecipeBrowser-ingredientQuery',
		'',
	)

	// フィルタリングロジック
	const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(RECIPE_LIST)

	// 検索された必要素材をハイライトする
	const { set: queriedIngredientNames, setAll: setQueriedIngredientNames } =
		usePersistentSet<IngredientName>('RecipeBrowser-queriedIngredientNames')

	// 検索されたエフェクトをハイライトする
	const { set: queriedEffectNames, setAll: setQueriedEffectNames } =
		usePersistentSet<EffectName>('RecipeBrowser-queriedEffectNames')

	const [gridItemWidth, setGridItemWidth] = usePersistentState<number>(
		'gridItemWidth',
		290,
	)

	function handleSearchSubmit() {
		setFilteredRecipes(
			filterRecipes({
				ingredientQuery: ingredientQuery,
				itemNameSearchTerm: itemNameSearchTerm,
				effectNameQuery: effectNameQuery,
			}),
		)
		setQueriedIngredientNames(ingredientNameQueryMatchFilter(ingredientQuery))
		// HPで検索すると最大HPにもヒットするので
		setQueriedEffectNames(effectNameQueryMatchFilter(effectNameQuery))
	}

	return (
		<>
			<Paper component='section' sx={{ p: 2, px: { xs: 0.5, sm: 2 } }}>
				<Typography variant='h2' sx={{ fontSize: '1.5rem', mb: 2 }}>
					検索フォーム
				</Typography>
				<Stack spacing={3}>
					<FormControl fullWidth>
						<FormLabel component='legend'>アイテム名でフィルター</FormLabel>
						<Autocomplete
							freeSolo
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

				<Button
					variant='contained'
					onClick={handleSearchSubmit}
					sx={{ mt: 2, ml: { xs: 2, sm: 0 } }}
				>
					検索
				</Button>
			</Paper>

			<Divider sx={{ my: 4 }} />

			<Stack direction='row' alignItems='center' gap={3} sx={{ my: 2 }}>
				<Typography variant='body1'>
					ヒット数: {filteredRecipes.length} 件
				</Typography>

				<NumberField
					size='small'
					step={10}
					value={gridItemWidth}
					onValueChange={handleGridItemWidthChanged}
					label='レシピの幅を調整する'
				/>
			</Stack>

			<QueriedIngredientNamesProvider value={queriedIngredientNames}>
				<QueriedEffectNamesProvider value={queriedEffectNames}>
					<RecipeGrid recipes={filteredRecipes} itemWidth={gridItemWidth} />
				</QueriedEffectNamesProvider>
			</QueriedIngredientNamesProvider>
		</>
	)

	function handleItemNameSearchTermChange(_: unknown, newValue: string) {
		setItemNameSearchTerm(newValue)
	}

	function handleGridItemWidthChanged(value: number | null) {
		if (value === null) {
			console.error('gridItemWidth changed but value is null. value:', value)
			return
		}
		setGridItemWidth(value)
	}
})
