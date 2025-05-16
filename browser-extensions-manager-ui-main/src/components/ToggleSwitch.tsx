interface ToggleSwitchProps {
    isOn: boolean;
    onToggle: () => void;
}

export default function ToggleSwitch({ isOn, onToggle }: ToggleSwitchProps) {
    return (
        <div
            onClick={onToggle}
            tabIndex={0}
            className={`
                w-11 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer
                transition-colors duration-300
                border-2 border-transparent focus:border-[var(--color-red-400)]
                ${isOn ? 'bg-red-500' : 'bg-gray-300'}
            `}
        >
            <div
                className={`

          bg-white w-4 h-4 rounded-full shadow-md transform duration-300
          ${isOn ? 'translate-x-5' : 'translate-x-0'}
        `}
            />
        </div>
    );
}
