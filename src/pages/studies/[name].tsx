import type { Dict, QuestionChangeEvent, Question, Study } from '@/types'
import { GetServerSidePropsContext } from 'next'
import { useState, useEffect } from 'react'

import ResetDialog from '@/components/ResetDialog'

import config from '@/config'
import ResponsesReview from '@/components/ResponsesReview'
import InvalidEntriesDialog from '@/components/InvalidEntriesDialog'
import DateInput from '@/components/QuestionInputs/DateComponent'
import NumberInput from '@/components/QuestionInputs/NumberComponent'
import StringInput from '@/components/QuestionInputs/StringComponent'
import TextInput from '@/components/QuestionInputs/TextComponent'
import SelectInput from '@/components/QuestionInputs/SelectComponent'

interface StudyComponentProps {
    study: Study
}

interface QuestionComponentProps {
    question: Question
    update_form_state: (e: QuestionChangeEvent) => void
    register_invalid: (prompt: string) => void
    deregister_invalid: (prompt: string) => void
}

function Question({question, update_form_state, register_invalid, deregister_invalid}: QuestionComponentProps) {

    const [value, setValue] = useState('')

    const fails_validation = "mandatory" in question && question.mandatory && value===''
    useEffect(() => {
        if (fails_validation){
            register_invalid(question.prompt)
        } else {
            deregister_invalid(question.prompt)
        }
    }, [fails_validation])

    function updateInputValue(e: QuestionChangeEvent) {
        setValue(e.target.value); 
        update_form_state(e)
    }

    let InputTagOptions = {
        "string":       <StringInput question={question} updateValue={updateInputValue} />, 
        "text":         <TextInput question={question} updateValue={updateInputValue} />,
        "number":       <NumberInput question={question} updateValue={updateInputValue} step={1}/>,
        "temperature":  <NumberInput question={question} updateValue={updateInputValue} step={0.1}/>,
        "date":         <DateInput question={question} updateValue={updateInputValue} />, 
        "select":       <SelectInput question={question} updateValue={updateInputValue}/>
    }

    return (
        <div key={question.prompt} 
             className="flex mx-4 border-2 border-slate-300 rounded overflow-hidden bg-slate-100  text-slate-700
                        focus-within:bg-slate-700 focus-within:text-slate-100 focus-within:rounded-lg">
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

export default function Study(props: StudyComponentProps) {
    let [showResetDialog, setResetDialogVisibility] = useState(false)
    let [showInvalidDialog, setInvalidDialogVisibility] = useState(false)
    let [showForm, setFormVisbility] = useState(true)
    let [responses, changeResponses] = useState<Dict>(Object.fromEntries(props.study.questions.map(question => [question.prompt, ''])))
    let [invalidResponses, setInvalidResponses] = useState<Array<string>>([])

    function updateResponses(e: QuestionChangeEvent) {
        let value: string
        if ("checked" in e.target && e.target.type==='checkbox') {
            value = e.target.checked.toString()
        } else {
            value = e.target.value
        }

        changeResponses({...responses, [e.target.name]: value})
    }

    function registerInvalid(prompt: string) {
        setInvalidResponses(prev => {
            const idx = prev.indexOf(prompt)
            if (idx > -1){
                return prev
            } else {
                return [...prev, prompt]
            }
        })
    }

    function deregisterInvalid(prompt: string) {
        setInvalidResponses(prev => {
            const idx = prev.indexOf(prompt)
            if (idx > -1) {
                prev.splice(idx, 1)   
            }
            return prev
        })
    }

    function validateForm() {
        if (invalidResponses.length > 0) {
            setInvalidDialogVisibility(true)
        } else {
            setFormVisbility(false)
        }
    }

    return (
    <>
        <InvalidEntriesDialog isOpen={showInvalidDialog} setIsOpen={setInvalidDialogVisibility} props={invalidResponses} />
        <ResetDialog isOpen={showResetDialog} setIsOpen={setResetDialogVisibility} />
        <StudyTitle name={props.study.name} />
        <form className={`space-y-2 ${showForm? '' : 'hidden'}`} 
              id='study-input-form'>
            
            {props.study.questions.map((question) => (
                <Question question={question} key={question.id} 
                          update_form_state={updateResponses}
                          register_invalid={registerInvalid}
                          deregister_invalid={deregisterInvalid}/>
            ))}
            <FormButtons validateForm={validateForm} setResetDialogVisibility={setResetDialogVisibility} />
            
        </form>
        <ResponsesReview responses={responses} showUnderlyingData={setFormVisbility} visible={!showForm}/>
    </>
    )
  }

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const api_url = config.server + '/api/studies/' + context.params?.name
    const res = await fetch(api_url, {
                                headers: {
                                    "Content-Type": "application/json"
                                }})
    const study = await res.json()
  
    return {
      props: {
        study,
      },
    }
  }

function StudyTitle ({name}: {name:string}) {
    return (
        <div className="text-center text-2xl mb-10 pt-4">
            <h1>{name}</h1>
        </div>
    )
}

function FormButtons({validateForm, setResetDialogVisibility}: 
                     {validateForm: () => void, setResetDialogVisibility: (v: boolean) => void}) {
    return (<>
        <button onClick={()=>validateForm()}
                type='button'
                className='bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 ml-4 border border-sky-700 rounded'>
            Submit
        </button>

        <button onClick={()=>setResetDialogVisibility(true)}
                type='button'
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 border border-red-700 rounded'>
            Reset
        </button>
    </>)
}