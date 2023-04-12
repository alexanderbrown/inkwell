import { useState } from "react"
import { CSVLink } from "react-csv";
import {BsArrowDownCircle, BsArrowRightCircle, BsArrowLeftShort} from "react-icons/bs"
import ShortUniqueID from "short-unique-id"

import { Study } from "@/types"
import Button from "@/components/buttons/Button";
import ButtonGroup from "@/components/buttons/ButtonGroup";
import * as processResponses from '@/utils/processResponses'

const uid = new ShortUniqueID({length:10, dictionary: 'alpha_upper'})

interface ResponsesReviewProps {
    responses: NodeJS.Dict<string | number>
    study: Study
    showUnderlyingData: (x: boolean) => void
    visible: boolean
}

export default function ResponsesReview({responses, study, showUnderlyingData, visible}: ResponsesReviewProps) {
    const [responsesVisible, setResponsesVisible] = useState(false)
    const [showResponsesButtonContent, setShowResponsesButtonContent] = useState(
        [<>Show Responses <BsArrowRightCircle size={24} className="inline"/></>, 
         <>Hide Responses <BsArrowDownCircle size={24} className="inline"/></>, ])
    const [submissionID, _] = useState(uid());
    const [downloadClicked, setDownloadClicked] = useState(false)

    const responsesCopy = {...responses} //Shallow copy is enough as all the fields are primitiveœ
    const responsesCensored = processResponses.censorInvisibleOptions({responses: responsesCopy, study})
    const responsesCensoredPrompt = processResponses.replaceKeyWithPrompt({responses: responsesCensored, study})
    const responsesExport = processResponses.toCSVFormat(responsesCensoredPrompt)

    return (
        <>
        {visible && 
        <div className="space-y-2 px-4">
            <div key='text' 
                className="p-2 border-2 border-slate-300 rounded overflow-hidden bg-slate-100  text-slate-700">
                <p>
                    Many thanks for taking the time to respond to this study. You may review your answers below.<br />
                    If there are any errors, you may go back using the button at the bottom of the page to correct them. Do not use the browser back button.
                </p>
            </div>
            
            <div key='responses'
                className="p-2 border-2 border-slate-300 rounded overflow-hidden bg-slate-100  text-slate-700">
                <Button color='blue'
                        className="text-sm" 
                        onClick={e=>{
                            setShowResponsesButtonContent([showResponsesButtonContent[1], showResponsesButtonContent[0]])
                            setResponsesVisible(!responsesVisible)
                        }}>
                    {showResponsesButtonContent[0]}
                </Button>
                { responsesVisible &&
                    <ul className="mt-2">
                        {responsesCensoredPrompt.map(([k, v]) => <li key={k}>{k}: {v}</li>)}
                    </ul>
                }
            </div>
            <div className="p-2 border-2 border-slate-300 rounded overflow-hidden bg-slate-100  text-slate-700">
                <p>
                    When you are ready to submit this case, please download your responses by clicking on the button below, and email this via a secure NHS email address to&nbsp; 
                    <a href='mailto:alexander.brown5@nhs.net?subject=ANEC' target='_blank'
                    className="text-sky-800"> 
                    Alex Brown
                    </a><br />
                </p>
                <p className="py-2">
                    Your submission ID is <code className="bg-slate-900 text-slate-50 px-2 py-0.5 border-2 rounded-md">{submissionID}</code>. Please retain this for your records in case of further queries.
                </p>

                <p className="pt-4 text-sm italic">
                    This method ensures that no data is stored on any non-NHS servers and patient data is kept secure.
                </p>
            </div>
            <ButtonGroup spacing="2">
                <Button color='slate' onClick={()=>showUnderlyingData(true)}>
                    <BsArrowLeftShort size={24} className="inline"/>
                    Go Back  
                </Button>
                <CSVLink data={responsesExport} filename={submissionID} className="focus:outline-none">
                    <Button color='green' onClick={()=>setDownloadClicked(true)}>
                        Download Responses (as CSV)
                    </Button>
                </CSVLink>
                <Button color='orange' 
                        className={`${downloadClicked? '' : 'disabled'} disabled:cursor-not-allowed disabled:text-slate-400 disabled:border-slate-400`}
                        disabled={!downloadClicked}
                        onClick={()=>window.location.reload()}>
                        Start Another Report
                </Button>
            </ButtonGroup>
        </div>
    }
    </>
    )
}