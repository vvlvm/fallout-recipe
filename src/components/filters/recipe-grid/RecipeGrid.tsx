import type { EffectName, Recipe } from "@/types/RecipieType"
import { Effects } from "./Effects"
import "./recipeGrid.scss"
import { RequiredItems } from "./RequiredItems"

interface Props {
  filteredRecipes: Recipe[]
  selectedEffect: EffectName | ""
}

export function RecipeGrid(props: Props) {
  const { filteredRecipes, selectedEffect } = props

  return (
    <div className="recipe-grid">
      {filteredRecipes.map((recipe) => (
        <Card
          recipe={recipe}
          selectedEffect={selectedEffect}
          key={recipe.itemName}
        />
      ))}
    </div>
  )
}

interface CardProps extends Pick<Props, "selectedEffect"> {
  recipe: Recipe
}

function Card(props: CardProps) {
  const { recipe, selectedEffect } = props
  const { itemName, requiredItems, effects } = recipe

  return (
    <div className="recipe-card">
      <h2>{itemName}</h2>

      <div className="recipe-section">
        <h3>必要素材</h3>
        <RequiredItems requiredItems={requiredItems} />
      </div>

      <div className="recipe-section">
        <h3>効果</h3>
        <Effects effects={effects} selectedEffect={selectedEffect} />
      </div>
    </div>
  )
}
