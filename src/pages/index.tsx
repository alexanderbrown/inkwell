import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Study } from '@/types'
import config from '@/config'
import Link from 'next/link'
// import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

type HomeProps = {
  studies: Array<string>
}

export default function Home(props: HomeProps) {
  return (
    <>
      <Head>
        <title>Inkwell</title>
        <meta name="description" content="Inkwell - the user friendly portal for uploading rare disease surveillance data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <h1>Welcome to the Inkwell Project!</h1>
        Please see below for a list of available studies:
        <div>
          <ul>
            {props.studies.map((study) => { return (
              <li>
                <Link href={`studies/${study}`}>{study}</Link>
              </li>)
            })}
          </ul>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const api_url = config.server + '/api/studies'
  const res = await fetch(api_url, {
                              headers: {
                                  "Content-Type": "application/json"
                              }})
  const studies = await res.json()

  return {
    props: {
      studies,
    },
  }
}