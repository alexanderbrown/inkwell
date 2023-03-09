import { Dict, Question, QuestionChangeEvent } from "@/types";
import input_style from "./style";

export default function Text({question, update_value}: 
                              {question: Question, 
                               update_value: (e: QuestionChangeEvent) => void}){
    return(
        <textarea id={question.id} 
                name={question.prompt} 
                required={question.mandatory} 
                defaultValue={question.default}
                className={input_style + "h-32 my-2 min-h-[8rem]"}
                onChange={(e) => update_value(e)}/>
    )
}