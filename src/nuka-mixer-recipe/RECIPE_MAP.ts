import type { RecipeMap } from '@/nuka-mixer-recipe/RecipieType'

export const RECIPE_MAP: RecipeMap = {
	'ニューカ・コーラ': {
		itemName: 'ニューカ・コーラ',
		effects: {
			caffeine: { effectName: 'caffeine' },
			hp: {
				effectName: 'hp',
				amount: 300,
				isOverTime: true,
			},
			ap: {
				effectName: 'ap',
				amount: 50,
				isOverTime: true,
			},
			weight: {
				effectName: 'weight',
				amount: 1,
			},
			value: {
				effectName: 'value',
				amount: 20,
			},
		},
		requiredItems: [
			{
				requiredItemName: 'ヌカ・コーラ',
				amount: 1,
			},
			{
				requiredItemName: 'ヌカ・チェリー',
				amount: 1,
			},
		],
	},
	'ヌカ・エクストリーム': {
		itemName: 'ヌカ・エクストリーム',
		effects: {
			caffeine: { effectName: 'caffeine' },
			maxAp: {
				effectName: 'maxAp',
				amount: 10,
				isOverTime: true,
			},
			maxHp: {
				effectName: 'maxHp',
				amount: 30,
				isOverTime: true,
			},
			rads: {
				effectName: 'rads',
				amount: -500,
				isOverTime: true,
			},
			weight: {
				effectName: 'weight',
				amount: 1,
			},
			value: {
				effectName: 'value',
				amount: 20,
			},
		},
		requiredItems: [
			{
				requiredItemName: 'ヌカ・グレープ',
				amount: 1,
			},
			{
				requiredItemName: 'ヌカ・コーラ',
				amount: 1,
			},
			{
				requiredItemName: 'ヌカ・コーラ・クアンタム',
				amount: 1,
			},
		],
	},
	'ヌカ・クーラー': {
		itemName: 'ヌカ・クーラー',
		effects: {
			caffeine: { effectName: 'caffeine' },
			hp: {
				effectName: 'hp',
				amount: 3600,
				isOverTime: true,
			},
			maxHp: {
				effectName: 'maxHp',
				amount: 50,
				isOverTime: true,
			},
			ap: {
				effectName: 'ap',
				amount: 1049,
				isOverTime: true,
			},
			maxAp: {
				effectName: 'maxAp',
				amount: 20,
				isOverTime: true,
			},
			weight: {
				effectName: 'weight',
				amount: 1,
			},
			value: {
				effectName: 'value',
				amount: 20,
			},
		},
		requiredItems: [
			{
				requiredItemName: 'ヌカ・コーラ・クアンタム',
				amount: 1,
			},
			{
				requiredItemName: 'ヌカ・コーラ・クォーツ',
				amount: 1,
			},
			{
				requiredItemName: 'ヌカ・コーラ・ビクトリー',
				amount: 1,
			},
		],
	},
	'ヌカ・サイド': {
		itemName: 'ヌカ・サイド',
		effects: {
			carryWeight: {
				effectName: 'carryWeight',
				amount: 35,
			},
			hp: {
				effectName: 'hp',
				amount: 75,
				isOverTime: true,
			},
			ap: {
				effectName: 'ap',
				amount: 300,
				isOverTime: true,
			},
			maxAp: {
				effectName: 'maxAp',
				amount: 20,
				isOverTime: true,
			},
			maxHp: {
				effectName: 'maxHp',
				amount: 50,
				isOverTime: true,
			},
			radResist: {
				effectName: 'radResist',
				amount: 35,
				isOverTime: true,
			},
			weight: {
				effectName: 'weight',
				amount: 1,
			},
			value: {
				effectName: 'value',
				amount: 20,
			},
		},
		requiredItems: [
			{ requiredItemName: 'ヌカ・グレープ', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ・オレンジ', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ・クアンタム', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ・クォーツ', amount: 1 },
		],
	},
	'ヌカ・サンライズ': {
		itemName: 'ヌカ・サンライズ',
		effects: {
			caffeine: { effectName: 'caffeine' },
			hp: {
				effectName: 'hp',
				amount: 150,
				isOverTime: true,
			},
			ap: {
				effectName: 'ap',
				amount: 50,
				isOverTime: true,
			},
			radResist: {
				effectName: 'radResist',
				amount: 25,
				isOverTime: true,
			},
			weight: {
				effectName: 'weight',
				amount: 1,
			},
			value: {
				effectName: 'value',
				amount: 20,
			},
		},
		requiredItems: [
			{ requiredItemName: 'ヌカ・コーラ・オレンジ', amount: 1 },
			{ requiredItemName: 'ヌカ・チェリー', amount: 1 },
		],
	},
	'ヌカ・ツイン': {
		itemName: 'ヌカ・ツイン',
		effects: {
			caffeine: { effectName: 'caffeine' },
			hp: {
				effectName: 'hp',
				amount: 150,
				isOverTime: true,
			},
			ap: {
				effectName: 'ap',
				amount: 50,
				isOverTime: true,
			},
			weight: {
				effectName: 'weight',
				amount: 1,
			},
			value: {
				effectName: 'value',
				amount: 20,
			},
		},
		requiredItems: [
			{ requiredItemName: 'ヌカ・コーラ', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ・ワイルド', amount: 1 },
		],
	},
	'ヌカ・ハーティ': {
		itemName: 'ヌカ・ハーティ',
		effects: {
			carryWeight: { effectName: 'carryWeight', amount: 25 },
			hp: { effectName: 'hp', amount: 225, isOverTime: true },
			ap: { effectName: 'ap', amount: 50, isOverTime: true },
			weight: { effectName: 'weight', amount: 1 },
			value: { effectName: 'value', amount: 20 },
		},
		requiredItems: [
			{ requiredItemName: 'キャロットフラワー', amount: 1 },
			{ requiredItemName: 'テイト', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ・ダーク', amount: 1 },
		],
	},
	'ヌカ・バズ': {
		itemName: 'ヌカ・バズ',
		effects: {
			caffeine: { effectName: 'caffeine' },
			hp: { effectName: 'hp', amount: 52, isOverTime: true },
			ap: { effectName: 'ap', amount: 125, isOverTime: true },
			weight: { effectName: 'weight', amount: 1 },
			value: { effectName: 'value', amount: 20 },
		},
		requiredItems: [{ requiredItemName: 'ヌカ・コーラ・ワイルド', amount: 2 }],
	},
	'ヌカ・パワー': {
		itemName: 'ヌカ・パワー',
		effects: {
			carryWeight: {
				effectName: 'carryWeight',
				amount: 60,
			},
			weight: { effectName: 'weight', amount: 1 },
			value: { effectName: 'value', amount: 20 },
		},
		requiredItems: [
			{ requiredItemName: 'ヌカ・コーラ', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ・ダーク', amount: 2 },
		],
	},
	'ヌカ・パンチ': {
		itemName: 'ヌカ・パンチ',
		effects: {
			caffeine: { effectName: 'caffeine' },
			maxAp: { effectName: 'maxAp', amount: 10, isOverTime: true },
			maxHp: { effectName: 'maxHp', amount: 30, isOverTime: true },
			rads: { effectName: 'rads', amount: -500, isOverTime: true },
			hp: { effectName: 'hp', amount: 150, isOverTime: true },
			ap: { effectName: 'ap', amount: 50, isOverTime: true },
			weight: { effectName: 'weight', amount: 1 },
			value: { effectName: 'value', amount: 20 },
		},
		requiredItems: [
			{ requiredItemName: 'ヌカ・グレープ', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ・オレンジ', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ・クォーツ', amount: 1 },
			{ requiredItemName: 'ヌカ・チェリー', amount: 1 },
		],
	},
	'ヌカ・ファンシー': {
		itemName: 'ヌカ・ファンシー',
		effects: {
			caffeine: { effectName: 'caffeine' },
			hp: { effectName: 'hp', amount: 150, isOverTime: true },
			ap: { effectName: 'ap', amount: 100, isOverTime: true },
			weight: { effectName: 'weight', amount: 1 },
			value: { effectName: 'value', amount: 20 },
		},
		requiredItems: [
			{ requiredItemName: 'ヌカ・コーラ・ワイルド', amount: 1 },
			{ requiredItemName: 'ヌカ・チェリー', amount: 1 },
		],
	},
	'ヌカ・フリー': {
		itemName: 'ヌカ・フリー',
		effects: {
			caffeine: { effectName: 'caffeine' },
			hp: { effectName: 'hp', amount: 195, isOverTime: true },
			weight: { effectName: 'weight', amount: 1 },
			value: { effectName: 'value', amount: 20 },
		},
		requiredItems: [
			{ requiredItemName: 'ヌカ・コーラ', amount: 1 },
			{ requiredItemName: '汚れた水', amount: 1 },
		],
	},
	'ヌカ・フルーティ': {
		itemName: 'ヌカ・フルーティ',
		effects: {
			caffeine: { effectName: 'caffeine' },
			hp: { effectName: 'hp', amount: 300, isOverTime: true },
			ap: { effectName: 'ap', amount: 50, isOverTime: true },
			rads: { effectName: 'rads', amount: -500, isOverTime: true },
			radResist: { effectName: 'radResist', amount: 25, isOverTime: true },
			weight: { effectName: 'weight', amount: 1 },
			value: { effectName: 'value', amount: 20 },
		},
		requiredItems: [
			{ requiredItemName: 'ヌカ・グレープ', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ・オレンジ', amount: 1 },
			{ requiredItemName: 'ヌカ・チェリー', amount: 1 },
		],
	},
	'ヌカ・ベリー': {
		itemName: 'ヌカ・ベリー',
		effects: {
			caffeine: { effectName: 'caffeine' },
			hp: { effectName: 'hp', amount: 300, isOverTime: true },
			ap: { effectName: 'ap', amount: 50, isOverTime: true },
			rads: { effectName: 'rads', amount: -500, isOverTime: true },
			weight: { effectName: 'weight', amount: 1 },
			value: { effectName: 'value', amount: 20 },
		},
		requiredItems: [
			{ requiredItemName: 'ヌカ・グレープ', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ', amount: 1 },
			{ requiredItemName: 'ヌカ・チェリー', amount: 1 },
		],
	},
	'ヌカ・ボイド': {
		itemName: 'ヌカ・ボイド',
		effects: {
			carryWeight: { effectName: 'carryWeight', amount: 25 },
			maxHp: { effectName: 'maxHp', amount: 30, isOverTime: true },
			maxAp: { effectName: 'maxAp', amount: 10, isOverTime: true },
			weight: { effectName: 'weight', amount: 1 },
			value: { effectName: 'value', amount: 20 },
		},
		requiredItems: [
			{ requiredItemName: 'ヌカ・コーラ・クアンタム', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ・ダーク', amount: 1 },
		],
	},
	'ヌカ・ボムドロップ': {
		itemName: 'ヌカ・ボムドロップ',
		effects: {
			caffeine: { effectName: 'caffeine' },
			str: { effectName: 'str', amount: 2, isOverTime: true },
			end: { effectName: 'end', amount: 2, isOverTime: true },
			agi: { effectName: 'agi', amount: 2, isOverTime: true },
			weight: { effectName: 'weight', amount: 1 },
			value: { effectName: 'value', amount: 20 },
		},
		requiredItems: [
			{ requiredItemName: 'ウォッカ', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ・ダーク', amount: 1 },
			{ requiredItemName: 'バーボン', amount: 1 },
			{ requiredItemName: 'ラム酒', amount: 1 },
		],
	},
	'ヌカ・ラッシュ': {
		itemName: 'ヌカ・ラッシュ',
		effects: {
			caffeine: { effectName: 'caffeine' },
			hp: { effectName: 'hp', amount: 999, isOverTime: true },
			ap: { effectName: 'ap', amount: 40, isOverTime: true },
			weight: { effectName: 'weight', amount: 1 },
			value: { effectName: 'value', amount: 20 },
		},
		requiredItems: [
			{ requiredItemName: 'ヌカ・コーラ・ビクトリー', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ・ワイルド', amount: 1 },
		],
	},
	'ヌカ・ラブ': {
		itemName: 'ヌカ・ラブ',
		effects: {
			caffeine: { effectName: 'caffeine' },
			hp: { effectName: 'hp', amount: 150, isOverTime: true },
			ap: { effectName: 'ap', amount: 300, isOverTime: true },
			weight: { effectName: 'weight', amount: 1 },
			value: { effectName: 'value', amount: 20 },
		},
		requiredItems: [
			{ requiredItemName: 'ヌカ・コーラ・クォーツ', amount: 1 },
			{ requiredItemName: 'ヌカ・チェリー', amount: 1 },
		],
	},
	'ヌカ・リキサー': {
		itemName: 'ヌカ・リキサー',
		effects: {
			caffeine: { effectName: 'caffeine' },
			hp: { effectName: 'hp', amount: 450, isOverTime: true },
			radResist: { effectName: 'radResist', amount: 25, isOverTime: true },
			dmgResist: { effectName: 'dmgResist', amount: 35, isOverTime: true },
			weight: { effectName: 'weight', amount: 1 },
			value: { effectName: 'value', amount: 20 },
		},
		requiredItems: [
			{ requiredItemName: 'Med-X', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ・オレンジ', amount: 1 },
		],
	},
}
