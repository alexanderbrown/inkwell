import { Input } from "~/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Switch } from "~/components/ui/switch"
import { predefinedOptionLists } from "~/lib/predefinedOptionLists"
import type { Question, updateQuestionProps } from "~/types"

type QuestionDependencyValueEditorProps = {
    question: Question, 
    parentQuestion: Question, 
    updateQuestion: (props: updateQuestionProps) => void
}

export default function QuestionDependencyValueEditor({question, parentQuestion, updateQuestion}: QuestionDependencyValueEditorProps) {
    switch (parentQuestion.type) {
        case "string":
        case "text":
            return <Input className="bg-card"
                          value={question.depends_on?.value as string} 
                          onChange={(e) => updateQuestion({
                              id: question.id, 
                              field: "depends_on", 
                              value: {id: parentQuestion.id, value: e.target.value
                          }})}/>
        case "temperature":
        case "number":
            return <Input type="number" value={question.depends_on?.value as number}
                          className="bg-card"
                          onChange={(e) => updateQuestion({
                              id: question.id,
                              field: "depends_on",
                              value: {id: parentQuestion.id, value: parseFloat(e.target.value)}
                          })}/>
        case "boolean":
            return <Switch className="cursor-pointer bg-card" checked={question.depends_on?.value as boolean}
                          onCheckedChange={(e) => updateQuestion({
                              id: question.id,
                              field: "depends_on",
                              value: {id: parentQuestion.id, value: e.valueOf()}
                          })}/>
        case "date":
            return <Input type="date" value={question.depends_on?.value as string}
                          className="bg-card"
                          onChange={(e) => updateQuestion({
                              id: question.id,
                              field: "depends_on",
                              value: {id: parentQuestion.id, value: e.target.value}
                          })}/>
        case "select":
            const options = typeof parentQuestion.options === "string" ? predefinedOptionLists[parentQuestion.options] : parentQuestion.options
            return <Select value={question.depends_on?.value as string}
                          onValueChange={(e) => updateQuestion({
                              id: question.id,
                              field: "depends_on",
                              value: {id: parentQuestion.id, value: e}
                          })}>
                <SelectTrigger className="bg-card cursor-pointer" >
                    <SelectValue placeholder="Select a value" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem className="cursor-pointer" value="None">None</SelectItem>
                        {options.filter(o => o).map((o, idx) => (
                            <SelectItem className="cursor-pointer" key={idx} value={o}>{o}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
    }
}