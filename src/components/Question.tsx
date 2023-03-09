import { useEffect, useState } from "react"

import { Dict, Question, QuestionChangeEvent } from "@/types"
import DateInput from '@/components/QuestionInputs/DateComponent'
import NumberInput from '@/components/QuestionInputs/NumberComponent'
import StringInput from '@/components/QuestionInputs/StringComponent'
import TextInput from '@/components/QuestionInputs/TextComponent'
import SelectInput from '@/components/QuestionInputs/SelectComponent'

interface QuestionComponentProps {
    question: Question
    formState: Dict
    setFormState: ((callback: (prev_state: Dict) => Dict) => void)
    registerInvalid: (prompt: string) => void
    deregisterInvalid: (prompt: string) => void
}

export default function QuestionComponent({question, formState, setFormState, registerInvalid, deregisterInvalid}: QuestionComponentProps) {

    const [value, setLocalValue] = useState('')

    // How to update state
    function updateInputValue(e: QuestionChangeEvent) {
        setLocalValue(e.target.value); 
        setFormState((prev)=>{
            return {...prev, [e.target.id]: e.target.value}
        })
    }

    // Validation logic
    const fails_validation = "mandatory" in question && question.mandatory && value===''
    useEffect(() => {
        if (fails_validation){
            registerInvalid(question.prompt)
        } else {
            deregisterInvalid(question.prompt)
        }
    }, [fails_validation, deregisterInvalid, registerInvalid, question.prompt])

    // Set Visibility and remove from form state if invisible; add back in if visible
    let element_visible: boolean = true
    if (question.depends_on) {
        element_visible = formState[question.depends_on.id] === question.depends_on.value
    }

    // Choose a control
    let InputTagOptions = {
        "string":       <StringInput question={question} update_value={updateInputValue} />, 
        "text":         <TextInput question={question} update_value={updateInputValue} />,
        "number":       <NumberInput question={question} update_value={updateInputValue} step={1}/>,
        "temperature":  <NumberInput question={question} update_value={updateInputValue} step={0.1}/>,
        "date":         <DateInput question={question} update_value={updateInputValue} />, 
        "select":       <SelectInput question={question} update_value={updateInputValue}/>
    }

    // Render!
    let parent_div_classes = element_visible? 'flex ' : 'hidden '
    parent_div_classes += (question.depends_on? 'ml-8 mr-4 ': 'mx-4 ')
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
                {InputTagOptions[question.type]}
            </div>
            {(fails_validation) ? <div className='flex flex-col justify-center align-middle pr-2 bg-slate-100 peer-focus-within:bg-slate-200'>
                <p className='text-red-500 font-bold text-lg'>*</p>
            </div> : ''}
        </div> 
    )
}