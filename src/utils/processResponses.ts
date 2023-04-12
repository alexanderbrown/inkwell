import { Question, Study } from "@/types";

type Dict = NodeJS.Dict<string | number>

/**
 * Gets all questions in a study - ignoring pagination
 */
function flatQuestions(study: Study) {
    return study.pages.flatMap(page => page.questions)
}


/**
 * Censors responses to hidden questions.
 * 
 * Returns the response dictionary, with responses to hidden quesions set to the placeholder value - defaults to `''` if not specified
 * 
 */
export function censorInvisibleOptions({study, responses}: {study: Study, responses: Dict}): Dict{
    flatQuestions(study)
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
 * 
 * @returns an array of responses to all questions, each of which is a 2-tuple of [<prompt>, <response>]
 */

export function replaceKeyWithPrompt({study, responses}: {study: Study, responses: Dict}): Array<Array<number | string | undefined>>{
    const responsesOut = Object.entries(responses).map(([k,v])=> {
        return [flatQuestions(study).filter(question => question.id===k)[0].prompt, v]
    })
    return responsesOut
}

/**
 * Converts a response array to CSV format:
 * * Converts the dict to a array of string arrays; first element is the header row, second is the values
 * * Escapes all `"` by converting to `""`
 */
export function toCSVFormat(responses: Array<Array<string | number | undefined>>){
    return responses.map(([k,v]) => [k, (v || '').toString().replaceAll('"', '""')])
    // return [Object.keys(responses), Object.values(responses).map(v=>(v || '').toString().replaceAll('"', '""'))]
}


/**
 * Returns the default value for a question 
 * This will be a blank string if not defined, the specified default, or a special value
 */
function defaultValue(question: Question): string | number | undefined {

    if (question.type==='date'){
        if (question.default==='today'){
            return new Date().toISOString().slice(0, 10)
        } else if (question.default) {
            return question.default.toString()
        } else {
            return undefined
        }
    } else {
        return question.default || undefined
    }
}


export function blankResponses(study: Study): Dict {
    const responses = flatQuestions(study).map(question => {
        const key = question.id
        const value = defaultValue(question)
        return [key, value]
    })
    return Object.fromEntries(responses)
}