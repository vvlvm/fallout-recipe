import Box, { type BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'

/**
 * カラムが2つあるリストの縦方向をそろえるためのグリッド
 */
export const AlignedTwoColumnGrid = styled(Box)<BoxProps>(() => ({
	display: 'grid',
	gridTemplateColumns: '1fr auto',
	gap: '2px 0px',
	margin: '4px',
	width: 'fit-content',
	borderRadius: '8px',
}))
