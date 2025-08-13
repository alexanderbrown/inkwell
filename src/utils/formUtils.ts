
import type { Study, Question } from "~/types";

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
export function processResponses(formData: Object, study: Study, mode: 'partial' | 'complete') {
    const pages = study.pages;
    const questions = pages.flatMap((page) => page.questions);

    const raw_responses = Object.fromEntries(Object.entries(formData))
    
    const responses_all_questions: Record<string, {prompt: string, response: string}> = {};

    for (const question of questions) {
        let response = raw_responses[question.id] as string | number | boolean | undefined;

        
        // Convert boolean and number responses to strings, 
        if (typeof response === 'boolean') response = response ? 'True' : 'False';
        if (typeof response === 'number') response = response.toString();

        // Set undefined responses to the default value, if it exists, or an empty string
        if (response === undefined) response = question.default || '';

        // Remove values for branch questions if the condition is not met
        const dependency = question.depends_on;
        if (dependency) {
            const dependsOnQuestion = questions.find((q) => q.id === dependency.id);
            if (!dependsOnQuestion) continue; // Skip if the depends_on question is not found

            if (Array.isArray(dependency.value)) {
                const a = dependency.value as Array<string>;
                if (!a.includes(raw_responses[dependsOnQuestion.id])) {
                    response = study.options?.hidden_question_placeholder || 'N/A';
                }
            } else if (dependency.value !== raw_responses[dependsOnQuestion.id]) {
                response = study.options?.hidden_question_placeholder || 'N/A';
            }
        }

        responses_all_questions[question.id] = {
            prompt: question.prompt,
            response: response as string
        };
    }

    if (mode === 'complete') censorDates(study, responses_all_questions, questions);

    return responses_all_questions
}


// Censor dates if the study option is set
// The raw value will be censored (outputted as 'Censored'). An additional field will be added with the offset (in days) from the anonymise_relative_to date
function censorDates(study: Study, 
                    responses_all_questions: Record<string, {prompt: string, response: string}>, 
                    questions: Array<Question>) {
    if (study.options?.anonymise_dates) {
        questions.filter(q => q.type==='date').forEach((question) => {
            if (question.anonymise_relative_to) {
                const baselinePrompt = questions.find(q => q.id === question.anonymise_relative_to)?.prompt || 'Baseline Date';

                const baselineDateResponse = responses_all_questions[question.anonymise_relative_to]?.response
                if (!baselineDateResponse) throw new Error(`Unable to anonymise date question. There does not appear to be a response for the baseline date question ("${baselinePrompt}")`);
                const baselineDate = new Date(baselineDateResponse);
                const questionDateResponse = responses_all_questions[question.id]?.response;


                let duration_Days: string = 'Not Calculated';
                let duration_ID = question.id + '_duration'
                let duration_prompt = `Duration from ${baselinePrompt} to ${question.prompt}`; 

                // If the question date response is valid:
                // 1. Calculate the duration in days
                // 2. We don't censor the actual response yet, as it might be needed for other calculations
                if (questionDateResponse && 
                    questionDateResponse !== study.options?.hidden_question_placeholder &&
                    questionDateResponse !== 'N/A') {
                        const questionDate = new Date(questionDateResponse);
                        const duration = Math.round((questionDate.getTime() - baselineDate.getTime()) / (1000 * 60 * 60 * 24));
                        duration_Days = duration.toString();
                    }

                // Add the duration response to the end of the responses
                responses_all_questions[duration_ID] = {
                    prompt: duration_prompt,
                    response: duration_Days
                };
            }
        })
        // Loop again, this time censoring the actual date responses
        // This is done after the duration responses are added, so that the duration can be calculated regardless of which question is the baseline
        questions.filter(q => (q.type === 'date') && q.anonymise_relative_to).forEach((question) => {
            const questionResponse = responses_all_questions[question.id];
            if (questionResponse) {
                questionResponse.response = 'Censored';
            }
        })
    }
}