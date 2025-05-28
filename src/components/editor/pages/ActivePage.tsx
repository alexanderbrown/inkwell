import type { ChangeEvent, Dispatch, SetStateAction } from "react"

import type { Page, Study } from "~/types"

import { Card, CardContent, CardFooter, CardTitle } from "~/components/ui/card"
import ConfirmDeleteButton from "~/components/ui/ConfirmDelete"
import { Input } from "~/components/ui/input"
import UpDownButtons from "~/components/ui/UpDownButtons"


type ActivePageProps = {
    page: Page
    study: Study
    setStudy: Dispatch<SetStateAction<Study | undefined>>
    setActivePage: Dispatch<SetStateAction<number | null>>
}

export default function ActivePage({page, study, setStudy, setActivePage}: ActivePageProps) {

    const onRename = (e: ChangeEvent<HTMLInputElement>) => {
        setStudy((prev) => {
            if (!prev) return prev;
            const newPages = prev.pages.map((p) => p.id === page.id ? {...p, prompt: e.target.value} : p);
            return {...prev, pages: newPages}
        })
    }

    const onDeleteClick=() => {
        setStudy((prev) => {
            if (!prev) return prev;
            const newPages = prev.pages.filter((p) => p.id !== page.id);
            return {...prev, pages: newPages}
        })
    }

    const onMoveUp = () => {
        setStudy((prev) => {
            if (!prev) return prev;
            const newPages = [...prev.pages];
            const index = newPages.findIndex((p) => p.id === page.id);
            if (index > 0) {
                const temp = newPages[index - 1]!;
                newPages[index - 1] = newPages[index]!;
                newPages[index] = temp;
            }
            setActivePage(index - 1);
            return {...prev, pages: newPages}
        })
    }

    const onMoveDown = () => {
        setStudy((prev) => {
            if (!prev) return prev;
            const newPages = [...prev.pages];
            const index = newPages.findIndex((p) => p.id === page.id);
            if (index < newPages.length - 1) {
                const temp = newPages[index + 1]!;
                newPages[index + 1] = newPages[index]!;
                newPages[index] = temp;
            }
            setActivePage(index + 1);
            return {...prev, pages: newPages}
        })
    }

    const atStart = page.id === study.pages[0]?.id;
    const atEnd = page.id === study.pages[study.pages.length - 1]?.id;

    return (
        <Card key={page.id} className="p-4 m-2 bg-accent">
        <CardTitle className="font-semibold">
            <Input
                className="bg-card"
                value={page.prompt}
                onChange={(e) => onRename(e)}
                />
            
        </CardTitle>
        <CardContent>
            <div className="flex flex-row items-center justify-between">
                <UpDownButtons onMoveUp={onMoveUp} onMoveDown={onMoveDown} atStart={atStart} atEnd={atEnd}/>
                <ConfirmDeleteButton onClick={onDeleteClick} prompt="Delete Page"/>
            </div>
        </CardContent>
        <CardFooter className="text-[0.65rem] text-muted-foreground">
                {page.id}
        </CardFooter>
    </Card>)
}