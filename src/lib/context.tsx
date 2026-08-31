'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Lang, translations } from '@/lib/data'

type Theme = 'dark' | 'light'

interface AppContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
  theme: Theme
  toggleTheme: () => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ru')
  const [theme, setTheme] = useState<Theme>('light')

  // Инициализация темы на основе системных настроек и прослушивание изменений
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    // Устанавливаем начальную тему
    setTheme(mediaQuery.matches ? 'dark' : 'light')

    // Слушатель для автоматического изменения темы, если она меняется на устройстве
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Применяем тему к <html> — так переменные наследуются всем документом
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
  }, [lang])

  const setLang = (l: Lang) => setLangState(l)
  const t = (key: string) => translations[lang][key] ?? key
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  return (
    <AppContext.Provider value={{ lang, setLang, t, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
