import { createContext } from 'react'
import type { Value } from './Value'

export const QueriedEffectNamesContext = createContext<Value>(new Set())
