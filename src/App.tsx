import { SetMarkedIngredientsProvider } from '@/components//marked-ingredients/set-marked-ingredients-context/SetMarkedIngredientsProvider.tsx'
import { EmptyStripeBackground } from '@/components/EmptyStripeBackground.tsx'
import { MarkedIngredientsProvider } from '@/components/marked-ingredients/marked-ingredients-context/MarkedIngredientsProvider'
import { MarkedIngredients } from '@/components/marked-ingredients/MarkedIngredients.tsx'
import { ToggleMarkedIngredientProvider } from '@/components/marked-ingredients/toggle-marked-ingredient/ToggleMarkedIngredientProvider.tsx'
import { ViewTab } from '@/components/view-tab/ViewTab.tsx'
import { ViewTabPanel } from '@/components/view-tab/ViewTabPanel.tsx'
import { usePersistentSet } from '@/hooks/usePersistentSet.ts'
import { useSet } from '@/hooks/useSet.ts'
import { type IngredientName } from '@/nuka-mixer-recipe/RecipieType'
import { isViewTabId, type ViewTabId } from '@/types/ViewTabId.ts'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Paper from '@mui/material/Paper'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { useEffect, useRef, useState } from 'react'
import { RecipeBrowser } from './components/recipe-browser/index.tsx'
import { INGREDIENT_NAMES } from './nuka-mixer-recipe/INGREDIENT_NAMES.ts'
import { RECIPE_MAP } from './nuka-mixer-recipe/RECIPE_MAP.ts'

const RECIPE_NAMES = Object.keys(RECIPE_MAP)
const UNMAKEABLE_INGREDIENTS = INGREDIENT_NAMES.filter(
	(e) => !RECIPE_NAMES.includes(e),
)

export function App() {
	const [tab, setTab] = useState<ViewTabId>('recipeBrowser')
	const {
		set: markedIngredients,
		toggle: toggleMarkedIngredient,
		setAll: setMarkedIngredients,
	} = usePersistentSet<IngredientName>('markedIngredients')
	/**
	 * <MarkedIngredients>でお気に入りを外した瞬間リストから材料が消えないようにするためのステート
	 */
	const {
		set: tempMarkedIngredients,
		toggle: toggleTempMarkedIngredients,
		setAll: setTempMarkedIngredient,
	} = useSet<IngredientName>(markedIngredients)

	const prevTab = useRef<ViewTabId>(tab)
	useEffect(() => {
		const isLeavingMarkedIngredients =
			prevTab.current === 'markedIngredients' && tab !== 'markedIngredients'

		if (isLeavingMarkedIngredients) {
			setMarkedIngredients(tempMarkedIngredients)
		}

		const isEnteringMarkedIngredients =
			prevTab.current !== 'markedIngredients' && tab === 'markedIngredients'

		if (isEnteringMarkedIngredients) {
			setTempMarkedIngredient(markedIngredients)
		}

		prevTab.current = tab
	}, [tab])

	return (
		<MarkedIngredientsProvider value={markedIngredients}>
			<SetMarkedIngredientsProvider value={setMarkedIngredients}>
				<ToggleMarkedIngredientProvider value={toggleMarkedIngredient}>
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
							onChange={handleTabChange}
							variant='scrollable'
							scrollButtons='auto'
							allowScrollButtonsMobile
							sx={{ mb: 4 }}
						>
							<ViewTab
								tabId='recipeBrowser'
								value='recipeBrowser' // valueはここで指定しないとエラーになる。詳細はViewTabで
								label='レシピ検索'
							/>
							<ViewTab
								tabId='markedIngredients'
								value='markedIngredients' // valueはここで指定しないとエラーになる。詳細はViewTabで
								label='マークした材料'
							/>
							<ViewTab
								tabId='unmakeableIngredients'
								value='unmakeableIngredients' // valueはここで指定しないとエラーになる。詳細はViewTabで
								label='レシピで作れない材料リスト'
							/>
						</Tabs>
						<ViewTabPanel tabId='recipeBrowser' activeTab={tab}>
							<RecipeBrowser />
						</ViewTabPanel>
						<ViewTabPanel
							tabId='unmakeableIngredients'
							activeTab={tab}
							component={List}
							dense
						>
							{UNMAKEABLE_INGREDIENTS.map((itemName) => (
								<ListItem component={Paper} sx={{ mb: 1 }} key={itemName}>
									{itemName}
								</ListItem>
							))}
						</ViewTabPanel>
						<ViewTabPanel tabId='markedIngredients' activeTab={tab}>
							<MarkedIngredients
								markedIngredients={markedIngredients}
								tempMarkedIngredients={tempMarkedIngredients}
								toggleTemp={toggleTempMarkedIngredients}
							/>
						</ViewTabPanel>
						<EmptyStripeBackground />
					</Container>
				</ToggleMarkedIngredientProvider>
			</SetMarkedIngredientsProvider>
		</MarkedIngredientsProvider>
	)

	function handleTabChange(_: unknown, newValue: ViewTabId) {
		if (isViewTabId(newValue)) {
			setTab(newValue)
		} else {
			console.error(`${newValue} is not TabId.`)
		}
	}
}
