import type { Study } from "~/types";
import { writeFileSync } from "fs";
import { join } from "path";
import { randomUUID } from  'crypto';

const study: Study = {
    name_full: 'Example Study',
    name_short: 'example',
    contact: {
        name: 'Alex Brown',
        email: 'test@nhs.net'
    },
    responseID_field: '8e9787c7-dfe5-4118-8f8d-256e87ca4712',
    pages: [
        {
            prompt: 'Demographics',
            id: randomUUID(),
            questions: [
                {
                    id: randomUUID(),
                    prompt: 'Age',
                    type: 'number',
                    mandatory: true,
                }, 
                {
                    id: randomUUID(),
                    prompt: 'Gender',
                    type: 'select',
                    options: ['Male', 'Female', 'Other'],
                }, 
                {
                    id: '8e9787c7-dfe5-4118-8f8d-256e87ca4712',
                    prompt: 'Response ID', 
                    type: 'string',
                    mandatory: true,
                }
            ]
        }, 
        {
            prompt: 'Medical History',
            id: randomUUID(),
            questions: [
                {
                    id: randomUUID(),
                    prompt: 'Allergies',
                    type: 'select', 
                    options: ['None', 'Peanuts', 'Penicillin', 'Other'],
                },
                {
                    id: '3e0e0ded-7223-4a4a-bff8-dd62022ae556',
                    prompt: 'Chronic Conditions',
                    type: 'select', 
                    options: ['None', 'Autism', 'Epilepsy', 'Other', 'Multiple'],
                },
                {
                    id: randomUUID(),
                    prompt: 'Chronic Conditions Details',
                    type: 'text',
                    depends_on: {
                        id: '3e0e0ded-7223-4a4a-bff8-dd62022ae556',
                        value: ['Multiple', 'Other'],
                    }
                },
            ]
        }, 
        {
            prompt: 'Admission Information',
            id: randomUUID(),
            questions: [
                {
                    id: randomUUID(),
                    prompt: 'Date of Admission',
                    type: 'date',
                    default: new Date().toISOString().split('T')[0],
                },
                {
                    id: 'a073b9a5-971c-438d-965a-14e43f435779',
                    prompt: 'Abnormal Temperature on Admission?',
                    type: 'boolean',
                    default: false,
                },
                {
                    id: randomUUID(),
                    prompt: 'Temperature on Admission',
                    type: 'temperature',
                    default: 37.0,
                    depends_on: {
                        id: 'a073b9a5-971c-438d-965a-14e43f435779',
                        value: true,
                    }
                },
            ]
        }
    ]
}

const baseDir = 'src/server/studies';

const filePath = join(baseDir, "example.json");
writeFileSync(filePath, JSON.stringify(study, null, 2), "utf-8");
console.log(`Study object written to ${filePath}`);