import { useState } from "react"
import data from '../data.json';
import ExtenstionCard from "./ExtenstionCard";
import type { Action, ExtensionType } from '../App'

type ExtensionListProps = {
    theme: 'light' | 'dark',
    extensions: ExtensionType[],
    dispatch: (action: Action) => void
}

export default function ExtenstionList({ theme, extensions, dispatch }: ExtensionListProps) {
    const [activeButton, setActiveButton] = useState<string>('All');
    const buttons = ['All', 'Active', 'InActive']

    console.log(data);

    const handleFilter = (label: string) => {
        setActiveButton(label);
        dispatch({ type: 'SET_FILTER', payload: label.toUpperCase() as 'ALL' | 'ACTIVE' | 'INACTIVE' });
    }

    return (
        <div className="flex flex-col gap-2 md:gap-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row">
                <h1 className={`font-bold text-center text-3xl ${theme === 'dark'
                    ? 'text-[var(--color-neutral-0)]'
                    : 'text-[var(--color-neutral-900)]'}`}>Extension List</h1>
                <div className="flex gap-2 justify-center items-center">
                    {buttons.map(label => (
                        <button
                            key={label}
                            onClick={() => handleFilter(label)}
                            className={`
                            rounded-3xl py-2 px-4 pointer
                            border-2 border-transparent focus:border-[var(--color-red-400)]
                            ${activeButton === label
                                    ? (theme === 'dark' ? 'bg-[var(--color-red-400)] text-[var(--color-neutral-900)]' : 'bg-[var(--color-red-700)] text-[var(--color-neutral-0)]')
                                    : theme === 'dark' ? 'bg-[var(--color-neutral-700)] text-[var(--color-neutral-0)]' : 'bg-[var(--color-neutral-0)] text-[var(--color-neutral-900)]'
                                }
                    `}>
                            {label}
                        </button>
                    ))}

                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {extensions.map(extension => <ExtenstionCard key={extension.name} extension={extension} theme={theme} dispatch={dispatch} />)}
            </div>
        </div >
    )
}
