'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useApp } from '@/lib/context'
import { useReveal } from '@/components/useReveal'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import ProjectModal from '@/components/ProjectModal'
import { generateSVG, projects, Project } from '@/lib/data'
import { BeckerLogo, UtkonosLogo, ServierLogo, GermesLogo, NovyeLyudiLogo, UnisonLogo, EsimetaLogo } from '@/components/ClientLogos'

const TICKER_KEYS = ['tick_1','tick_2','tick_3','tick_5']

export default function Home() {
  const { t, lang } = useApp()
  const [openProject, setOpenProject] = useState<Project | null>(null)
  
  const wordsRu = ['бизнесу', 'блогу', 'бренду', 'жизни']
  const wordsEn = ['business', 'blog', 'brand', 'life']
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])
  
  const words = lang === 'ru' ? wordsRu : wordsEn
  
  useReveal()
  const featured = [projects[1], projects[0]]

  return (
    <>
      <Loader />
      <Nav />
      <main className="page-wrapper">
        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-bg"><div className="hero-orb" /></div>
          <div className="hero-label"><span>{t('hero_label')}</span></div>
          <div className="hero-grid">
            <div>
              <h1 className="hero-title">
                <span className="line"><span className="word">{lang === 'ru' ? 'Придаём ' : 'Giving '}<em style={{fontStyle: 'italic', color: 'var(--accent-soft)'}}>ИИмпульс</em></span></span>
                <span className="line">
                  <span className="word italic">
                    {lang === 'en' ? 'to ' : ''}
                    <span className="dynamic-word-wrapper">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={wordIndex}
                          initial={{ y: '100%', opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: '-100%', opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          className="dynamic-word-inner"
                        >
                          {words[wordIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </span>
                </span>
              </h1>
              <div className="hero-cta-row">
                <a href="/projects" className="btn-primary">
                  <span>{t('cta_work')}</span>
                  <span className="arrow">→</span>
                </a>
                <a href="/contact" className="btn-ghost">{t('cta_brief')}</a>
              </div>
            </div>
            <div className="hero-meta">
              <div className="hero-meta-block"><strong>50+</strong>{t('meta_projects')}</div>
            </div>
          </div>
          <div className="ticker">
            <div className="ticker-track">
              {[...Array(12)].flatMap(() => TICKER_KEYS).map((key, i) => (
                <React.Fragment key={i}>
                  <span>{i % 2 === 0 ? <em>{t(key)}</em> : t(key)}</span>
                  <span className="star">✦</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="services">
          <div className="section-header reveal">
            <div>
              <div className="section-label"><span>01 — {t('serv_label')}</span></div>
              <h2 className="section-title">{t('serv_title_1')}<br /><em>{t('serv_title_em')}</em></h2>
            </div>
          </div>
          <div className="services-list">
            {[
              { num:'01', nameKey:'s1_name', italic:true,  descKey:'s1_desc' },
              { num:'02', nameKey:'s2_name', italic:false, descKey:'s2_desc' },
              { num:'03', nameKey:'s3_name', italic:true,  descKey:'s3_desc' },
            ].map(s => (
              <div key={s.num} className="service reveal">
                <span className="service-num">{s.num}</span>
                <span className="service-name">{s.italic ? <em>{t(s.nameKey)}</em> : t(s.nameKey)}</span>
                <span className="service-desc">{t(s.descKey)}</span>
                <span className="service-arrow">→</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURED WORKS ── */}
        <section className="works">
          <div className="section-header reveal">
            <div>
              <div className="section-label"><span>02 — {t('work_label')}</span></div>
              <h2 className="section-title">{t('work_title_1')} <em>{t('work_title_em')}</em></h2>
            </div>
            <a href="/projects" className="btn-ghost">{t('work_all')}</a>
          </div>
          <div className="works-grid">
            {featured.map((p, i) => (
              <article
                key={p.id}
                className="work-card reveal"
                onClick={() => setOpenProject(p)}
              >
                <div className="work-visual">
                  <span className="work-tag">{t(`w${p.id}_tag`)}</span>
                  <span className="work-year">{p.year}</span>
                  {p.coverUrl ? (
                    <img 
                      src={p.coverUrl} 
                      alt={p.title[lang]} 
                      className="work-visual-inner"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      className="work-visual-inner"
                      dangerouslySetInnerHTML={{ __html: generateSVG(p) }}
                    />
                  )}
                </div>
                <div className="work-meta">
                  <div>
                    <h3 className="work-title">
                      {p.id === 1 ? <>{t('w1_title')}<br /><em>Becker</em></> : <>{t('w2_title')}<br /><em>{t('w2_title_em')}</em></>}
                    </h3>
                    <span className="work-client">{p.catLabel[lang]}</span>
                  </div>
                  <span className="work-link">{t(`w${p.id}_link`)}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="works-footer">
            <a href="/projects" className="btn-primary">
              <span>{t('work_cta')}</span>
              <span className="arrow">→</span>
            </a>
          </div>
        </section>

        <section className="clients-ticker">
          <div className="clients-ticker-track">
            {[...Array(12)].map((_, i) => (
              <React.Fragment key={i}>
                <div className="clients-ticker-item"><BeckerLogo /></div>
                <div className="clients-ticker-item"><UtkonosLogo /></div>
                <div className="clients-ticker-item"><ServierLogo /></div>
                <div className="clients-ticker-item"><GermesLogo /></div>
                <div className="clients-ticker-item"><NovyeLyudiLogo /></div>
                <div className="clients-ticker-item"><UnisonLogo /></div>
                <div className="clients-ticker-item"><EsimetaLogo /></div>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="process">
          <div className="section-header reveal">
            <div>
              <div className="section-label"><span>03 — {t('proc_label')}</span></div>
              <h2 className="section-title">{t('proc_title_1')} <em>{t('proc_title_em')}</em></h2>
            </div>
          </div>
          <div className="process-grid">
            {[1,2,3,4].map(n => (
              <div key={n} className="process-item reveal">
                <div className="process-num">0{n}</div>
                <h3 className="process-title">{t(`p${n}_title`)}</h3>
                <p className="process-text">{t(`p${n}_text`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section">
          <h2 className="cta-title">{t('cta_t_1')}<br /><em>{t('cta_t_em')}</em></h2>
          <a href="/contact" className="btn-primary">
            <span>{t('cta_btn')}</span>
            <span className="arrow">→</span>
          </a>
        </section>
      </main>
      <Footer />
      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </>
  )
}
