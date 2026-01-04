import { EFFECT_LABELS } from "@/constants/EFFECT_LABELS.ts"
import { EFFECT_NAMES } from "@/constants/EFFECT_NAMES.ts"
import { INGREDIENT_NAMES } from "@/constants/INGREDIENT_NAMES.ts"
import { RECIPE_LIST } from "@/constants/RECIPE_LIST.ts"
import type { EffectName, IngredientName } from "@/types/RecipieType.ts"
import { memo, useMemo, useState } from "react"
import { RecipeGrid } from "./RecipeGrid.tsx"
import { IngredientQueryAutoComplete } from "./IngredientQueryAutoComplete.tsx"
import { filterRecipes } from "@/utils/recipeFilter.ts"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { ITEM_NAME } from "@/constants/ITEM_NAMES.ts"

export const Filters = memo(function Filters() {
  const [itemNameSearchTerm, setItemNameSearchTerm] = useState("")
  const [selectedIngredientName, setSelectedIngredientName] = useState<
    IngredientName | ""
  >("")
  const [selectedEffectName, setSelectedEffectName] = useState<EffectName | "">(
    "",
  )
  const [ingredientQuery, setIngredientQuery] = useState<string>("")

  // フィルタリングロジック
  const filteredRecipes = useMemo(() => {
    return filterRecipes({
      recipes: RECIPE_LIST,
      itemNameSearchTerm,
      selectedIngredientName,
      selectedEffectName,
      ingredientQuery,
    })
  }, [
    itemNameSearchTerm,
    selectedIngredientName,
    selectedEffectName,
    ingredientQuery,
  ])

  return (
    <>
      <div className="filters">
        <div className="filter-group">
          <label>名前検索</label>
          <Autocomplete
            options={ITEM_NAME}
            onInputChange={handleItemNameSearchTermChange}
            inputValue={itemNameSearchTerm}
            renderInput={(params) => (
              <TextField {...params} placeholder="アイテム名を入力..." />
            )}
          />
        </div>

        <div className="filter-group">
          <label>必要素材</label>
          <select
            value={selectedIngredientName}
            onChange={handleIngredientChange}
          >
            <option value="">全て</option>
            {INGREDIENT_NAMES.map((ing) => (
              <option key={ing} value={ing}>
                {ing}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>効果フィルター</label>
          <select value={selectedEffectName} onChange={handleEffectChange}>
            <option value="">全て</option>
            {EFFECT_NAMES.map((eff) => (
              <option key={eff} value={eff}>
                {EFFECT_LABELS[eff]}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group min-w-full grow">
          <label>必要素材(検索クエリ)</label>
          <IngredientQueryAutoComplete
            inputValue={ingredientQuery}
            setInputValue={setIngredientQuery}
          />
        </div>
      </div>

      <div className="mb-2 font-bold text-gray-500">
        ヒット数: {filteredRecipes.length} 件
      </div>

      <RecipeGrid
        filteredRecipes={filteredRecipes}
        selectedIngredient={selectedIngredientName}
        selectedEffect={selectedEffectName}
      />
    </>
  )

  function handleItemNameSearchTermChange(_: any, newValue: string) {
    setItemNameSearchTerm(newValue)
  }

  function handleIngredientChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedIngredientName(event.target.value as IngredientName | "")
  }

  function handleEffectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedEffectName(event.target.value as EffectName | "")
  }
})
