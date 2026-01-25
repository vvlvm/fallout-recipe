import { useMarkedIngredients } from '@/components/marked-ingredients/marked-ingredients-context/useMarkedIngredients.ts'
import NumberField from '@/components/mui/NumberField'
import { usePersistentSet } from '@/hooks/usePersistentSet.ts'
import { usePersistentState } from '@/hooks/usePersistentState.ts'
import { ITEM_NAME } from '@/nuka-mixer-recipe/ITEM_NAMES.ts'
import { RECIPE_LIST } from '@/nuka-mixer-recipe/RECIPE_LIST.ts'
import {
	isEffectName,
	isIngredientName,
	type EffectName,
	type IngredientName,
	type Recipe,
} from '@/nuka-mixer-recipe/RecipieType'
import { isNumber } from '@/utils/isNumber'
import { isString } from '@/utils/isString'
import {
	effectNameQueryMatchFilter,
	ingredientNameQueryMatchFilter,
} from '@/utils/queryMatchFilter.tsx'
import { filterRecipes } from '@/utils/recipeFilter.ts'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
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

export const RecipeBrowser = memo(function RecipeBrowser() {
	const [itemNameSearchTerm, setItemNameSearchTerm] = usePersistentState(
		'RecipeBrowser-itemNameSearchTerm',
		'',
		isString,
	)
	const [effectNameQuery, setEffectNameQuery] = usePersistentState(
		'RecipeBrowser-effectNameQuery',
		'',
		isString,
	)
	const [ingredientQuery, setIngredientQuery] = usePersistentState(
		'RecipeBrowser-ingredientQuery',
		'',
		isString,
	)

	// フィルタリングロジック
	const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(RECIPE_LIST)

	// 検索された必要素材をハイライトする
	const { values: queriedIngredientNames, setAll: setQueriedIngredientNames } =
		usePersistentSet<IngredientName>(
			'RecipeBrowser-queriedIngredientNames',
			[],
			isIngredientName,
		)

	// 検索されたエフェクトをハイライトする
	const { values: queriedEffectNames, setAll: setQueriedEffectNames } =
		usePersistentSet<EffectName>(
			'RecipeBrowser-queriedEffectNames',
			[],
			isEffectName,
		)

	const [gridItemWidth, setGridItemWidth] = usePersistentState<number>(
		'gridItemWidth',
		290,
		isNumber,
	)

	const [filterByMarkedIngredient, setFilterByMarkedIngredient] =
		usePersistentState<boolean>(
			'RecipeBrowser-filterByMarkedIngredient',
			false,
			(value) => typeof value === 'boolean',
		)

	const markedIngredients: Set<IngredientName> = useMarkedIngredients()

	function handleSearchSubmit() {
		setFilteredRecipes(
			filterRecipes({
				ingredientQuery: ingredientQuery,
				itemNameSearchTerm: itemNameSearchTerm,
				effectNameQuery: effectNameQuery,
				ingredientNameFilter: filterByMarkedIngredient
					? markedIngredients
					: undefined,
			}),
		)
		setQueriedIngredientNames(ingredientNameQueryMatchFilter(ingredientQuery))
		// HPで検索すると最大HPにもヒットするので
		setQueriedEffectNames(effectNameQueryMatchFilter(effectNameQuery))
	}

	return (
		<>
			<Paper component='section' sx={{ p: 2, pb: 4, px: { xs: 0.5, sm: 2 } }}>
				<Typography variant='h2' sx={{ fontSize: '1.5rem' }}>
					検索フォーム
				</Typography>

				<Autocomplete
					freeSolo
					options={ITEM_NAME}
					onInputChange={handleItemNameSearchTermChanged}
					inputValue={itemNameSearchTerm}
					renderInput={(params) => (
						<TextField
							{...params}
							placeholder='アイテム名を入力...'
							label='アイテム名でフィルター'
						/>
					)}
					sx={{ mt: 4 }}
				/>

				<Box mt={7}>
					<IngredientQueryAutoComplete
						inputValue={ingredientQuery}
						setInputValue={setIngredientQuery}
					/>
				</Box>

				<Box mt={6}>
					<EffectNameQueryAutoComplete
						inputValue={effectNameQuery}
						setInputValue={setEffectNameQuery}
					/>
				</Box>

				<Box mt={4} ml={0.5}>
					<FormControlLabel
						control={
							<Checkbox
								checked={filterByMarkedIngredient}
								onChange={handleFilterByMarkedIngredientChanged}
							/>
						}
						label='マークした材料を含むものだけ表示する'
					/>
				</Box>

				<Box mt={4} ml={2}>
					<Button variant='contained' onClick={handleSearchSubmit}>
						検索
					</Button>
				</Box>
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

	function handleItemNameSearchTermChanged(_: unknown, newValue: string) {
		setItemNameSearchTerm(newValue)
	}

	function handleGridItemWidthChanged(value: number | null) {
		if (value === null) {
			console.error('gridItemWidth changed but value is null. value:', value)
			return
		}
		setGridItemWidth(value)
	}

	function handleFilterByMarkedIngredientChanged(_: unknown, checked: boolean) {
		setFilterByMarkedIngredient(checked)
	}
})
