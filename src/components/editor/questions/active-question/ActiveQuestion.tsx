import { type ChangeEvent, type Dispatch, type SetStateAction } from "react"

import { questionIcons } from "~/components/QuestionResources"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "~/components/ui/card"
import ConfirmDeleteButton from "~/components/ui/ConfirmDelete"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Popover, PopoverTrigger, PopoverContent } from "~/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Switch } from "~/components/ui/switch"
import { Textarea } from "~/components/ui/textarea"
import UpDownButtons from "~/components/ui/UpDownButtons"

import type { Page, Question, Study, updateQuestionProps } from "~/types"
import EditQuestionTypeSpecificFields from "./type-specific-fields/TypeSpecificFields"
import EditDependency from "./dependency/QuestionDependencyEditor"
import EditDefault from "./EditDefault"

// TODO: Add more complex logic for branching values - less than / more than for numbers, partial string matching for strings, multiple choice for select


type ActiveQuestionProps = {
    question: Question
    page: Page
    study: Study | undefined
    setStudy: Dispatch<SetStateAction<Study | undefined>>
    activeQuestionIndex: number
    setActiveQuestionIndex: Dispatch<SetStateAction<number | null>>
}
export default function ActiveQuestion({question, page, study, setStudy, activeQuestionIndex, setActiveQuestionIndex}: ActiveQuestionProps) {

    const onRename = (e: ChangeEvent<HTMLInputElement>) => {
        setStudy((prev) => {
            if (!prev) return prev;
            const newPages = prev.pages.map((p) => {
                if (p.questions.find((q) => q.id === question.id)) {
                    const newQuestions = p.questions.map((q) => q.id === question.id ? {...q, prompt: e.target.value} : q);
                    return {...p, questions: newQuestions}
                }
                return p;
            });
            return {...prev, pages: newPages}
        })
    }

    const onDeleteClick=() => {
        setStudy((prev) => {
            if (!prev) return prev;
            const newPages = prev.pages.map((p) => {
                if (p.questions.find((q) => q.id === question.id)) {
                    const newQuestions = p.questions.filter((q) => q.id !== question.id);
                    if (newQuestions.length <= (activeQuestionIndex || 0)) setActiveQuestionIndex(null)
                    return {...p, questions: newQuestions}
                }
                return p;
            });
            return {...prev, pages: newPages}
        })
    }

    function moveUp() {
        setStudy(prev => {
            if (!prev) return prev
            const newQuestions = [...page.questions]
            const questionIndex = newQuestions.findIndex(q => q.id === question.id)
            if (questionIndex === null || questionIndex === 0) return prev
            const temp = newQuestions[questionIndex - 1]!
            newQuestions[questionIndex - 1] = question
            newQuestions[questionIndex] = temp
            const newPages = prev.pages.map(p => {
                if (p.id === page.id) {
                    return {...p, questions: newQuestions}
                }
                return p
            })
            setActiveQuestionIndex(questionIndex - 1)
            return {...prev, pages: newPages}
        })
    }

    function moveDown() {
        setStudy(prev => {
            if (!prev) return prev
            const newQuestions = [...page.questions]
            const questionIndex = newQuestions.findIndex(q => q.id === question.id)
            if (questionIndex === null || questionIndex === newQuestions.length - 1) return prev
            const temp = newQuestions[questionIndex + 1]!
            newQuestions[questionIndex + 1] = question
            newQuestions[questionIndex] = temp
            const newPages = prev.pages.map(p => {
                if (p.id === page.id) {
                    return {...p, questions: newQuestions}
                }
                return p
            })
            setActiveQuestionIndex(questionIndex + 1)
            return {...prev, pages: newPages}
        })
    }

    function duplicateQuestion() {
        setStudy(prev => {
            if (!prev) return prev
            const newQuestions = [...page.questions]
            const questionIndex = newQuestions.findIndex(q => q.id === question.id)
            if (questionIndex === null) return prev
            const newQuestion = {...question, id: crypto.randomUUID()}
            newQuestions.splice(questionIndex + 1, 0, newQuestion)
            const newPages = prev.pages.map(p => {
                if (p.id === page.id) {
                    return {...p, questions: newQuestions}
                }
                return p
            })
            setActiveQuestionIndex(questionIndex + 1)
            return {...prev, pages: newPages}
        })
    }

    function moveQuestionToPage(newPageId: string) {
        setStudy(prev => {
            if (!prev) return prev
            const newQuestions = [...page.questions]
            const questionIndex = newQuestions.findIndex(q => q.id === question.id)
            if (questionIndex === null) return prev
            const newQuestion = {...question, id: crypto.randomUUID()}
            newQuestions.splice(questionIndex, 1)
            const newPages = prev.pages.map(p => {
                if (p.id === page.id) {
                    return {...p, questions: newQuestions}
                } else if (p.id === newPageId) {
                    return {...p, questions: [...p.questions, newQuestion]}
                }
                return p
            })
            if (activeQuestionIndex >= newQuestions.length) {
                setActiveQuestionIndex(newQuestions.length - 1)
            }
            return {...prev, pages: newPages}
        })
    }
    
    function updateQuestion(props: updateQuestionProps) {
        setStudy(prev => {
            if (!prev) return prev
            const newPages = prev.pages.map(p => {
                if (p.id === page.id) {
                    const newQuestions = p.questions.map(q => {
                        if (q.id === question.id) {
                            return {...q, [props.field]: props.value}
                        }
                        return q
                    })
                    return {...p, questions: newQuestions}
                }
                return p
            })
            return {...prev, pages: newPages}
        })
    }

    const atStart = activeQuestionIndex === 0
    const atEnd = activeQuestionIndex === page.questions.length - 1

    return (
        <Card key={question.id} className="p-4 m-2 bg-accent">
            <EditPrompt question={question} onRename={onRename}/>
        <CardContent className="grid gap-4">
            <div className="grid gap-2 grid-cols-2">
                <EditMandatory question={question} updateQuestion={updateQuestion}/>
                <EditQuestionTypeSpecificFields question={question} updateQuestion={updateQuestion}/>
                <EditDefault question={question} updateQuestion={updateQuestion}/>
                <EditDependency question={question} study={study} updateQuestion={updateQuestion}/>
                <EditHelpText question={question} updateQuestion={updateQuestion}/>
            </div>
            <div className="flex flex-row items-center justify-between">
                <UpDownButtons onMoveDown={() => moveDown()} onMoveUp={() => moveUp()} atStart={atStart} atEnd={atEnd}/>
                <div className="flex flex-row gap-2">
                    <DuplicateQuestionButton duplicateQuestion={duplicateQuestion}/>
                    <MoveQuestion study={study} page={page} question={question} moveQuestionToPage={moveQuestionToPage}/>
                    <ConfirmDeleteButton onClick={() => onDeleteClick()} prompt="Delete Question"/> 
                </div>
            </div>
        </CardContent>
        <CardFooter className="text-[0.65rem] text-muted-foreground">
                {question.id} ({question.type})
        </CardFooter>
    </Card>)
}

