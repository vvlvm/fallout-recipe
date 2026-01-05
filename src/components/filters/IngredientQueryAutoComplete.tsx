import { INGREDIENT_NAMES } from '@/constants/INGREDIENT_NAMES'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

const OPTIONS = INGREDIENT_NAMES
// 「、」「,」はor。全角スペース・スペースはand。
const lastTokenRegex = /[^&|()（）\u3000、, ]+$/

interface Props {
	inputValue: string
	setInputValue: React.Dispatch<React.SetStateAction<string>>
}

export function IngredientQueryAutoComplete(props: Props) {
	const { inputValue, setInputValue } = props

	return (
		<>
			<Autocomplete
				id='ingredient-query-autocomplete'
				freeSolo
				options={OPTIONS}
				inputValue={inputValue}
				value={inputValue}
				onInputChange={(_, newInputValue, reason) => {
					if (reason !== 'reset') {
						setInputValue(newInputValue)
					}
				}}
				onChange={(_, newValue, reason) => {
					if (reason === 'selectOption' && typeof newValue === 'string') {
						const match = inputValue.match(lastTokenRegex)
						let newQuery = ''
						if (match) {
							const token = match[0]
							const leadingSpace = token.match(/^\s*/)?.[0] ?? ''
							newQuery =
								inputValue.substring(0, match.index) + leadingSpace + newValue
						} else {
							newQuery = inputValue + newValue
						}

						setInputValue(newQuery)
					}
				}}
				filterOptions={(options, params) => {
					const { inputValue } = params
					const match = inputValue.match(lastTokenRegex)
					const searchTerm = match ? match[0].trim() : ''
					return options.filter((option) =>
						option.toLowerCase().includes(searchTerm.toLowerCase())
					)
				}}
				renderInput={(params) => <TextField {...params} />}
			/>
			<QueryExplain />
		</>
	)
}

function QueryExplain() {
	return (
		<Box
			id='ingredient-query-explain'
			sx={{
				display: ' grid',
				gridTemplateColumns: ' auto 1fr',
				gap: ' 4px',
				marginTop: ' 8px',
				marginLeft: ' 8px',

				'.row': {
					display: 'grid',
					gridColumn: 'span 2',
					gridTemplateColumns: 'subgrid',

					'.head': {
						fontSize: '0.9em',
						marginRight: '8px',
					},

					'.examples': {
						display: 'flex',
						gap: '0px 16px',

						'.example': {
							whiteSpace: 'pre',
							border: 'solid 1px',
							borderColor: 'text.secondary',
						},

						'.note': {
							fontSize: '0.8em',
							color: 'text.secondary',
						},
					},
				},
			}}
		>
			<Box className='row'>
				<Box component='span' className='head'>
					andとして扱われる文字
				</Box>
				<Box className='examples'>
					<Box component='span' className='example'>
						&
					</Box>
					<Box>
						<Box component='span' className='example'>
							{' '}
						</Box>
						<Box component='span' className='note'>
							(スペース)
						</Box>
					</Box>
					<Box>
						<Box component='span' className='example'>
							{'　'}
						</Box>
						<Box component='span' className='note'>
							(全角スペース)
						</Box>
					</Box>
				</Box>
			</Box>
			<Box className='row'>
				<Box component='span' className='head'>
					orとして扱われる文字
				</Box>
				<Box className='examples'>
					<Box>
						<Box component='span' className='example'>
							|
						</Box>
						<Box component='span' className='note'>
							(パイプ)
						</Box>
					</Box>
					<Box>
						<Box component='span' className='example'>
							,
						</Box>
					</Box>
					<Box>
						<Box component='span' className='example'>
							、
						</Box>
						<Box component='span' className='note'>
							(全角読点)
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
