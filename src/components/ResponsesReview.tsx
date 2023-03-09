import { Dict } from "@/types"
import { useState } from "react"
import { CSVLink } from "react-csv";
import {BsArrowDownCircle, BsArrowRightCircle, BsArrowLeftShort} from "react-icons/bs"

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

    const responsesExport = [Object.keys(responses), Object.values(responses).map(v=>v.toString().replaceAll('"', '""'))]
    return (
        <>
        {visible && 
        <div className="space-y-2">
            <div key='text' 
                className="mx-4 p-2 border-2 border-slate-300 rounded overflow-hidden bg-slate-100  text-slate-700">
                <p>
                    Many thanks for taking the time to respond to this study. You may review your answers below.<br />

                    Please download your response as a csv, and email this using a secure NHS email address to&nbsp; 
                    <a href='mailto:alexander.brown5@nhs.net?subject=ANEC' target='_blank'
                    className="text-sky-800"> 
                    Alex Brown
                    </a>
                </p>

                <p className="pt-4 text-sm italic">
                    This method ensures that no data is stored on any non-NHS servers and patient data is kept secure.
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
            <button className="bg-slate-100 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 ml-4 border border-sky-700 rounded"
                    onClick={()=>showUnderlyingData(true)}>
                <BsArrowLeftShort size={24} className="inline"/>
                Go Back  
            </button>
            <CSVLink data={responsesExport} filename='responses.csv'>
                <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 ml-2 border border-sky-700 rounded">
                    Download CSV  
                </button>
            </CSVLink>
        </div>
    }
    </>
    )
}