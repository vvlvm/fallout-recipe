import { lightGreen, lime, yellow } from '@mui/material/colors'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'

const theme = createTheme({
	colorSchemes: {
		dark: {
			palette: {
				mode: 'dark',
				primary: {
					main: yellow['500'],
				},
				highlight: {
					main: lightGreen['A700'],
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
