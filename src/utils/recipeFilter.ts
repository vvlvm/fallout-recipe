import { EFFECT_LABEL_MAP } from '@/constants/EFFECT_LABELS'
import { RECIPE_LIST } from '@/constants/RECIPE_LIST'
import type { Recipe } from '@/types/RecipieType'

type LogicNode =
	| { type: 'AND'; left: LogicNode; right: LogicNode }
	| { type: 'OR'; left: LogicNode; right: LogicNode }
	| { type: 'LITERAL'; value: string }

interface Props {
	itemNameSearchTerm: string
	/** @param effectNameQuery 入力された検索クエリ (例: "Meat & (Water | Rice)"" */
	effectNameQuery: string
	/** @param ingredientQuery 入力された検索クエリ (例: "Meat & (Water | Rice)"" */
	ingredientQuery: string
}

export function filterRecipes(props: Props): Recipe[] {
	const { itemNameSearchTerm, ingredientQuery, effectNameQuery } = props

	const ingredientAst = createAst(ingredientQuery)
	const effectNameAst = createAst(effectNameQuery)

	return RECIPE_LIST.filter((recipe) => {
		const matchesItemName = recipe.itemName.includes(itemNameSearchTerm)

		// ASTがない場合は条件なしとしてtrueを返す
		const matchesIngredientQuery =
			ingredientAst === null
				? true
				: ingredientAst(recipe.requiredItems.map((e) => e.requiredItemName))

		// ASTがない場合は条件なしとしてtrueを返す
		const matchesEffectNameQuery =
			effectNameAst === null
				? true
				: effectNameAst(
						Object.values(recipe.effects).map(
							(e) => EFFECT_LABEL_MAP[e.effectName]
						)
					)

		return matchesItemName && matchesIngredientQuery && matchesEffectNameQuery
	})
}

/*
 * Ast=Abstract Syntax Treeらしい
 * 抽象構文木と訳されるデータ構造で、
 *「式」や「ロジック」を 木構造で表現したもの。
 */
/**
 * @returns nullならフィルター関数が渡されない
 */
function createAst(query: string): ((targets: string[]) => boolean) | null {
	const trimmedQuery = query.trim()
	if (!trimmedQuery) return null

	const tokens = tokenize(trimmedQuery)
	if (tokens.length === 0) return null

	let ast: LogicNode
	try {
		ast = parse(tokens)
	} catch (error: unknown) {
		// 構文エラーなどがある場合（入力途中など）、安全のため空配列または全件を返す
		// ここでは入力途中でも極力ヒットさせるため、エラー時はフィルタリングせず空を返すか、
		// あるいは単純検索にフォールバックする等の戦略が考えられますが、
		// 明示的な論理検索なのでエラー時はヒットなしとします。
		console.warn(error)
		return null
	}

	return (targets: string[]) => evaluate(ast, targets)
}

function tokenize(input: string): string[] {
	// 全角記号を半角に、また指定された演算子に正規化
	const normalized = input
		.replace(/（/g, '(')
		.replace(/）/g, ')')
		.replace(/、/g, '|') // ORとして扱う
		.replace(/,/g, '|') // ORとして扱う
		.replace(/＆/g, '&') // ORとして扱う
		.replace(/\u3000/g, '&') // 全角スペース ANDとして扱う
		.replace(/。/g, '&') // ANDとして扱う

	//&|()で分割。ただし演算子はトークンとして維持する。
	return normalized
		.split(/([&|()])| +/g)
		.filter((t): t is string => t != null && t !== '')
}

function parse(tokens: string[]): LogicNode {
	let pos = 0

	function parseExpression(): LogicNode {
		let left = parseTerm()
		while (pos < tokens.length && tokens[pos] === '|') {
			pos++
			const right = parseTerm()
			left = { type: 'OR', left, right }
		}
		return left
	}

	function parseTerm(): LogicNode {
		let left = parseFactor()

		while (
			pos < tokens.length &&
			(tokens[pos] === '&' || tokens[pos] === '(' || !isOperator(tokens[pos]))
		) {
			if (tokens[pos] === '&') {
				pos++
			}
			const right = parseFactor()
			left = { type: 'AND', left, right }
		}
		return left
	}

	function parseFactor(): LogicNode {
		if (pos >= tokens.length) throw new Error('Unexpected end of input')

		const token = tokens[pos]
		if (token === '(') {
			pos++
			const expr = parseExpression()
			if (pos < tokens.length && tokens[pos] === ')') {
				pos++
			}
			return expr
		} else if (isOperator(token)) {
			throw new Error(`Unexpected token: ${token}`)
		} else {
			pos++
			return { type: 'LITERAL', value: token }
		}
	}

	return parseExpression()
}

function isOperator(token: string): boolean {
	return token === '&' || token === '|' || token === ')'
}

function evaluate(node: LogicNode, terms: string[]): boolean {
	if (node.type === 'AND')
		return evaluate(node.left, terms) && evaluate(node.right, terms)
	if (node.type === 'OR')
		return evaluate(node.left, terms) || evaluate(node.right, terms)
	// 部分一致検索 (大文字小文字無視)
	return terms.some((t) => t.toLowerCase().includes(node.value.toLowerCase()))
}
