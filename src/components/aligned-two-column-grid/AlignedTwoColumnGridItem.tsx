import Box, { type BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'

export interface AlignedTwoColumnGridItemProps extends BoxProps {
	singleColumn?: boolean
}

export const AlignedTwoColumnGridItem = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'singleColumn',
})<AlignedTwoColumnGridItemProps>(({ singleColumn }) => ({
	display: 'grid',
	gridColumn: 'span 2',
	gridTemplateColumns: 'subgrid',
	padding: '3px 6px',
	borderRadius: '3px',
	background: 'rgba(0, 0, 0, 0.2)',
	alignItems: 'center',

	...(singleColumn && {
		gridTemplateColumns: 'none',
		textAlign: 'center',
	}),
}))
