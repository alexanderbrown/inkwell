import { ChangeEvent } from "react"

interface DialogProps {
    isOpen: boolean
    setIsOpen: (a:boolean) => void
    props?: any
}

type QuestionChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

type QuestionInputProps = {
    question: Question, 
    current_value?: string | number, 
    update_value: (e: QuestionChangeEvent) => void
}

type Dependecy = {
    id: string
    value: string
}


type Question = {
    prompt: string
    id: string
    type: "string" | "text" | "number" |  "temperature" | "date" | "select"
    mandatory?: boolean
    options?: Array<string> | string
    default?: string | number
    depends_on?: Dependecy
}


type Page = {
    prompt?: string
    id: string
    questions: Array<Question>
}


type Study = {
    name: string
    contact: Contact
    pages: Array<Page>
    options?: {
        hidden_question_placeholder?: string
    },
}

type Contact = {
    name: string
    email: string
}

export type {DialogProps, Page, QuestionInputProps, QuestionChangeEvent, Study, Question}