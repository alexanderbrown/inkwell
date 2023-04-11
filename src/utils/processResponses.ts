import { Study } from "@/types";

type Dict = NodeJS.Dict<string | number>

/**
 * Censors responses to hidden questions.
 * 
 * Returns the response dictionary, with responses to hidden quesions set to the placeholder value - defaults to `''` if not specified
 * 
 */
export function censorInvisibleOptions({study, responses}: {study: Study, responses: Dict}): Dict{
    study.questions
        .filter(question => question.depends_on)
        .forEach(question => {
            const parent_id = question.depends_on?.id || ''
            if (responses[parent_id] !== question.depends_on?.value){
                responses[question.id] = study.options?.hidden_question_placeholder || ''
            }
        })
    return responses
}

/**
 * Replaces the unique UUID key in the response dictionary with the (potentially none-unique) prompt string
 * This is for export and human readability
 */
export function replaceKeyWithPrompt({study, responses}: {study: Study, responses: Dict}){
    responses = Object.fromEntries(Object.entries(responses).map(([k,v])=> {
        return [study.questions.filter(question => question.id===k)[0].prompt, v]
    }))
    return responses
}

/**
 * Converts a response dict to CSV format:
 * * Converts the dict to a array of string arrays; first element is the header row, second is the values
 * * Escapes all `"` by converting to `""`
 */
export function toCSVFormat(responses: Dict){
    return [Object.keys(responses), Object.values(responses).map(v=>(v || '').toString().replaceAll('"', '""'))]
}

export function blankResponses(study: Study): Dict {
    const responses = study.questions.map(question => {
        const key = question.id
        const value = question.default || undefined
        return [key, value]
    })
    return Object.fromEntries(responses)
}