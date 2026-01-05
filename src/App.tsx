import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useState } from 'react'
// import './App.scss'
import { Filters } from './components/filters/index.tsx'
import { INGREDIENT_NAMES } from './constants/INGREDIENT_NAMES.ts'
import { RECIPE_MAP } from './constants/RECIPE_MAP.ts'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const RECIPE_NAMES = Object.keys(RECIPE_MAP)
const UNMAKEABLE_INGREDIENTS = INGREDIENT_NAMES.filter(
	(e) => !RECIPE_NAMES.includes(e)
)

export function App() {
	const [tab, setTab] = useState<number>(0)

	return (
		<Container>
			<Button variant='contained' color='primary' sx={{ ml: 2 }}>
				Primary
			</Button>
			<Button variant='contained' color='secondary' sx={{ ml: 2 }}>
				Secondary
			</Button>
			<Box component='header'>
				<Box component='h1' color='secondary' sx={{ fontSize: '2em' }}>
					Fallout Nuka-Mixer Station
				</Box>
				<p>ヌカ・コーラ レシピ検索 & 逆引きツール</p>
			</Box>
			<Tabs aria-label='ツールを選択' value={tab} onChange={handleTabClick}>
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
			<div
				id='tabpanel-search'
				className='tabpanel'
				role='tabpanel'
				aria-labelledby='tab-search'
				hidden={tab !== 0}
			>
				<Filters />
			</div>
			<div
				id='tabpanel-unmakeableIngredients'
				className='tabpanel'
				role='tabpanel'
				aria-labelledby='tab-unmakeableIngredients'
				hidden={tab !== 1}
			>
				{UNMAKEABLE_INGREDIENTS.map((itemName) => (
					<div key={itemName}>{itemName}</div>
				))}
			</div>
			<div className='h-screen'></div>
		</Container>
	)

	function handleTabClick(_: any, newValue: number) {
		setTab(newValue)
	}
}
