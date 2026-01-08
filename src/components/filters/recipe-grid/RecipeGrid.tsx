import type { EffectName, Recipe } from '@/types/RecipieType'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { grey } from '@mui/material/colors'
import { Effects } from './Effects'
import { RequiredItems } from './RequiredItems'
import './recipeGrid.scss'

interface Props {
	filteredRecipes: Recipe[]
	selectedEffect: EffectName | ''
}

export function RecipeGrid(props: Props) {
	const { filteredRecipes, selectedEffect } = props

	return (
		<Box
			sx={{
				display: 'grid',
				/* ↓ util関数
				 * gridTemplateColumns用にカードの最大幅を割り出す
				 * 下の要素に width:fit-content; を設定してから実行すること
				 *
				 * Array.from(document.querySelectorAll('.recipe-card')).reduce((max, e) => Math.max(max, e.offsetWidth),0)
				 *
				 */
				gridTemplateColumns: 'repeat(auto-fit, 280px)',
				gridTemplateRows: 'auto auto auto',
				alignItems: 'start',
				gap: '0px 6px',
			}}
		>
			{filteredRecipes.map((recipe) => (
				<GridItem
					recipe={recipe}
					selectedEffect={selectedEffect}
					key={recipe.itemName}
				/>
			))}
		</Box>
	)
}

interface CardProps extends Pick<Props, 'selectedEffect'> {
	recipe: Recipe
}

function GridItem(props: CardProps) {
	const { recipe, selectedEffect } = props
	const { itemName, requiredItems, effects } = recipe

	return (
		<Card
			className='recipe-card'
			sx={{
				display: 'grid',
				gridRow: 'span 3',
				gridTemplateRows: 'subgrid',
				padding: '16px',
				marginBottom: '32px',
			}}
		>
			<Typography
				variant='h3'
				sx={{
					fontSize: '1.2rem',
					color: 'primary.main',
					pb: 1,
					borderBottom: '1px solid',
					borderBottomColor: grey[500],
				}}
			>
				{itemName}
			</Typography>

			<Box sx={{ ml: 1 }}>
				<Typography
					variant='h4'
					sx={{
						fontSize: '1rem',
						mt: 2,
						color: 'text.secondary',
					}}
				>
					必要素材
				</Typography>
				<RequiredItems requiredItems={requiredItems} />
			</Box>

			<Box sx={{ ml: 1 }}>
				<Typography
					variant='h4'
					sx={{
						fontSize: '1rem',
						mt: 2,
						color: 'text.secondary',
					}}
				>
					効果
				</Typography>
				<Effects effects={effects} selectedEffect={selectedEffect} />
			</Box>
		</Card>
	)
}
