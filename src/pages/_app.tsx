import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => console.log('Service Worker registered'))
        .catch((error) => console.log('Service Worker registration failed:', error))
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      <Component {...pageProps} />
    </AnimatePresence>
  )
}
