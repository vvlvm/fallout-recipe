import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
	colorSchemes: {
		dark: {
			palette: {
				mode: 'dark',
				primary: {
					main: '#e3d629',
				},
			},
		},
		light: {
			palette: {
				mode: 'light',
				primary: {
					main: '#9d9312',
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
