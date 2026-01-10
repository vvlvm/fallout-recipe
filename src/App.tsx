import { MarkedIngredients } from '@/marked-ingredients/MarkedIngredients.tsx'
import { useMarkedIngredientsWithLocalStorage } from '@/marked-ingredients/useMarkedIngredientsWithLocalStorage.ts'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import ListItem from '@mui/material/ListItem'
import Paper from '@mui/material/Paper'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { Filters } from './components/filters/index.tsx'
import { INGREDIENT_NAMES } from './constants/INGREDIENT_NAMES.ts'
import { RECIPE_MAP } from './constants/RECIPE_MAP.ts'
import { MarkedIngredientsProvider } from '@/marked-ingredients/marked-ingredients-context/MarkedIngredientsProvider'
import { SetMarkedIngredientsProvider } from './marked-ingredients/set-marked-ingredients-context/SetMarkedIngredientsProvider.tsx'
import { ToggleMarkedIngredientProvider } from '@/marked-ingredients/toggle-marked-ingredient/ToggleMarkedIngredientProvider.tsx'

const RECIPE_NAMES = Object.keys(RECIPE_MAP)
const UNMAKEABLE_INGREDIENTS = INGREDIENT_NAMES.filter(
	(e) => !RECIPE_NAMES.includes(e)
)

export function App() {
	const [tab, setTab] = useState<number>(0)
	const { markedIngredients, toggleIngredient, setMarkedIngredients } =
		useMarkedIngredientsWithLocalStorage()

	return (
		<MarkedIngredientsProvider value={markedIngredients}>
			<SetMarkedIngredientsProvider value={setMarkedIngredients}>
				<ToggleMarkedIngredientProvider value={toggleIngredient}>
					<Container sx={{ p: { xs: 0, sm: 2 } }}>
						<Box component='header'>
							<Typography variant='h1' fontSize='2rem' color='primary.main'>
								Fallout Nuka-Mixer Station
							</Typography>
							<Typography variant='body2'>
								ヌカ・コーラ レシピ検索 & 逆引きツール
							</Typography>
						</Box>
						<Tabs
							aria-label='ツールを選択'
							value={tab}
							onChange={handleTabClick}
							sx={{ mb: 4 }}
						>
							<Tab
								id='tab-search'
								role='tab'
								aria-selected={tab === 0}
								aria-controls='tabpanel-search'
								label='レシピ検索'
							/>
							<Tab
								id='tab-unmakeableIngredients'
								role='tab'
								aria-selected={tab === 1}
								aria-controls='tabpanel-unmakeableIngredients'
								label='レシピで作れない材料リスト'
							/>
							<Tab
								id='tab-marked-ingredients'
								role='tab'
								aria-selected={tab === 2}
								aria-controls='tabpanel-marked-ingredients'
								label='マークした材料'
							/>
						</Tabs>
						<Box
							id='tabpanel-search'
							role='tabpanel'
							aria-labelledby='tab-search'
							sx={
								tab === 0
									? {}
									: {
											display: 'none',
										}
							}
						>
							<Filters />
						</Box>
						<Paper
							id='tabpanel-unmakeableIngredients'
							role='tabpanel'
							aria-labelledby='tab-unmakeableIngredients'
							sx={
								tab === 1
									? {}
									: {
											display: 'none',
										}
							}
						>
							{UNMAKEABLE_INGREDIENTS.map((itemName) => (
								<ListItem component={Paper} dense sx={{ mb: 1 }} key={itemName}>
									{itemName}
								</ListItem>
							))}
						</Paper>
						<Box
							id='tabpanel-marked-ingredients'
							role='tabpanel'
							aria-labelledby='tab-marked-ingredients'
							sx={
								tab === 2
									? {}
									: {
											display: 'none',
										}
							}
						>
							<MarkedIngredients />
						</Box>
						<Box sx={{ height: '100vh' }} />
					</Container>
				</ToggleMarkedIngredientProvider>
			</SetMarkedIngredientsProvider>
		</MarkedIngredientsProvider>
	)

	function handleTabClick(_: unknown, newValue: number) {
		setTab(newValue)
	}
}
