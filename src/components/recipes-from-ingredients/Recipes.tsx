import { Effects } from '@/components/recipes-from-ingredients/Effects'
import { RequiredItems } from '@/components/recipes-from-ingredients/RequiredItems'
import { type Recipe } from '@/nuka-mixer-recipe/RecipieType'
import Box from '@mui/material/Box'

interface RecipesProps {
	recipes: Recipe[]
}

export function Recipes({ recipes }: RecipesProps) {
	return recipes.map((recipe) => {
		const { itemName, effects, requiredItems } = recipe

		return (
			<Box key={recipe.itemName}>
				<Box>{itemName}</Box>
				<Box>
					<Effects effects={effects} />
				</Box>
				<Box>
					<RequiredItems requiredItems={requiredItems} />
				</Box>
			</Box>
		)
	})
}
