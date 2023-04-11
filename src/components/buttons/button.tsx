import { ButtonHTMLAttributes, ReactNode } from "react"

// Need to have the styles explicitly written out to ensure they are compiled
const colorOptions = {
    green:  'border-green-500 hover:bg-green-500 hover:border-green-600 focus:ring-green-600 ',
    red:    'border-red-500 hover:bg-red-500 hover:border-red-600 focus:ring-red-600 ',
    blue:   'border-blue-500 hover:bg-blue-500 hover:border-blue-600 focus:ring-blue-600 ',
    slate:  'border-slate-500 hover:bg-slate-500 hover:border-slate-600 focus:ring-slate-600 '
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    color: 'green' | 'red' | 'blue' | 'slate'
}

export default function Button(props: ButtonProps) {
    let className = `py-2 px-4 ml-4 border-b-2 rounded  font-bold 
                       shadow-md bg-slate-200 text-slate-800
                       hover:shadow-xl hover:text-white 
                       focus:ring-2 focus:outline-none `
    className += colorOptions[props.color]
    className += props.className

    const buttonElementProps = {...props, type: props.type || 'button', className: className}
    return (
        <button {...buttonElementProps}>
            {props.children}
        </button>
    )
}