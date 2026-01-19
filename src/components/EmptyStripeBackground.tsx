import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

export const EmptyStripeBackground = styled(Box)(({ theme }) => {
	const base = theme.palette.background.default
	const stripe = theme.darken(theme.palette.background.paper, 0.3)

	return {
		height: '100dvh',
		backgroundImage: `
      repeating-linear-gradient(
        45deg,
        ${base} 0,
        ${base} 12px,
        ${stripe} 12px,
        ${stripe} 24px
      )
    `,
	}
})
