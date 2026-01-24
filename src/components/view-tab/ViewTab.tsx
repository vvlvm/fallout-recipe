import type { ViewTabId } from '@/types/ViewTabId'
import Tab, { type TabProps } from '@mui/material/Tab'

export type CustomTabProps = Omit<TabProps, 'id' | 'aria-controls'> & {
	/**
	 * コンポーネントのidとvalueとaria-controlsに流用する
	 */
	tabId: ViewTabId
	/**
	 * 試行錯誤したんだけどvalueはViewTab使う側で指定しないと現状ダメかも。
	 * <Tab
	 *   id={`view-tab-${tabId}`}
	 *   aria-controls={`view-tabpanel-${tabId}`}
	 *   {...others}
	 *   // others.valueに上書きされるから
	 *   value={tabId}
	 * />
	 * みたいにvalueも自動で指定したかったけど、
	 * MUIの仕様なのか
	 * MUI: The `value` provided to the Tabs component is invalid.
	 * None of the Tabs' children match with "recipeBrowser".
	 * You can provide one of the following values: 0, 1, 2.
	 * っていうエラーが出る。
	 * othersオブジェクトをconsole.logした結果が
	 * {
	 *   "label": "マークした材料",
	 *   "fullWidth": false,
	 *   "indicator": false,
	 *   "selected": false,
	 *   "textColor": "primary",
	 *   "value": 1
	 * }
	 * なので<Tabs>直下のコンポーネントでvalueを指定しないと
	 * Tabsがカスタムvalueって認識しないのかもしれない
	 */
	value: ViewTabId
}

/**
 * @param {CustomTabProps} props
 * @param {SelectToolTabId} props.tabId - `id`と`value`と`aria-controls`の生成に使用するタブ識別子
 */
export function ViewTab({ tabId, ...others }: CustomTabProps) {
	return (
		<Tab
			id={`view-tab-${tabId}`}
			aria-controls={`view-tabpanel-${tabId}`}
			{...others}
		/>
	)
}
