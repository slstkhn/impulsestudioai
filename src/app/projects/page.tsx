'use client'
import { useState } from 'react'
import { useApp } from '@/lib/context'
import { useReveal } from '@/components/useReveal'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import ProjectModal from '@/components/ProjectModal'
import { projects, generateSVG, Project, ProjectCat } from '@/lib/data'

type Filter = 'all' | ProjectCat

const FILTERS: { key: Filter; labelKey: string }[] = [
  { key: 'all',   labelKey: 'f_all'   },
  { key: 'video', labelKey: 'f_video' },
  { key: 'web',   labelKey: 'f_web'   },
  { key: 'deck',  labelKey: 'f_deck'  },
]

export default function Projects() {
  const { t, lang } = useApp()
  const [filter, setFilter] = useState<Filter>('all')
  const [openProject, setOpenProject] = useState<Project | null>(null)

  useReveal([filter])

  const rawFiltered = filter === 'all' ? projects : projects.filter(p => p.cat === filter)
  const isPlaceholder = filter === 'web' || filter === 'deck'
  const sortedFiltered = isPlaceholder ? [] : [...rawFiltered].sort((a, b) => b.year - a.year)
  const filtered = sortedFiltered

  return (
    <>
      <Loader />
      <Nav />
      <main className="page-wrapper">
        <section className="projects-hero">
          <div className="projects-hero-inner">
            <h1><span>{t('pj_h_1')} </span><em>{t('pj_h_em')}</em></h1>
            <p>{t('pj_h_desc')}</p>
          </div>
        </section>

        <div className="filter-bar">
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`filter-btn${filter === f.key ? ' active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {t(f.labelKey)}
            </button>
          ))}
        </div>

        {isPlaceholder ? (
          <div className="projects-placeholder">
            <div className="hero-bg" style={{ opacity: 0.3 }}><div className="hero-orb" style={{ width: '400px', height: '400px' }} /></div>
            <div className="placeholder-content reveal" style={{ position: 'relative', zIndex: 1 }}>
              <h3>{t('placeholder_title')}</h3>
              <p>{t('placeholder_desc')}</p>
              <div style={{ marginTop: '2.5rem' }}>
                <button onClick={() => setFilter('all')} className="btn-ghost">
                  {t('f_all')} →
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="projects-grid">
            {filtered.map((p, idx) => (
            <article
              key={p.id}
              className="project-tile reveal"
              style={{ transitionDelay: `${idx * 60}ms` }}
              onClick={() => setOpenProject(p)}
            >
              {p.coverUrl ? (
                <img
                  src={p.coverUrl}
                  alt={p.title[lang]}
                  className="project-tile-visual"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div
                  className="project-tile-visual"
                  dangerouslySetInnerHTML={{ __html: generateSVG(p) }}
                />
              )}
              <div className="project-tile-meta">
                <div>
                  <h3 className="project-tile-title">{p.title[lang]}</h3>
                  <span className="project-tile-cat">{p.catLabel[lang]}</span>
                </div>
                <span className="project-tile-year">{p.year}</span>
              </div>
            </article>
          ))}
        </div>
        )}
      </main>
      <Footer />
      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </>
  )
}
