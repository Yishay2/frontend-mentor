import { useReducer, useState, type FormEvent } from "react"
import InputField from "./InputField";

export type MortgageType = 'repayment' | 'interestOnly';

export type StateType = {
    amount: number | null
    term: number | null
    interestRate: number | null
    mortgageType: MortgageType | null
    errors: {
        amount: string
        term: string
        interestRate: string
        mortgageType: string
    }
}

export type Action = { type: 'SET_AMOUNT' | 'SET_TERM' | 'INTEREST_RATE', payload: number } | { type: 'SET_ERROR', field: string } | { type: 'MORTGAGE_TYPE', payload: MortgageType } | { type: 'CLEAR_ALL' };

export default function MortgageCalaulator() {

    const [success, setSuccess] = useState<boolean>(false);
    const [monthlyRepayments, setMonthlyRepayments] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    const initialState: StateType = {
        amount: null,
        term: null,
        interestRate: null,
        mortgageType: null,
        errors: {
            amount: '',
            term: '',
            interestRate: '',
            mortgageType: ''
        }
    };

    const formReducer = (state: StateType, action: Action) => {
        switch (action.type) {
            case 'SET_AMOUNT':
                return {
                    ...state,
                    amount: action.payload,
                    errors: {
                        ...state.errors,
                        amount: ''
                    }
                }
            case 'SET_TERM':
                return {
                    ...state,
                    term: action.payload,
                    errors: {
                        ...state.errors,
                        term: ''
                    }
                }
            case 'INTEREST_RATE':
                return {
                    ...state,
                    interestRate: action.payload,
                    errors: {
                        ...state.errors,
                        interestRate: ''
                    }
                }
            case 'MORTGAGE_TYPE':
                return {
                    ...state,
                    mortgageType: action.payload,
                    errors: {
                        ...state.errors,
                        mortgageType: ''
                    }
                }
            case 'CLEAR_ALL':
                return initialState
            case 'SET_ERROR':
                return {
                    ...state,
                    errors: {
                        ...state.errors,
                        [action.field]: 'This field is required'
                    }
                }
            default:
                return state
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // בדיקת שדות חובה
        if (Object.values(state).some(item => item == null)) {
            if (state.amount == null) dispatch({ type: 'SET_ERROR', field: 'amount' });
            if (state.term == null) dispatch({ type: 'SET_ERROR', field: 'term' });
            if (state.interestRate == null) dispatch({ type: 'SET_ERROR', field: 'interestRate' });
            if (state.mortgageType == null) dispatch({ type: 'SET_ERROR', field: 'mortgageType' });
            setSuccess(false);
            return;
        }

        setSuccess(true);

        const principal = state.amount as number;
        const annualRate = state.interestRate as number / 100;
        const monthlyRate = annualRate / 12;
        const numberOfPayments = (state.term as number) * 12;

        if (state.mortgageType === "repayment") {
            // חישוב תשלום חודשי + סכום כולל
            const monthlyPayment = (principal * monthlyRate) /
                (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

            setMonthlyRepayments(monthlyPayment);
            setTotal(monthlyPayment * numberOfPayments); // סכום כולל

        } else if (state.mortgageType === "interestOnly") {
            // חישוב ריבית בלבד + סכום כולל
            const interestOnlyPayment = principal * annualRate / 12;
            setMonthlyRepayments(interestOnlyPayment);
            setTotal(interestOnlyPayment * numberOfPayments + principal); // ריבית + קרן
        }
    }


    const [state, dispatch] = useReducer(formReducer, initialState);

    return (
        <div className="w-full h-full lg:h-auto lg:w-1/2 flex flex-col lg:flex-row  bg-white md:rounded-3xl">
            <div className="w-full md:w-1/2 flex flex-col gap-4 p-5">
                <div className="flex flex-col lg:flex-row  items-start justify-between mb-5">
                    <h1 className="font-bold text-slate-800 text-2xl">Mortgage Calculator</h1>
                    <button className="underline pointer outline-offset-4 text-slate-700" onClick={() => dispatch({ type: 'CLEAR_ALL' })}>Clear All</button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl">
                    <InputField symbol={"£"} name="Mortgage Amount" symbolPosition="left" dispatch={(str) => dispatch({ type: 'SET_AMOUNT', payload: +str })} hasError={state.errors.amount != ''} value={state.amount} />
                    <div className="xl:flex justify-between gap-4">
                        <InputField symbol="years" name="mortgageTerm" symbolPosition="right" dispatch={(str) => dispatch({ type: 'SET_TERM', payload: +str })} hasError={state.errors.term != ''} value={state.term} />
                        <InputField symbol="%" name="interestRate" symbolPosition="right" dispatch={(str) => dispatch({ type: 'INTEREST_RATE', payload: +str })} hasError={state.errors.interestRate != ''} value={state.interestRate} />
                    </div>

                    <p className="text-slate-700 text-xl font-semibold">Mortgage Type</p>
                    <div className="flex flex-col gap-4">
                        <div className="flex p-4 border rounded-lg items-center gap-4 pointer transition-colors has-[:checked]:bg-lime-50 has-[:checked]:border-lime hover:bg-lime-50 hover:border-lime">
                            <input
                                type="radio"
                                name="mortgageType"
                                id="repayment1"
                                className="w-5 h-5 appearance-none rounded-full border-3 border-slate-500 checked:bg-lime checked:border-none checked:ring-offset-2 checked:ring-2 checked:ring-lime pointer"
                                onChange={() => dispatch({ type: 'MORTGAGE_TYPE', payload: 'repayment' })}
                            />
                            <label htmlFor="repayment1" className="text-slate-900 font-bold text-xl pointer">
                                Repayment
                            </label>
                        </div>

                        <div className="flex p-4 border rounded-lg items-center gap-4 pointer transition-colors has-[:checked]:bg-lime-50 has-[:checked]:border-lime hover:bg-lime-50 hover:border-lime">
                            <input
                                type="radio"
                                name="mortgageType"
                                id="repayment2"
                                className="w-5 h-5 appearance-none rounded-full border-3 border-slate-500 checked:bg-lime checked:border-lime checked:ring-offset-2 checked:ring-2 checked:ring-lime pointer"
                                onChange={() => dispatch({ type: 'MORTGAGE_TYPE', payload: 'interestOnly' })}
                            />
                            <label htmlFor="repayment2" className="text-slate-900 font-bold text-xl pointer">
                                Interest Only
                            </label>
                        </div>
                    </div>
                    {state.errors.mortgageType != '' && <p className="text-red">This field is required</p>}

                    <button className="pointer bg-lime max-w-fit flex px-6 py-3 rounded-3xl mt-4 xl:text-xl font-bold text-slate-900" type="submit">
                        <img src="/assets/images/icon-calculator.svg" alt="" className="pr-2" /> Calculate Repayments
                    </button>
                </form>
            </div>

            <div className="w-full md:w-1/2 bg-slate-900 text-center md:rounded-r-3xl md:rounded-bl-[64px] p-10 ">
                {!success ? (
                    <div className="flex justify-center items-center flex-col">
                        <img src="/assets/images/illustration-empty.svg" alt="empty" />
                        <h2 className="font-semibold text-xl mt-2 text-slate-100">Results shown here</h2>
                        <p className="text-slate-300">Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-8">
                        <h2 className="text-left **:font-semibold text-slate-100 text-2xl">Your results</h2>
                        <p className="text-slate-300 text-left">Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repaments" again.</p>
                        <div className="border-4 border-t-lime rounded-xl bg-slate-900 flex flex-col text-left gap-2 p-1 lg:p-6">
                            <p className="text-slate-300">Your monthly repayments</p>
                            <h2 className="text-lime text-sm lg:text-xl xl:text-4xl font-bold">£{monthlyRepayments.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                            <hr className="my-10 border-1 h-0.25 border-t-slate-700" />
                            <p className="text-slate-300">Total you'll repay over the term</p>
                            <p className="text-white text-sm lg:text-lg xl:text-xl font-semibold">£{total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}
