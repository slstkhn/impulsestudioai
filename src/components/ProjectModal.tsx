'use client'
import { useEffect } from 'react'
import { Project, generateSVG } from '@/lib/data'
import { useApp } from '@/lib/context'

interface Props {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  const { lang } = useApp()

  // Escape для закрытия + блокируем скролл фона
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-shell" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="modal-media">
          {project.vimeoId ? (
            <iframe
              src={`https://player.vimeo.com/video/${project.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={project.title[lang]}
            />
          ) : project.videoUrl ? (
            <video
              src={project.videoUrl}
              poster={project.posterUrl}
              controls
              autoPlay
              playsInline
              preload="metadata"
            />
          ) : project.posterUrl ? (
            <img src={project.posterUrl} alt={project.title[lang]} />
          ) : (
            <div
              className="modal-fallback"
              dangerouslySetInnerHTML={{ __html: generateSVG(project) }}
            />
          )}
        </div>

        <div className="modal-info">
          <div className="modal-cat">{project.catLabel[lang]}</div>
          <h2 className="modal-title">{project.title[lang]}</h2>
          {project.description && (
            <p 
              className="modal-desc" 
              dangerouslySetInnerHTML={{ __html: project.description[lang] }} 
            />
          )}
          <div className="modal-meta">
            <span>{project.year}</span>
            {project.client && <span>· {project.client[lang]}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
