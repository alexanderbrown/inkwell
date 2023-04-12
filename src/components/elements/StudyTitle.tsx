import Link from 'next/link';
import { HiOutlineHome } from "react-icons/hi";


export default function StudyTitle ({name}: {name:string}) {
    return (
        <div className="flex mb-10 pt-4 justify-between items-center">
                <Link className="text-2xl w-fit ml-4" href='/' title='Home' >
                    <HiOutlineHome size={30}/>
                </Link>
                <h1 className="text-2xl w-fit">{name}</h1>
                <h1></h1> 
        </div>
    )
}