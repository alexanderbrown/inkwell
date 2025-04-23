import { Study } from "@/types"

const data: Study[] = [
    // {
    //     name: "ANEC",
    //     contact: {
    //         name: "Alex Brown",
    //         email: "alexander.brown5@nhs.net"
    //     },
    //     options: {
    //         hidden_question_placeholder: "N/A"
    //     },
    //     pages: [
    //         {
    //             id: "f77cc1f0-0293-4776-b557-68f6f40b406f",
    //             prompt: "Main",
    //             questions: [
    //                 {id: "e2aa6cb6-98d9-40e7-ae03-1b32eaaae910", prompt: "Reporting Clinician", type: "string"},
    //                 {id: "fe840969-ac5b-4404-b9b1-421ea66b0d81", prompt: "Trust", type: "select", options: "nhs-trust"},
    //                 {id: "3cddf8f7-d5a2-4695-91d8-4db11d302084", prompt: "DOB", type: "date", mandatory: true},
    //                 {id: "1c19bc75-b92c-49a4-857e-9427f9bc1a73", prompt: "MRN", type: "number", mandatory: true},
    //                 {id: "cfef9a4b-6a53-46f9-90d1-c2df6c04dd18", prompt: "Temperature", type: "temperature", mandatory: false},
    //                 {id: "300d8222-ffb9-444c-95ef-c1d4e0cd4b84", prompt: "Shock", type: "select", options: "yes-no", mandatory: true},
    //                 {id: "4e28a8f8-d070-4857-9e74-2fea04778c2a", prompt: "Clinical Features of shock", type: "text", "depends_on": {
    //                     id: "300d8222-ffb9-444c-95ef-c1d4e0cd4b84", "value": "yes"
    //                 }},
    //                 {id: "6f5898ca-db0c-4e8a-8f84-7f448ad0bca1", prompt: "Clinical narrative", type: "text"},
    //                 {id: "1b4b5d76-b581-4e82-9e17-9f63a9fef633", prompt: "Gender", type: "select", options: ["male", "female", "other"]}
    //             ]
    //         },
    //         {
    //             id: "f47cb089-2610-4ab4-90b2-b930b46f2f21",
    //             questions: [
    //                 {id: "69b393ad-e6ae-47e8-b414-fc1654b7b034", prompt: "Anything Else", type: "text"},
    //             ]
    //         }
    //     ]
    // }, 
    // {
    //     name: "ITES",
    //     contact: {
    //         name: "Alex Brown",
    //         email: "alexander.brown5@nhs.net"
    //     },
    //     options: {
    //         hidden_question_placeholder: "N/A"
    //     },
    //     pages: [
    //         {
    //             id: "ac535887-41d4-46bf-bea8-c31f64d8ed89",
    //             prompt: "Main",
    //             questions: [
    //                 {id: "e2aa6cb6-98d9-40e7-ae03-1b32eaaae910", prompt: "Reporting Clinician", type: "string"},
    //                 {id: "fe840969-ac5b-4404-b9b1-421ea66b0d81", prompt: "Trust", type: "select", options: "nhs-trust"},
    //                 {id: "3cddf8f7-d5a2-4695-91d8-4db11d302084", prompt: "DOB", type: "date", mandatory: true},
    //                 {id: "1c19bc75-b92c-49a4-857e-9427f9bc1a73", prompt: "MRN", type: "number", mandatory: true},
    //                 {id: "cfef9a4b-6a53-46f9-90d1-c2df6c04dd18", prompt: "Temperature", type: "temperature", mandatory: false},
    //                 {id: "300d8222-ffb9-444c-95ef-c1d4e0cd4b84", prompt: "Shock", type: "select", options: "yes-no", mandatory: true},
    //                 {id: "6f5898ca-db0c-4e8a-8f84-7f448ad0bca1", prompt: "Clinical narrative", type: "text"},
    //                 {id: "1b4b5d76-b581-4e82-9e17-9f63a9fef633", prompt: "Gender", type: "select", options: ["male", "female", "other"]}
    //             ]
    //         }
    //     ]
    // }, 
    {
        name: "AESD",
        name_full: "Acute encephalopathy with biphasic seizures and late reduced diffusion",
        contact: {
            name: "Alex Brown",
            email: "alexander.brown5@nhs.net"
        },
        options: {
            hidden_question_placeholder: "N/A"
        },
        pages: [
            {
                id: "0a0964e4-d503-4199-97c1-23494786db78",
                prompt: "Inclusion Criteria",
                questions: [
                    {id: "f5add424-f625-414d-86ce-355f28b9496c", 
                        prompt: "Age 0-18", 
                        type: "select", options: "yes-no-unknown"
                    },
                    {id: "de56e633-4147-4eea-b2d0-23f67ad23c0c", 
                        prompt: "Suspected diagnosis of acute encephalopathy with biphasic seizures and late diffusion restriction (AESD) (Sakuma et al 2024):", 
                        type: "select", options: "yes-no-unknown", mandatory: true
                    },
                        {id: "76adaa8f-6365-4de8-a336-721c9190742d", 
                            prompt: "Essential: febrile illness preceding or concurrent to onset of neurologic symptoms", 
                            type: "select", options: "yes-no-unknown", 
                            depends_on: {id: "de56e633-4147-4eea-b2d0-23f67ad23c0c", value: "Yes"}
                        },
                        {id: "d3cc2cbb-c646-431f-b51b-41115c138d0d", prompt: "Essential: presence of encephalopathy by clinical exam", 
                            type: "select", options: "yes-no-unknown", 
                            depends_on: {id: "de56e633-4147-4eea-b2d0-23f67ad23c0c", value: "Yes"}
                        },
                        {id: "58dfef3d-2f1b-4cac-a24e-455dde877045", prompt: "Common: early seizure with fever on days 1-2 with recurrence of seizures on day 3-7", 
                            type: "select", options: "yes-no-unknown", 
                            depends_on: {id: "de56e633-4147-4eea-b2d0-23f67ad23c0c", value: "Yes"}
                        },
                        {id: "b0f1a2d4-3c5e-4f8b-9a6c-7d1e0f3a2b8c", prompt: "Essential: diffusion restriction of subcortical white matter on day 3-14", 
                            type: "select", options: "yes-no-unknown", 
                            depends_on: {id: "de56e633-4147-4eea-b2d0-23f67ad23c0c", value: "Yes"}
                        },
                        {id: "ac842fd3-7d0a-445d-8aa6-4d7fa1146729", prompt: "Common: relative sparing of pre/post central gyrus, restricted diffusion in cortex", 
                            type: "select", options: "yes-no-unknown", 
                            depends_on: {id: "de56e633-4147-4eea-b2d0-23f67ad23c0c", value: "Yes"}
                        },
                    {id: "781b33ea-6e98-4ab2-89d3-cdd07159c177", 
                        prompt: "Name of professional completing this log entry", 
                        type: "string", mandatory: true
                    },
                    {id: "ae0db599-c42c-41f8-b085-7d3c473a9af6", 
                        prompt: "Email address of professional completing this log entry", 
                        type: "string", mandatory: true
                    },
                    {id: "f9503036-928a-45ec-b006-d7a4f013fb4a", 
                        prompt: "FULLY DEIDENTIFIED PATIENT ID \n e.g. '[Hospital Abbreviation]-AESD-001'. \n Please do not include any patient identifiers including abbreviations", 
                        type: "string", mandatory: true
                    },
                ]
            },
            {
                id: "c26bab54-f3bc-406b-99b2-e03a7127b003",
                prompt: "Demographics",
                questions: [
                    {id: "3a5cfae0-ebe6-4046-881e-5aff774b1ee8",
                         prompt: "State or Country of Hospitalization", 
                         type: "select", options: "uk-us", mandatory: true
                    },
                    {id: "c3811844-e5ae-4001-8abb-0ef527b9d2df",
                        prompt: "Month of clinical presentation", 
                        type: "select", options: "months"
                    },
                    {id: "6d5c92bb-6e66-427f-8a90-b5a736713798", 
                        prompt: "Year of clinical presentation", 
                        type: "select", options: "aesd-years"
                    },
                    {id: "219d3712-df11-40cf-85a8-c364f5cbc203", 
                        prompt: "Age at presentation (mm)", 
                        type: "number"
                    },
                    {id: "53577c64-23e4-4414-9861-be8d130e51b3", 
                        prompt: "Sex",
                        type: "select", options: "male-female"
                    },
                    {id: "c900588f-b02f-4cfd-bd3e-f1d707528dff",
                        prompt: "Race/ethnicity:", 
                        type: "select", options: "aesd-ethnicity"
                    },
                ]
            },
            {
                id: "f65517eb-19b8-4d00-910d-881ef8f03d59", 
                prompt: "Past Medical History",
                questions: [
                    {id: "43ee4390-0ada-451c-952e-172e1bec343c",
                        prompt: "Any pre-existing neurodevelopmental/psychiatric/behavioural problems?",
                        type: "select", options: "aesd-pmh-neurodev"
                    },
                        {id: "f4e70f96-d424-4ab8-b69a-bc8899e97f07", 
                            prompt: 'Combined / Other neurodevelopmental history details',
                            type: "text",
                            depends_on: {id: "43ee4390-0ada-451c-952e-172e1bec343c", value: ["Combined", "Other"]}
                        }, 
                    {id: "f3f0e30e-8077-40a4-9fc5-cf662adcb37f", 
                        prompt: "Any pre-existing neurological problems?",
                        type: "select", options: "aesd-pmh-neuro"
                    },
                        {id: "93699010-d66b-4732-a832-11e5e4a99be1", 
                            prompt: 'Other neurological history details',
                            type: "text",
                            depends_on: {id: "f3f0e30e-8077-40a4-9fc5-cf662adcb37f", value: "Other"}
                        },
                    {id: "a198eb2d-940c-4079-92c8-5cea1199c936", 
                        prompt: "Any prior autoimmune / inflammatory disease?", 
                        type: "select", options: "yes-no-unknown"
                    },
                        {id: "02f50ae2-0d1f-43fd-b511-dc6692aee749", 
                            prompt: 'Other autoimmune / inflammatory disease details',
                            type: "text",
                            depends_on: {id: "a198eb2d-940c-4079-92c8-5cea1199c936", value: "Yes"}
                        },
                    {id: "f3263283-c0f0-4ac8-bf5c-a62f310798c1", 
                        prompt: "Pregnancy/birth issues:",
                        type: "select", options: "yes-no-unknown"
                    }, 
                        {id: "f3c4a0b1-2d8e-4b5f-9a7c-6d0e1f2a5b8c", 
                            prompt: 'Pregnancy/birth issues details',
                            type: "text",
                            depends_on: {id: "f3263283-c0f0-4ac8-bf5c-a62f310798c1", value: "Yes"}
                        },
                    {id: "d99348fc-3b7f-4f93-9ef0-c94ddb0b5dc3",
                        prompt: "Birth at term or preterm?",
                        type: "select", options: "aesd-preterm"
                    }
                ]
            }
        ]
    }, 
]

export default data