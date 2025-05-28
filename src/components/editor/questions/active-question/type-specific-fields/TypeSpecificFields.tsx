import EditSelectQuestionFields from "./Select"
import type { Question, updateQuestionProps } from "~/types"

export default function TypeSpecificFields(props: {question: Question, updateQuestion: (props: updateQuestionProps) => void}) {
    switch (props.question.type) {
        case "select":
            return <EditSelectQuestionFields {...props}/>
        default:
            return null;
    }
}