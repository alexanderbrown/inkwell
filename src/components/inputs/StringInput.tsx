import { QuestionInputProps } from "@/types";
import input_style from "@/styles/inputComponent";

export default function StringInput({question, current_value, update_value}: QuestionInputProps){
    return(
        <input id={question.id} 
               name={question.prompt} 
               required={question.mandatory}
               value={current_value}
               type='string'
               className={input_style + "w-60"}
               onChange={(e) => update_value(e)}/>
    )
}