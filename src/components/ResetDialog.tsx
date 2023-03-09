import { DialogProps } from '@/types'
import { Dialog } from '@headlessui/react'

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
            <button onClick={() => {
                        let input_form = document.getElementById('study-input-form') as HTMLFormElement
                        input_form?.reset()
                        setIsOpen(false)
                    }} 
                    className="border-black border-solid border rounded font-bold py-2 px-4 ml-4
                                bg-slate-100 text-slate-700 hover:bg-slate-300 hover:text-slate-900" >
                Reset Form
            </button>
            <button autoFocus 
                    onClick={() => setIsOpen(false)}
                    className="border-black border-solid border rounded font-bold py-2 px-4 ml-4 
                            bg-slate-700 text-slate-100 hover:bg-slate-900 hover:text-slate-50">
                Cancel
            </button>
        </Dialog.Panel>
        </div>
    </Dialog>
    )
}