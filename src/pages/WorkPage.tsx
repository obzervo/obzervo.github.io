import { useEffect, useState } from 'react'
import { ScrollTrigger } from '../lib/scroll'
import { PageHead, PageShell } from './PageShell'
import { WorkCard } from '../components/WorkMedia'
import { CATEGORIES, PROJECTS, type Category } from '../content/work'

type Filter = Category | 'all'

// ?c=branding (from the homepage cards) opens the page already filtered.
function initialFilter(): Filter {
  const c = new URLSearchParams(window.location.search).get('c')
  return CATEGORIES.some((cat) => cat.id === c) ? (c as Category) : 'all'
}

export function WorkPage() {
  const [filter, setFilter] = useState<Filter>(initialFilter)
  const list = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)

  useEffect(() => {
    const url = new URL(window.location.href)
    if (filter === 'all') url.searchParams.delete('c')
    else url.searchParams.set('c', filter)
    history.replaceState(null, '', url)
    ScrollTrigger.refresh()
  }, [filter])

  const chips: { id: Filter; label: string }[] = [{ id: 'all', label: 'All' }, ...CATEGORIES]

  return (
    <PageShell>
      <PageHead
        label="Work"
        title={
          <>
            Our <span className="serif">work.</span>
          </>
        }
        intro="Brand identities, AI visuals and video, and websites we’ve made for our clients."
      >
        <div className="work-filters" role="tablist" aria-label="Filter projects">
          {chips.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={filter === c.id}
              className={`work-filter glass ${filter === c.id ? 'is-active' : ''}`}
              onClick={() => setFilter(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </PageHead>
      <section className="section section--flush">
        <div className="container">
          <div className="work-grid">
            {list.map((p, i) => (
              <WorkCard key={`${filter}-${i}`} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
