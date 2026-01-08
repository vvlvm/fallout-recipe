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

declare module '@mui/material/Typography' {
	interface TypographyPropsColorOverrides {
		highlight: true
	}
}

declare module '@mui/material/SvgIcon' {
	interface SvgIconPropsColorOverrides {
		highlight: true
	}
}
