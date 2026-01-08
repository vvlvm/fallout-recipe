import { INGREDIENT_NAMES } from '@/constants/INGREDIENT_NAMES'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { QueryExplain } from './query-explain/QueryExplain'

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
