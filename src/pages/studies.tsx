import Link from "next/link";
import { api } from "~/utils/api";

export default function Studies() {

    const studies = api.study.list.useQuery().data || null;


    return (
        <div className="flex flex-col justify-start min-h-screen bg-gradient-to-b from-indigo-50 to-white px-24">
            <h1 className="text-2xl text-center py-4 font-bold text-secondary-foreground sm:text-[3rem]">
                Available Studies
            </h1>
            <ul className="list-disc list-inside">
                {studies && studies.map((study) => (
                    <li key={study} className="text-2xl font-bold text-muted-foreground">
                        <Link href={`/study/${study}`} className="hover:underline">
                            {study}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}