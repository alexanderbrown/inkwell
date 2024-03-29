import Head from 'next/head'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [studies, setStudies] = useState<string[]>([])
  useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/studies/')
      const studies = await res.json()
      setStudies(studies)
    }
    getData()
  }, [])
  

  return (
    <>
      <Head>
        <title>Inkwell</title>
        <meta name="description" content="Inkwell - the user friendly portal for uploading rare disease surveillance data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <div className='flex flex-col items-center bg-slate-50 h-screen'>
          <div className='flex items-baseline pt-4 pb-20 '>
            <Image src='/quill.png' className='w-20 inline' alt='Inkwell logo' width={240} height={240}/>
            <h1 className='text-5xl text-slate-600 inline '>Inkwell</h1>
          </div>
          <div className="w-1/2">
            <p className='text-slate-700'>
              The Inkwell Project is a lightweight web form designed for national healthcare surveillance studies. <br />
              Please see below for a list of available studies:
            </p>
          </div>
          
          <div className="w-1/2 mt-8">
            <ul className="list-disc list-inside">
              {studies.map((study) => { return (
                <li className="text-sky-700" key={study}>
                  <Link href={`studies/${study}`} target='_blank'>{study}</Link>
                </li>)
              })}
            </ul>
          </div>
          <div className='absolute inset-x-0 bottom-0 mb-4 flex items-center justify-center flex-col'>
            <p>Designed and managed by Alex Brown</p>
          <a href="https://www.flaticon.com/free-icons/ink" 
             title="ink icons"
             className='text-slate-500 text-xs'>
              Ink icons created by Freepik - Flaticon
            </a>
          </div>
        </div>
      </main>
    </>
  )
}