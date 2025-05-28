import { RiResetLeftLine } from "react-icons/ri";

import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogTrigger
 } from "./ui/alert-dialog";
import { Button } from "./ui/button";

export default function ResetDialog({onClick}: {onClick: () => void}) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="outline" size="icon" className="cursor-pointer">
                <RiResetLeftLine className="h-4 w-4" />
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will reset all responses in the form. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction className="cursor-pointer" onClick={onClick}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }