import { useEffect, useState, type ReactElement } from 'react';
import type {QuestionInputComponentProps} from './QuestionInputComponent';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

function toCelsius(fahrenheit: number | undefined): number | undefined {
    if (fahrenheit === undefined) return undefined
    return Number(((fahrenheit - 32) * 5 / 9).toFixed(1));
}

function toFahrenheit(celsius: number | undefined): number | undefined {
    if (celsius === undefined) return undefined
    return Number((celsius * 9 / 5 + 32).toFixed(1));
}

export default function Temperature({question, field}: QuestionInputComponentProps): ReactElement {
    if (question.type !== 'temperature') {
        throw new Error(`Temperature component received a question of type ${question.type}`);
    }
    const [useFahrenheit, setUseFahrenheit] = useState(false);
    const [temp, setTemp] = useState<number | undefined>(question.default);

    const {onChange: fieldOnChange, value: fieldValue, ...rest} = field;

    useEffect(() => {
        const temp_celsius = useFahrenheit ? toCelsius(temp) : temp;
        fieldOnChange(temp_celsius);
    }, [temp, useFahrenheit, fieldOnChange]);

    return (
        <div className="flex flex-row items-center gap-1">
        <Input
            {...rest}
            value={temp}
            type="number"
            min={useFahrenheit? 75: 25}
            max={useFahrenheit? 115: 45}
            step={0.1}
            className="max-w-32"
            placeholder=""
            autoComplete="off"
            onChange={(e) => {
                if (e.target.value) setTemp(parseFloat(e.target.value));
            }}
            />
        <Button
            type='button'
            variant="outline"
            className="group/toggle h-8 w-8 px-0 hover:cursor-pointer"
            onClick={() => {
                if (useFahrenheit) {
                    setTemp((prev) => prev ? toCelsius(temp) : undefined);
                    setUseFahrenheit(false);
                } else {
                    setTemp((prev) => prev ? toFahrenheit(temp) : undefined);
                    setUseFahrenheit(true);
                }
            }}
            >
            <span className="text-sm font-medium text-primary group-hover/toggle:text-primary">
                {useFahrenheit ? '°F' : '°C'}
            </span>
        </Button>
        </div>
    );
}