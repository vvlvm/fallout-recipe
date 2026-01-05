import type { IngredientName } from "@/types/RecipieType"
import {
  type FC,
  type PropsWithChildren,
  createContext,
  useContext,
} from "react"

type Value = IngredientName[]

const QueriedIngredientNamesContext = createContext<Value>([])

export function useQueriedIngredientNames() {
  return useContext(QueriedIngredientNamesContext)
}

interface ProviderProps extends PropsWithChildren {
  value: Value
}

export const QueriedIngredientNamesProvider: FC<ProviderProps> = ({
  value,
  children,
}) => {
  return (
    <QueriedIngredientNamesContext.Provider value={value}>
      {children}
    </QueriedIngredientNamesContext.Provider>
  )
}
