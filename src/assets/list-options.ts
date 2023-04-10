import NHS_trusts from './list-options/NHS_trusts.json'

const options: {[id: string]: Array<string>} = {
    'yes-no': ['yes', 'no'],
    'nhs-trust': NHS_trusts
}

export default options