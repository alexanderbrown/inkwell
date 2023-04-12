import { QuestionInputProps } from "@/types";
import input_style from "@/styles/inputComponent";

export default function TextInput({question, update_value, current_value}: QuestionInputProps){
    return(
        <textarea id={question.id} 
                name={question.prompt} 
                required={question.mandatory} 
                value={current_value}
                className={input_style + "h-32 my-2 min-h-[8rem]"}
                onChange={(e) => update_value(e)}/>
    )
}