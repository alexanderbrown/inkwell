import { questionIcons } from "~/components/QuestionResources";
import { Card, CardTitle } from "~/components/ui/card";
import type { Question } from "~/types";

export default function InactiveQuestion({question, onClick}: {question: Question, onClick: () => void}) {
    return (
        <Card key={question.id} className="p-4 m-2 cursor-pointer" onClick = {onClick}>
        <CardTitle className="font-semibold">
            <div className="flex flex-row items-center gap-2">
                {questionIcons[question.type]}
                <h3 className="text-md">{question.prompt}</h3>
            </div>
        </CardTitle>
    </Card>)
}