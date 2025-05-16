import Header from './components/Header'
import ExtenstionList from './components/ExtenstionList'
import { useState } from 'react'

export default function App() {
  const [theme, setTheme] = useState<string>('dark');

  return (
    <div className={`h-screen px-40 py-10 flex text-neutral-100 flex-col gap-4 ${theme === 'light' ? 'bg-light-gradient' : 'bg-dark-gradient'}`}>
      <Header theme={theme} setTheme={setTheme} />
      <ExtenstionList />
    </div>
  )
}
