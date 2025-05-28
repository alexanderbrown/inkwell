import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import { Button } from "./button";

type UpDownButtonsProps = {
    onMoveUp: () => void;
    onMoveDown: () => void;
    atStart?: boolean;
    atEnd?: boolean;
}

export default function UpDownButtons({onMoveUp, onMoveDown, atStart, atEnd}:UpDownButtonsProps) {
    return(
        <div>
            <Button variant='outline' className="cursor-pointer" onClick={() => onMoveUp()} disabled={atStart}>
                <RiArrowUpLine />
            </Button>
            <Button variant='outline' className="cursor-pointer" onClick={() => onMoveDown()} disabled={atEnd}>
                <RiArrowDownLine />
            </Button>
        </div>
    )
}
