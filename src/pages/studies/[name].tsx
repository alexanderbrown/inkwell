import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { HiOutlineHome } from "react-icons/hi";

import type { Study } from '@/types'

import Button from '@/components/buttons/button';
import InvalidEntriesDialog from '@/components/dialogs/InvalidEntriesDialog'
import ResetDialog from '@/components/dialogs/ResetDialog'
import ResponsesReview from '@/components/dialogs/ResponsesReview'
import QuestionComponent from '@/components/inputs/Question';
import { blankResponses } from '@/utils/processResponses';


export default function StudyComponent() {
    let {name: studyName} = useRouter().query
    if (typeof(studyName)==='object') studyName = studyName[0]  // For proper typing

    let [showResetDialog, setResetDialogVisibility] = useState(false)
    let [showInvalidDialog, setInvalidDialogVisibility] = useState(false)
    let [showForm, setFormVisbility] = useState(true)
    let [study, setStudy] = useState<Study>()
    let [responses, setResponses] = useState<NodeJS.Dict<string | number>>({})
    let [invalidResponses, setInvalidResponses] = useState<Array<string>>([])

    useEffect(() => {
        const getData = async(studyName: string | string[]) => {
            const res = await fetch(`/api/studies/${studyName}`)
            if (res.status!==200) {console.log(res); return}
            const study = await res.json()
            setStudy(study)
            setResponses(blankResponses(study))
        }
        getData(studyName!) 
    }, [studyName])
    

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
        <StudyTitle name={study?.name || ''} /> 

        {study && Object.keys(responses) && <>
        <InvalidEntriesDialog isOpen={showInvalidDialog} setIsOpen={setInvalidDialogVisibility} props={invalidResponses} />
        <ResetDialog isOpen={showResetDialog} setIsOpen={setResetDialogVisibility} />
        <ResponsesReview responses={responses} study={study} showUnderlyingData={setFormVisbility} visible={!showForm}/>
        
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
        </>}
    </>
    )
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