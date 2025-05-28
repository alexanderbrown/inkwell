import { RiCalendarEventLine, RiCheckboxLine, RiDropdownList, RiNumber1, RiNumber2, RiNumber3, RiTempHotLine, RiText, RiTextBlock } from "react-icons/ri";
import type { Question } from "~/types";



export function Icon123() {
    return (
        <div className="flex flex-row items-center scale-75 gap-[-2.1rem]">
            <RiNumber1 className="translate-x-7"/>
            <RiNumber2 className="translate-x-5"/>
            <RiNumber3 className="translate-x-[0.9rem]"/>
        </div>
    )
}

export const questionIcons: Record<Question['type'], React.ReactNode> = {
    string: <RiText />,
    text: <RiTextBlock />,
    number: <Icon123 />,
    temperature: <RiTempHotLine />,
    select: <RiDropdownList />,
    date: <RiCalendarEventLine />,
    boolean: <RiCheckboxLine />,
}
