import { Dict } from "@/types"
import { useState } from "react"
import { CSVLink } from "react-csv";
import {BsArrowDownCircle, BsArrowRightCircle, BsArrowLeftShort} from "react-icons/bs"
import ShortUniqueID from "short-unique-id"

const uid = new ShortUniqueID({length:10, dictionary: 'alpha_upper'})

interface ResponsesReviewProps {
    responses: Dict
    showUnderlyingData: (x: boolean) => void
    visible: boolean
}

export default function ResponsesReview({responses, showUnderlyingData, visible}: ResponsesReviewProps) {
    const [responsesVisible, setResponsesVisible] = useState(false)
    const [showResponsesButtonContent, setShowResponsesButtonContent] = useState(
        [<>Show Responses <BsArrowRightCircle size={24} className="inline"/></>, 
         <>Hide Responses <BsArrowDownCircle size={24} className="inline"/></>, ])
    const [submissionID, _] = useState(uid());
    const [downloadClicked, setDownloadClicked] = useState(false)

    const responsesExport = [Object.keys(responses), Object.values(responses).map(v=>v.toString().replaceAll('"', '""'))]
    return (
        <>
        {visible && 
        <div className="space-y-2">
            <div key='text' 
                className="mx-4 p-2 border-2 border-slate-300 rounded overflow-hidden bg-slate-100  text-slate-700">
                <p>
                    Many thanks for taking the time to respond to this study. You may review your answers below.<br />
                    If there are any errors, you may go back using the button at the bottom of the page to correct them. Do not use the browser back button.
                </p>
            </div>
            
            <div key='responses'
                className="mx-4 p-2 border-2 border-slate-300 rounded overflow-hidden bg-slate-100  text-slate-700">
                <button className="border-black border-solid border rounded font-bold py-2 px-2 text-sm
                                bg-slate-100 text-slate-700 hover:bg-slate-300 hover:text-slate-900" 
                        onClick={e=>{
                            setShowResponsesButtonContent([showResponsesButtonContent[1], showResponsesButtonContent[0]])
                            setResponsesVisible(!responsesVisible)
                        }}>
                    {showResponsesButtonContent[0]}
                </button>
                { responsesVisible &&
                    <ul className="mt-2">
                        {Object.entries(responses).map(([k, v]) => <li key={k}>{k}: {v}</li>)}
                    </ul>
                }
            </div>
            <div className="mx-4 p-2 border-2 border-slate-300 rounded overflow-hidden bg-slate-100  text-slate-700">
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
            <button className="bg-slate-100 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 ml-4 border border-sky-700 rounded"
                    onClick={()=>showUnderlyingData(true)}>
                <BsArrowLeftShort size={24} className="inline"/>
                Go Back  
            </button>
            <CSVLink data={responsesExport} filename={submissionID}>
                <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 ml-2 border border-sky-700 rounded"
                        onClick={()=>setDownloadClicked(true)}>
                    Download Responses (as CSV)
                </button>
            </CSVLink>
            
            <button className={`${downloadClicked? '' : 'disabled'}
                               bg-slate-100 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 ml-2 
                               border border-slate-700 rounded 
                               disabled:cursor-not-allowed disabled:text-slate-400 disabled:border-slate-400`}
                    disabled={!downloadClicked}
                    onClick={()=>window.location.reload()}>
                    Start Another Report
            </button>
        </div>
    }
    </>
    )
}