import type { RecipeMap } from '../types/RecipieType'

export const RECIPE_MAP: RecipeMap = {
	'ニューカ・コーラ': {
		itemName: 'ニューカ・コーラ',
		effects: {
			Caffeine: { effectName: 'Caffeine' },
			HP: {
				effectName: 'HP',
				amount: 300,
				isOverTime: true,
			},
			AP: {
				effectName: 'AP',
				amount: 50,
				isOverTime: true,
			},
			Weight: {
				effectName: 'Weight',
				amount: 1,
			},
			Value: {
				effectName: 'Value',
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
			Caffeine: { effectName: 'Caffeine' },
			MaxAP: {
				effectName: 'MaxAP',
				amount: 10,
				isOverTime: true,
			},
			MaxHP: {
				effectName: 'MaxHP',
				amount: 30,
				isOverTime: true,
			},
			Rads: {
				effectName: 'Rads',
				amount: -500,
				isOverTime: true,
			},
			Weight: {
				effectName: 'Weight',
				amount: 1,
			},
			Value: {
				effectName: 'Value',
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
			Caffeine: { effectName: 'Caffeine' },
			HP: {
				effectName: 'HP',
				amount: 3600,
				isOverTime: true,
			},
			MaxHP: {
				effectName: 'MaxHP',
				amount: 50,
				isOverTime: true,
			},
			AP: {
				effectName: 'AP',
				amount: 1049,
				isOverTime: true,
			},
			MaxAP: {
				effectName: 'MaxAP',
				amount: 20,
				isOverTime: true,
			},
			Weight: {
				effectName: 'Weight',
				amount: 1,
			},
			Value: {
				effectName: 'Value',
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
			CarryWeight: {
				effectName: 'CarryWeight',
				amount: 35,
			},
			HP: {
				effectName: 'HP',
				amount: 75,
				isOverTime: true,
			},
			AP: {
				effectName: 'AP',
				amount: 300,
				isOverTime: true,
			},
			MaxAP: {
				effectName: 'MaxAP',
				amount: 20,
				isOverTime: true,
			},
			MaxHP: {
				effectName: 'MaxHP',
				amount: 50,
				isOverTime: true,
			},
			RadResist: {
				effectName: 'RadResist',
				amount: 35,
				isOverTime: true,
			},
			Weight: {
				effectName: 'Weight',
				amount: 1,
			},
			Value: {
				effectName: 'Value',
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
			Caffeine: { effectName: 'Caffeine' },
			HP: {
				effectName: 'HP',
				amount: 150,
				isOverTime: true,
			},
			AP: {
				effectName: 'AP',
				amount: 50,
				isOverTime: true,
			},
			RadResist: {
				effectName: 'RadResist',
				amount: 25,
				isOverTime: true,
			},
			Weight: {
				effectName: 'Weight',
				amount: 1,
			},
			Value: {
				effectName: 'Value',
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
			Caffeine: { effectName: 'Caffeine' },
			HP: {
				effectName: 'HP',
				amount: 150,
				isOverTime: true,
			},
			AP: {
				effectName: 'AP',
				amount: 50,
				isOverTime: true,
			},
			Weight: {
				effectName: 'Weight',
				amount: 1,
			},
			Value: {
				effectName: 'Value',
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
			CarryWeight: { effectName: 'CarryWeight', amount: 25 },
			HP: { effectName: 'HP', amount: 225, isOverTime: true },
			AP: { effectName: 'AP', amount: 50, isOverTime: true },
			Weight: { effectName: 'Weight', amount: 1 },
			Value: { effectName: 'Value', amount: 20 },
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
			Caffeine: { effectName: 'Caffeine' },
			HP: { effectName: 'HP', amount: 52, isOverTime: true },
			AP: { effectName: 'AP', amount: 125, isOverTime: true },
			Weight: { effectName: 'Weight', amount: 1 },
			Value: { effectName: 'Value', amount: 20 },
		},
		requiredItems: [{ requiredItemName: 'ヌカ・コーラ・ワイルド', amount: 2 }],
	},
	'ヌカ・パワー': {
		itemName: 'ヌカ・パワー',
		effects: {
			CarryWeight: {
				effectName: 'CarryWeight',
				amount: 60,
			},
			Weight: { effectName: 'Weight', amount: 1 },
			Value: { effectName: 'Value', amount: 20 },
		},
		requiredItems: [
			{ requiredItemName: 'ヌカ・コーラ', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ・ダーク', amount: 2 },
		],
	},
	'ヌカ・パンチ': {
		itemName: 'ヌカ・パンチ',
		effects: {
			Caffeine: { effectName: 'Caffeine' },
			MaxAP: { effectName: 'MaxAP', amount: 10, isOverTime: true },
			MaxHP: { effectName: 'MaxHP', amount: 30, isOverTime: true },
			Rads: { effectName: 'Rads', amount: -500, isOverTime: true },
			HP: { effectName: 'HP', amount: 150, isOverTime: true },
			AP: { effectName: 'AP', amount: 50, isOverTime: true },
			Weight: { effectName: 'Weight', amount: 1 },
			Value: { effectName: 'Value', amount: 20 },
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
			Caffeine: { effectName: 'Caffeine' },
			HP: { effectName: 'HP', amount: 150, isOverTime: true },
			AP: { effectName: 'AP', amount: 100, isOverTime: true },
			Weight: { effectName: 'Weight', amount: 1 },
			Value: { effectName: 'Value', amount: 20 },
		},
		requiredItems: [
			{ requiredItemName: 'ヌカ・コーラ・ワイルド', amount: 1 },
			{ requiredItemName: 'ヌカ・チェリー', amount: 1 },
		],
	},
	'ヌカ・フリー': {
		itemName: 'ヌカ・フリー',
		effects: {
			Caffeine: { effectName: 'Caffeine' },
			HP: { effectName: 'HP', amount: 195, isOverTime: true },
			Weight: { effectName: 'Weight', amount: 1 },
			Value: { effectName: 'Value', amount: 20 },
		},
		requiredItems: [
			{ requiredItemName: 'ヌカ・コーラ', amount: 1 },
			{ requiredItemName: '汚れた水', amount: 1 },
		],
	},
	'ヌカ・フルーティ': {
		itemName: 'ヌカ・フルーティ',
		effects: {
			Caffeine: { effectName: 'Caffeine' },
			HP: { effectName: 'HP', amount: 300, isOverTime: true },
			AP: { effectName: 'AP', amount: 50, isOverTime: true },
			Rads: { effectName: 'Rads', amount: -500, isOverTime: true },
			RadResist: { effectName: 'RadResist', amount: 25, isOverTime: true },
			Weight: { effectName: 'Weight', amount: 1 },
			Value: { effectName: 'Value', amount: 20 },
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
			Caffeine: { effectName: 'Caffeine' },
			HP: { effectName: 'HP', amount: 300, isOverTime: true },
			AP: { effectName: 'AP', amount: 50, isOverTime: true },
			Rads: { effectName: 'Rads', amount: -500, isOverTime: true },
			Weight: { effectName: 'Weight', amount: 1 },
			Value: { effectName: 'Value', amount: 20 },
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
			CarryWeight: { effectName: 'CarryWeight', amount: 25 },
			MaxHP: { effectName: 'MaxHP', amount: 30, isOverTime: true },
			MaxAP: { effectName: 'MaxAP', amount: 10, isOverTime: true },
			Weight: { effectName: 'Weight', amount: 1 },
			Value: { effectName: 'Value', amount: 20 },
		},
		requiredItems: [
			{ requiredItemName: 'ヌカ・コーラ・クアンタム', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ・ダーク', amount: 1 },
		],
	},
	'ヌカ・ボムドロップ': {
		itemName: 'ヌカ・ボムドロップ',
		effects: {
			Caffeine: { effectName: 'Caffeine' },
			STR: { effectName: 'STR', amount: 2, isOverTime: true },
			END: { effectName: 'END', amount: 2, isOverTime: true },
			AGI: { effectName: 'AGI', amount: 2, isOverTime: true },
			Weight: { effectName: 'Weight', amount: 1 },
			Value: { effectName: 'Value', amount: 20 },
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
			Caffeine: { effectName: 'Caffeine' },
			HP: { effectName: 'HP', amount: 999, isOverTime: true },
			AP: { effectName: 'AP', amount: 40, isOverTime: true },
			Weight: { effectName: 'Weight', amount: 1 },
			Value: { effectName: 'Value', amount: 20 },
		},
		requiredItems: [
			{ requiredItemName: 'ヌカ・コーラ・ビクトリー', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ・ワイルド', amount: 1 },
		],
	},
	'ヌカ・ラブ': {
		itemName: 'ヌカ・ラブ',
		effects: {
			Caffeine: { effectName: 'Caffeine' },
			HP: { effectName: 'HP', amount: 150, isOverTime: true },
			AP: { effectName: 'AP', amount: 300, isOverTime: true },
			Weight: { effectName: 'Weight', amount: 1 },
			Value: { effectName: 'Value', amount: 20 },
		},
		requiredItems: [
			{ requiredItemName: 'ヌカ・コーラ・クォーツ', amount: 1 },
			{ requiredItemName: 'ヌカ・チェリー', amount: 1 },
		],
	},
	'ヌカ・リキサー': {
		itemName: 'ヌカ・リキサー',
		effects: {
			Caffeine: { effectName: 'Caffeine' },
			HP: { effectName: 'HP', amount: 450, isOverTime: true },
			RadResist: { effectName: 'RadResist', amount: 25, isOverTime: true },
			DMGResist: { effectName: 'DMGResist', amount: 35, isOverTime: true },
			Weight: { effectName: 'Weight', amount: 1 },
			Value: { effectName: 'Value', amount: 20 },
		},
		requiredItems: [
			{ requiredItemName: 'Med-X', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ', amount: 1 },
			{ requiredItemName: 'ヌカ・コーラ・オレンジ', amount: 1 },
		],
	},
}
