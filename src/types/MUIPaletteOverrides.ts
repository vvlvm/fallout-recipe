import type { PaletteColorOptions } from '@mui/material/styles'
import type { PaletteColor } from '@mui/material/styles'

declare module '@mui/material/styles' {
	interface Palette {
		highlight: PaletteColor
	}

	interface PaletteOptions {
		highlight?: PaletteColorOptions
	}
}
