import { ChangeEvent } from "react"

interface DialogProps {
    isOpen: boolean
    setIsOpen: (a:boolean) => void
    props?: any
}

type QuestionChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

type Question = {
    prompt: string
    id: string
    type: "string" | "text" | "number" |  "temperature" | "date" | "select"
    mandatory?: boolean
    options?: Array<string> | string
    default?: string | number
    depends_on?: Dependecy
}

type Dependecy = {
    id: string
    value: string
}

type Study = {
    name: string,
    questions: Array<Question>
    options?: {
        hidden_question_placeholder?: string
    },
}

export type {DialogProps, QuestionChangeEvent, Study, Question}