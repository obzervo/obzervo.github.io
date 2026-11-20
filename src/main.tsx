import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import './styles/sections.css'
import App from './App'
import { WorkPage } from './pages/WorkPage'
import { ServicesPage } from './pages/ServicesPage'

// Scroll restoration is switched off in lib/scroll (via ScrollTrigger); start at the top regardless.
// A section hash (e.g. #contact) would make the browser jump there on reload, so drop it.
if (location.hash) history.replaceState(null, '', location.pathname + location.search)
window.scrollTo(0, 0)

// Each HTML page (index.html, work/, services/) names the page it shows on its root element.
const root = document.getElementById('root')!
const PAGES = { work: WorkPage, services: ServicesPage }
const Page = PAGES[root.dataset.page as keyof typeof PAGES] ?? App

createRoot(root).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
