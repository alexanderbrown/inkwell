import { Dialog } from '@headlessui/react'
import { DialogProps } from '@/types'

export default function InvalidEntriesDialog({isOpen, setIsOpen, props}: DialogProps) {
    return (
    <Dialog key='invalid-entries-dialog' open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black opacity-30" />
        <div className="flex items-center justify-center min-h-screen">
        <Dialog.Panel className="relative bg-white rounded max-w-sm mx-auto p-8">
            <Dialog.Title className="text-2xl">Invalid Entries</Dialog.Title>
            <p className="py-4">
            The following fields have not been filled in: 
            </p>
            <ul className='mb-2 list-disc'>
                {props.map((invalid_entry: string) => <li key={invalid_entry}>{invalid_entry}</li>)}
            </ul>
            <button autoFocus 
                    onClick={() => setIsOpen(false)}
                    className="border-black border-solid border rounded font-bold py-2 px-4 ml-4 
                            bg-slate-700 text-slate-100 hover:bg-slate-900 hover:text-slate-50">
                OK
            </button>
        </Dialog.Panel>
        </div>
    </Dialog>
    )
}