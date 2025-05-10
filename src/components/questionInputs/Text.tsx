import type { ReactElement } from 'react';
import type {QuestionInputComponentProps} from './QuestionInputComponent';
import { Textarea } from '../ui/textarea';

export default function Text({question, field}: QuestionInputComponentProps): ReactElement {
    if (question.type !== 'text') {
        throw new Error(`Text component received a question of type ${question.type}`);
    }
    return (
        <Textarea 
            {...field}
            placeholder=""
            autoComplete="off"
            defaultValue={question.default}
            />
    );
}