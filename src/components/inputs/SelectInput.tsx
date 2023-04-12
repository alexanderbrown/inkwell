import { QuestionInputProps } from "@/types";
import input_style from "@/styles/inputComponent";

import listOptions from "@/assets/list-options";
import assert from "assert";

export default function SelectInput({question, current_value, update_value}: QuestionInputProps){
    
    let options: Array<string> | undefined
    if (typeof question.options === 'string'){
        // TODO: (P2) throw error if no options
        // TODO: (P3) handle error better
        assert(Object.keys(listOptions).includes(question.options), `${question.options} is not a valid pre-defined option list`)
        options = listOptions[question.options?.toLowerCase()]
    } else {
        options = question.options
    }

    return(
        <select id={question.id} 
                name={question.prompt} 
                required={question.mandatory}
                value={current_value}
                className={input_style + "w-fit"}
                onChange={(e) => update_value(e)}>
                    <option value=""></option>
                    {options?.map(o => <option value={o} key={o}> {o} </option>)}
                </select>
    )
}