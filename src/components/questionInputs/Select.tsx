import type { ReactElement } from 'react';
import type {QuestionInputComponentProps} from './QuestionInputComponent';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "~/components/ui/select"
import { predefinedOptionLists } from '~/lib/predefinedOptionLists';

export default function SelectComponent({question, field}: QuestionInputComponentProps): ReactElement {
    if (question.type !== 'select') {
        throw new Error(`Select component received a question of type ${question.type}`);
    }

    const options = typeof question.options === "string" ? predefinedOptionLists[question.options] : question.options;

    return (
        <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-[180px] cursor-pointer">
                <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className='cursor-default'>
                <SelectGroup>
                    <SelectLabel>{question.prompt}</SelectLabel>
                    {options.map((option) => {
                        return (
                            <SelectItem  className='cursor-pointer' key={option} value={option}>
                                {option}
                            </SelectItem>
                        )
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}