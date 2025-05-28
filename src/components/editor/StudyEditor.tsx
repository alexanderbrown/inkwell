
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


type StudyEditorProps = {
    study: Study | undefined
    setStudy: Dispatch<SetStateAction<Study | undefined>>
}

export default function StudyEditor({study, setStudy}: StudyEditorProps) {

    const allStudies = api.study.list.useQuery().data || [];
    

    const [detailsOpen, setDetailsOpen] = useState(false)

    if (!study) {
        return null
    }

    const allQuestions = study.pages.flatMap((page) => page.questions.map(question => {return {page: page, ...question}}));

    return (
        <Card>
            <Collapsible>
                <div className="px-6 flex flex-row gap-2 items-center">
                    <CardTitle className="text-lg font-semibold">{study.name_short}</CardTitle>
                    <CollapsibleTrigger className="text-lg font-semibold" asChild>
                        <Button variant="outline" className="text-sm transition cursor-pointer h-6" onClick={() => setDetailsOpen(!detailsOpen)}>
                                {detailsOpen ? <VscChevronUp /> : <VscChevronDown />}
                        </Button> 
                    </CollapsibleTrigger>
                </div>
                <CardDescription className="px-6 text-sm">
                        {study.pages.flatMap((p) => p.questions).length} questions
                </CardDescription>
                <CollapsibleContent className="pt-4">
                    <CardContent className="grid grid-cols-2 gap-2 w-full">
                        <Label className="text-sm font-semibold">Short Name</Label>
                        <Input value={study.name_short} onChange={(e) => {
                            if (allStudies.find((s) => s === e.target.value)) {
                                alert("Study with this short name already exists")
                                return
                            }
                            setStudy({...study, name_short: e.target.value})
                        }} />
                        <Label className="text-sm font-semibold">Full Name</Label>
                        <Input value={study.name_full} onChange={(e) => setStudy({...study, name_full: e.target.value ? e.target.value : undefined})}/>
                        <Label className="text-sm font-semibold">Contact Name</Label>
                        <Input value={study.contact.name} onChange={(e) => setStudy({...study, contact: {...study.contact, name: e.target.value}})}/>
                        <Label className="text-sm font-semibold">Contact Email</Label>
                        <Input value={study.contact.email} onChange={(e) => setStudy({...study, contact: {...study.contact, email: e.target.value}})}/>
                        <Label className="text-sm font-semibold">ResponseID Field</Label>
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
                        <Label className="text-sm font-semibold">Hidden Question Placeholder</Label>
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