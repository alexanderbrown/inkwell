import { Dialog } from '@headlessui/react'
import { DialogProps } from '@/types'
import Button from '@/components/buttons/ButtonComponent'

export default function InvalidEntriesDialog({isOpen, setIsOpen, props}: DialogProps) {
    return (
    <Dialog key='invalid-entries-dialog' open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black opacity-30" />
        <div className="flex items-center justify-center min-h-screen">
        <Dialog.Panel className="relative bg-white rounded max-w-sm mx-auto p-8">
            <Dialog.Title className="text-2xl py-4">Invalid Entries</Dialog.Title>
            <p>
                The following fields have not been filled in: 
            </p>
            <ul className='mb-2 list-disc list-inside text-sm'>
                {props.map((invalid_entry: string) => <li key={invalid_entry}>{invalid_entry}</li>)}
            </ul>
            <div className='flex justify-center'>
                <Button color='slate'
                        autoFocus 
                        onClick={() => setIsOpen(false)}>
                    OK
                </Button>
            </div>
        </Dialog.Panel>
        </div>
    </Dialog>
    )
}