type HeaderProps = {
  theme: string,
  setTheme: (s: string) => void
}

export default function Header({ theme, setTheme }: HeaderProps) {
  return (
    <div className="flex  items-center justify-between p-4">
      <div><img src="/assets/images/logo.svg" alt="logo" /></div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}><img src={`/assets/images/${theme === 'light' ? 'icon-moon' : 'icon-sun'}.svg`} alt='switch mode' /></button>
    </div>
  )
}
