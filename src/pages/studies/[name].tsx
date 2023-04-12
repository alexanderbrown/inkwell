import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'

import * as types from '@/types'

import Button from '@/components/buttons/Button';
import InvalidEntriesDialog from '@/components/dialogs/InvalidEntriesDialog'
import ResetDialog from '@/components/dialogs/ResetDialog'
import ResponsesReview from '@/components/dialogs/ResponsesReview'
import PageCarousel from '@/components/elements/PageCarousel';
import StudyTitle from '@/components/elements/StudyTitle';
import { blankResponses } from '@/utils/processResponses';
import ButtonGroup from '@/components/buttons/ButtonGroup';

export default function StudyPage() {
    // Client Side Rendering - dynamic routing
    let {name: studyName} = useRouter().query
    if (typeof(studyName)==='object') studyName = studyName[0]  // For proper typing

    // State
    let [showResetDialog, setResetDialogVisibility] = useState(false)
    let [showInvalidDialog, setInvalidDialogVisibility] = useState(false)
    let [showForm, setFormVisbility] = useState(true)
    let [study, setStudy] = useState<types.Study>()
    let [responses, setResponses] = useState<NodeJS.Dict<string | number>>({})
    let [invalidResponses, setInvalidResponses] = useState<Array<string>>([])

    // Load study and prepopulate responses with blank answers
    useEffect(() => {
        const getData = async(studyName: string | string[]) => {
            const res = await fetch(`/api/studies/${studyName}`)
            const study = await res.json()
            setStudy(study)
            setResponses(blankResponses(study)) //Need this to ensure all the questions appear in the CSV (even if not answered)
        }
        getData(studyName!) 
    }, [studyName])

    // Validation
    function validateForm() {
        if (invalidResponses.length > 0) {
            setInvalidDialogVisibility(true)
        } else {
            setFormVisbility(false)
        }
    }

    // Render
    return (
    <>
        <StudyTitle name={study?.name || ''} /> 

        {study && Object.keys(responses) && <>
            <InvalidEntriesDialog isOpen={showInvalidDialog} setIsOpen={setInvalidDialogVisibility} props={invalidResponses} />
            <ResetDialog isOpen={showResetDialog} setIsOpen={setResetDialogVisibility} />
            <ResponsesReview responses={responses} study={study} showUnderlyingData={setFormVisbility} visible={!showForm}/>
            <div className={showForm? '' : 'hidden'}>
                <PageCarousel study={study} responses={responses} setResponses={setResponses} setInvalidResponses={setInvalidResponses} />
                <ButtonGroup justify='center' spacing='2' className='m-4 pt-4'>
                    <Button color='green' onClick={()=>validateForm()} > Submit </Button>
                    <Button color='red' onClick={()=>setResetDialogVisibility(true)}>Reset</Button>
                </ButtonGroup>
            </div>
            
        </>}
    </>
    )
  }