import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'
import { BrandWord, Wordmark } from '../components/Logo'
import { Ar } from '../components/Arabic'
import { pageUrl } from '../lib/paths'
import { FlowGradient } from '../components/FlowGradient'

// The two ways to reach the studio: email, and WhatsApp (+90 535 553 6884; the number itself
// isn't shown on the page).
const EMAIL = 'obzervo.studios@gmail.com'
// wa.me opens a chat with this number (international format, digits only) with the message typed in.
const WHATSAPP = `https://wa.me/905355536884?text=${encodeURIComponent('مرحبا Obzervo، بدّي أبدأ مشروع معكم.')}`

// `light` off: the page draws one continuous light behind this section and what precedes it.
export function Contact({ light = true }: { light?: boolean }) {
  return (
    <section className="contact" id="contact">
      {light && (
        <div className="contact__light" aria-hidden="true">
          <FlowGradient />
        </div>
      )}
      <div className="container">
        <Reveal>
          <p className="contact__ar"><Ar>خلّينا نحكي</Ar></p>
        </Reveal>
        <Reveal>
          <h2 className="contact__title">
            Let’s look closely
            <br />
            at your <span className="serif">brand.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="contact__sub">
            Tell us what you’re building and where AI is letting you down. We’ll reply within one working day.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="contact__ctas">
            <Button href={`mailto:${EMAIL}`}>{EMAIL}</Button>
            <Button href={WHATSAPP} variant="glass" external>
              WhatsApp
            </Button>
          </div>
        </Reveal>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer__card glass">
            <div className="footer__grid">
              <div>
                <Wordmark />
                <p className="muted" style={{ maxWidth: 308, marginTop: 18 }}>
                  AI creative design &amp; engineering studio, based in Palestine.
                </p>
              </div>
              <div>
                <h5 className="label">Studio</h5>
                <ul>
                  <li><a href={pageUrl('work')}>Work</a></li>
                  <li><a href={pageUrl('services')}>Services</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
              <div>
                <h5 className="label">Services</h5>
                <ul>
                  <li><a href={pageUrl('work') + '?c=branding'}>Brand identity</a></li>
                  <li><a href={pageUrl('work') + '?c=visuals'}>AI visuals &amp; video</a></li>
                  <li><a href={pageUrl('work') + '?c=websites'}>Websites</a></li>
                </ul>
              </div>
              <div>
                <h5 className="label">Social</h5>
                <ul>
                  <li><a href="#">Instagram</a></li>
                  <li><a href="#">LinkedIn</a></li>
                  <li><a href="#">Behance</a></li>
                </ul>
              </div>
            </div>
            <p className="footer__big" aria-hidden="true">Obzervo</p>
            {/* The name's Arabic companion: "a look", and also "a point of view". */}
            <p className="footer__word"><Ar>نظرة</Ar></p>
          </div>
          <div className="footer__bottom label">
            <span>© {new Date().getFullYear()} <BrandWord /></span>
            <span>We observe. We engineer. AI executes.</span>
          </div>
        </div>
      </footer>
    </section>
  )
}
