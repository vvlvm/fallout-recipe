import { useState } from "react"
import "./App.css"
import { Filters } from "./components/filters/index.tsx"
import { RECIPE_MAP } from "./constants/RECIPE_MAP.ts"
import { INGREDIENT_NAMES } from "./constants/INGREDIENT_NAMES.ts"

const RECIPE_NAMES = Object.keys(RECIPE_MAP)
const UNMAKEABLE_INGREDIENTS = INGREDIENT_NAMES.filter(
  (e) => !RECIPE_NAMES.includes(e),
)

type TabValue = "search" | "unmakeableIngredients"

export function App() {
  const [tab, setTab] = useState<TabValue>("search")

  return (
    <div className="container">
      <header>
        <h1>Fallout Nuka-Mixer Station</h1>
        <p>ヌカ・コーラ レシピ検索 & 逆引きツール</p>
      </header>

      <div role="tablist" className="tablist" aria-label="ツールを選択">
        <button
          id="tab-search"
          className="tab p-16px"
          onClick={handleTabClick}
          role="tab"
          aria-selected={tab === "search"}
          aria-controls="tabpanel-search"
        >
          レシピ検索
        </button>
        <button
          id="tab-unmakeableIngredients"
          className="tab p-16px"
          onClick={handleTabClick}
          role="tab"
          aria-selected={tab === "unmakeableIngredients"}
          aria-controls="tabpanel-unmakeableIngredients"
        >
          レシピで作れない材料リスト
        </button>
      </div>
      <div
        id="tabpanel-search"
        className="tabpanel"
        role="tabpanel"
        aria-labelledby="tab-search"
        hidden={tab !== "search"}
      >
        <Filters />
      </div>
      <div
        id="tabpanel-unmakeableIngredients"
        className="tabpanel"
        role="tabpanel"
        aria-labelledby="tab-unmakeableIngredients"
        hidden={tab !== "unmakeableIngredients"}
      >
        {UNMAKEABLE_INGREDIENTS.map((itemName) => (
          <div key={itemName}>{itemName}</div>
        ))}
      </div>

      <div className="h-screen"></div>
    </div>
  )

  function handleTabClick(event: React.MouseEvent<HTMLButtonElement>) {
    const id = event.currentTarget.id

    switch (id) {
      case "tab-search":
        setTab("search")
        break
      case "tab-unmakeableIngredients":
        setTab("unmakeableIngredients")
        break
      default:
        break
    }
  }
}
