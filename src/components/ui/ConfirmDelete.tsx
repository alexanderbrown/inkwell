import { useState } from "react";
import { Button } from "./button";
import  { cn } from "~/lib/utils";

type ConfirmDeleteButtonProps = {
    prompt?: string;
    onClick: () => void;
    className?: string;
}


export default function ConfirmDeleteButton({prompt, onClick, className}: ConfirmDeleteButtonProps) {
    const [confirm, setConfirm] = useState(false);
    prompt = prompt || "Delete";
    
    if (confirm) {
        return (
            <Button variant='destructive' className={cn(className, "p-2 cursor-pointer")} onClick={() => {
                onClick();
                setConfirm(false);
            }}>
                Click again to confirm
            </Button>
        )
    }
    return (
        <Button variant='outline' className={cn(className, "p-2 cursor-pointer text-destructive hover:bg-destructive hover:text-accent")} onClick={() => {
            setConfirm(true);
            setTimeout(() => {
                setConfirm(false);
            }, 2000);
        }}>
            {prompt}
        </Button>
    )
}