
import {parse} from 'csv-parse/sync';
import type { Study } from '~/types';

interface downloadCSVProps {
    header: string[];
    body: string[][];
    filename: string;
}

export function parseCSV(csvString: string, study: Study): Record<string, string|number|boolean|undefined> | {error: string} {
    // Parse the CSV string into an array of arrays
    const results_raw = parse(csvString, {
        columns: false,
    }) as string[][];
    if (results_raw.length !== 3) {
        return {'error': `Expected 3 rows in CSV, got ${results_raw.length}`};
    }
    let ids = results_raw[0]!;
    let values = results_raw[2]!;
    // Create an object mapping IDs to their corresponding values
    let results: Record<string, string|number|boolean|undefined> = {};
    ids.forEach((id, index) => {
            results[id] = values[index];
    });
    const study_id = results['study_id'];
    if (!study_id) {
        return {'error': 'study_id not found in CSV'};
    }
    if (study_id !== study.id) {
        return {'error': `study_id in CSV (${study_id}) does not match study ID (${study.id})`};
    }
    delete results.study_id; // Remove study_id from results
    delete results.study_name_short; // Remove study_name_short from results
    delete results.study_name_full; // Remove study_name_full from results
    delete results.status; // Remove status from results

    if (Object.keys(results).length !==study.pages.flatMap(page => page.questions).length) {
        return {'error': `Expected ${study.pages.flatMap(page => page.questions).length} responses, got ${Object.keys(results).length}`};
    }

    const allQuestions = study.pages.flatMap(page => page.questions);
    // Parse responses, converting to numbers or booleans where appropriate
    Object.keys(results).forEach(key => {
        const question = allQuestions.find(q => q.id === key);
        if (question) {
            if (question.type === 'number' || question.type === 'temperature') {
                results[key] = parseFloat(results[key] as string);
            } else if (question.type === 'boolean') {
                results[key] = results[key] === 'True';
            } 
        }})
    return results;
}


export function downloadCSV({ header, body, filename }: downloadCSVProps) {
    // Convert the data array into a CSV string

    // Escape quotes in the header and body
    header = header.map(item => item.includes('"') ? item.replace(/"/g, '""') : item);
    body = body.map(row => row.map(item => item.includes('"') ? item.replace(/"/g, '""') : item));

    // Enclose all items with quotes. 
    // This will ensure that commas and newlines within the data do not break the CSV format.
    header = header.map(item => `"${item}"`);
    body = body.map(row => row.map(item => `"${item}"`));

    const csvString = [
        header,
        ...body,
    ]
    .map(row => row.join(","))
    .join("\n");

    if (!filename.endsWith('.csv')) {
        filename += '.csv'
    }

    // Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: 'text/csv' });

    // Generate a download link and initiate the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'download.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};