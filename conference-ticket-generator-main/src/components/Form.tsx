import { type FormEvent } from "react"
import type { Action, StateType } from "../App";

type FormProps = {
    state: StateType
    dispatch: (action: Action) => void
    setIsRegistered: (bool: boolean) => void
}

export default function Form({ state, dispatch, setIsRegistered }: FormProps) {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (file?.size) {
            console.log(file);
            if (file.size > 500 * 8) {
                dispatch({ type: 'UPDATE_ERROR', payload: { field: 'file', value: 'File too large, please upload a photo under 500kb' } })
            } else {
                dispatch({ type: 'UPDATE_FILE', payload: file as File })
            }
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!state.email.includes("@") || !state.file) {
            if (!state.email.includes("@")) {
                dispatch({ type: 'UPDATE_ERROR', payload: { field: 'email', value: 'Please enter a valid email address.' } })
            }
            if (!state.file) {
                dispatch({ type: 'UPDATE_ERROR', payload: { field: 'file', value: 'File too large, please upload a photo under 500KB.' } })
            }
        } else {
            setIsRegistered(true);
        }
    }

    return (
        <div className="flex flex-col gap-4 w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
            <h1 className="text-4xl text-center">Your Journey to Coding Conf 2025 Starts Here!</h1>
            <p className="text-center">Secure your spot at next year's biggest coding conference</p>
            <form action="" className="px-4 flex flex-col gap-1" onSubmit={handleSubmit}>
                <label htmlFor="file">Upload Avatar</label>
                <div className="border border-dashed rounded-xl flex flex-col items-center gap-4 p-2 focus:outline-neutral-500 outline-offset-4 pointer hover:bg-neutral-300/20" tabIndex={0} onClick={() => document.getElementById("upload")?.click()}>
                    <input type="file" name="file" className="hidden" id="upload" onChange={handleFileChange} />
                    <div className="bg-neutral-700 p-2 rounded-xl mt-4">
                        {!state.file ?
                            <img src="/assets/images/icon-upload.svg" alt="" /> :
                            <img
                                src={URL.createObjectURL(state.file)}
                                alt="Preview"
                                className="w-12 h-12 object-cover rounded-lg"
                            />
                        }
                    </div>
                    {!state.file ? <p className="text-sm text-neutral-500">Drag and drop or click to upload</p> : <div className="flex justify-around w-3/4 px-4">
                        <button onClick={(e) => { e.stopPropagation(); dispatch({ type: 'UPDATE_FIELD', payload: { field: 'file', value: '' } }) }} className="bg-neutral-600/30 text-sm text-neutral-500 py-2 px-4 rounded underline underline-offset-4">Remove image</button>
                        <button onClick={() => document.getElementById("upload")?.click()} className="py-2 px-4 text-neutral-500 rounded text-sm bg-neutral-600/30">Change image</button>
                    </div>}
                </div>
                <p className={`flex gap-2 text-sm text-neutral-500 ${state.errors.file ? 'text-orange-700' : ''}`}><img src="/assets/images/icon-info.svg" alt="" />{!state.errors.file ? "Upload your photo (JPG or PNG, max size: 500KB)." : state.errors.file}</p>
                <label htmlFor="name">Full Name</label>
                <input type="text" name="name" className="rounded-xl p-2 border border-neutral-200 focus:outline-neutral-500 outline-offset-4 pointer hover:bg-neutral-300/20" onChange={(e) => dispatch({ type: 'UPDATE_FIELD', payload: { field: 'name', value: e.target.value } })} />
                <label htmlFor="email">Email Address</label>
                <input type="text" name="email" onChange={(e) => dispatch({ type: 'UPDATE_FIELD', payload: { field: 'email', value: e.target.value } })} className={`rounded-xl p-2 border border-neutral-200 ${state.errors.email ? 'border-orange-700 text-orange-700' : ''} focus:outline-neutral-500 pointer outline-offset-4 hover:bg-neutral-300/20`} placeholder="example@email.com" />
                <label htmlFor="github">Github Username</label>
                <input type="github" onChange={(e) => dispatch({ type: 'UPDATE_FIELD', payload: { field: 'github', value: e.target.value } })} className="rounded-xl p-2 border border-neutral-200 focus:outline-neutral-500 outline-offset-4 hover:bg-neutral-300/20" name="github" placeholder="@yourusername" />
                <button className="bg-orange-500 rounded-xl text-black font-bold w-full flex items-center justify-center py-3 mt-2 focus:outline-neutral-500 outline-offset-4 pointer" type="submit">Generate My Ticket</button>
            </form>
        </div >
    )
}
