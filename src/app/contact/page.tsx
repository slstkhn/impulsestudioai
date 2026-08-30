'use client'
import { useState } from 'react'
import { useApp } from '@/lib/context'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import { useReveal } from '@/components/useReveal'

const SERVICE_TAGS = ['ct_tag1','ct_tag2','ct_tag3','ct_tag5']

export default function Contact() {
  const { t } = useApp()
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [showPopup, setShowPopup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' })

  useReveal()

  const toggle = (tag: string) => {
    const next = new Set(selected)
    if (next.has(tag)) next.delete(tag)
    else next.add(tag)
    setSelected(next)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          services: Array.from(selected).map(tag => t(tag))
        })
      })
      if (res.ok) {
        setShowPopup(true)
        setFormData({ name: '', contact: '', message: '' })
        setSelected(new Set())
      } else {
        alert('Что-то пошло не так, попробуйте еще раз')
      }
    } catch (err) {
      alert('Ошибка при отправке')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Loader />
      <Nav />
      <main className="page-wrapper">
        <section className="contact-hero" style={{ paddingBottom: '2rem' }}>
          <div className="contact-hero-inner">
            <h1><span>{t('ct_h_1')} </span><em>{t('ct_h_em')}</em></h1>
            <p>{t('ct_h_desc')}</p>
          </div>
        </section>
        
        <section className="contact-form-section" style={{ paddingTop: '0' }}>
          <form className="contact-form reveal" onSubmit={handleSubmit}>
            <div className="form-row">
              <label className="form-label">{t('ct_lbl_services')}</label>
              <div className="form-tags">
                {SERVICE_TAGS.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    className={`tag-check ${selected.has(tag) ? 'selected' : ''}`}
                    onClick={() => toggle(tag)}
                  >
                    {t(tag)}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <label className="form-label">{t('ct_lbl_name')}</label>
                <input type="text" className="form-input" required placeholder={t('ct_ph_name')} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <label className="form-label">{t('ct_lbl_email')}</label>
                <input type="text" className="form-input" required placeholder={t('ct_ph_email')} value={formData.contact} onChange={e => setFormData({ ...formData, contact: e.target.value })} />
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">{t('ct_lbl_msg')}</label>
              <textarea className="form-textarea" rows={4} required placeholder={t('ct_ph_msg')} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
            </div>

            <button type="submit" className="form-submit" disabled={loading}>
              {loading ? '...' : <>{t('ct_btn_send')} →</>}
            </button>
          </form>
        </section>
      </main>

      {showPopup && (
        <div 
          className="contact-popup-overlay" 
          onClick={() => setShowPopup(false)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <div 
            className="contact-popup-content" 
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--bg)', padding: '3rem', border: '1px solid var(--line)',
              maxWidth: '500px', width: '100%', textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--ink)' }}>{t('ct_success_title')}</h3>
            <p style={{ color: 'var(--ink-dim)', marginBottom: '2rem' }}>{t('ct_success_desc')}</p>
            <button 
              onClick={() => setShowPopup(false)} 
              className="form-submit"
              style={{ padding: '0.8rem 2rem' }}
            >
              Ок
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