type EditPromptProps = {
    question: Question
    onRename: (e: ChangeEvent<HTMLInputElement>) => void
}
function EditPrompt({question, onRename}: EditPromptProps) {
    return (
        <CardTitle className="font-semibold">
            <div className="flex flex-row items-center gap-2">
                {questionIcons[question.type]}
                <Input
                    className="w-full bg-card"
                    value={question.prompt}
                    onChange={(e) => onRename(e)}
                    />
            </div>
        </CardTitle>
    )
}

type EditMandatoryProps = {
    question: Question
    updateQuestion: (props: updateQuestionProps) => void
}

function EditMandatory({question, updateQuestion}: EditMandatoryProps) {
    return (<>
    <Label className="text-sm font-semibold">Mandatory</Label>
                <Switch className="cursor-pointer bg-card"
                        checked={question.mandatory} 
                        onCheckedChange={e => (
                            updateQuestion({id: question.id, field: "mandatory", value: e.valueOf()}
                        ))} />
    </>)
}

type EditHelpTextProps = {
    question: Question
    updateQuestion: (props: updateQuestionProps) => void
}

function EditHelpText({question, updateQuestion}: EditHelpTextProps) {
    return (
        <>
        <Label className="text-sm font-semibold">Help Text</Label>
                <Textarea className="bg-card"
                          placeholder="Help text (optional)"
                          value={question.help_text || ""}
                          onChange={(e) => updateQuestion({
                              id: question.id, 
                              field: "help_text", 
                              value: e.target.value === "" ? undefined : e.target.value
                          })}/>
        </>
    )
}

function DuplicateQuestionButton({duplicateQuestion}: {duplicateQuestion: () => void}) {
    return (
        <Button variant="outline" className='cursor-pointer' onClick={() => duplicateQuestion()}>
            Duplicate
        </Button>
    )
}

type MoveQuestionProps = {
    study: Study | undefined
    page: Page
    question: Question
    moveQuestionToPage: (newPageId: string) => void
}

function MoveQuestion({study, page, question, moveQuestionToPage}: MoveQuestionProps) {
 return (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant="outline" className='cursor-pointer'>Move to Page</Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
            <Label className="text-sm font-semibold">Select a page to move this question to:</Label>
            <Select onValueChange={(e) => moveQuestionToPage(e)} defaultValue={page.id}>
                <SelectTrigger className="bg-card cursor-pointer" >
                    <SelectValue placeholder="Select a page" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {study?.pages.filter((p) => p.id!==page.id).map((p) => (
                            <SelectItem className="cursor-pointer" key={p.id} value={p.id}>{p.prompt}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </PopoverContent>
    </Popover>
 )
}
