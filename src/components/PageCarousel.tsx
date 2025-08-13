import { useEffect, useState, type BaseSyntheticEvent } from "react";
import { useForm, useWatch } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Form } from '~/components/ui/form'
import { Toaster } from "./ui/sonner";

import type { Study } from "~/types";
import { downloadCSV, parseCSV } from "~/utils/csv";
import { processResponses } from "~/utils/formUtils";

import QuestionComponent from "./QuestionComponent";
import ProgressIndicator from "./ProgressIndicator";
import PagesNavigation from "./PagesNavigation";
import ResetDialog from "./ResetConfirmation";
import { Button } from "./ui/button";



export default function PageCarousel({study}: {study: Study}) {
    const [step, setStep] = useState(0);
    const [refreshState, setRefreshState] = useState<'needs' | 'resetting' | 'ready'>('ready');
    const form = useForm()

    useEffect(() => {
        if (refreshState === 'needs') {
          form.reset()
          setStep(1)
          setRefreshState('resetting')
        } else if (refreshState === 'resetting') {
          setStep(0)
          setRefreshState('ready')
        }
      }, [refreshState, form])


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
        
    const onSubmit = async (formData: object, event?: Partial<BaseSyntheticEvent>) => {
        if (event?.preventDefault) event.preventDefault();
        if ((step < totalSteps - 1) && (event?.type !== 'partial')) {
          setStep(step + 1)
        } else {

          const status = event?.type === 'partial' ? 'partial' : 'complete';

          const prefix_fields = ['study_id', 'study_name_short', 'study_name_full', 'status']
          const prefix_field_values = [study.id, study.name_short, study.name_full ?? '',  status]
          let processedResponses: ReturnType<typeof processResponses>;
          try {
            processedResponses = processResponses(formData, study, status)
          } catch (error ) {
            toast.error(`Error processing responses: ${(error as Error).message}`)
            return
          }
          const responseID = (processedResponses[study.responseID_field ?? '']?.response as string || uuidv4()) 
          downloadCSV({header: [...prefix_fields, ...Object.keys(processedResponses)],
                       body: [
                                [...prefix_fields, ...Object.values(processedResponses).map((item) => item.prompt) as string[]],
                                [...prefix_field_values, ...Object.values(processedResponses).map((item) => item.response) as string[]]

                                ],
                       filename: responseID + '.csv'})
          event?.type !=='partial' && setStep(0)    
          toast.success(`CSV file generated for response ${responseID}`)
        }
      }

    const onLoad = () => {
        // Loads a previous response from disk
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.csv';
        fileInput.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) {
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                const csvContent = event.target?.result as string;
                const parsed = parseCSV(csvContent, study);
                if ('error' in parsed) {
                    toast.error(`Error loading CSV: ${parsed.error}`);
                    return;
                }       
                console.log(parsed)         
                form.reset(parsed);
                setStep(0);
                toast.success(`CSV file loaded successfully `)
            };
            reader.readAsText(file);
        }
        fileInput.click();
    }
    
    const handleBack = () => {
        if (step > 0) {
          setStep(step - 1)
        }
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center">
              <ResetDialog onClick={() => {setRefreshState('needs')}}/>
              <div className="flex-1">
                <ProgressIndicator totalSteps={pages.length} currentStep={step} missingResponses={missingResponses} setStep={setStep} pagePrompts={pages.map(page => page.prompt)}/>
              </div>
              <div className="flex flex-row gap-1">
                <Button variant={"outline"} className='cursor-pointer' onClick={() => {onLoad()}}>
                  Load
                </Button>
                <Button variant={"outline"} className='cursor-pointer' onClick={() => onSubmit(form.getValues(), {type: 'partial'})}>
                  Save Progress
                </Button>
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
            <Toaster duration={10000} richColors />
        </div>
    )
}
