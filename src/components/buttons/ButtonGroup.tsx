import { ReactNode } from "react";

const SPACINGS = {
    '0': "space-x-0",
    '2': "space-x-2",
    '4': "space-x-4",
}

const JUSTIFICATIONS = {
    between: 'justify-between',
    evenly: 'justify-evenly',
    center: 'justify-center'
}

interface ButtonGroupProps{
    className?: string
    children: ReactNode
    spacing?: '0' | '2' | '4'
    justify?: 'between' | 'evenly' | 'center'

}

export default function ButtonGroup({children, spacing, justify, className}: ButtonGroupProps) {
    return (
        <div className={`${className || ''} flex ${spacing? SPACINGS[spacing]: ''} ${justify? JUSTIFICATIONS[justify]: ''}`}> 
            {children}
        </div>
    )
}