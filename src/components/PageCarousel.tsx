import { useState } from "react";
import { useForm, useWatch } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Form } from '~/components/ui/form'
import { Toaster } from "./ui/sonner";

import type { Study } from "~/types";
import downloadCSV from "~/utils/csv";
import { processResponses } from "~/utils/formUtils";

import QuestionComponent from "./QuestionComponent";
import ProgressIndicator from "./ProgressIndicator";
import PagesNavigation from "./PagesNavigation";
import ResetDialog from "./ResetConfirmation";



export default function PageCarousel({study}: {study: Study}) {
    const [step, setStep] = useState(0);
    const form = useForm()

    const pages = study.pages 
    const currentPage = pages[step];
    const totalSteps = pages.length;

    const requiredFields = pages.flatMap((page, pageIndex) => {
      return page.questions.map((question) => {
        return {...question, page: pageIndex}})
      }).filter((item) => item.mandatory)

    const requiredFieldValues = useWatch({
        control: form.control,
        name: requiredFields.map((item) => item.id),
        defaultValue: requiredFields.map((item) => item.default),
    })

    const missingResponses = requiredFields.filter((_, index) => {
        return requiredFieldValues[index] === undefined || requiredFieldValues[index] === ''
    })
        
    const onSubmit = async (formData: Object) => {
        if (step < totalSteps - 1) {
          setStep(step + 1)
        } else {
          const processedResponses = processResponses(formData, study)
          const responseID = (processedResponses[study.responseID_field || '']?.response || uuidv4()) 
          downloadCSV({header: Object.keys(processedResponses),
                       body: [Object.values(processedResponses).map((item) => item.prompt),
                              Object.values(processedResponses).map((item) => item.response)],
                       filename: responseID + '.csv'})
          setStep(0)    
          toast.success(`CSV file generated for response ${responseID}`)
        }
      }
    
    const handleBack = () => {
        if (step > 0) {
          setStep(step - 1)
        }
    }
    return (
        <div className="space-y-2">
            <div className="flex items-center">
              <ResetDialog onClick={() => {form.reset(); setStep(0)}}/>
              <div className="flex-1">
                <ProgressIndicator totalSteps={pages.length} currentStep={step} missingResponses={missingResponses} setStep={setStep} pagePrompts={pages.map(page => page.prompt)}/>
              </div>
            </div>
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">{currentPage?.prompt}</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form} key={step}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4">
                        {currentPage?.questions.map((question) => (
                            <QuestionComponent question={question} form={form} key={question.id} pages={pages}/>
                        ))}
                        <PagesNavigation step={step} totalSteps={totalSteps} handleBack={handleBack} form_validated={missingResponses.length===0}/>
                    </form>
                </Form>
              </CardContent>
            </Card>
            <Toaster />
        </div>
    )
}
