import { Card, CardContent, CardTitle } from "~/components/ui/card";
import type { Page, Study } from "~/types";
import InactiveQuestion from "./InactiveQuestion";
import type { Dispatch, SetStateAction } from "react";
import ActiveQuestion from "./active-question/ActiveQuestion";
import AddQuestionButton from "./AddQuestionButton";
import AddQuestionWithDependencyButton from "./AddQuestionWithDependency";

type QuestionEditorProps = {
    page: Page | null
    study: Study | undefined
    setStudy: Dispatch<SetStateAction<Study | undefined>>
    activeQuestionIndex: number | null
    setActiveQuestionIndex: Dispatch<SetStateAction<number | null>>
}

export default function QuestionsEditor({page, study, activeQuestionIndex, setActiveQuestionIndex, setStudy}: QuestionEditorProps) {

    if (!page) {
        return null
    }

    const activeQuestionProps = {page, study, setActiveQuestionIndex, setStudy}

    return (
         <Card>
            <CardTitle className="px-6 text-lg font-semibold">Questions</CardTitle>
            <CardContent className="flex flex-col">
                {page.questions.map((question, idx) => (
                    activeQuestionIndex === idx ? 
                    <ActiveQuestion key={question.id} question={question} {...activeQuestionProps} activeQuestionIndex={idx}/> :
                    <InactiveQuestion key={question.id} question={question} onClick={() => setActiveQuestionIndex(idx)}/>
                ))}
                <div className="flex flex-row">
                    <AddQuestionButton page={page} setStudy={setStudy} setActiveQuestionIndex={setActiveQuestionIndex}/>
                    <AddQuestionWithDependencyButton page={page} setStudy={setStudy} setActiveQuestionIndex={setActiveQuestionIndex}/>
                </div>
            </CardContent>

        </Card>

    )
   
}