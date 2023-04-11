import { Study } from "@/types"

const data: Study[] = [
    {
        "name": "ANEC",
        "options": {
            "hidden_question_placeholder": "N/A"
        },
        "questions": [
            {"id": "e2aa6cb6-98d9-40e7-ae03-1b32eaaae910", "prompt": "Reporting Clinician", "type": "string"},
            {"id": "fe840969-ac5b-4404-b9b1-421ea66b0d81", "prompt": "Trust", "type": "select", "options": "nhs-trust"},
            {"id": "3cddf8f7-d5a2-4695-91d8-4db11d302084", "prompt": "DOB", "type": "date", "mandatory": true},
            {"id": "1c19bc75-b92c-49a4-857e-9427f9bc1a73", "prompt": "MRN", "type": "number", "mandatory": true},
            {"id": "cfef9a4b-6a53-46f9-90d1-c2df6c04dd18", "prompt": "Temperature", "type": "temperature", "mandatory": false},
            {"id": "300d8222-ffb9-444c-95ef-c1d4e0cd4b84", "prompt": "Shock", "type": "select", "options": "yes-no", "mandatory": true},
            {"id": "4e28a8f8-d070-4857-9e74-2fea04778c2a", "prompt": "Clinical Features of shock", "type": "text", "depends_on": {
                "id": "300d8222-ffb9-444c-95ef-c1d4e0cd4b84", "value": "yes"
            }},
            {"id": "6f5898ca-db0c-4e8a-8f84-7f448ad0bca1", "prompt": "Clinical narrative", "type": "text"},
            {"id": "1b4b5d76-b581-4e82-9e17-9f63a9fef633", "prompt": "Gender", "type": "select", "options": ["male", "female", "other"]}
            ]
    }, 
    {
        "name": "ITES",
        "options": {
            "hidden_question_placeholder": "N/A"
        },
        "questions": [
            {"id": "e2aa6cb6-98d9-40e7-ae03-1b32eaaae910", "prompt": "Reporting Clinician", "type": "string"},
            {"id": "fe840969-ac5b-4404-b9b1-421ea66b0d81", "prompt": "Trust", "type": "select", "options": "nhs-trust"},
            {"id": "3cddf8f7-d5a2-4695-91d8-4db11d302084", "prompt": "DOB", "type": "date", "mandatory": true},
            {"id": "1c19bc75-b92c-49a4-857e-9427f9bc1a73", "prompt": "MRN", "type": "number", "mandatory": true},
            {"id": "cfef9a4b-6a53-46f9-90d1-c2df6c04dd18", "prompt": "Temperature", "type": "temperature", "mandatory": false},
            {"id": "300d8222-ffb9-444c-95ef-c1d4e0cd4b84", "prompt": "Shock", "type": "select", "options": "yes-no", "mandatory": true},
            {"id": "6f5898ca-db0c-4e8a-8f84-7f448ad0bca1", "prompt": "Clinical narrative", "type": "text"},
            {"id": "1b4b5d76-b581-4e82-9e17-9f63a9fef633", "prompt": "Gender", "type": "select", "options": ["male", "female", "other"]}
            ]
    }
]

export default data