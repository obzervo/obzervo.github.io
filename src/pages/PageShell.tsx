import { useEffect, type ReactNode } from 'react'
import { initSmoothScroll, ScrollTrigger } from '../lib/scroll'
import { Cursor } from '../components/Cursor'
import { ScrollBadge } from '../components/ScrollBadge'
import { Nav } from '../components/Nav'
import { LiquidGlassFilter } from '../components/LiquidGlassFilter'
import { Contact } from '../sections/Contact'
import { FlowGradient } from '../components/FlowGradient'

// Frame for the inner pages: the same header, cursor, badge and footer as the homepage, without
// the loader. The page fades in instead, so moving between pages feels quick.
export function PageShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = initSmoothScroll()
    lenis.scrollTo(0, { immediate: true, force: true })
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <>
      <LiquidGlassFilter />
      <Cursor />
      <Nav />
      <ScrollBadge visible />
      <main className="page-enter">
        {children}
        <Contact />
      </main>
      <div className="grain" aria-hidden="true" />
    </>
  )
}

// Title block at the top of an inner page.
export function PageHead({ label, title, intro, children }: { label: string; title: ReactNode; intro: ReactNode; children?: ReactNode }) {
  return (
    <section className="page-head ambient">
      <div className="ambient__light" aria-hidden="true">
        <FlowGradient tone="faint" speed={0.1} />
      </div>
      <div className="container">
        <p className="section-label label">{label}</p>
        <h1 className="page-head__title">{title}</h1>
        <p className="page-head__intro">{intro}</p>
        {children}
      </div>
    </section>
  )
}
