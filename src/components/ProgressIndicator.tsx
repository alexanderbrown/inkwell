import { cn } from "~/lib/utils";
import type { Question } from "~/types";

interface ProgressIndicatorProps {
    totalSteps: number;
    currentStep: number;
    setStep: (step: number) => void;
    missingResponses: Array<Question & { page: number }>;
}

export default function ProgressIndicator({totalSteps, currentStep, setStep, missingResponses}: ProgressIndicatorProps) {

    const n_missingByPage = missingResponses.reduce((acc, question) => {
        acc[question.page] = (acc[question.page] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);

    return (
        <div className="flex items-center justify-center">
            {Array.from({ length: totalSteps }).map((_, index) => {
              return <div key={index} className="flex items-center">
                <div
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300 ease-in-out hover:scale-110 ",
                    index < currentStep ? n_missingByPage[index] ? "bg-red-500": "bg-primary": "",
                    index === currentStep ? n_missingByPage[index] ? "bg-red-500/30 border-2 border-red-500" : "bg-primary/30 border-2 border-primary": "",
                    index > currentStep ? n_missingByPage[index] ?  "bg-red-500/30": "bg-primary/30": "",
                    index === currentStep ? "scale-110" : "cursor-pointer",
                  )}
                  onClick={() => {
                    if (index !== currentStep) {
                      setStep(index);
                    }
                  }}
                />
                {index < totalSteps - 1 && (
                  <div
                    className={cn(
                      "w-2 h-0.5",
                      index < currentStep ? "bg-primary" : "bg-primary/30"
                    )}
                  />
                )}
              </div>
          })}
          </div>
    )
}