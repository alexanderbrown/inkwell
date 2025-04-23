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
    value: string | Array<string>
}


type Question = {
    prompt: string
    id: string
    type: "string" | "text" | "number" |  "temperature" | "date" | "select"
    mandatory?: boolean
    default?: string | number
    options?: Array<string> | string
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
        responseIDFormat?: {
            length: number,
            dictionary: 'number' | 'alpha' | 'alpha_lower' | 'alpha_upper' | 'alphanum' | 'alphanum_lower' | 'alphanum_upper' | 'hex'
        }
    },
}

type Contact = {
    name: string
    email: string
}

export type {DialogProps, Page, QuestionInputProps, QuestionChangeEvent, Study, Question}