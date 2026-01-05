import Divider from '@mui/material/Divider'
import { EFFECT_LABELS } from '@/constants/EFFECT_LABELS.ts'
import { EFFECT_NAMES } from '@/constants/EFFECT_NAMES.ts'
import { ITEM_NAME } from '@/constants/ITEM_NAMES.ts'
import { RECIPE_LIST } from '@/constants/RECIPE_LIST.ts'
import type { EffectName, IngredientName } from '@/types/RecipieType.ts'
import { parseIngredientQuery } from '@/utils/parseIngredientQuery.tsx'
import { filterRecipes } from '@/utils/recipeFilter.ts'
import Autocomplete from '@mui/material/Autocomplete'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { memo, useMemo, useState } from 'react'
import { IngredientQueryAutoComplete } from './IngredientQueryAutoComplete.tsx'
import { QueriedIngredientNamesProvider } from './QueriedIngredientNamesContext.tsx'
import { RecipeGrid } from './recipe-grid/RecipeGrid.tsx'

export const Filters = memo(function Filters() {
	const [itemNameSearchTerm, setItemNameSearchTerm] = useState('')
	const [selectedEffectName, setSelectedEffectName] = useState<EffectName | ''>(
		''
	)
	const [ingredientQuery, setIngredientQuery] = useState<string>('')

	// フィルタリングロジック
	const filteredRecipes = useMemo(() => {
		return filterRecipes({
			recipes: RECIPE_LIST,
			itemNameSearchTerm,
			selectedEffectName,
			ingredientQuery,
		})
	}, [itemNameSearchTerm, selectedEffectName, ingredientQuery])

	const queriedIngredientNames = useMemo<IngredientName[]>(
		() => parseIngredientQuery(ingredientQuery),
		[ingredientQuery]
	)

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
							<Select
								value={selectedEffectName}
								onChange={handleEffectChange}
								displayEmpty
							>
								<MenuItem value=''>全て</MenuItem>
								{EFFECT_NAMES.map((name) => (
									<MenuItem key={name} value={name}>
										{EFFECT_LABELS[name]}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</Paper>

			<Divider sx={{ my: 4 }} />

			<Typography variant='body1' sx={{ my: 2 }}>
				ヒット数: {filteredRecipes.length} 件
			</Typography>

			<QueriedIngredientNamesProvider value={queriedIngredientNames}>
				<RecipeGrid
					filteredRecipes={filteredRecipes}
					selectedEffect={selectedEffectName}
				/>
			</QueriedIngredientNamesProvider>
		</>
	)

	function handleItemNameSearchTermChange(_: any, newValue: string) {
		setItemNameSearchTerm(newValue)
	}

	function handleEffectChange(event: SelectChangeEvent) {
		setSelectedEffectName(event.target.value as EffectName | '')
	}
})
