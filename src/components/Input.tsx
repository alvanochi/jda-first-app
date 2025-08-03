import { useState } from "react";

type InputProps = {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  placeholder?: string
  required?: boolean
  autoComplete?: string
  className?: string
}

export default function Input({
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  autoComplete,
  className = "",
}: InputProps) {
  const [show, setShow] = useState(false)
  const isPassword = type === "password"
  return (
    <div className={"relative flex flex-col gap-1 " + className}>
      <input
        id={name}
        name={name}
        type={isPassword ? (show ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="border-2 text-black border-black p-2 font-bold w-full pr-12"
      />
      {isPassword && (
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-black"
          onClick={() => setShow((s) => !s)}
        >
          {show ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.477 10.477A3 3 0 0115 12m-3 3a3 3 0 01-3-3m0 0a3 3 0 013-3m0 0c1.657 0 3 1.343 3 3m-3 3c-1.657 0-3-1.343-3-3m0 0c0-1.657 1.343-3 3-3m0 0c1.657 0 3 1.343 3 3m0 0c0 1.657-1.343 3-3 3z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      )}
    </div>
  )
}