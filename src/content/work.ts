// Every project on the site, in one list. It fills the homepage hero cards, the "Selected work"
// section and the Work page.
//
// To add a project: put its files in public/work/ and add an entry below, naming the files only
// (e.g. src: 'cafe-campaign.mp4'). An entry without `src` shows as a placeholder tile.

export type Category = 'branding' | 'visuals' | 'websites'

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  {
    id: 'branding',
    label: 'Brand identity',
    blurb: 'Visual character, palette, type and a style guide your AI output can follow.',
  },
  {
    id: 'visuals',
    label: 'AI visuals & video',
    blurb: 'Product shots, campaign images and ad videos that stay consistent across everything.',
  },
  {
    id: 'websites',
    label: 'Websites',
    blurb: 'Custom, interactive, high-end sites built with AI-assisted engineering. Never templates.',
  },
]

export type Project = {
  title: string
  client: string
  category: Category
  kind: 'image' | 'video' | 'website'
  /** Image or video file in public/work/. For a website, a screenshot of it. */
  src?: string
  /** Video only: a still frame shown until the video starts. */
  poster?: string
  /** Website only: the live link. */
  url?: string
  /** One line about the project. */
  blurb?: string
  /** Shown on the homepage; the first featured project gets the large tile. */
  featured?: boolean
}

// Placeholders until the real projects arrive.
export const PROJECTS: Project[] = [
  { title: 'Project title', client: 'Client name', category: 'visuals', kind: 'video', featured: true },
  { title: 'Project title', client: 'Client name', category: 'websites', kind: 'website', featured: true },
  { title: 'Project title', client: 'Client name', category: 'branding', kind: 'image', featured: true },
  { title: 'Project title', client: 'Client name', category: 'visuals', kind: 'image', featured: true },
  { title: 'Project title', client: 'Client name', category: 'branding', kind: 'image' },
  { title: 'Project title', client: 'Client name', category: 'websites', kind: 'website' },
]

export const categoryLabel = (id: Category) => CATEGORIES.find((c) => c.id === id)?.label ?? id

export const workFile = (name: string) => `${import.meta.env.BASE_URL}work/${name}`
