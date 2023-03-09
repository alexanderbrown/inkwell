import { Question, QuestionChangeEvent } from "@/types";
import input_style from "./style";

export default function NumberComponent({question, updateValue, step}: 
                              {question: Question, updateValue: (e: QuestionChangeEvent) => void, step: number}){
    return(
        <input id={question.prompt} 
               name={question.prompt} 
               required={question.mandatory} 
               defaultValue={question.default}
               type='number'
               step={step}
               className={input_style + "w-40"}
               onChange={(e) => updateValue(e)}/>
    )
}