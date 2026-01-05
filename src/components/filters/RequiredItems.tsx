import type { RequiredItem } from "@/types/RecipieType"
import clsx from "clsx"
import { useQueriedIngredientNames } from "./QueriedIngredientNamesContext"
import "./recipeGrid.css"

interface Props {
  requiredItems: RequiredItem[]
}

export function RequiredItems(props: Props) {
  const { requiredItems } = props

  return (
    <div className="list-like-grid">
      {requiredItems.map((item) => (
        <RequiredItem item={item} key={item.requiredItemName} />
      ))}
    </div>
  )
}

interface ItemProps {
  item: RequiredItem
}

function RequiredItem(props: ItemProps) {
  const { item } = props
  const { requiredItemName, amount } = item
  const queriedIngredientNames = useQueriedIngredientNames()
  const isHighlighted = queriedIngredientNames.some(
    (e) => e === requiredItemName,
  )

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
  )
}
