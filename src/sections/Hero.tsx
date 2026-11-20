import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'
import { Arrow, Button } from '../components/Button'
import { WorkMedia } from '../components/WorkMedia'
import { CATEGORIES, PROJECTS } from '../content/work'
import { pageUrl } from '../lib/paths'
import { HeroShader } from './HeroShader'
import { Ar } from '../components/Arabic'

// The three things the studio makes, each opening its part of the Work page, with a preview
// of the latest project in it.
function CategoryCard({ index }: { index: number }) {
  const cat = CATEGORIES[index]
  const inCat = PROJECTS.filter((p) => p.category === cat.id)
  const preview = inCat.find((p) => p.src) ?? inCat[0]
  return (
    <a
      className={`dock-card cat-card glass ${index === 1 ? 'glass--liquid' : ''}`}
      href={`${pageUrl('work')}?c=${cat.id}`}
      data-cursor
    >
      <div className="dock-card__head">
        <span className="label muted">0{index + 1}</span>
        <span className="cat-card__go label">
          See work <Arrow />
        </span>
      </div>
      <div className="cat-card__media">{preview && <WorkMedia project={preview} index={index} />}</div>
      <h3 className="cat-card__title">{cat.label}</h3>
      <p className="cat-card__blurb">{cat.blurb}</p>
    </a>
  )
}

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hero__title .line-mask > span', { yPercent: 115 })
      gsap.set(['.hero__caption', '.hero__ar', '.hero__sub', '.hero__ctas'], { opacity: 0, y: 30 })
      gsap.set('.dock-card', { opacity: 0, y: 120 })
      // Hidden from the first frame, so the intro fades it in instead of snapping it out and back.
      gsap.set('.hero__bg', { opacity: 0 })

      // Scroll out: copy drifts up and fades, the card dock rises, background sinks.
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to('.hero__center, .hero__caption', { yPercent: -30, opacity: 0, ease: 'none', scrollTrigger: st })
      gsap.to('.hero__bg', { yPercent: 20, ease: 'none', scrollTrigger: st })
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.to('.hero__bg', { opacity: 1, duration: 2.2 }, 0)
        .to('.hero__caption', { opacity: 1, y: 0, duration: 1.2 }, 0.9)
        .to('.hero__title .line-mask > span', { yPercent: 0, duration: 1.4, stagger: 0.09 }, 0.2)
        .to(['.hero__ar', '.hero__sub', '.hero__ctas'], { opacity: 1, y: 0, duration: 1.2, stagger: 0.08 }, 0.45)
        .to('.dock-card', { opacity: 1, y: 0, duration: 1.6, stagger: 0.1 }, 0.75)
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__bg">
        <HeroShader running={ready} />
      </div>
      <div className="hero__vignette" />

      <p className="hero__caption">
        <span className="hero__caption-inner">
          AI creative design &amp; engineering studio
          <span className="hero__caption-dash glass" aria-hidden="true" />
        </span>
      </p>

      <div className="hero__center container">
        <h1 className="hero__title">
          <span className="line-mask"><span>Your AI, finally</span></span>
          <span className="line-mask"><span><span className="serif">on-brand.</span></span></span>
        </h1>
        <p className="hero__ar"><Ar>ذكاؤك الاصطناعي، أخيرًا يشبهك.</Ar></p>
        <p className="hero__sub">
          We observe your business, then direct AI to build an identity, visuals and a website that look
          unmistakably like you. Every time.
        </p>
        <div className="hero__ctas">
          <Button href="#contact">Start a project</Button>
          <Button href={pageUrl('work')} variant="glass" arrow={false}>See our work</Button>
        </div>
      </div>

      <div className="hero__dock container">
        {CATEGORIES.map((c, i) => (
          <CategoryCard key={c.id} index={i} />
        ))}
      </div>
    </section>
  )
}
