import { INGREDIENT_NAMES } from "@/constants/INGREDIENT_NAMES"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"

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
        id="ingredient-query-autocomplete"
        freeSolo
        options={OPTIONS}
        inputValue={inputValue}
        value={inputValue}
        onInputChange={(_, newInputValue, reason) => {
          if (reason !== "reset") {
            setInputValue(newInputValue)
          }
        }}
        onChange={(_, newValue, reason) => {
          if (reason === "selectOption" && typeof newValue === "string") {
            const match = inputValue.match(lastTokenRegex)
            let newQuery = ""
            if (match) {
              const token = match[0]
              const leadingSpace = token.match(/^\s*/)?.[0] ?? ""
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
          const searchTerm = match ? match[0].trim() : ""
          return options.filter((option) =>
            option.toLowerCase().includes(searchTerm.toLowerCase()),
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
    <div id="ingredient-query-explain">
      <div className="row">
        <span className="head">andとして扱われる文字</span>
        <div className="examples">
          <span className="example">&</span>
          <div>
            <span className="example"> </span>
            <span className="note">(スペース)</span>
          </div>
          <div>
            {" "}
            <span className="example">　</span>
            <span className="note">(全角スペース)</span>
          </div>
        </div>
      </div>
      <div className="row">
        <span className="head">orとして扱われる文字</span>
        <div className="examples">
          <div>
            {" "}
            <span className="example">|</span>
            <span className="note">(パイプ)</span>
          </div>
          <div>
            {" "}
            <span className="example">,</span>
            <span className="note">(スペース)</span>
          </div>
          <div>
            {" "}
            <span className="example">、</span>
            <span className="note">(全角読点)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
