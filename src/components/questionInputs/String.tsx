import type { ReactElement } from 'react';
import type {QuestionInputComponentProps} from './QuestionInputComponent';
import { Input } from '../ui/input';

export default function String({question, field}: QuestionInputComponentProps): ReactElement {
    if (question.type !== 'string') {
        throw new Error(`String component received a question of type ${question.type}`);
    }
    return (
        <Input
            {...field}
            placeholder=""
            autoComplete="off"
            defaultValue={question.default}
            />
    );
}