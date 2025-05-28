import { Card, CardContent, CardTitle } from "~/components/ui/card";
import AddPageButton from "./AddPageButton";
import type { Dispatch, SetStateAction } from "react";
import type { Study } from "~/types";
import ActivePage from "./ActivePage";
import InactivePage from "./InactivePage";

type PageEditorProps = {
    study: Study | undefined
    setStudy: Dispatch<SetStateAction<Study | undefined>>
    activePageIndex: number | null
    setActivePageIndex: Dispatch<SetStateAction<number | null>>
}

export default function PagesEditor({study, setStudy, activePageIndex, setActivePageIndex}: PageEditorProps) {

    if (!study) {
        return null
    }

    return (
        <Card>
            <CardTitle className="px-6 text-lg font-semibold">Pages</CardTitle>
            <CardContent className="flex flex-col w-full">
                {study.pages.map((page, idx) => activePageIndex === idx ? 
                    <ActivePage key={page.id} page={page} study={study} setStudy={setStudy} setActivePage={setActivePageIndex}/> :
                    <InactivePage key={page.id} page={page} onClick={() => setActivePageIndex(idx)}/>
                )}
                <AddPageButton study={study} setStudy={setStudy} setActivePage={setActivePageIndex}/>
            </CardContent>
        </Card>
    )
}