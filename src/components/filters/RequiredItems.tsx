import type { RequiredItem, IngredientName } from "@/types/RecipieType";
import "./recipeGrid.css";
import clsx from "clsx";

interface Props {
  requiredItems: RequiredItem[];
  selectedIngredient: IngredientName | "";
}

export function RequiredItems(props: Props) {
  const { requiredItems, selectedIngredient } = props;

  return (
    <div className="list-like-grid">
      {requiredItems.map((item) => (
        <RequiredItem
          item={item}
          selectedIngredient={selectedIngredient}
          key={item.requiredItemName}
        />
      ))}
    </div>
  );
}

interface ItemProps {
  item: RequiredItem;
  selectedIngredient: IngredientName | "";
}

function RequiredItem(props: ItemProps) {
  const { item, selectedIngredient } = props;
  const { requiredItemName, amount } = item;
  const isHighlighted = requiredItemName === selectedIngredient;

  return (
    <div key={item.requiredItemName} className="item">
      <span
        className={clsx(
          "mr-4 font-bold text-nowrap",
          isHighlighted && "text-highlight",
        )}
      >
        {item.requiredItemName}
      </span>
      <span>x{amount}</span>
    </div>
  );
}
