import { useState } from "react";


import { Label } from "~/components/ui/label";
import { Select as SelectBase, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { predefinedOptionLists } from "~/lib/predefinedOptionLists";
import type { Question, updateQuestionProps } from "~/types";

export default function Select({question, updateQuestion}: {question: Question, updateQuestion: (props: updateQuestionProps) => void}) {

    const [selectedOptionPreset, setSelectedOptionPreset] = useState<string>(question.type==='select' && typeof question.options === "string" ? question.options : "custom")
    
    if (question.type !== 'select') {
        throw new Error(`Select component received a question of type ${question.type}`);
    }
    
    const options = typeof question.options === "string" ? predefinedOptionLists[question.options] : question.options

            return (<>
                <Label className="text-sm font-semibold">Options</Label>
                <div>
                    <SelectBase value={selectedOptionPreset} onValueChange={(e) => {
                        setSelectedOptionPreset(e)
                        if (e !== "custom") {
                            console.log(e)
                            const newOptions = predefinedOptionLists[e as keyof typeof predefinedOptionLists]
                            updateQuestion({
                                id: question.id, 
                                field: "options", 
                                value: e as keyof typeof predefinedOptionLists
                            })
                            if (question.default && !newOptions.includes(question.default)) {
                                updateQuestion({
                                    id: question.id,
                                    field: "default",
                                    value: undefined
                                })
                            }
                        } else {
                            updateQuestion({
                                id: question.id,
                                field: "options",
                                value: []
                            })
                        }
                    }}>
                        <SelectTrigger className="bg-card cursor-pointer" >
                            <SelectValue placeholder="Select a value" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {Object.keys(predefinedOptionLists).map((listName) => (
                                    <SelectItem className="cursor-pointer" key={listName} value={listName}>{listName}</SelectItem>
                                ))}
                                <SelectItem className="cursor-pointer" value="custom">custom...</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </SelectBase>
                    <Textarea className="bg-card" 
                        disabled={selectedOptionPreset !== "custom"}
                        value={options.join("\n")} 
                        onChange={(e) => {
                            const newOptions = e.target.value.split("\n")
                            if (selectedOptionPreset === "custom"){
                                updateQuestion({
                                    id: question.id, 
                                    field: "options", 
                                    value: newOptions
                                })
                            }
                            if (question.default && !newOptions.includes(question.default)) {
                                updateQuestion({
                                    id: question.id,
                                    field: "default",
                                    value: undefined
                                })
                            }
                        }}
                        onBlur={(e) => selectedOptionPreset === "custom" && updateQuestion({
                                id: question.id,
                                field: "options",
                                value: e.target.value.split("\n").filter(o => o !== "")
                        })} 
                    />    
                </div>
            </>)
}