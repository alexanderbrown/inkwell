import { Button } from '~/components/ui/button'

interface PagesNavigationProps {
    step: number;
    totalSteps: number;
    handleBack: () => void;
    form_validated: boolean;
}

export default function PagesNavigation({step, totalSteps, form_validated}: PagesNavigationProps) {
    const finalPage = step === totalSteps - 1;
    return (
        <div className="flex space-x-4 justify-center">
            {/* <Button
                type="button"
                className="font-medium cursor-pointer"
                size="sm"
                onClick={handleBack}
                disabled={step === 0}
            >
                Back
            </Button> */}
            {finalPage ? <FinishButton disabled={!form_validated}/> : <NextPageButton />}
        </div>
    )
}

function NextPageButton() {
    return (
        <Button type="submit" size="sm" className= "font-medium cursor-pointer">
            Next
        </Button>
    )
}

function FinishButton({disabled}: {disabled: boolean}) {
    return (
        <Button type="submit" 
            size="sm" 
            className= "font-medium cursor-pointer disabled:bg-red-400 "
            disabled = {disabled}
        >
            Finish
        </Button>
    )
}