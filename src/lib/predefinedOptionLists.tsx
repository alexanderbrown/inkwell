import NHS_trusts from './NHS_trusts.json'

export const predefinedOptionLists = {
    'yes-no': [
        'Yes',
        'No'
    ],
    'yes-no-unknown': [
        'Yes',
        'No',
        'Unknown'
    ],
    'months': [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    'male-female': [
        'Male',
        'Female'
    ], 
    'male-female-unknown': [
        'Male',
        'Female',
        'Unknown'
    ],
    'NHS-trusts': NHS_trusts as Array<string>,
}