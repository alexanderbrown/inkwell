import { Question, QuestionChangeEvent } from "@/types";
import input_style from "./style";

export default function String({question, updateValue}: 
                              {question: Question, updateValue: (e: QuestionChangeEvent) => void}){
    return(
        <input id={question.prompt} 
               name={question.prompt} 
               required={question.mandatory}
               defaultValue={question.default} 
               type='string'
               className={input_style + "w-60"}
               onChange={(e) => updateValue(e)}/>
    )
}