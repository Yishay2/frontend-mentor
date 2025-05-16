interface HeaderProps {
    theme: 'light' | 'dark',
    changeTheme: () => void
}

export default function Header({ theme, changeTheme }: HeaderProps) {
    return (
        <div
            className={`flex justify-between items-center py-3 px-4 h-15 rounded-xl `}
            style={{
                backgroundColor: `var(${theme === 'dark' ? '--color-neutral-900' : '--color-neutral-0'})`,
            }}>
            <img src="/assets/images/logo.svg" alt="logo" />
            <button style={{
                backgroundColor: `var(${theme === 'dark' ? '--color-neutral-800' : '--color-neutral-100'})`
            }} className="pointer p-2 rounded-xl border-1 border-transparent focus:border-[var(--color-red-400)]" onClick={changeTheme}><img src={`/assets/images/icon-${theme === 'dark' ? 'sun' : 'moon'}.svg`} alt="" /></button>
        </div>
    )
}
