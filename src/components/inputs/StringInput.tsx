import { Question, QuestionChangeEvent } from "@/types";
import input_style from "@/styles/inputComponent";

export default function StringInput({question, update_value}: 
                              {question: Question, update_value: (e: QuestionChangeEvent) => void}){
    return(
        <input id={question.id} 
               name={question.prompt} 
               required={question.mandatory}
               defaultValue={question.default} 
               type='string'
               className={input_style + "w-60"}
               onChange={(e) => update_value(e)}/>
    )
}