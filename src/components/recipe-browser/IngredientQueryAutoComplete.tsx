import { QueryExplain } from '@/components/recipe-browser/QueryExplain'
import { INGREDIENT_NAMES } from '@/nuka-mixer-recipe/INGREDIENT_NAMES'
import Autocomplete, {
	type AutocompleteChangeReason,
	type AutocompleteInputChangeReason,
} from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import type { FilterOptionsState } from '@mui/material/useAutocomplete'

// 「、」「,」はor。全角スペース・スペースはand。
const lastTokenRegex = /[^&|()（）\u3000、, ]+$/

// コンポーネントの外に出すことで、レンダリングごとの関数再生成を防ぐ
function filterOptions(options: string[], state: FilterOptionsState<string>) {
	const match = state.inputValue.match(lastTokenRegex)
	const searchTerm = match ? match[0].trim() : ''
	return options.filter((option) =>
		option.toLowerCase().includes(searchTerm.toLowerCase()),
	)
}

interface Props {
	inputValue: string
	setInputValue: React.Dispatch<React.SetStateAction<string>>
}

export function IngredientQueryAutoComplete(props: Props) {
	const { inputValue, setInputValue } = props

	function handleInputChange(
		_: unknown,
		newInputValue: string,
		reason: AutocompleteInputChangeReason,
	) {
		if (reason !== 'reset') {
			setInputValue(newInputValue)
		}
	}

	function handleChange(
		_: unknown,
		newValue: string | null,
		reason: AutocompleteChangeReason,
	) {
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
	}

	return (
		<>
			<Autocomplete
				freeSolo
				options={INGREDIENT_NAMES}
				inputValue={inputValue}
				value={inputValue}
				onInputChange={handleInputChange}
				onChange={handleChange}
				filterOptions={filterOptions}
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder='クアンタム&チェリー'
						label='必要素材でフィルター'
					/>
				)}
			/>
			<QueryExplain />
		</>
	)
}
