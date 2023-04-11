import { DialogProps } from '@/types'
import { Dialog } from '@headlessui/react'
import Button from '@/components/buttons/button'

export default function ResetDialog({isOpen, setIsOpen}: DialogProps) {
    return (
    <Dialog key='reset-dialog' open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black opacity-30" />
        <div className="flex items-center justify-center min-h-screen">
        <Dialog.Panel className="relative bg-white rounded max-w-sm mx-auto p-8">
            <Dialog.Title className="text-2xl">Reset form</Dialog.Title>
            <p className="py-4">
            Are you sure you want to reset this form? 
            <br/>
            All data will be lost.
            <br />
            This action cannot be undone.
            </p>
            <Button color='red'
                    onClick={() => {
                        let input_form = document.getElementById('study-input-form') as HTMLFormElement
                        input_form?.reset()
                        setIsOpen(false)
                    }}>
                Reset Form
            </Button>
            <Button color='blue'
                    autoFocus={true} 
                    onClick={() => setIsOpen(false)}>
                Cancel
            </Button>
        </Dialog.Panel>
        </div>
    </Dialog>
    )
}