import { Question, QuestionChangeEvent } from "@/types";
import input_style from "@/styles/inputComponent";

export default function NumberInput({question, update_value, step}: 
                              {question: Question, update_value: (e: QuestionChangeEvent) => void, step: number}){
    return(
        <input id={question.id} 
               name={question.prompt} 
               required={question.mandatory} 
               defaultValue={question.default}
               type='number'
               step={step}
               className={input_style + "w-40"}
               onChange={(e) => update_value(e)}/>
    )
}