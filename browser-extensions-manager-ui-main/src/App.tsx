import { useReducer } from "react"
import Header from "./components/Header";
import ExtenstionList from "./components/ExtenstionList";
import data from './data.json'

export interface ExtensionType {
  logo: string
  name: string,
  description: string,
  isActive: boolean
}

type StateType = {
  extensions: ExtensionType[],
  filter: 'ALL' | 'ACTIVE' | 'INACTIVE',
  theme: 'light' | 'dark',
}

const initialState: StateType = {
  extensions: data,
  filter: 'ALL',
  theme: 'light'
}

export type Action =
  { type: 'TOGGLE_THEME' } |
  { type: 'TOGGLE_ACTIVE', payload: string } |
  { type: 'SET_FILTER', payload: 'ALL' | 'ACTIVE' | 'INACTIVE' } |
  { type: 'REMOVE_EXTENSION', payload: string }

const extenstionReducer = (state: StateType, action: Action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      const newTheme: 'light' | 'dark' = state.theme === 'light' ? 'dark' : 'light';
      return {
        ...state,
        theme: newTheme
      }
    case 'TOGGLE_ACTIVE':
      return {
        ...state,
        extensions: state.extensions.map(ext => ext.name === action.payload ? { ...ext, isActive: !ext.isActive } : ext)
      }
    case 'SET_FILTER':
      const filteredExtenstions = action.payload === 'ALL' ? initialState.extensions : action.payload === 'ACTIVE' ? initialState.extensions.filter(ext => ext.isActive) : initialState.extensions.filter(ext => !ext.isActive);
      return {
        ...initialState,
        extensions: filteredExtenstions,
        filter: action.payload
      }
    case 'REMOVE_EXTENSION':
      return {
        ...state,
        extensions: state.extensions.filter(ext => ext.name !== action.payload)
      }
    default:
      return state
  }
}

const App = () => {

  const [state, dispatch] = useReducer(extenstionReducer, initialState);

  return (
    <div className={`font-noto p-8 bg-${state.theme}-gradient h-screen md:px-34 md:py-10 flex flex-col gap-8 `}>
      <Header theme={state.theme} changeTheme={() => dispatch({ type: 'TOGGLE_THEME' })} />
      <ExtenstionList theme={state.theme} extensions={state.extensions} dispatch={dispatch} />
    </div>
  )
}

export default App