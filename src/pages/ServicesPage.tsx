import { PageHead, PageShell } from './PageShell'
import { Services } from '../sections/Services'

export function ServicesPage() {
  return (
    <PageShell>
      <PageHead
        label="Services"
        title={
          <>
            Everything your brand
            <br />
            needs, <span className="serif">directed.</span>
          </>
        }
        intro="Faster and more affordable than a traditional studio. More taste and system than any AI tool."
      />
      <Services />
    </PageShell>
  )
}
