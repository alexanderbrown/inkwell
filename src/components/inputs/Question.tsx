import { useEffect, useState } from "react"

import { Question, QuestionChangeEvent } from "@/types"
import DateInput from '@/components/inputs/DateInput'
import NumberInput from '@/components/inputs/NumberInput'
import StringInput from '@/components/inputs/StringInput'
import TextInput from '@/components/inputs/TextInput'
import SelectInput from '@/components/inputs/SelectInput'

type Dict = NodeJS.Dict<number | string>

interface QuestionComponentProps {
    question: Question
    formState: Dict
    setFormState: ((callback: (prev_state: Dict) => Dict) => void)
    registerInvalid: (prompt: string) => void
    deregisterInvalid: (prompt: string) => void
}

export default function QuestionComponent({question, formState, setFormState, registerInvalid, deregisterInvalid}: QuestionComponentProps): JSX.Element {
    const [value, setLocalValue] = useState(formState[question.id])

    // How to update state
    function updateInputValue(e: QuestionChangeEvent) {
        setLocalValue(e.target.value); 
        setFormState((prev)=>{
            return {...prev, [e.target.id]: e.target.value}
        })
    }

    // Validation logic
    const fails_validation = "mandatory" in question && question.mandatory && !value
    useEffect(() => {
        if (fails_validation){
            registerInvalid(question.prompt)
        } else {
            deregisterInvalid(question.prompt)
        }
    }, [fails_validation, deregisterInvalid, registerInvalid, question.prompt])

    // Hide component if branching condition not met
    let element_visible: boolean = true
    if (question.depends_on) {
        element_visible = formState[question.depends_on.id] === question.depends_on.value
    }

    // Choose a control
    let InputElementOptions = {
        "string":       <StringInput question={question} update_value={updateInputValue} current_value={value}/>, 
        "text":         <TextInput question={question} update_value={updateInputValue} current_value={value}/>,
        "number":       <NumberInput question={question} update_value={updateInputValue} step={1} current_value={value}/>,
        "temperature":  <NumberInput question={question} update_value={updateInputValue} step={0.1} current_value={value}/>,
        "date":         <DateInput question={question} update_value={updateInputValue} current_value={value}/>, 
        "select":       <SelectInput question={question} update_value={updateInputValue} current_value={value}/>
    }

    // Render!
    let parent_div_classes = element_visible? 'flex ' : 'hidden '
    parent_div_classes += (question.depends_on? 'ml-4 ': '')
    parent_div_classes += 'border-2 border-slate-300 rounded overflow-hidden bg-slate-100  text-slate-700 '
    parent_div_classes += 'focus-within:bg-slate-700 focus-within:text-slate-100 focus-within:rounded-lg'

    return (
        <div key={question.prompt} 
             className={parent_div_classes}>
            <div className="w-60 flex-none">
                <label htmlFor={question.prompt}
                    className="p-2 text-right w-100% float-right"> 
                    {question.prompt}
                </label>
            </div>
            <div className="flex-1 flex flex-col justify-center bg-slate-100 focus-within:bg-slate-200 peer">
                {InputElementOptions[question.type]}
            </div>
            {(fails_validation) ? <div className='flex flex-col justify-center align-middle pr-2 bg-slate-100 peer-focus-within:bg-slate-200'>
                <p className='text-red-500 font-bold text-lg'>*</p>
            </div> : ''}
        </div> 
    )
}