import path from 'path';
import { promises as fs } from 'fs';

import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import { HiOutlineHome } from "react-icons/hi";

import type { Dict, Study } from '@/types'

import QuestionComponent from '@/components/Question';
import ResetDialog from '@/components/ResetDialog'
import ResponsesReview from '@/components/ResponsesReview'
import InvalidEntriesDialog from '@/components/InvalidEntriesDialog'
import Link from 'next/link';


export default function StudyComponent({study}: {study: Study}) {
    let [showResetDialog, setResetDialogVisibility] = useState(false)
    let [showInvalidDialog, setInvalidDialogVisibility] = useState(false)
    let [showForm, setFormVisbility] = useState(true)
    let [responses, setResponses] = useState<Dict>(Object.fromEntries(study.questions.map(question => [question.id, ''])))
    let [invalidResponses, setInvalidResponses] = useState<Array<string>>([])

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

    let responses_formatted = responses
    study.questions
        .filter(question => question.depends_on)
        .forEach(question => {
            const parent_id = question.depends_on?.id || ''
            if (responses_formatted[parent_id] !== question.depends_on?.value){
                responses_formatted[question.id] = study.options?.hidden_question_placeholder || ''
            }
        })
    responses_formatted = Object.fromEntries(Object.entries(responses_formatted).map(([k,v])=> {
        return [study.questions.filter(question => question.id===k)[0].prompt, v]}))


    return (
    <>
        <InvalidEntriesDialog isOpen={showInvalidDialog} setIsOpen={setInvalidDialogVisibility} props={invalidResponses} />
        <ResetDialog isOpen={showResetDialog} setIsOpen={setResetDialogVisibility} />
        <StudyTitle name={study.name} />
        <form className={`space-y-2 ${showForm? '' : 'hidden'}`} 
              id='study-input-form'>
            
            {study.questions.map((question) => (
                <QuestionComponent question={question} key={question.id}
                          formState={responses} 
                          setFormState={setResponses}
                          registerInvalid={registerInvalid}
                          deregisterInvalid={deregisterInvalid}/>
            ))}
            <FormButtons validateForm={validateForm} setResetDialogVisibility={setResetDialogVisibility} />
            
        </form>
        <ResponsesReview responses={responses_formatted} showUnderlyingData={setFormVisbility} visible={!showForm}/>
    </>
    )
  }


export async function getServerSideProps(context: GetServerSidePropsContext) {

    const name = context.params?.name
    const templateDirectory = path.join(process.cwd(), 'templates');
    const filePath = path.join(templateDirectory, name + '.json')
    const fileContents = await fs.readFile(filePath, 'utf8');
    const study: Study = JSON.parse(fileContents)
  
    return {
      props: {
        study,
      },
    }
  }


function StudyTitle ({name}: {name:string}) {
    return (
        <div className="flex mb-10 pt-4 justify-between items-center">
                <Link className="text-2xl w-fit ml-4" href='/' title='Home' >
                    <HiOutlineHome size={30}/>
                </Link>
                <h1 className="text-2xl w-fit">{name}</h1>
                <h1></h1>
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