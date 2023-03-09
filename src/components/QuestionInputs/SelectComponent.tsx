import { Question, QuestionChangeEvent } from "@/types";
import input_style from "./style";

import listOptions from "@/resources/list-options";
import assert from "assert";

export default function Select({question, update_value}: 
                              {question: Question, update_value: (e: QuestionChangeEvent) => void}){
    
    let options: Array<string> | undefined
    if (typeof question.options === 'string'){
        // TODO: (P3) handle error better
        assert(Object.keys(listOptions).includes(question.options), `${question.options} is not a valid pre-defined option list`)
        options = listOptions[question.options?.toLowerCase()]
    } else {
        options = question.options
    }
    // TODO: (P2) throw error if no options

    let defaultValue: string = question.default?.toString() || ""

    return(
        <select id={question.id} 
                name={question.prompt} 
                required={question.mandatory}
                defaultValue={defaultValue} 
                className={input_style + "w-fit"}
                onChange={(e) => update_value(e)}>
                    <option value=""></option>
                    {options?.map(o => <option value={o} key={o}> {o} </option>)}
                </select>
    )
}