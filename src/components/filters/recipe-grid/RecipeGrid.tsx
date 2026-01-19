import type { Recipe } from '@/nuka-mixer-recipe/RecipieType'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { grey } from '@mui/material/colors'
import { memo } from 'react'
import { Effects } from './Effects'
import { RequiredItems } from './RequiredItems'

interface Props {
	filteredRecipes: Recipe[]
}

export const RecipeGrid = memo(function RecipeGrid(props: Props) {
	const { filteredRecipes } = props

	return (
		<Box
			sx={{
				display: 'grid',
				/* ↓ util関数
				 * gridTemplateColumns用にカードの最大幅を割り出す
				 * GridItemに width:fit-content; を設定してから実行すること
				 *
				 * Array.from(document.querySelectorAll('[data-name="recipe-card"]')).reduce((max, e) => Math.max(max, e.offsetWidth),0)
				 *
				 */
				gridTemplateColumns: 'repeat(auto-fit, 281px)',
				gridTemplateRows: 'auto auto auto',
				alignItems: 'start',
				columnGap: 1,
			}}
		>
			{filteredRecipes.map((recipe) => (
				<GridItem recipe={recipe} key={recipe.itemName} />
			))}
		</Box>
	)
})

interface CardProps {
	recipe: Recipe
}

function GridItem(props: CardProps) {
	const { recipe } = props
	const { itemName, requiredItems, effects } = recipe

	return (
		<Card
			data-name='recipe-card'
			sx={{
				display: 'grid',
				gridRow: 'span 3',
				gridTemplateRows: 'subgrid',
				p: 2,
				px: 1.5,
				marginBottom: 4,
				// width: 'fit-content', //最適なwidthを割り出す用
			}}
		>
			<Typography
				variant='h3'
				sx={{
					color: 'primary.main',
					pb: 1,
					borderBottom: '1px solid',
					borderBottomColor: grey[500],
				}}
			>
				{itemName}
			</Typography>

			<Box sx={{ ml: { xs: 0, sm: 1 } }}>
				<Typography
					variant='h4'
					sx={{
						mt: 2,
						color: 'text.secondary',
					}}
				>
					必要素材
				</Typography>
				<RequiredItems requiredItems={requiredItems} />
			</Box>

			<Box sx={{ ml: { xs: 0, sm: 1 } }}>
				<Typography
					variant='h4'
					sx={{
						mt: 2,
						color: 'text.secondary',
					}}
				>
					効果
				</Typography>
				<Effects effects={effects} />
			</Box>
		</Card>
	)
}
