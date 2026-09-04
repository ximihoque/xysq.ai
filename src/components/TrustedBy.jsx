import { BRAND_PATHS } from './brandPaths'
import '../styles/trusted-by.css'

// where the people building this have shipped before. `box` crops the
// 24x24 mark to the band a wordmark actually occupies, so it renders at
// text height instead of as a mostly-empty square. Myntra has no open
// vector mark; its M is a masked PNG rebuilt from the bitmap on Commons,
// so it recolours like the svgs.
const ITEMS = [
  { name: 'AWS', mark: 'aws', box: '0 3.4 24 16', wordmark: true },
  { name: 'Google', mark: 'google' },
  { name: 'Flipkart', mark: 'flipkart' },
  { name: 'Myntra', img: '/marks/myntra.png' },
  { name: 'Uber', mark: 'uber', box: '0 7.6 24 8.8', wordmark: true },
  { name: 'Oracle', mark: 'oracle' },
]

export default function TrustedBy() {
  return (
    <section className="tb" aria-label="Trusted by the engineers from">
      <div className="tb-inner">
        <p className="tb-label">Trusted by the engineers from</p>
        <ul className="tb-row">
          {ITEMS.map((it) => (
            <li className={`tb-item ${it.wordmark ? 'is-wordmark' : ''} is-${it.name.toLowerCase()}`} key={it.name}>
              {it.img && <span className="tb-mark mark-img" style={{ maskImage: `url(${it.img})`, WebkitMaskImage: `url(${it.img})` }} aria-hidden="true" />}
              {it.mark && (
                <svg className="tb-mark" viewBox={it.box ?? '0 0 24 24'} aria-hidden={it.wordmark ? undefined : 'true'} role={it.wordmark ? 'img' : undefined}>
                  {it.wordmark && <title>{it.name}</title>}
                  <path d={BRAND_PATHS[it.mark]} fill="currentColor" />
                </svg>
              )}
              {!it.wordmark && <span className="tb-name">{it.name}</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
