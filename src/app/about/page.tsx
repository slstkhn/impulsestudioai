'use client'
import { useApp } from '@/lib/context'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import { useReveal } from '@/components/useReveal'

export default function About() {
  const { t } = useApp()
  useReveal()

  return (
    <>
      <Loader />
      <Nav />
      <main className="page-wrapper">
        <section className="about-hero reveal">
          <h1 className="about-hero-title"><span>{t('ab_h_1')} </span><em>{t('ab_h_em')}</em></h1>
          <p className="about-hero-text">{t('ab_h_desc')}</p>
        </section>

        <section className="manifesto">
          <div className="manifesto-inner reveal">
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--ink-dim)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2rem' }}>
              {t('ab_sec1_title')}
            </h2>
            <div className="about-hero-text" style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>{t('ab_sec1_text1')}</div>
            <div className="about-hero-text" style={{ fontSize: '1.25rem' }}>{t('ab_sec1_text2')}</div>
          </div>
        </section>

        <section className="stats reveal">
          <div className="stat">
            <div className="stat-num">50<em>+</em></div>
            <div className="stat-label">{t('ab_stat1')}</div>
          </div>
          <div className="stat">
            <div className="stat-num">12</div>
            <div className="stat-label">{t('ab_stat2')}</div>
          </div>
          <div className="stat">
            <div className="stat-num">5</div>
            <div className="stat-label">{t('ab_stat3')}</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
