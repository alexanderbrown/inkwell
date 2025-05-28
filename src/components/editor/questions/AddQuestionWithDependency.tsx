import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

import { blankQuestion, type Page, type Question, type Study, type updateQuestionProps } from "~/types";

import { questionIcons } from "~/components/QuestionResources";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "~/components/ui/select";
import TypeSpecificFields from "./active-question/type-specific-fields/TypeSpecificFields";
import { predefinedOptionLists } from "~/lib/predefinedOptionLists";
import QuestionDependencyValueEditor from "./active-question/dependency/QuestionDependencyValueEditor";


type AddQuestionButtonProps = {
    page: Page
    setStudy: Dispatch<SetStateAction<Study | undefined>>
    setActiveQuestionIndex: Dispatch<SetStateAction<number | null>>
}

export default function AddQuestionWithDependencyButton({page, setStudy, setActiveQuestionIndex}: AddQuestionButtonProps) {
    const [open, setOpen] = useState(false);

    function blankParentQuestion(type: Question['type']): Question {
        let question = blankQuestion[type]();
        if (question.type === 'select') {
            const defaultOptions: keyof typeof predefinedOptionLists = 'yes-no-unknown'
            question.options = defaultOptions
        }
        return question;
    }
    const [parent, setParent] = useState<Question>(blankParentQuestion('select'))

    function blankChildQuestion(type: Question['type']): Question {
        let question = blankQuestion[type]();
        return question;
    }
    const [child, setChild] = useState<Question>(blankChildQuestion('text'));

    useEffect(() => {
        // Initialize the parent question with a default type
        setParent(blankParentQuestion('select'));
        // Initialize the child question with a default type
        setChild(blankChildQuestion('text'));
    }, [open]);

    // Update the child dependency if the parent changes
    useEffect(() => {
        if (parent) {
            let value: string = '';
            if (parent.type === 'select') {
                if (parent.options === 'yes-no-unknown' || parent.options === 'yes-no') {
                    value = 'Yes';
                } else if (typeof parent.options !== 'string' && parent.options.length > 0) {
                    value = parent.options[parent.options.length - 1] || '';
                }
            } 
            updateChildQuestion({
                field: 'depends_on',
                value: {id: parent.id, value}
            });
        }
    }, [parent])


    // Update fields in the parent and child questions
    function updateParentQuestion(props: Omit<updateQuestionProps, 'id'>) {
        setParent((prev) => {
            if (!prev) return prev;
            return {...prev, [props.field]: props.value};
        });
    }
    function updateChildQuestion(props: Omit<updateQuestionProps, 'id'>) {
        setChild((prev) => {
            if (!prev) return prev;
            return {...prev, [props.field]: props.value};
        });
    }

    // Set the parent prompt and update the child prompt accordingly
    function setParentPrompt(prompt: string) {
        setParent((prev) => {
            if (!prev) return prev;
            return {...prev, prompt};
        });
        setChild((prev) => {
            if (!prev) return prev;
            return {...prev, prompt: `${prompt} - details`};
        })
    }
    // Set the child prompt only
    function setChildPrompt(prompt: string) {
        setChild((prev) => {
            if (!prev) return prev;
            return {...prev, prompt};
        });
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="default" className="m-2 bg-card cursor-pointer text-primary hover:text-secondary border-1">
                    Add Question with Dependency
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full border-2 border-primary">
                <div className="flex flex-row space-x-4">
                    <div className="flex flex-col space-x-1 space-y-2">
                        <Label className="">Parent Question Prompt</Label>
                        <Input className="bg-card" value={parent.prompt} onChange={e => setParentPrompt(e.target.value)}/>
                        <Label className="">Parent Question Type</Label>
                        <Select value={parent.type} onValueChange={(value) => {
                            const newParent = blankParentQuestion(value as Question['type']);
                            parent.prompt = newParent.prompt; // Preserve the prompt
                            setParent(newParent);
                        }}>
                            <SelectTrigger className="bg-card cursor-pointer">
                                {questionIcons[parent.type]}<span>{parent.type}</span>
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(questionIcons).map(icon => (
                                <SelectItem key={icon} className="bg-card cursor-pointer" value={icon}>
                                    {questionIcons[icon as Question['type']]}{icon}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <TypeSpecificFields question={parent} updateQuestion={updateParentQuestion}/>
                    </div>
                    <div className="flex flex-col space-x-1 space-y-2">
                        <Label className="">Child Question Prompt</Label>
                        <Input className="bg-card" value={child.prompt} onChange={(e=> setChildPrompt(e.target.value))}/>
                        <Label className="">Child Question Type</Label>
                        <Select value={child.type} onValueChange={(value) => {
                            const newChild = blankChildQuestion(value as Question['type']);
                            setChild(prev => ({...newChild, prompt: prev.prompt, depends_on: prev.depends_on})); // Preserve the prompt and dependency
                        }}>
                            <SelectTrigger className="bg-card cursor-pointer">
                                {questionIcons[child.type]}<span>{child.type}</span>
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(questionIcons).map(icon => (   
                                    <SelectItem key={icon} className="bg-card cursor-pointer" value={icon}>
                                        {questionIcons[icon as Question['type']]}{icon}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Label>Parent Value to Match</Label>
                        <QuestionDependencyValueEditor question={child} updateQuestion={updateChildQuestion} parentQuestion={parent} />
                    </div>
                </div>
                <div className="flex flex-row justify-end">
                    <Button variant='secondary' className="mt-4 mr-2 cursor-pointer" onClick={() => {
                        setOpen(false);
                    }}>
                        Cancel
                    </Button>
                    <Button variant='default' className="mt-4 cursor-pointer" onClick={() => {
                        setStudy((prev) => {
                            if (!prev) return prev;
                            const newQuestions = [...page.questions, parent, child];
                            const newPage = {...page, questions: newQuestions};
                            const newPages = prev.pages.map((p) => p.id === page.id ? newPage : p);
                            return {...prev, pages: newPages};

                        });
                        setActiveQuestionIndex(page.questions.length);
                        setOpen(false);
                    }}>
                        Add
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

