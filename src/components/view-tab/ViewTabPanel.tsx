import type { ViewTabId } from '@/types/ViewTabId'
import Box, { type BoxProps } from '@mui/material/Box'
import type { ElementType } from 'react'

type ViewPanelProps<C extends ElementType = 'div'> = {
	/**
	 * コンポーネントの`id`と`aria-labelledby`に流用する
	 */
	tabId: ViewTabId
	activeTab: ViewTabId
	component?: C
} & Omit<BoxProps<C>, 'id' | 'aria-labelledby' | 'role' | 'hidden'>

/**
 * id, aria-labelledby, role, hidden はこのコンポーネントが管理する
 */
export function ViewTabPanel<C extends ElementType = 'div'>({
	tabId,
	activeTab,
	...boxProps
}: ViewPanelProps<C>) {
	const { children, ...other } = boxProps

	return (
		<Box
			id={`view-tabpanel-${tabId}`}
			aria-labelledby={`view-tab-${tabId}`}
			role='tabpanel'
			hidden={tabId !== activeTab}
			{...other}
		>
			{children}
		</Box>
	)
}
