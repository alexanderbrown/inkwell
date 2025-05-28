import type { ChangeEvent } from "react"
import { v4 as uuidv4 } from "uuid";
import type { predefinedOptionLists } from "./lib/predefinedOptionLists";

type Dependecy = {
    id: string
    value: string | Array<string> | number | Array<number> | boolean
}

type BaseQuestion = {
    prompt: string
    id: string
    mandatory?: boolean
    depends_on?: Dependecy
    help_text?: string
} 

type StringQuestion = BaseQuestion & {
    type: "string" | "text"
    default?: string
}
type NumberQuestion = BaseQuestion & {
    type: "number" | "temperature"
    default?: number
}
type SelectQuestion = BaseQuestion & {
    type: "select"
    default?: string    
    options: Array<string> | keyof typeof predefinedOptionLists
}
type DateQuestion = BaseQuestion & {
    type: "date"
    default?: string
}
type BooleanQuestion = BaseQuestion & {
    type: "boolean"
    default?: boolean
}
type Question = StringQuestion | NumberQuestion | SelectQuestion | DateQuestion | BooleanQuestion

& (
    {
        type: "string" | "text"
        default?: string
    } | {
        type: "number" |  "temperature" 
        default?: number
    } | {
        type: "select"
        default?: string
        options: Array<string> | keyof typeof predefinedOptionLists
    } | {
        type: "date"
        default?: string
    } | {
        type: "boolean"
        default?: boolean
    }
)

export type updateQuestionProps = {
    id: string
} & (
    {
        field: "prompt"
        value: string
    } | {
        field: "mandatory"
        value: boolean
    } | {
        field: "depends_on"
        value: {
            id: string
            value: string | Array<string> | number | Array<number> | boolean
        } | undefined
    } | {
        field: "default"
        value: string | number | boolean | undefined
    } | {
        field: "options"
        value: Array<string> | keyof typeof predefinedOptionLists
    } | {
        field: "help_text"
        value: string | undefined
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




export const blankQuestion: Record<Question['type'], () => Question> = {
    string: () => ({
        prompt: "New String Question",
        id: uuidv4(),
        type: "string",
    }),
    text: () => ({
        prompt: "New Text Question",
        id: uuidv4(),
        type: "text",
    }),
    number: () => ({
        prompt: "New Number Question",
        id: uuidv4(),
        type: "number",
    }),
    temperature: () => ({
        prompt: "New Temperature Question",
        id: uuidv4(),
        type: "temperature",
    }),
    date: () => ({
        prompt: "New Date Question",
        id: uuidv4(),
        type: "date",
    }),
    boolean: () => ({
        prompt: "New Boolean Question",
        id: uuidv4(),
        type: "boolean",
    }),
    select: () => ({
        prompt: "New Select Question",
        id: uuidv4(),
        type: "select",
        options: [],
    }),
}


export type {Question, Page, Study, QuestionInputProps}