'use client'
import { useEffect } from 'react'

export function useReveal(deps: any[] = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    )

    // Small delay to allow React to mount/update the DOM before querying
    const timeout = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el))
    }, 50)

    return () => {
      clearTimeout(timeout)
      observer.disconnect()
    }
  }, deps)
}
