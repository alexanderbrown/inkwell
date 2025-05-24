import Head from "next/head";
import { useRouter } from "next/router";
import PageCarousel from "~/components/PageCarousel";
import { api } from "~/utils/api";

export default function StudyPage() {
    const { name } = useRouter().query as {name: string};
    const study = api.study.get.useQuery({ name }).data || null;

    if (!study) {
        return ErrorPage(name);
    }

    return (<>
        <Head>
            <title>{study.name_full? `${study.name_full} (${study.name_short})` : study.name_short}</title>
            <meta name="description" content="Study page" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex flex-col justify-start min-h-screen bg-gradient-to-b from-indigo-50 to-white px-24">
            <h1 className="text-2xl text-center py-4 font-bold text-secondary-foreground sm:text-[3rem]">
                {study.name_full? `${study.name_full} (${study.name_short})` : study.name_short}
            </h1>
           <PageCarousel study={study} />
        </main>
    </>);
}

function ErrorPage(name: string) {
    // This is a fallback error page in case the study is not found
    return (
        <div className="flex flex-col justify-start min-h-screen bg-gradient-to-b from-indigo-50 to-white px-24">
            <h1 className="text-2xl text-center py-4 font-bold text-secondary-foreground sm:text-[3rem]">
                Study not found
            </h1>
            <p className="text-xl text-center py-4 text-muted-foreground">
                No study found with the name "{name}"
            </p>
        </div>
    );
}