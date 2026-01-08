import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { yellow, lime } from '@mui/material/colors'

const theme = createTheme({
	colorSchemes: {
		dark: {
			palette: {
				mode: 'dark',
				primary: {
					main: yellow['500'],
				},
			},
		},
		light: {
			palette: {
				mode: 'light',
				primary: {
					main: lime['800'],
				},
			},
		},
	},
})

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</StrictMode>
)
