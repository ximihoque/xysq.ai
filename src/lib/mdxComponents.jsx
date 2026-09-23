import { Callout } from '../components/mdx/Callout'
import { Figure } from '../components/mdx/Figure'
import { PullQuote } from '../components/mdx/PullQuote'
import { RankBars } from '../components/mdx/RankBars'
import { StepBars } from '../components/mdx/StepBars'
import { Twin } from '../components/mdx/Twin'
import { Verdict } from '../components/mdx/Verdict'

export const mdxComponents = {
  Callout,
  Figure,
  // field-notes figures, styled only inside a `layout: "field-notes"` post
  PullQuote,
  StepBars,
  Twin,
  RankBars,
  Verdict,
  // Could override default tags here later (e.g. custom <a>, <pre>).
}
