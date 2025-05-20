import { useState, useReducer } from "react";
import Form from "./components/Form";
import Ticket from "./components/Ticket";

export type Action = { type: 'UPDATE_FIELD' | 'UPDATE_ERROR', payload: { field: string, value: string } } | { type: 'UPDATE_FILE', payload: File }

export type StateType = {
  name: string,
  email: string,
  github: string,
  file: File | null,
  errors: {
    name: string,
    email: string,
    github: string,
    file: null
  }
}

export default function App() {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const initialState = {
    name: '',
    email: '',
    github: '',
    file: null,
    errors: {
      name: '',
      email: '',
      github: '',
      file: null
    }
  }

  const formReducer = (state: StateType, action: Action) => {
    switch (action.type) {
      case 'UPDATE_FIELD':
        return {
          ...state,
          [action.payload.field]: action.payload.value,
          errors: { ...state.errors, [action.payload.field]: '' }
        }
      case 'UPDATE_ERROR':
        return {
          ...state,
          errors: {
            ...state.errors,
            [action.payload.field]: action.payload.value
          }
        }
      case 'UPDATE_FILE':
        return {
          ...state,
          file: action.payload,
          errors: { ...state.errors, file: null }
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <div className="relative h-screen w-full py-4 bg-image-mobile md:bg-image-tablet lg:bg-image-desktop bg-cover bg-no-repeat bg-center use-inconsolata text-neutral-0 overflow-hidden">
      {/* קו עליון - מופיע בכל המכשירים */}
      <img
        src="/assets/images/pattern-squiggly-line-top.svg"
        className="absolute right-0 top-0 w-1/3 md:w-auto"
        alt=""
      />

      {/* קו תחתון - גרסאות שונות לפי מכשיר */}
      <img
        src="/assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg"
        className="md:hidden absolute left-0 bottom-0 w-full"
        alt=""
      />
      <img
        src="/assets/images/pattern-squiggly-line-bottom-desktop.svg"
        className="hidden md:block absolute left-0 bottom-0 w-1/2 lg:w-1/3"
        alt=""
      />

      {/* רקע קווים עדין */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-normal"
        style={{
          backgroundImage: 'url("/assets/images/pattern-lines.svg")',
          backgroundRepeat: "repeat",
          backgroundSize: "100px",
          zIndex: 0,
        }}
      />
      <div
        className="absolute inset-0 opacity-90 mix-blend-multiply"
        style={{
          backgroundImage: 'url("/assets/images/pattern-circle.svg")',
          backgroundRepeat: "repeat",
          backgroundSize: "100px",
          zIndex: 1,
        }}
      />

      {/* תוכן ראשי */}
      <div className="relative z-10 flex flex-col items-center gap-4 h-full">
        {/* לוגו */}
        <img
          src="/assets/images/logo-full.svg"
          alt="Coding Conf Logo"
          className="mt-4 md:mt-8 w-3/4 md:w-auto"
        />

        {/* טופס או כרטיס */}
        <div className="flex-1 flex justify-center items-center w-full px-4">
          {!isRegistered ? (
            <Form state={state} dispatch={dispatch} setIsRegistered={setIsRegistered} />
          ) : (
            <Ticket state={state} />
          )}
        </div>
      </div>
    </div>
  );
}
