import Box, { type BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'

export const ListLikeGrid = styled(Box)<BoxProps>(() => ({
	display: 'grid',
	gridTemplateColumns: '1fr auto',
	gap: '2px 0px',
	margin: '4px',
	width: 'fit-content',
	borderRadius: '8px',
}))

export const ItemName = styled('span')(() => ({
	whiteSpace: 'nowrap',
	marginRight: '16px',
}))

interface ListItemProps extends BoxProps {
	singleColumn?: boolean
}

export const ListItem = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'singleColumn',
})<ListItemProps>(({ singleColumn }) => ({
	display: 'grid',
	gridColumn: 'span 2',
	gridTemplateColumns: 'subgrid',
	padding: '3px 6px',
	borderRadius: '3px',
	background: 'rgba(0, 0, 0, 0.2)',

	...(singleColumn && {
		gridTemplateColumns: 'none',
		textAlign: 'center',
		[`& ${ItemName}`]: {
			marginRight: 0,
		},
	}),
}))
