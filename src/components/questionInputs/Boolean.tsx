import type { ReactElement } from 'react';
import type {QuestionInputComponentProps} from './QuestionInputComponent';
import { Switch } from '../ui/switch';

export default function Boolean({question, field}: QuestionInputComponentProps): ReactElement {
    if (question.type !== 'boolean') {
        throw new Error(`Boolean component received a question of type ${question.type}`);
    }
    return (
        <Switch className='cursor-pointer'
        {...field}
        defaultChecked={question.default}
        onCheckedChange={field.onChange}
        checked={field.value === true ? true : false}
        />
    )
}