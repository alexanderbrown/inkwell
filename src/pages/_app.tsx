import '@/styles/globals.css'
import 'react-tooltip/dist/react-tooltip.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Component {...pageProps} />
    </div>
  )
}
