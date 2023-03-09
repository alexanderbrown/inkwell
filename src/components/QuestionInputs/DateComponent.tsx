import { Question, QuestionChangeEvent } from "@/types";
import input_style from "./style";

export default function DateComponent({question, update_value}: 
                             {question: Question, update_value: (e: QuestionChangeEvent) => void}){

    let default_date: string | undefined
    if (question.default==='today'){
        default_date = new Date().toISOString().slice(0, 10)
    } else {
        default_date = question.default?.toString()
    }
    return(
        <input id={question.id} 
               name={question.prompt} 
               required={question.mandatory} 
               defaultValue={default_date}
               type='date'
               className={input_style + "w-32"}
               onChange={(e) => update_value(e)}/>
    )
}