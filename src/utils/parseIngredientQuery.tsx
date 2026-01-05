import { type IngredientName, isIngredientName } from "@/types/RecipieType"

const TOKEN_SEPARATORS = /[&()（）\u3000、,|]+/

export function parseIngredientQuery(query: string): IngredientName[] {
  if (!query) return []
  const tokens = query
    .split(TOKEN_SEPARATORS)
    .map((t) => t.trim())
    .filter(Boolean)

  const filtered: IngredientName[] = tokens.filter(isIngredientName)
  const deduplicated: IngredientName[] = Array.from(new Set(filtered))
  return deduplicated
}
