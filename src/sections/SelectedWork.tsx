import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'
import { WorkCard } from '../components/WorkMedia'
import { PROJECTS } from '../content/work'
import { pageUrl } from '../lib/paths'
import { FlowGradient } from '../components/FlowGradient'

// The strongest few projects: one large, three beside it. The full list lives on the Work page.
export function SelectedWork() {
  const featured = PROJECTS.filter((p) => p.featured)
  const picks = (featured.length ? featured : PROJECTS).slice(0, 4)
  return (
    <section className="section ambient" id="work">
      <div className="ambient__light" aria-hidden="true">
        <FlowGradient tone="faint" speed={0.1} />
      </div>
      <div className="container">
        <div className="work-head">
          <Reveal>
            <p className="section-label label">Selected work</p>
            <h2 className="h2">
              Their brand.
              <br />
              <span className="serif">Our direction.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button href={pageUrl('work')} variant="glass">See all work</Button>
          </Reveal>
        </div>
        <div className="work-grid work-grid--home">
          {picks.map((p, i) => (
            <Reveal key={i} delay={i * 0.06} y={30}>
              <WorkCard project={p} index={i} large={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
