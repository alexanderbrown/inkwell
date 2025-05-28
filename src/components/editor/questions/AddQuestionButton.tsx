import { useState, type Dispatch, type SetStateAction } from "react";

import { blankQuestion, type Page, type Question, type Study } from "~/types";

import { questionIcons } from "~/components/QuestionResources";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Button } from "~/components/ui/button";


type AddQuestionButtonProps = {
    page: Page
    setStudy: Dispatch<SetStateAction<Study | undefined>>
    setActiveQuestionIndex: Dispatch<SetStateAction<number | null>>
}

export default function AddQuestionButton({page, setStudy, setActiveQuestionIndex}: AddQuestionButtonProps) {
    const [open, setOpen] = useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="default" className="m-2 bg-card cursor-pointer text-primary hover:text-secondary border-1">
                    Add Question
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col items-stretch space-y-0.5">
                {Object.keys(questionIcons).map(icon => (
                    <Button key={icon} variant="outline" className="bg-card cursor-pointer"
                    onClick={() => {
                        setStudy((prev) => {
                            if (!prev) return prev;
                            const newQuestion = blankQuestion[icon as Question['type']]();
                            const newPages = prev.pages.map((p) => p.id === page.id ? {...p, questions: [...p.questions, newQuestion]} : p);
                            return {...prev, pages: newPages}
                        })
                        setActiveQuestionIndex(page.questions.length);
                        setOpen(false)
                    }}
                    >
                        {questionIcons[icon as Question['type']]}{icon}
                    </Button>
                ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}
