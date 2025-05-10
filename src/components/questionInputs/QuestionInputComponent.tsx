import type { ReactElement } from "react";
import type { ControllerRenderProps } from "react-hook-form";

import type { Question } from "~/types";

export interface QuestionInputComponentProps {
    question: Question;
    field: ControllerRenderProps;
}
const InputComponents:  Record<Question['type'], ((qicp: QuestionInputComponentProps) => ReactElement)> = {
    string: (await import("./String")).default,
    boolean: (await import("./Boolean")).default,
    number: (await import("./Number")).default,
    date: (await import("./Date")).default,
    select: (await import("./Select")).default,
    text: (await import("./Text")).default,
    temperature: (await import("./Temperature")).default,
};

export default function QuestionInputComponent({ question, field }: QuestionInputComponentProps): ReactElement {
    const Component = InputComponents[question.type];

    if (!Component) {
        throw new Error(`No input component found for question type ${question.type}`);
    }

    return <Component question={question} field={field} />;
}