import { useEffect, useRef } from 'react'
import { LogoMark } from './Logo'
import { brandTileBg } from '../lib/brand'
import { categoryLabel, workFile, type Project } from '../content/work'

const KIND_LABEL = { image: 'Image', video: 'Video', website: 'Website' } as const

// Muted looping video that only plays while on screen.
function AutoVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = ref.current
    if (!video) return
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? video.play().catch(() => {}) : video.pause()))
    io.observe(video)
    return () => io.disconnect()
  }, [])
  return (
    <video
      ref={ref}
      className="work-media"
      src={workFile(src)}
      poster={poster && workFile(poster)}
      muted
      loop
      playsInline
      preload="metadata"
    />
  )
}

// A project's visual: video, image, website screenshot in a browser frame, or a placeholder.
export function WorkMedia({ project, index }: { project: Project; index: number }) {
  if (!project.src)
    return (
      <div className="work-media work-media--empty" style={{ background: brandTileBg(index + 3) }}>
        <LogoMark />
        <span className="label">{KIND_LABEL[project.kind]} · coming soon</span>
      </div>
    )
  if (project.kind === 'video') return <AutoVideo src={project.src} poster={project.poster} />
  if (project.kind === 'website')
    return (
      <div className="work-media work-media--site">
        <div className="work-media__bar" aria-hidden="true">
          <i />
          <i />
          <i />
          {project.url && <span>{new URL(project.url).host}</span>}
        </div>
        <img src={workFile(project.src)} alt={project.title} loading="lazy" />
      </div>
    )
  return <img className="work-media" src={workFile(project.src)} alt={project.title} loading="lazy" />
}

export function WorkCard({ project, index, large }: { project: Project; index: number; large?: boolean }) {
  const meta = (
    <>
      <WorkMedia project={project} index={index} />
      <div className="work-card__meta">
        <span className="work-card__title">{project.title}</span>
        <span className="label muted">
          {project.client} · {categoryLabel(project.category)}
        </span>
      </div>
      {project.blurb && <p className="work-card__blurb">{project.blurb}</p>}
    </>
  )
  const className = `work-card ${large ? 'work-card--large' : ''}`
  return project.url ? (
    <a className={className} href={project.url} target="_blank" rel="noreferrer" data-cursor>
      {meta}
    </a>
  ) : (
    <article className={className}>{meta}</article>
  )
}
