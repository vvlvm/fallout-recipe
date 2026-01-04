import type { EffectName, Recipe, IngredientName } from "@/types/RecipieType";
import { Effects } from "./Effects";
import "./recipeGrid.css";
import { RequiredItems } from "./RequiredItems";

interface Props {
  filteredRecipes: Recipe[];
  selectedIngredient: IngredientName | "";
  selectedEffect: EffectName | "";
}

export function RecipeGrid(props: Props) {
  const { filteredRecipes, selectedIngredient, selectedEffect } = props;

  return (
    <div className="recipe-grid">
      {filteredRecipes.map((recipe) => (
        <Card
          recipe={recipe}
          selectedIngredient={selectedIngredient}
          selectedEffect={selectedEffect}
          key={recipe.itemName}
        />
      ))}
    </div>
  );
}

interface CardProps extends Pick<
  Props,
  "selectedEffect" | "selectedIngredient"
> {
  recipe: Recipe;
}

function Card(props: CardProps) {
  const { recipe, selectedIngredient, selectedEffect } = props;
  const { itemName, requiredItems, effects } = recipe;

  return (
    <div className="recipe-card">
      <h2>{itemName}</h2>

      <div className="recipe-section">
        <h3>必要素材</h3>
        <RequiredItems
          requiredItems={requiredItems}
          selectedIngredient={selectedIngredient}
        />
      </div>

      <div className="recipe-section">
        <h3>効果</h3>
        <Effects effects={effects} selectedEffect={selectedEffect} />
      </div>
    </div>
  );
}
