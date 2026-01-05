import type { EffectName, IngredientName, Recipe } from "@/types/RecipieType"

type LogicNode =
  | { type: "AND"; left: LogicNode; right: LogicNode }
  | { type: "OR"; left: LogicNode; right: LogicNode }
  | { type: "LITERAL"; value: string }

interface Props<T> {
  recipes: T[]
  itemNameSearchTerm: string
  selectedEffectName: EffectName | ""
  /** @param ingredientQuery 入力された検索クエリ (例: "Meat & (Water | Rice)"" */
  ingredientQuery: string
}

export function filterRecipes(props: Props<Recipe>): Recipe[] {
  const { recipes, itemNameSearchTerm, selectedEffectName, ingredientQuery } =
    props

  return recipes.filter((recipe) => {
    const matchesItemName = recipe.itemName.includes(itemNameSearchTerm)
    const matchesEffectName =
      selectedEffectName === "" ||
      Object.hasOwn(recipe.effects, selectedEffectName)
    const matchesIngredientQuery = ingredientQueryToSearchTerms(
      ingredientQuery,
      recipe.requiredItems.map((e) => e.requiredItemName),
    )

    return matchesItemName && matchesEffectName && matchesIngredientQuery
  })
}

function ingredientQueryToSearchTerms(
  ingredientQuery: string,
  terms: IngredientName[],
): boolean {
  const trimmedQuery = ingredientQuery.trim()
  if (!trimmedQuery) return true

  try {
    const tokens = tokenize(trimmedQuery)
    if (tokens.length === 0) return true
    const ast = parse(tokens)
    return evaluate(ast, terms)
  } catch (error) {
    // 構文エラーなどがある場合（入力途中など）、安全のため空配列または全件を返す
    // ここでは入力途中でも極力ヒットさせるため、エラー時はフィルタリングせず空を返すか、
    // あるいは単純検索にフォールバックする等の戦略が考えられますが、
    // 明示的な論理検索なのでエラー時はヒットなしとします。
    return false
  }
}

function tokenize(input: string): string[] {
  // 全角記号を半角に、また指定された演算子に正規化
  const normalized = input
    .replace(/（/g, "(")
    .replace(/）/g, ")")
    .replace(/、/g, "|") // OR演算子として扱う
    .replace(/,/g, "|") // OR演算子として扱う
    .replace(/\u3000/g, " ") // 全角スペース 暗黙のANDとして扱う

  // & | ( ) と半角・全角スペースで分割。ただし演算子はトークンとして維持する。
  return normalized
    .split(/([&|()])| +/g)
    .filter((t): t is string => t != null && t !== "")
}

function parse(tokens: string[]): LogicNode {
  let pos = 0

  function parseExpression(): LogicNode {
    let left = parseTerm()
    while (pos < tokens.length && tokens[pos] === "|") {
      pos++
      const right = parseTerm()
      left = { type: "OR", left, right }
    }
    return left
  }

  function parseTerm(): LogicNode {
    let left = parseFactor()
    // AND演算子は '&' または演算子なし（暗黙のAND）で処理
    while (
      pos < tokens.length &&
      (tokens[pos] === "&" || tokens[pos] === "(" || !isOperator(tokens[pos]))
    ) {
      if (tokens[pos] === "&") {
        pos++
      }
      const right = parseFactor()
      left = { type: "AND", left, right }
    }
    return left
  }

  function parseFactor(): LogicNode {
    if (pos >= tokens.length) throw new Error("Unexpected end of input")

    const token = tokens[pos]
    if (token === "(") {
      pos++
      const expr = parseExpression()
      if (pos < tokens.length && tokens[pos] === ")") {
        pos++
      }
      return expr
    } else if (isOperator(token)) {
      throw new Error(`Unexpected token: ${token}`)
    } else {
      pos++
      return { type: "LITERAL", value: token }
    }
  }

  return parseExpression()
}

function isOperator(token: string): boolean {
  return token === "&" || token === "|" || token === ")"
}

function evaluate(node: LogicNode, terms: string[]): boolean {
  if (node.type === "AND")
    return evaluate(node.left, terms) && evaluate(node.right, terms)
  if (node.type === "OR")
    return evaluate(node.left, terms) || evaluate(node.right, terms)
  // 部分一致検索 (大文字小文字無視)
  return terms.some((t) => t.toLowerCase().includes(node.value.toLowerCase()))
}
