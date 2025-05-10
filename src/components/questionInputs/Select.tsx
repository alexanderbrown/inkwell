import type { ReactElement } from 'react';
import type {QuestionInputComponentProps} from './QuestionInputComponent';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "~/components/ui/select"

export default function SelectComponent({question, field}: QuestionInputComponentProps): ReactElement {
    if (question.type !== 'select') {
        throw new Error(`Select component received a question of type ${question.type}`);
    }
    return (
        <Select onValueChange={field.onChange} defaultValue={question.default}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{question.prompt}</SelectLabel>
                    {question.options.map((option) => {
                        return (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        )
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}