import type { Action, ExtensionType } from '../App'
import ToggleSwitch from './ToggleSwitch'

interface CardProps {
    extension: ExtensionType,
    theme: string,
    dispatch: (action: Action) => void
}

export default function ExtenstionCard({ extension, theme, dispatch }: CardProps) {
    return (
        <div className={`rounded-2xl w-full p-3 ${theme === 'dark' ? 'bg-[var(--color-neutral-800)]' : 'bg-[var(--color-neutral-0)]'}`}>
            <div className="flex gap-2">
                <img src={`${extension.logo}`} alt={`${extension.name}`} />
                <div className="">
                    <h3 className={`${theme === 'dark' ? 'text-[var(text-neutral-0)]' : 'text-[var(text-neutral-900)]'}`}>{extension.name}</h3>
                    <p className={`${theme === 'dark' ? 'text-[var(text-neutral-800)]' : 'text-[var(text-neutral-600)]'}`}>{extension.description}</p>
                </div>
            </div>
            <div className="flex justify-between pt-8">
                <button
                    className={`rounded-3xl border focus:border-[var(--color-red-400)]  py-2 px-3 ${theme === 'dark' ? 'border-[var(--color-neutral-400)]' : 'border-[var(--color-neutral-200)]'}`}
                    onClick={() => dispatch({ type: 'REMOVE_EXTENSION', payload: extension.name })}
                >Remove</button>
                <ToggleSwitch isOn={extension.isActive} onToggle={() => { dispatch({ type: 'TOGGLE_ACTIVE', payload: extension.name }) }} />
            </div>
        </div>
    )
}
