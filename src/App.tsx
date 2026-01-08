import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { Filters } from './components/filters/index.tsx'
import { INGREDIENT_NAMES } from './constants/INGREDIENT_NAMES.ts'
import { RECIPE_MAP } from './constants/RECIPE_MAP.ts'

const RECIPE_NAMES = Object.keys(RECIPE_MAP)
const UNMAKEABLE_INGREDIENTS = INGREDIENT_NAMES.filter(
	(e) => !RECIPE_NAMES.includes(e)
)

export function App() {
	const [tab, setTab] = useState<number>(0)

	return (
		<Container>
			<Box component='header'>
				<Typography variant='h1' color='primary.main'>
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
			</Tabs>
			<Box
				id='tabpanel-search'
				className='tabpanel'
				role='tabpanel'
				aria-labelledby='tab-search'
				hidden={tab !== 0}
			>
				<Filters />
			</Box>
			<Box
				id='tabpanel-unmakeableIngredients'
				className='tabpanel'
				role='tabpanel'
				aria-labelledby='tab-unmakeableIngredients'
				hidden={tab !== 1}
			>
				{UNMAKEABLE_INGREDIENTS.map((itemName) => (
					<Box key={itemName}>{itemName}</Box>
				))}
			</Box>
			<Box sx={{ height: '100vh' }} />
		</Container>
	)

	function handleTabClick(_: unknown, newValue: number) {
		setTab(newValue)
	}
}
