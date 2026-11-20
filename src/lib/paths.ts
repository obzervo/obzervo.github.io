// Links between the site's pages, correct under any deploy base (e.g. a GitHub Pages subpath).
export type PageName = 'home' | 'work' | 'services'

export function pageUrl(name: PageName) {
  return import.meta.env.BASE_URL + (name === 'home' ? '' : `${name}/`)
}

export function currentPage(): PageName {
  const path = window.location.pathname
  if (path.startsWith(pageUrl('work'))) return 'work'
  if (path.startsWith(pageUrl('services'))) return 'services'
  return 'home'
}
