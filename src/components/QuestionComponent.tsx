import { useWatch, type UseFormReturn } from "react-hook-form";
import { IoIosGitBranch, IoMdInformationCircleOutline } from "react-icons/io";
import { LuAsterisk } from "react-icons/lu";


import type { Page, Question } from "~/types";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import QuestionInputComponent from "./questionInputs/QuestionInputComponent";
import { cn } from "~/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface QuestionComponentProps {
    question: Question;
    form: UseFormReturn;
    pages: Page[]
}

export default function Question ({question, form, pages}: QuestionComponentProps) {

    // Monitor the value of the question that this question depends on (if any)
    const branchParentValue = useWatch({
      name: question.depends_on?.id || '',
      control: form.control,
      disabled: !question.depends_on,
    });

    // Monitor the value of this question
    const thisQuestionResponse = useWatch({
        name: question.id,
        control: form.control,
        defaultValue: question.default,
    });

    // If this is a branch question, check the values of the parent question, return null if the condition is not met
    if (question.depends_on) {
        if (Array.isArray(question.depends_on.value) ) {
            const a = question.depends_on.value as Array<string>;
            if (!a.includes(branchParentValue)) {
                return null;
            }
        } else if (question.depends_on.value !== branchParentValue) {
            return null;
        }
    }

    return (
        <FormField
            key={question.id}
            control={form.control}
            name={question.id}
            render={({ field }) => (
                <FormItem className={cn(
                    "grid grid-cols-[1fr_2fr] sm:grid-cols-[1fr_5fr] gap-4", 
                    question.depends_on && "pl-6" 
                )}>
                    <div className="flex flex-row">
                        <FormLabel className="flex-1">{question.prompt} </FormLabel>{labelSuffix(question, thisQuestionResponse, pages)}</div>
                    <FormControl>
                        <QuestionInputComponent question={question} field={field} />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

function labelSuffix(question: Question, thisQuestionResponse: string | undefined, pages: Page[]) {
    const isParent = pages.flatMap((page) => page.questions)
        .some((q) => q.depends_on && q.depends_on.id === question.id);

    return (
        <TooltipProvider>
        <div className="flex items-start gap-0">
            {question.help_text &&
             
                <Tooltip>
                    <TooltipTrigger asChild>
                        <IoMdInformationCircleOutline className="text-lg text-primary w-6" size={16} />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="whitespace-pre-line">{question.help_text}</p>
                    </TooltipContent>
                </Tooltip>

            }
            {question.mandatory===true && (
                (thisQuestionResponse === undefined || thisQuestionResponse === '') ?
                (<Tooltip>
                    <TooltipTrigger asChild>
                        <LuAsterisk className="text-red-500 text-lg" size={16}/>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="whitespace-pre-line">This question is mandatory and has not been answered</p>
                    </TooltipContent>
                </Tooltip>
            ) :
                (<Tooltip>
                    <TooltipTrigger asChild>
                        <LuAsterisk className="text-lg" size={16}/>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="whitespace-pre-line">This question is mandatory; answer is valid</p>
                    </TooltipContent>
                </Tooltip>
            )
            )}
            {isParent && <IoIosGitBranch className="text-lg text-primary rotate-90" size={16} />}
        </div>
        </TooltipProvider>

    )
}