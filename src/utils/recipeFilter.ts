import { EFFECT_LABEL_MAP } from '@/nuka-mixer-recipe/EFFECT_LABELS'
import { ITEM_NAME } from '@/nuka-mixer-recipe/ITEM_NAMES'
import { RECIPE_MAP } from '@/nuka-mixer-recipe/RECIPE_MAP'
import type {
	EffectLabel,
	IngredientName,
	ItemName,
	Recipe,
} from '@/nuka-mixer-recipe/RecipieType'

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

const INGREDIENT_NAME_MAP: Record<ItemName, IngredientName[]> =
	ITEM_NAME.reduce(
		(acc, itemName: ItemName) => {
			acc[itemName] = Object.values(RECIPE_MAP[itemName].requiredItems).map(
				(e) => e.requiredItemName,
			)
			return acc
		},
		{} as Record<ItemName, IngredientName[]>,
	)

const EFFECT_NAME_MAP: Record<ItemName, EffectLabel[]> = ITEM_NAME.reduce(
	(acc, itemName: ItemName) => {
		acc[itemName] = Object.values(RECIPE_MAP[itemName].effects).map(
			(e) => EFFECT_LABEL_MAP[e.effectName],
		)
		return acc
	},
	{} as Record<ItemName, EffectLabel[]>,
)

export function filterRecipes(props: Props): Recipe[] {
	const { itemNameSearchTerm, ingredientQuery, effectNameQuery } = props

	let matchesItemNames: ItemName[] = itemNameSearchTerm
		? ITEM_NAME.filter((e) => e.includes(itemNameSearchTerm))
		: [...ITEM_NAME]

	const ingredientAst = createAst<IngredientName>(
		ingredientQuery,
		ingredientNameEvaluate,
	)

	matchesItemNames =
		ingredientAst === null
			? matchesItemNames
			: matchesItemNames.filter((itemName) => {
					return ingredientAst(INGREDIENT_NAME_MAP[itemName])
				})

	const effectNameAst = createAst<EffectLabel>(
		effectNameQuery,
		evaluateEffectName,
	)

	matchesItemNames =
		effectNameAst === null
			? matchesItemNames
			: matchesItemNames.filter((itemName) => {
					return effectNameAst(EFFECT_NAME_MAP[itemName])
				})

	return matchesItemNames.map((e) => RECIPE_MAP[e])
}

const astCache = new Map<string, LogicNode>()

/*
 * Ast=Abstract Syntax Treeらしい
 * 抽象構文木と訳されるデータ構造で、
 *「式」や「ロジック」を 木構造で表現したもの。
 */
/**
 * @returns nullならフィルター関数が渡されない
 */
function createAst<T extends string>(
	query: string,
	evaluateFunc: (node: LogicNode, terms: T[]) => boolean,
): ((targets: T[]) => boolean) | null {
	const trimmedQuery = query.trim()
	if (!trimmedQuery) return null

	if (astCache.has(trimmedQuery)) {
		const cached = astCache.get(trimmedQuery)
		return cached ? (targets: T[]) => evaluateFunc(cached, targets) : null
	}

	const tokens = tokenize(trimmedQuery)
	if (tokens.length === 0) return null

	let node: LogicNode
	try {
		node = parse(tokens)
		astCache.set(trimmedQuery, node)
	} catch (error: unknown) {
		// 構文エラーなどがある場合（入力途中など）、安全のため空配列または全件を返す
		// ここでは入力途中でも極力ヒットさせるため、エラー時はフィルタリングせず空を返すか、
		// あるいは単純検索にフォールバックする等の戦略が考えられますが、
		// 明示的な論理検索なのでエラー時はヒットなしとします。
		console.warn(error)
		astCache.delete(trimmedQuery)
		return null
	}

	return (targets: T[]) => evaluateFunc(node, targets)
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

	//&|()で分割
	return normalized
		.split(/([&|()])+/g)
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

function ingredientNameEvaluate(
	node: LogicNode,
	ingredientNames: IngredientName[],
): boolean {
	if (node.type === 'AND') {
		return (
			ingredientNameEvaluate(node.left, ingredientNames) &&
			ingredientNameEvaluate(node.right, ingredientNames)
		)
	} else if (node.type === 'OR') {
		return (
			ingredientNameEvaluate(node.left, ingredientNames) ||
			ingredientNameEvaluate(node.right, ingredientNames)
		)
	}
	// 部分一致検索 (大文字小文字無視)
	else {
		return ingredientNames.some((ingredientName) => {
			const lowerIngredientName = ingredientName.toLowerCase()
			const lowerNodeValue = node.value.toLowerCase()

			// 検索が「ヌカ・コーラ」の場合、「ヌカ・コーラ・クアンタム」などもヒット扱いしないようにする
			if (lowerNodeValue === 'ヌカ・コーラ') {
				return lowerNodeValue === lowerIngredientName
			} else {
				return lowerIngredientName.includes(lowerNodeValue)
			}
		})
	}
}

/**
 * hpと最大hp, apと最大hpを厳密に比較するためingredientNameEvaluateと独立させた
 */
function evaluateEffectName(
	node: LogicNode,
	effectLabels: EffectLabel[],
): boolean {
	if (node.type === 'AND') {
		return (
			evaluateEffectName(node.left, effectLabels) &&
			evaluateEffectName(node.right, effectLabels)
		)
	} else if (node.type === 'OR') {
		return (
			evaluateEffectName(node.left, effectLabels) ||
			evaluateEffectName(node.right, effectLabels)
		)
	} else {
		return effectLabels.some((label) => {
			const lowerLabel = label.toLowerCase()
			const lowerNodeValue = node.value.toLowerCase()

			// 検索が「hp」「ap」の場合、最大hpや最大apをヒットさせない
			if (lowerNodeValue === 'hp' || lowerNodeValue === 'ap') {
				return lowerNodeValue === lowerLabel
			} else {
				return lowerLabel.includes(lowerNodeValue)
			}
		})
	}
}
