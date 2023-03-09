import { Question, QuestionChangeEvent } from "@/types";
import input_style from "./style";

export default function Text({question, updateValue}: 
                              {question: Question, updateValue: (e: QuestionChangeEvent) => void}){
    return(
        <textarea id={question.prompt} 
                name={question.prompt} 
                required={question.mandatory} 
                defaultValue={question.default}
                className={input_style + "h-32 my-2 min-h-[8rem]"}
                onChange={(e) => updateValue(e)}/>
    )
}