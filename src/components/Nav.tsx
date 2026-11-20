import { useEffect, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { getLenis, scrollToTarget } from '../lib/scroll'
import { Wordmark } from './Logo'
import { Button } from './Button'
import { currentPage, pageUrl } from '../lib/paths'

// Work and Services are pages of their own; Contact is the section at the end of every page.
const LINKS = [
  { href: pageUrl('work'), label: 'Work', page: 'work' },
  { href: pageUrl('services'), label: 'Services', page: 'services' },
  { href: '#contact', label: 'Contact', page: null },
]

export function Nav() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = 0
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 160 && y > last)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const lenis = getLenis()
    if (open) lenis?.stop()
    else lenis?.start()
  }, [open])

  const here = currentPage()

  // In-page targets scroll smoothly; links to other pages navigate normally.
  const go = (e: MouseEvent, href: string) => {
    setOpen(false)
    if (!href.startsWith('#')) return
    e.preventDefault()
    scrollToTarget(href)
  }

  // The logo goes home, or back to the top when already there.
  const home = (e: MouseEvent) => {
    if (here !== 'home') return
    e.preventDefault()
    setOpen(false)
    scrollToTarget(0)
  }

  return (
    <>
      <header className={`nav glass glass--liquid ${hidden && !open ? 'is-hidden' : ''}`}>
        <a className="nav__home" href={pageUrl('home')} onClick={home} aria-label="Obzervo home">
          <Wordmark />
        </a>
        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} aria-current={l.page === here ? 'page' : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
        <Button href="#contact">Start a project</Button>
        <button className="nav__menu glass" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? 'Close' : 'Menu'}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={(e) => go(e, l.href)}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.06 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
