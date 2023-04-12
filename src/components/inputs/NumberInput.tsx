import { QuestionInputProps } from "@/types";
import input_style from "@/styles/inputComponent";

export default function NumberInput({question, update_value, current_value, step}: QuestionInputProps & {step: number}){
    return(
        <input id={question.id} 
               name={question.prompt} 
               required={question.mandatory} 
               value={current_value}
               type='number'
               step={step}
               className={input_style + "w-40"}
               onChange={(e) => update_value(e)}/>
    )
}