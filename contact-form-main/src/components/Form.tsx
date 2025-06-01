import { useReducer, useState, type FormEvent } from "react";

type QueryType = 'GENERAL_ENQUIRY' | 'SUPPORT_REQUEST' | null;

type StateType = {
    firstName: string;
    lastName: string;
    email: string;
    queryType: QueryType;
    message: string;
    confirm: boolean;
    errors: {
        firstName: string;
        lastName: string;
        email: string;
        queryType: string;
        message: string;
        confirm: string;
    };
};

type FieldKey = keyof Omit<StateType, 'errors'>;

type Action =
    | { type: 'SET_FIELD'; field: FieldKey; value: string | boolean }
    | { type: 'SET_ERROR'; field: keyof StateType['errors']; value: string }
    | { type: 'RESET' };

export default function ContactForm() {
    const initialState: StateType = {
        firstName: '',
        lastName: '',
        email: '',
        queryType: null,
        message: '',
        confirm: false,
        errors: {
            firstName: '',
            lastName: '',
            email: '',
            queryType: '',
            message: '',
            confirm: '',
        }
    };

    const [success, setSuccess] = useState<boolean>(false);

    const formReducer = (state: StateType, action: Action): StateType => {
        switch (action.type) {
            case 'SET_FIELD':
                return {
                    ...state,
                    [action.field]: action.value
                };
            case 'SET_ERROR':
                return {
                    ...state,
                    errors: {
                        ...state.errors,
                        [action.field]: action.value
                    }
                };
            case 'RESET':
                return initialState;
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(formReducer, initialState);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        let hasError = false;
        (['firstName', 'lastName', 'email', 'queryType', 'message', 'confirm'] as const).forEach((field) => {
            const value = state[field];
            if (value === null || value === '' || value === false) {
                hasError = true;
                dispatch({ type: 'SET_ERROR', field, value: 'This field is required' });
            } else {
                dispatch({ type: 'SET_ERROR', field, value: '' }); // Clear previous errors
            }
        });

        if (hasError) return;

        setSuccess(true);
        setTimeout(() => {
            dispatch({ type: 'RESET' });
            setSuccess(false);
        }, 5000);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col gap-4 text-gray-700 text-sm font-semibold mx-auto">
            <h1 className="text-gray-900 font-bold text-xl">Contact Us</h1>

            <div className="flex flex-col xl:flex-row justify-between gap-4">
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="firstName">First Name<span className="text-green-600">*</span></label>
                    <input
                        id="firstName"
                        type="text"
                        className="rounded border border-gray-500 p-2 focus:outline-green-200"
                        value={state.firstName}
                        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'firstName', value: e.target.value })}
                    />
                    {state.errors.firstName && <p className="text-red-500">{state.errors.firstName}</p>}
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="lastName">Last Name<span className="text-green-600">*</span></label>
                    <input
                        id="lastName"
                        type="text"
                        className="rounded border border-gray-500 p-2 focus:outline-green-200"
                        value={state.lastName}
                        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'lastName', value: e.target.value })}
                    />
                    {state.errors.lastName && <p className="text-red-500">{state.errors.lastName}</p>}
                </div>
            </div>

            <label htmlFor="email">Email Address <span className="text-green-600">*</span></label>
            <input
                id="email"
                type="text"
                className="focus:outline-green-200 border border-gray-500 rounded p-2"
                value={state.email}
                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
            />
            {state.errors.email && <p className="text-red-500">{state.errors.email}</p>}

            <label>Query Type <span className="text-green-600">*</span></label>
            <div className="flex justify-between gap-2">
                {[
                    { value: 'GENERAL_ENQUIRY', label: 'General Enquiry' },
                    { value: 'SUPPORT_REQUEST', label: 'Support Request' }
                ].map(({ value, label }) => (
                    <label
                        key={value}
                        className={`focus:outline-green-200 border p-2 flex items-center w-full rounded cursor-pointer ${state.queryType === value ? 'bg-green-200 border-green-600' : 'border-gray-400'}`}
                    >
                        <input
                            type="radio"
                            name="queryType"
                            value={value}
                            checked={state.queryType === value}
                            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'queryType', value: e.target.value })}
                            className="hidden"
                        />
                        {state.queryType === value ? (
                            <img src="/assets/images/icon-radio-selected.svg" alt="selected" className="w-5 h-5" />
                        ) : (
                            <div className="w-4 h-4 border rounded-full border-gray-500"></div>
                        )}
                        <span className="pl-2">{label}</span>
                    </label>
                ))}
            </div>
            {state.errors.queryType && <p className="text-red-500">{state.errors.queryType}</p>}

            <label htmlFor="message">Message <span className="text-green-600">*</span></label>
            <textarea
                id="message"
                className="border border-gray-500 rounded p-2 focus:outline-green-200 resize-none overflow-hidden"
                value={state.message}
                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'message', value: e.target.value })}
                rows={3}
                style={{ minHeight: '60px', maxHeight: '120px' }}
            />
            {state.errors.message && <p className="text-red-500">{state.errors.message}</p>}

            <label className="flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={state.confirm}
                    onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'confirm', value: e.target.checked })}
                    className="hidden"
                />
                {state.confirm ? (
                    <img src="/assets/images/icon-checkbox-check.svg" alt="checked" className="w-5 h-5" />
                ) : (
                    <div className="w-5 h-5 border border-gray-500 rounded"></div>
                )}
                <span className="pl-2 text-sm">I consent to being contacted by the team <span className="text-green-600">*</span></span>
            </label>
            {state.errors.confirm && <p className="text-red-500">{state.errors.confirm}</p>}

            <button type="submit" className="bg-green-600 text-white p-2 rounded-lg text-sm">
                Submit
            </button>

            {success && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white p-4 rounded-lg">
                    <div className="flex gap-2 items-center">
                        <img src="/assets/images/icon-success-check.svg" alt="success" />
                        <p>Message sent!</p>
                    </div>
                    <p className="text-sm mt-1">Thanks for completing the form. We'll be in touch soon!</p>
                </div>
            )}
        </form>
    );
}
