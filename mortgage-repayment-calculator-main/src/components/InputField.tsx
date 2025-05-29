
interface InputFieldProps {
    symbol: string;
    name: string;
    symbolPosition?: 'left' | 'right';
    value: number | null,
    hasError: boolean,
    dispatch: (n: number) => void
}

export default function InputField({ symbol, name, hasError, symbolPosition, value, dispatch }: InputFieldProps) {
    const symbolElement = (
        <span
            className={`px-4 py-2 text-xl font-semibold 
                ${symbolPosition === 'left' ? 'rounded-l-lg' : 'rounded-r-lg'} 
                ${!hasError ? 'bg-slate-100' : 'bg-red text-white'} ${!hasError ? 'group-focus-within:bg-lime' : 'group-focus-within:bg-red'} transition-colors duration-200`}
        >
            {symbol}
        </span>
    );

    return (
        <div className="flex flex-col gap-3">
            <label htmlFor={name} className="text-slate-700 text-xl font-semibold">
                {name}
            </label>

            {/* עטיפה שתקבל את focus-within */}
            <div className={`group flex border rounded-lg focus-within:border border-slate-300 hover:border-slate-700 ${!hasError ? 'focus-within:border-lime' : 'focus-within:border-red'} transition duration-200 pointer`}>
                {symbolPosition === 'left' && symbolElement}

                <input
                    type="number"
                    name={name}
                    className="w-full input-no-arrows focus:outline-none px-2 pointer"
                    onChange={(e) => dispatch(+e.target.value)}
                    value={value ?? ''} // הוספה של value
                />

                {symbolPosition === 'right' && symbolElement}
            </div>
            {hasError && <p className="text-red">This field is required</p>}
        </div>
    );
}
