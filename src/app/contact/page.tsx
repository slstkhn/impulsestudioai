'use client'
import { useState } from 'react'
import { useApp } from '@/lib/context'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import { useReveal } from '@/components/useReveal'

const SERVICE_TAGS = ['ct_tag1','ct_tag2','ct_tag3','ct_tag4','ct_tag5']

export default function Contact() {
  const { t } = useApp()
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [sent, setSent] = useState(false)
  useReveal()

  const toggle = (tag: string) => {
    const next = new Set(selected)
    if (next.has(tag)) next.delete(tag)
    else next.add(tag)
    setSelected(next)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <Loader />
      <Nav />
      <main className="page-wrapper">
        <section className="contact-hero">
          <div className="contact-hero-inner">
            <h1><span>{t('ct_h_1')} </span><em>{t('ct_h_em')}</em></h1>
            <p>{t('ct_h_desc')}</p>
          </div>
        </section>
        
        <section className="contact-form-section">
          {sent ? (
            <div className="contact-success reveal">
              <h3>{t('ct_success_title')}</h3>
              <p>{t('ct_success_desc')}</p>
            </div>
          ) : (
            <form className="contact-form reveal" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>{t('ct_lbl_services')}</label>
                <div className="tags-grid">
                  {SERVICE_TAGS.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      className={`tag-btn ${selected.has(tag) ? 'active' : ''}`}
                      onClick={() => toggle(tag)}
                    >
                      {t(tag)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t('ct_lbl_name')}</label>
                  <input type="text" required placeholder={t('ct_ph_name')} />
                </div>
                <div className="form-group">
                  <label>{t('ct_lbl_email')}</label>
                  <input type="email" required placeholder={t('ct_ph_email')} />
                </div>
              </div>

              <div className="form-group">
                <label>{t('ct_lbl_msg')}</label>
                <textarea rows={4} placeholder={t('ct_ph_msg')}></textarea>
              </div>

              <button type="submit" className="btn-primary">
                <span>{t('ct_btn_send')}</span>
                <span className="arrow">→</span>
              </button>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
