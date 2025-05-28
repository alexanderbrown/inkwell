import type { ReactElement } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { predefinedOptionLists } from "~/lib/predefinedOptionLists";
import type { Question, updateQuestionProps } from "~/types"

type defaultProps = {
    question: Question
    updateQuestion: (props: updateQuestionProps) => void
}

export default function EditDefault({question, updateQuestion}: defaultProps) {    

    let content: ReactElement | null = null;
    switch (question.type) {
        case 'string':
            content =  <Input className="bg-card" value={question.default} onChange={(e) => updateQuestion({
                id: question.id, 
                field: "default", 
                value: e.target.value === "" ? undefined : e.target.value
            })} />
        case 'text':
            content = <Textarea className="bg-card" value={question.default} onChange={(e) => updateQuestion({
                id: question.id, 
                field: "default", 
                value: e.target.value === "" ? undefined : e.target.value
            })}/>
        case 'number':
            content = <Input className="bg-card w-32" type="number" value={question.default} onChange={(e) => updateQuestion({
                id: question.id, 
                field: "default", 
                value: e.target.value === "" ? undefined :parseFloat(e.target.value)
            })}/>
        case 'date':
            content =  <Input className="bg-card" type="date" value={question.default} onChange={(e)=> updateQuestion({
                id: question.id, 
                field: "default", 
                value: e.target.value === "" ? undefined : e.target.value
            })}/>
        case 'boolean':
            const bool_options = {
                true: true,
                false: false,
                none: undefined
            }
        
            const val_as_string = question.default === true ? "true" : question.default === false ? "false" : "none"
        
            
            content =  <Select value={val_as_string} onValueChange={(e) => updateQuestion({
                id: question.id,
                field: "default",
                value: bool_options[e as keyof typeof bool_options]
            })}>
                <SelectTrigger className="bg-card cursor-pointer" >    
                    <SelectValue placeholder="Select a value" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Default Value</SelectLabel>
                        <SelectItem className="cursor-pointer" value="none">None</SelectItem>
                        <SelectItem className="cursor-pointer" value="true">True</SelectItem>
                        <SelectItem className="cursor-pointer" value="false">False</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        case 'select':
            if (question.type === "select") {
                const options = typeof question.options === "string" ? predefinedOptionLists[question.options] : question.options
                content = <Select value={question.default as string} onValueChange={(e) => updateQuestion({
                    id: question.id,
                    field: "default",
                    value: e === "None" ? undefined : e
                })}>
                    <SelectTrigger className="bg-card cursor-pointer" >
                        <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem className="cursor-pointer" value="None">None</SelectItem>
                            {options.map((o, idx) => (
                                <SelectItem className="cursor-pointer" key={idx} value={o || "none"}>{o}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select> 
            }
    }
    return (<>
        <Label className="text-sm font-semibold">Default Value</Label>
        {content || <span className="text-muted-foreground">No default value set</span>}
    </>)
}