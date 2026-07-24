import { ArrowDown, Check, X } from 'lucide-react'
import '../styles/whitepaper.css'

// one correction, walked end to end. Shared by the whitepaper and the
// homepage engine section, so the story stays identical in both places.
export default function CorrectionFigure() {
  return (
    <figure className="wp-fig" role="img" aria-label="A correction walked end to end: the correction becomes a supersession event, one gated run closes the old fact, updates every hosting page and downweights stale chunks, and the next query serves the corrected state">
      <div className="wp-fig-quote">
        <span className="wp-fig-quote-mark">"</span>
        We deprecated the v2 endpoint in March; everything routes through v3 now.
        <span className="wp-fig-tag">targeted correction</span>
      </div>
      <span className="wp-fig-arrow"><ArrowDown size={13} strokeWidth={2} /> one gated run</span>
      <div className="wp-fig-steps">
        <span>old fact closed<br /><em>supersession event</em></span>
        <span>every hosting page updated<br /><em>enumerated, not sampled</em></span>
        <span>stale chunks downweighted<br /><em>retrieval retuned</em></span>
      </div>
      <span className="wp-fig-arrow"><ArrowDown size={13} strokeWidth={2} /> next query</span>
      <div className="wp-fig-ba">
        <span className="wp-fig-ba-row wp-fig-ba-row--before">
          <X size={13} strokeWidth={2.2} />
          "Route traffic through the v2 endpoint."
        </span>
        <span className="wp-fig-ba-row wp-fig-ba-row--after">
          <Check size={13} strokeWidth={2.2} />
          "v2 was deprecated in March. Route through v3."
        </span>
      </div>
      <figcaption className="wp-fig-caption">Applied now. Visible on the next query. Attributable forever.</figcaption>
    </figure>
  )
}
