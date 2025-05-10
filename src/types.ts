import type { ChangeEvent } from "react"

type Dependecy = {
    id: string
    value: string | Array<string> | number | Array<number> | boolean
}

type Question = {
    prompt: string
    id: string
    mandatory?: boolean
    depends_on?: Dependecy
} & (
    {
        type: "string" | "text"
        default?: string
    } | {
        type: "number" |  "temperature" 
        default?: number
    } | {
        type: "select"
        default?: string
        options: Array<string>
    } | {
        type: "date"
        default?: string
    } | {
        type: "boolean"
        default?: boolean
    }
)

type Page = {
    prompt: string
    id: string
    questions: Array<Question>
}

type Contact = {
    name: string
    email: string
}

type Study = {
    name_short: string
    name_full?: string
    contact: Contact
    pages: Array<Page>
    responseID_field?: string
    options?: {
        hidden_question_placeholder?: string
    },
}

type QuestionChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

type QuestionInputProps = {
    question: Question, 
    current_value?: string | number, 
    update_value: (e: QuestionChangeEvent) => void
}

export type {Question, Page, Study, QuestionInputProps}