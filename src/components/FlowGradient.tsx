import { MeshGradient } from '@paper-design/shaders-react'

// Brand light with no fixed shape: a mesh gradient whose colour points drift, distort and swirl
// (domain warping), so the light wanders across the area instead of sitting in round pools.
// Ink appears several times in each palette, which keeps most of the field dark and lets the
// blue and orange move through it.
const PALETTES = {
  // Prism → contact → footer: the main light of the page.
  deep: ['#02070A', '#0297DE', '#02070A', '#02070A', '#FC734D', '#02070A', '#043a5c', '#02070A', '#02070A'],
  // Quiet sections: barely-there colour, just enough to keep the dark alive.
  faint: ['#02070A', '#02070A', '#06202f', '#02070A', '#2a130d', '#02070A', '#071c29'],
}

// Pixels each field renders at most. Kept low on purpose: the browser stretches the small
// canvas up smoothly, which frosts the light like glass for free. A real blur filter would be
// recomputed every frame over a moving canvas, the costliest thing a page can do while scrolling.
const PIXELS = { deep: 560 * 380, faint: 420 * 280 }

const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function FlowGradient({ tone = 'deep', speed = 0.16, className }: { tone?: keyof typeof PALETTES; speed?: number; className?: string }) {
  return (
    <>
      <MeshGradient
        className={className}
        colors={PALETTES[tone]}
        distortion={0.95}
        swirl={0.7}
        grainMixer={0}
        grainOverlay={0}
        speed={reduced ? 0 : speed}
        minPixelRatio={0.1}
        maxPixelCount={PIXELS[tone]}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      {/* A light glass tint over the frosted light, like the footer card at partial strength. */}
      {tone === 'deep' && <div className="flow-veil" />}
    </>
  )
}
