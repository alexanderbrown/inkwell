import NHS_trusts from './list-options/NHS_trusts.json'

const options: {[id: string]: Array<string>} = {
    'yes-no': ['Yes', 'No'],
    'yes-no-unknown': ['Yes', 'No', 'Unknown'],
    'male-female': ['Male', 'Female'],
    'uk-us': ['UK', 'US'],
    'months': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    'nhs-trust': NHS_trusts, 
    'aesd-years': ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    'aesd-preterm': ['Birth at term', 
                     'Moderate to late preterm (32 to 37 w)', 
                     'Very  preterm (28  to less than 32 w)', 
                     'Extremely  preterm (less than 28 w)', 
                     'Unknown'],
    'aesd-ethnicity': ['East Asian (Japanese/Chinese/Korean)', 
                        'Hispanic or Latin American', 
                        'Black', 
                        'White', 
                        'South Asian (Indian Subcontinent)', 
                        'South East Asian (Filipino, Indochinese, Malay/Indonesian)', 
                        'Mixed/Other'],
    'aesd-pmh-neurodev': ['None', 
                          'ADHD', 
                          'Autistic spectrum disorder', 
                          'Developmental delay/intellectual disability/learning difficulties', 
                          'Tic', 
                          'Combined', 
                          'Other'],
    'aesd-pmh-neuro': ['None', 
                       'Cerebral palsy',
                       'Epilepsy',
                       'Febrile seizures',
                       'Other']
}

export default options