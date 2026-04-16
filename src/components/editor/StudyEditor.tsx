
import { useState, type Dispatch, type SetStateAction } from "react";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";

import type { Study } from "~/types";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "~/components/ui/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "~/components/ui/collapsible";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { api } from "~/utils/api";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { IoMdInformationCircleOutline } from "react-icons/io";


type StudyEditorProps = {
    study: Study | undefined
    setStudy: Dispatch<SetStateAction<Study | undefined>>
}

export default function StudyEditor({study, setStudy}: StudyEditorProps) {

    const allStudies = api.study.list.useQuery().data || [];
    

    const [detailsOpen, setDetailsOpen] = useState(true)

    if (!study) {
        return null
    }

    const allQuestions = study.pages.flatMap((page) => page.questions.map(question => {return {page: page, ...question}}));

    return (
        <Card>
            <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
                <div className="px-6 flex flex-row gap-2 items-center">
                    <CardTitle className="text-lg font-semibold">{study.name_short}</CardTitle>
                    <CardDescription className="text-lg">
                        <h2>
                            Study Information {detailsOpen ? "(Click to collapse)" : "(Click to expand)"}
                        </h2>
                    </CardDescription>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <IoMdInformationCircleOutline className="text-lg text-primary w-6" size={16} />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="whitespace-pre-line">Basic information about the study</p>
                        </TooltipContent>
                    </Tooltip>
                    <CollapsibleTrigger className="text-lg font-semibold" asChild>
                            <Button variant="outline" className="text-sm transition cursor-pointer h-6">
                                    {detailsOpen ? <VscChevronUp /> : <VscChevronDown />}
                            </Button> 
                    </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent className="pt-4">
                    <CardContent className="grid grid-cols-2 gap-2 w-full">
                        <div className="flex flex-row items-center">
                            <Label className="text-sm font-semibold">Short Name</Label>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <IoMdInformationCircleOutline className="text-lg text-primary w-6" size={16} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="whitespace-pre-line">This should be a short identifier, such as an acronym</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <Input value={study.name_short} onChange={(e) => {
                            if (allStudies.find((s) => s.name === e.target.value)) {
                                alert("Study with this short name already exists")
                                return
                            }
                            setStudy({...study, name_short: e.target.value})
                        }} />
                        <div className="flex flex-row items-center">
                            <Label className="text-sm font-semibold">Full Name</Label>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <IoMdInformationCircleOutline className="text-lg text-primary w-6" size={16} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="whitespace-pre-line">The full name of the study</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <Input value={study.name_full} onChange={(e) => setStudy({...study, name_full: e.target.value ? e.target.value : undefined})}/>
                        <div className="flex flex-row items-center">
                            <Label className="text-sm font-semibold">Contact Name</Label>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <IoMdInformationCircleOutline className="text-lg text-primary w-6" size={16} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="whitespace-pre-line">The name of the primary contact for the study</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <Input value={study.contact.name} onChange={(e) => setStudy({...study, contact: {...study.contact, name: e.target.value}})}/>
                        <div className="flex flex-row items-center">
                            <Label className="text-sm font-semibold">Contact Email</Label>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <IoMdInformationCircleOutline className="text-lg text-primary w-6" size={16} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="whitespace-pre-line">The email of the primary contact for the study</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <Input value={study.contact.email} onChange={(e) => setStudy({...study, contact: {...study.contact, email: e.target.value}})}/>
                        <div className="flex flex-row items-center">
                            <Label className="text-sm font-semibold">ResponseID Field</Label>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <IoMdInformationCircleOutline className="text-lg text-primary w-6" size={16} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="whitespace-pre-line">The field to use for the response ID. You'll need to add this first, in the editor below.</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <Select defaultValue={study.responseID_field} onValueChange={(value) => setStudy(
                            {
                                ...study, 
                                responseID_field: value=== "None" ? undefined : value
                            }
                        )}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a field" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="None">None</SelectItem>
                                    {allQuestions.map((question) => (
                                        <SelectItem key={question.id} value={question.id}>{question.page.prompt}: {question.prompt}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="flex flex-row items-center">
                            <Label className="text-sm font-semibold">Hidden Question Placeholder</Label>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <IoMdInformationCircleOutline className="text-lg text-primary w-6" size={16} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="whitespace-pre-line">The placeholder text used when a question is hidden</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <Input value={study.options?.hidden_question_placeholder} placeholder="N/A" onChange={(e) => setStudy(
                            {
                                ...study, 
                                options: 
                                    {
                                        ...study.options, 
                                        hidden_question_placeholder: e.target.value ? e.target.value : undefined
                                    }
                            }
                        )}/>
                    </CardContent>
                    <CardFooter className="flex justify-end mt-4">
                        <p className="text-sm text-secondary-foreground">Study ID: {study.id}</p>
                    </CardFooter>
            </CollapsibleContent>
            </Collapsible>
        </Card>
    )
}