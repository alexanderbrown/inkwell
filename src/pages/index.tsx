import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const CARD_STYLE = "shadow-sm hover:translate-y-[-0.5rem] transition-transform duration-200 ease-in-out max-w-80 h-48"

export default function Home() {
  return (
    <>
      <Head>
        <title>Inkwell</title>
        <meta name="description" content="Secure Data Collection for Medical Studies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-indigo-500">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <Image src='/quill.png' alt="Inkwell" width={150} height={150} />
          <h1 className="text-5xl font-extrabold tracking-tight text-indigo-900 sm:text-[5rem]">
            Inkwell
          </h1>
          <p className="text-2xl text-white">
            Secure Data Collection for Medical Studies
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
            <Link href = "/studies">
              <Card className={CARD_STYLE}>
                <CardHeader>
                  <CardTitle>Available Studies</CardTitle>
                </CardHeader>
                <CardContent>
                  Browse studies open for data collection
                  <FaArrowRight className="ml-2 inline" />
                </CardContent>
              </Card>
            </Link>
            <Link href = "/about">
              <Card className={CARD_STYLE}>
                <CardHeader>
                  <CardTitle>What is Inkwell</CardTitle>
                </CardHeader>
                <CardContent>
                  Find out more about how Inkwell can support secure data collection for clinical studies
                  <FaArrowRight className="ml-2 inline" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
      <footer className="flex h-24 w-full items-center justify-center border-t">
        <div className='flex items-center justify-center flex-col'>
        <div className="flex flex-row items-center text-sm mb-2">
            <p>Inkwell© 2025 by <a href='mailto:alexander.p.brown@ucl.ac.uk'>Alex Brown</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a></p>
            <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" className="w-4 h-4 ml-1 inline-block"/>
            <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" className="w-4 h-4 ml-1 inline-block"/>
            <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" className="w-4 h-4 ml-1 inline-block"/>
            <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" className="w-4 h-4 ml-1 inline-block"/>
        </div>
          <Link href="https://www.flaticon.com/free-icons/ink" 
             title="ink icons"
             className='text-slate-500 text-xs'>
              Ink icons created by Freepik - Flaticon
          </Link>
          
          
        </div>
      </footer>
    </>
  );
}
