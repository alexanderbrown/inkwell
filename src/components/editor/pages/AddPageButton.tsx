import type { Dispatch, SetStateAction } from "react"
import { v4 as uuidv4 } from "uuid"

import type { Study } from "~/types"

import { Button } from "~/components/ui/button"

type AddPageButtonProps = {
    study: Study
    setStudy: Dispatch<SetStateAction<Study | undefined>>
    setActivePage: Dispatch<SetStateAction<number | null>>
}
export default function AddPageButton({study, setStudy, setActivePage}: AddPageButtonProps) {
    return (
        <Button variant="outline" className="m-2 bg-card cursor-pointer" onClick={() => {
            setStudy((prev) => {
                if (!prev) return prev;
                const newPage = {
                    prompt: "New Page",
                    id: uuidv4(),
                    questions: []
                }
                return {...prev, pages: [...prev.pages, newPage]}
            })
            setActivePage(study?.pages.length || 0);
        }}>Add Page</Button>
    )
}