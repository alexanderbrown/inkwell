import type { ReactElement } from 'react';
import type {QuestionInputComponentProps} from './QuestionInputComponent';
import { Input } from '../ui/input';

export default function Number({question, field}: QuestionInputComponentProps): ReactElement {
    if (question.type !== 'number') {
        throw new Error(`Number component received a question of type ${question.type}`);
    }
    return (
        <Input
            {...field}
            type="number"
            className="max-w-32"
            placeholder=""
            autoComplete="off"
            defaultValue={question.default || ''}
            />
    );
}