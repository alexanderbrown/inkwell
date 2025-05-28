import { useState } from "react"

import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"

import type { Question, Study, updateQuestionProps } from "~/types"

import QuestionDependencyValueEditor from "./QuestionDependencyValueEditor"

type QuestionDependencyEditorProps = {
    question: Question, 
    study?: Study, 
    updateQuestion: (props: updateQuestionProps) => void
}

export default function QuestionDependencyEditor({question, study, updateQuestion}: QuestionDependencyEditorProps) {
    const allQuestions = study?.pages.flatMap(p => p.questions.map(q => {return {page: p, ...q}})) || []

    const [selectedParentID, setSelectedParentID] = useState<string>(question.depends_on?.id || "")

    const parentQuestion = allQuestions.find(q => q.id === selectedParentID)

    return (<>
    <Label className="text-sm font-semibold">Parent Question</Label>
        <div className="flex flex-row items-center">
            <Select value={selectedParentID} onValueChange={(e) => {
                updateQuestion({id: question.id, field: "depends_on", value: {id: e, value: ""}})
                setSelectedParentID(e)
            }}>
                <SelectTrigger className="bg-card cursor-pointer" >
                    <SelectValue placeholder="None" asChild>
                        <div className="max-w-52 wrap-normal h-48">
                            {parentQuestion ? `${parentQuestion.prompt}` : "None"}
                        </div>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {allQuestions.filter(q => q.id !== question.id).map((q) => (
                            <SelectItem className="cursor-pointer" key={q.id} value={q.id}>
                                <span className="max-w-52 wrap-normal">
                                    {q.page.prompt}: {q.prompt}
                                </span>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {selectedParentID &&
            <Button variant="outline" className="text-red-700 p-2 h-6 bg-card cursor-pointer" onClick={() => {
                updateQuestion({id: question.id, field: "depends_on", value: undefined})
                setSelectedParentID("")
            }}> X </Button>}
        </div>
            
        {question.depends_on?.id && <>
            <Label className="text-sm font-semibold">Branch Value</Label>
            <QuestionDependencyValueEditor question={question} parentQuestion={parentQuestion!} updateQuestion={updateQuestion}/>
        </>}
    </>)
}