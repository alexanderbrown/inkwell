import { ChangeEvent } from "react"

type Dict = {[id:string]: string | number}

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
}

type Study = {
    name: string,
    questions: Array<Question>
}

export type {Dict, DialogProps, QuestionChangeEvent, Study, Question}