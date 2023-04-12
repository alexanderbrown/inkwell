import { ButtonHTMLAttributes } from "react"

// Need to have the styles explicitly written out to ensure they are compiled
const colorOptions = {
    orange: 'border-orange-500 enabled:hover:bg-orange-500 enabled:hover:border-orange-600 focus:ring-orange-600 ',
    yellow: 'border-yellow-500 enabled:hover:bg-yellow-500 enabled:hover:border-yellow-600 focus:ring-yellow-600 ',
    green:  'border-green-500 enabled:hover:bg-green-500 enabled:hover:border-green-600 focus:ring-green-600 ',
    red:    'border-red-500 enabled:hover:bg-red-500 enabled:hover:border-red-600 focus:ring-red-600 ',
    blue:   'border-blue-500 enabled:hover:bg-blue-500 enabled:hover:border-blue-600 focus:ring-blue-600 ',
    slate:  'border-slate-500 enabled:hover:bg-slate-500 enabled:hover:border-slate-600 focus:ring-slate-600 '
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    color: 'green' | 'red' | 'blue' | 'yellow' | 'orange' | 'slate'
}

export default function Button(props: ButtonProps) {
    let className = `py-2 px-4 border-b-2 rounded  font-bold 
                       shadow-md bg-slate-200 text-slate-800
                       enabled:hover:shadow-xl enabled:hover:text-white 
                       focus:ring-2 focus:outline-none 
                       disabled:text-slate-400 `
    className += colorOptions[props.color]
    className += props.className

    const buttonElementProps = {...props, type: props.type || 'button', className: className}
    return (
        <button {...buttonElementProps}>
            {props.children}
        </button>
    )
}