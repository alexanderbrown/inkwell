
import type { Page, Study } from "~/types";

/**
 * Processes form responses by combining default question data with user-provided responses
 * and applying branching logic to remove responses for questions whose conditions are not met.
 *
 * @param formData - An object containing user-provided responses, where keys are question IDs
 *                   and values are the corresponding responses.
 * @param pages - An array of pages, each containing a list of questions. Each question includes
 *                properties such as `id`, `prompt`, `default`, and optional branching logic
 *                defined by `depends_on`.
 * 
 * @returns An object where each key is a question ID and the value is an object containing:
 *          - `prompt`: The question prompt.
 *          - `response`: The user-provided response or the default value, if no response was provided.
 *                        If the question is a branch question and its condition is not met, the response
 *                        will be set to `undefined`.
 */
export function processResponses(formData: Object, study: Study) {
    const pages = study.pages;
    const questions = pages.flatMap((page) => page.questions);
    // id: prompt
    const prompts = Object.fromEntries(questions.map((question) => [question.id, question.prompt]));
    // id: {prompt, response: default | undefined}
    const defaults = Object.fromEntries(questions.map((question) => [question.id, {prompt: question.prompt, response: question.default}]));
    // id: {prompt, response}
    const responses = Object.fromEntries(Object.entries(formData).map(([key, value]) => {
        return [key, {prompt: prompts[key], response: value}]
    }))

    const responses_all_questions =  {...defaults, ...responses}


    // Remove values for branch questions if branching condition is not met
    Object.entries(responses_all_questions).forEach(([key, value]) => {
        const question = questions.find((question) => question.id === key);
        if (question?.depends_on) {
            const dependsOnQuestion = questions.find((q) => q.id === question.depends_on?.id);
            if (!dependsOnQuestion) return;
            if (Array.isArray(question.depends_on.value)) {
                const a = question.depends_on.value as Array<string>;
                if (!a.includes(responses_all_questions[dependsOnQuestion.id]?.response)) {
                    responses_all_questions[key]!.response = study.options?.hidden_question_placeholder || 'N/A'
                }
            } else if (question.depends_on.value !== responses_all_questions[dependsOnQuestion.id]?.response) {
                responses_all_questions[key]!.response = study.options?.hidden_question_placeholder || 'N/A'
            }
        }
    })

    // Convert boolean and number responses to strings, and set undefined responses to empty strings
    Object.entries(responses_all_questions).forEach(([key, value]) => {
        if (value.response === undefined){
          value.response = ''
        } else if (typeof value.response === 'boolean') {
            value.response = value.response ? 'True' : 'False'
        } else if (typeof value.response === 'number') {
            value.response = value.response.toString()
        }
      }) 

    return responses_all_questions
}