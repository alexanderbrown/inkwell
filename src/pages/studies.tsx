import Link from "next/link";
import { api } from "~/utils/api";

export default function Studies() {

    const studies = api.study.list.useQuery().data || [];


    return (
        <div className="flex flex-col justify-start min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-200 px-24">
            <h1 className="text-2xl text-center py-4 font-bold text-secondary-foreground sm:text-[3rem]">
                Available Studies
            </h1>

            <div className="grid grid-cols-3 gap-4 mt-8 w-fit">
                {studies && studies.map(({name, study}) => (<>
                    <Link href={`/study/${name}`} className="text-xl font-bold text-muted-foreground hover:underline">
                        {name}
                    </Link>
                     <Link href={`/study/${name}`} className="text-lg text-muted-foreground hover:underline col-span-2">
                        {study?.name_full || "No description available"}
                    </Link>
                </>))}
            </div>
        </div>
    );
}