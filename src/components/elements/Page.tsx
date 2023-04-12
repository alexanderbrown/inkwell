import { Dispatch, SetStateAction } from 'react';

import * as types from '@/types'
import QuestionComponent from '@/components/inputs/Question';


interface PageProps {
    page: types.Page
    responses: NodeJS.Dict<string | number>
    setResponses: Dispatch<SetStateAction<NodeJS.Dict<number | string>>>
    setInvalidResponses: Dispatch<SetStateAction<string[]>>
}


export default function Page ({page, responses, setResponses, setInvalidResponses}: PageProps) {

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

    return (
        <div className='mb-4 relative'>
            <h3 className='absolute -top-[3rem] px-2 bg-slate-50 text-slate-700 text-lg'>{page.prompt}</h3>
            <form className='space-y-2' 
                id='study-input-form'>   
                {page.questions.map((question) => (
                    <QuestionComponent question={question} key={question.id}
                            formState={responses} 
                            setFormState={setResponses}
                            registerInvalid={registerInvalid}
                            deregisterInvalid={deregisterInvalid}/>
                ))}
            </form>
        </div>
    )
}