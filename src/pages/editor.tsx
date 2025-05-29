// TODO: Fix the 123 icon spacing

import Head from "next/head";
import { useState} from "react";
import { v4 as uuidv4 } from "uuid";

import type { Study } from "~/types";

import PagesEditor from "~/components/editor/pages/PagesEditor";
import QuestionsEditor from "~/components/editor/questions/QuestionsEditor";
import { Button } from "~/components/ui/button";
import StudyEditor from "~/components/editor/StudyEditor";


export default function Editor() {
    const [activePageIndex, setActivePageIndex] = useState<number | null>(null);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(null);
    const [study, setStudy] = useState<Study>();

    function loadFromJSON() {
        // Prompt the user to select a file
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = async (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const contents = e.target?.result;
                    if (contents) {
                        const json = JSON.parse(contents as string);
                        // Check if the JSON is valid
                        if (json && typeof json === 'object') {
                            // Set the study state with the loaded JSON
                            setStudy(json);
                            setActivePageIndex(0);
                            setActiveQuestionIndex(0);
                        }
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    const activePage = (activePageIndex !== null ? study?.pages[activePageIndex] : null) || null;
   
    const pagesEditorProps = {study, setStudy, activePageIndex, setActivePageIndex}
    const questionsEditorProps = {page: activePage, study, activeQuestionIndex, setActiveQuestionIndex, setStudy}

    return (<>
        <Head>
            <title>Editor</title>
            <meta name="description" content="Inkwell Editor" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
            <main className="p-8 flex flex-col gap-4">
                {study ? 
                    <div className="flex flex-col gap-4">
                        <StudyEditor study={study} setStudy={setStudy}/>
                        <div className="flex flex-row gap-2">
                            <div className="flex-1"><PagesEditor {...pagesEditorProps}/></div>
                            <div className="flex-1"><QuestionsEditor {...questionsEditorProps}/></div>
                        </div>
                        <div className="flex flex-row gap-2 justify-end items-center">
                            <Button className="cursor-pointer" onClick={() => {
                                // Convert the data array into JSON string
                                const jsonString = JSON.stringify(study, null, 2);
                                // Create a Blob from the JSON string
                                const blob = new Blob([jsonString], { type: 'text/csv' });

                                // Generate a download link and initiate the download
                                const url = URL.createObjectURL(blob);
                                const link = document.createElement('a');
                                link.href = url;
                                link.download = (study.name_short || "study") + ".json";
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                                URL.revokeObjectURL(url);
                            }}>
                                Save
                            </Button>
                            <Button className="cursor-pointer" onClick={loadFromJSON}>
                                Load
                            </Button>
                        </div>
                    </div> : 
                    <div className="flex flex-row gap-4 justify-end">
                        <Button className="cursor-pointer" onClick={loadFromJSON}>
                            Load
                        </Button>
                        <Button className="cursor-pointer" onClick={() => {
                            setStudy({
                                name_short: "",
                                name_full: "",
                                contact: {
                                    name: "",
                                    email: ""
                                },
                                pages: [],
                                id: uuidv4(),
                            });
                            setActivePageIndex(0);
                            setActiveQuestionIndex(0);
                        }}>
                            New
                        </Button>
                    </div>
                }

            </main>
    </>)
}
