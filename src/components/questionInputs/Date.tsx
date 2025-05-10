import type { ReactElement } from 'react';
import type {QuestionInputComponentProps} from './QuestionInputComponent';
import { Input } from '../ui/input';

export default function Date({question, field}: QuestionInputComponentProps): ReactElement {
    if (question.type !== 'date') {
        throw new Error(`Date component received a question of type ${question.type}`);
    }
    return (
        // TODO: Use a better styled date picker with popover and calendar components
        <Input
            {...field}
            type="date"
            className="max-w-40"
            placeholder=""
            autoComplete="off"
            defaultValue={question.default}
            />
    );
}