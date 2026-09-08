'use client'

import { useApp } from '@/lib/context'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import { useReveal } from '@/components/useReveal'

export default function InstagramPlaceholder() {
  const { t } = useApp()
  useReveal([])

  return (
    <>
      <Loader />
      <Nav />
      <main className="page-wrapper" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column' }}>
        <div className="projects-placeholder" style={{ flex: 1, paddingTop: '10rem' }}>
          <div className="hero-bg" style={{ opacity: 0.3 }}><div className="hero-orb" style={{ width: '400px', height: '400px' }} /></div>
          <div className="placeholder-content reveal" style={{ position: 'relative', zIndex: 1 }}>
            <h3>{t('placeholder_title')}</h3>
            <p>{t('placeholder_desc')}</p>
            <div style={{ marginTop: '2.5rem' }}>
              <a href="/projects" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center' }}>
                {t('f_all')} <span style={{ marginLeft: '0.5rem' }}>→</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
