import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'
import { Reveal } from '../components/Reveal'
import { BrandWord } from '../components/Logo'
import { Ar } from '../components/Arabic'
import { FlowGradient } from '../components/FlowGradient'

// Words light up one by one as the paragraph scrolls through the viewport. The closing
// phrase sits on a line of its own, never split.
const TEXT = 'Every business has AI now. Very few get results that look like their own brand — generic images, template websites, no two outputs that feel the same. AI isn’t the problem.'.split(' ')
const ACCENT = 'Lack of direction is.'.split(' ')

export function Manifesto() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.manifesto__text .word', {
        opacity: 1,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: { trigger: '.manifesto__text', start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section ambient" ref={root}>
      <div className="ambient__light" aria-hidden="true">
        <FlowGradient tone="faint" speed={0.1} />
      </div>
      <div className="container">
        <Reveal><p className="section-label label">The problem</p></Reveal>
        <p className="manifesto__text">
          {TEXT.map((w, i) => (
            <span key={i}>
              <span className="word">{w}</span>{' '}
            </span>
          ))}
          <br />
          <span className="manifesto__accent">
            {ACCENT.map((w, i) => (
              <span key={i}>
                <span className="word serif">{w}</span>
                {i < ACCENT.length - 1 ? ' ' : ''}
              </span>
            ))}
          </span>
        </p>
        <div className="manifesto__foot">
          <Reveal>
            <span className="label muted">We observe. We engineer. AI executes.</span>
            <span className="manifesto__ar"><Ar>نتأمّل. نُهندس. والذكاء يُنفّذ.</Ar></span>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              <BrandWord /> is the layer between your business and AI. We don’t just use it — we direct it, with a
              designer’s eye and an engineered process, so every output looks like you.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
