import { Study } from "@/types"

const data: Study[] = [
    {
        name: "ANEC",
        contact: {
            name: "Alex Brown",
            email: "alexander.brown5@nhs.net"
        },
        options: {
            hidden_question_placeholder: "N/A"
        },
        pages: [
            {
                id: "f77cc1f0-0293-4776-b557-68f6f40b406f",
                prompt: "Main",
                questions: [
                    {id: "e2aa6cb6-98d9-40e7-ae03-1b32eaaae910", prompt: "Reporting Clinician", type: "string"},
                    {id: "fe840969-ac5b-4404-b9b1-421ea66b0d81", prompt: "Trust", type: "select", options: "nhs-trust"},
                    {id: "3cddf8f7-d5a2-4695-91d8-4db11d302084", prompt: "DOB", type: "date", mandatory: true},
                    {id: "1c19bc75-b92c-49a4-857e-9427f9bc1a73", prompt: "MRN", type: "number", mandatory: true},
                    {id: "cfef9a4b-6a53-46f9-90d1-c2df6c04dd18", prompt: "Temperature", type: "temperature", mandatory: false},
                    {id: "300d8222-ffb9-444c-95ef-c1d4e0cd4b84", prompt: "Shock", type: "select", options: "yes-no", mandatory: true},
                    {id: "4e28a8f8-d070-4857-9e74-2fea04778c2a", prompt: "Clinical Features of shock", type: "text", "depends_on": {
                        id: "300d8222-ffb9-444c-95ef-c1d4e0cd4b84", "value": "yes"
                    }},
                    {id: "6f5898ca-db0c-4e8a-8f84-7f448ad0bca1", prompt: "Clinical narrative", type: "text"},
                    {id: "1b4b5d76-b581-4e82-9e17-9f63a9fef633", prompt: "Gender", type: "select", options: ["male", "female", "other"]}
                ]
            },
            {
                id: "f47cb089-2610-4ab4-90b2-b930b46f2f21",
                questions: [
                    {id: "69b393ad-e6ae-47e8-b414-fc1654b7b034", prompt: "Anything Else", type: "text"},
                ]
            }
        ]
    }, 
    {
        name: "ITES",
        contact: {
            name: "Alex Brown",
            email: "alexander.brown5@nhs.net"
        },
        options: {
            hidden_question_placeholder: "N/A"
        },
        pages: [
            {
                id: "ac535887-41d4-46bf-bea8-c31f64d8ed89",
                prompt: "Main",
                questions: [
                    {id: "e2aa6cb6-98d9-40e7-ae03-1b32eaaae910", prompt: "Reporting Clinician", type: "string"},
                    {id: "fe840969-ac5b-4404-b9b1-421ea66b0d81", prompt: "Trust", type: "select", options: "nhs-trust"},
                    {id: "3cddf8f7-d5a2-4695-91d8-4db11d302084", prompt: "DOB", type: "date", mandatory: true},
                    {id: "1c19bc75-b92c-49a4-857e-9427f9bc1a73", prompt: "MRN", type: "number", mandatory: true},
                    {id: "cfef9a4b-6a53-46f9-90d1-c2df6c04dd18", prompt: "Temperature", type: "temperature", mandatory: false},
                    {id: "300d8222-ffb9-444c-95ef-c1d4e0cd4b84", prompt: "Shock", type: "select", options: "yes-no", mandatory: true},
                    {id: "6f5898ca-db0c-4e8a-8f84-7f448ad0bca1", prompt: "Clinical narrative", type: "text"},
                    {id: "1b4b5d76-b581-4e82-9e17-9f63a9fef633", prompt: "Gender", type: "select", options: ["male", "female", "other"]}
                ]
            }
        ]
    }
]

export default data