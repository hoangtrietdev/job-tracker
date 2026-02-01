import { ReactNode, useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    
    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground">
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-lg">
                💼
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Job Tracker</h1>
                <p className="text-[10px] text-muted-foreground">Track your career journey</p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-accent/50 transition-all duration-300 border border-transparent hover:border-border/50 shadow-sm"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-500" />
              )}
            </motion.button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {children}
      </main>
    </div>
  )
}
