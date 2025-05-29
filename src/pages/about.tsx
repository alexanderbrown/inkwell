import Head from "next/head";
import Link from "next/link";
import { Accordion as AccordionBase, 
        AccordionContent, 
        AccordionItem as AccordionItemBase, 
        AccordionTrigger as AccordionTriggerBase } from "~/components/ui/accordion";

function Accordion({ className, ...props }: React.ComponentProps<typeof AccordionBase>) {
    return (
        <AccordionBase
            className={`border-b-[1px] border-indigo-800 rounded-none ${className}`}
            {...props}
        />
    );
}
function AccordionTrigger({ className, ...props }: React.ComponentProps<typeof AccordionTriggerBase>) {
    return (
        <AccordionTriggerBase
            className={`cursor-pointer text-lg ${className}`}
            {...props}
        />
    );
}
function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionItemBase>) {
    return (
        <AccordionItemBase
            className={`border-b-[1px] border-indigo-800 rounded-none ${className}`}
            {...props}
        />
    );
}

function AccordionAnswer({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement> ) {
    return (
        <p
            className={`font-bold mb-4 text-accent-foreground" ${className}`}
            {...props}
        />
    );
}

export default function About() {
  return (
    <>
      <Head>
        <title>Inkwell - About</title>
        <meta name="description" content="Secure Data Collection for Medical Studies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-indigo-200 pb-16">
        <div className="container px-24">
            <h1 className="text-2xl text-center py-4 font-bold text-secondary-foreground sm:text-[3rem]">
                About Inkwell
            </h1>
            <Accordion type="multiple">
                <AccordionItem value="what-is-inkwell">
                    <AccordionTrigger>What is Inkwell?</AccordionTrigger>
                    <AccordionContent>
                        <AccordionAnswer>A secure data collection platform for medical studies.</AccordionAnswer>
                        <ul className="list-none space-y-1">
                            <li>Inkwell allows researchers to create custom forms and collect data from participants in a secure and efficient manner.</li> 
                            <li>It is best used for rare disease studies, where the number of patients is small, and secure collaboration is required across multiple sites. </li>
                            <li>Data collection forms are intended to be used per-patient</li>
                        </ul>                    
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="is-this-secure">
                    <AccordionTrigger>Is this secure?</AccordionTrigger>
                    <AccordionContent>
                   <AccordionAnswer>Inkwell is designed with security in mind.</AccordionAnswer>
                    <ul className="list-none space-y-1">
                        <li>Unlike traditional tools like Google Forms, or even REDCap, Inkwell doesn't use a server to store data.</li>
                        <li>Instead, the data you enter stays on your device. When you click 'Finish', it is compiled into a CSV file, which is saved to your machine.</li>
                        <li>This file can then be securely sent to the study organizer, via secure email or other approved means.</li>
                        <li>Inkwell does not store any personal data, and does not track users.</li>
                    </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="how-to-use-inkwell">
                    <AccordionTrigger>How do I use Inkwell?</AccordionTrigger>
                    <AccordionContent>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>To start, click on the study you wish to participate in via the <Link href='/studies' className="underline">Studies Page</Link>.</li>
                        <li>Follow the prompts to fill out the form. You can save your progress at any time, or continue from a saved file, via the buttons in the top right corner.</li>
                        <li>Until you save, the data is stored only on the form page, it is not uploaded to any server for security reasons. So if you refresh the page or close it <span className="font-semibold">your data will be lost</span></li>
                        <li>When you are finished, click 'Finish' on the final page to download your responses as a CSV file. The form will remain filled in, so that you can review it, if needed.</li>
                        <li>Send this file to the study organizer via secure email or other approved means. Make sure to keep your own secure records of identification codes, if required.</li>
                        <li>To fill in another response, click the reset button in the top left corner, or simply refresh the study page.</li>
                    </ol>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="ethics-approvals">
                    <AccordionTrigger>Does this mean I don't need to get ethics / IRB approvals?</AccordionTrigger>
                    <AccordionContent>
                    <AccordionAnswer>No.</AccordionAnswer>
                    <p>
                        Inkwell is designed to be used in studies that have already received ethical approval. 
                        The use of Inkwell should not add to the ethical burdern of the study, as it does not store any personal data or track users.
                        However, this does not remove the need for usual ethical approvals for the study itself.
                    </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="how-to-login">
                    <AccordionTrigger>How do I log in?</AccordionTrigger>
                    <AccordionContent>
                    <p>
                        Inkwell does not require a login to enter data to an existing study.
                    </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="how-to-create-study">
                    <AccordionTrigger>How do I create a study?</AccordionTrigger>
                    <AccordionContent>
                    <p>
                        Inkwell is designed to be used by researchers who have already received ethical approval for their study. It is currently in a closed beta testing phase, with a limited number of studies available.
                    </p>
                    <p>
                    If you are a researcher and would like to use Inkwell, please contact <Link className='underline' href='mailto:alexander.p.brown@ucl.ac.uk'>Alex Brown</Link> to discuss your study and how Inkwell can be used to collect data.
                    </p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
      </main>
      <footer className="flex h-24 w-full items-center justify-center border-t">
        <div className='flex items-center justify-center flex-col'>
            <p>Designed and managed by <Link href='mailto:alexander.brown5@nhs.net'>Alex Brown</Link></p>
          
        </div>
      </footer>
    </>
  );
}