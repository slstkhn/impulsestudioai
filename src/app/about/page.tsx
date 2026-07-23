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
        <section className="about-hero">
          <div className="about-hero-inner reveal">
            <h1><span>{t('ab_h_1')} </span><em>{t('ab_h_em')}</em></h1>
            <p>{t('ab_h_desc')}</p>
          </div>
        </section>

        <section className="about-content">
          <div className="about-grid reveal">
            <div className="about-text">
              <h2>{t('ab_sec1_title')}</h2>
              <p>{t('ab_sec1_text1')}</p>
              <p>{t('ab_sec1_text2')}</p>
            </div>
            <div className="about-stats">
              <div className="stat">
                <strong>50+</strong>
                <span>{t('ab_stat1')}</span>
              </div>
              <div className="stat">
                <strong>12</strong>
                <span>{t('ab_stat2')}</span>
              </div>
              <div className="stat">
                <strong>5</strong>
                <span>{t('ab_stat3')}</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
