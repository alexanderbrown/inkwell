import { Card, CardTitle } from "~/components/ui/card";
import type { Page } from "~/types";

export default function InactivePage({page, onClick}: {page: Page, onClick: () => void}) {
    return (
        <Card key={page.id} className="p-4 m-2 cursor-pointer" onClick = {onClick}>
        <CardTitle className="flex flex-row justify-between">
            <div className="font-semibold">{page.prompt}</div>
            <div className="font-light">{page.questions.length} questions</div>
        </CardTitle>
    </Card>)
}