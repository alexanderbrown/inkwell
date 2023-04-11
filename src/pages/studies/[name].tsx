import path from 'path';
import { promises as fs } from 'fs';

import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import { HiOutlineHome } from "react-icons/hi";

import type { Dict, Study } from '@/types'

import QuestionComponent from '@/components/inputs/Question';
import ResetDialog from '@/components/dialogs/ResetDialog'
import ResponsesReview from '@/components/dialogs/ResponsesReview'
import InvalidEntriesDialog from '@/components/dialogs/InvalidEntriesDialog'
import Link from 'next/link';
import Button from '@/components/buttons/button';


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
        <StudyTitle name={study.name} />

        <InvalidEntriesDialog isOpen={showInvalidDialog} setIsOpen={setInvalidDialogVisibility} props={invalidResponses} />
        <ResetDialog isOpen={showResetDialog} setIsOpen={setResetDialogVisibility} />
        <ResponsesReview responses={responses_formatted} showUnderlyingData={setFormVisbility} visible={!showForm}/>

        <form className={`space-y-2 ${showForm? '' : 'hidden'}`} 
              id='study-input-form'>
            
            {study.questions.map((question) => (
                <QuestionComponent question={question} key={question.id}
                          formState={responses} 
                          setFormState={setResponses}
                          registerInvalid={registerInvalid}
                          deregisterInvalid={deregisterInvalid}/>
            ))}
            <Button color='green' onClick={()=>validateForm()} > Submit </Button>
            <Button color='red' onClick={()=>setResetDialogVisibility(true)}>Reset</Button>
        </form>
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