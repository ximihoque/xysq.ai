// Single source of truth for use cases. Drives the nav dropdown, the
// /use-cases/* pages, the footer column, and the prerender route list.
//
// Five cases: the three ICP functions (marketing, support, sales) plus
// personal and teams. Each page renders the same template:
// header -> the function's slice of the context lake -> what goes in ->
// the two faces (teams / AI builders) with an agent flow figure -> CTAs.
//
// `relatedPosts` holds blog slugs (from src/content/blog/*.mdx) that are
// genuinely about that function. Only support and teams have real posts
// today; the rest are empty on purpose and render no block at all, because
// a "related reading" list padded with a generic post is worse than none.
// validate-posts.mjs fails the build on an unknown slug.
//
// `evidence` holds documented cases, each linking a PRIMARY document (the
// ruling, the regulator's own page) rather than coverage of it. Every entry
// here was checked against the source before it went in, and in a couple of
// places the wording is deliberately narrower than the popular retelling
// (see the comments). Sales and personal are empty because no case cleared
// that bar, and a page with no citation beats a page with a soft one.

export const USE_CASE_CATEGORIES = [
  {
    slug: 'marketing',
    title: 'Marketing',
    icon: 'Megaphone',
    eyebrow: 'Use case · Marketing',
    line: 'AI that understands your marketing playbooks.',
    h1: ['AI that understands', 'your marketing playbooks.'],
    deck: 'Campaign retros, brand guidelines, and ad sessions become marketing context graphs. Your team briefs from them. Your agents draft from them.',
    graphs: ['Campaigns', 'Brand voice', 'Competitors'],
    captures: ['campaign retros', 'brand guidelines', 'ad copy sessions', 'competitor notes'],
    teamFace: {
      label: 'For marketing teams',
      body: 'Every brief starts from what worked before. New campaigns inherit the voice, the lessons, and the numbers.',
    },
    builderFace: {
      label: 'For AI builders',
      body: 'Marketing agents that write in your brand voice and learn from every campaign you run.',
    },
    flow: { agent: 'Marketing agent', reads: ['Brand voice', 'Competitors'], writes: 'Campaigns' },
    hitl: {
      correction: 'We dropped the playful tone. Enterprise voice from now on.',
      result: 'Every future draft follows the new voice.',
    },
    seo: 'Marketing context graphs from your campaign retros, brand guidelines, and ad sessions. Your team briefs from them; your marketing agents draft from them.',
    relatedPosts: [],
    // Keep "fundamentally". CAP's position is bounded: they say disclosure
    // CAN help in other cases. Dropping the word turns a narrow statement
    // into an absolute one the regulator did not make.
    evidence: [
      {
        claim:
          'UK advertising rules put responsibility on the advertiser even where campaigns are “entirely generated or distributed using automated methods”, and the regulator’s position is that disclosure alone is very unlikely to mitigate the harm caused by a fundamentally misleading message. Saying an ad was AI-made does not substantiate the claim it makes.',
        source: 'CAP, Generative AI & Advertising (2023) and Disclosure of AI in Advertising (2025)',
        url: 'https://www.asa.org.uk/news/disclosure-of-ai-in-advertising-striking-the-balance-between-creativity-and-responsibility.html',
      },
    ],
  },
  {
    slug: 'support',
    title: 'Support',
    icon: 'Headset',
    eyebrow: 'Use case · Support',
    line: 'Support agents that improve with every resolved ticket.',
    h1: ['Support agents that improve', 'with every resolved ticket.'],
    deck: 'Policies, product notes, and resolved conversations become support context graphs. Your team answers consistently. Your agents stop repeating mistakes.',
    graphs: ['Policies', 'Resolved tickets', 'Product'],
    captures: ['policy docs', 'resolved conversations', 'product notes'],
    teamFace: {
      label: 'For support teams',
      body: 'One current answer per question. When a policy changes, every answer changes with it.',
    },
    builderFace: {
      label: 'For AI builders',
      body: 'Correct a support agent once and the fix applies to every future ticket. Not after a thousand more corrections.',
    },
    flow: { agent: 'Support agent', reads: ['Policies', 'Product'], writes: 'Resolved tickets' },
    hitl: {
      correction: 'Refunds over $500 now need manager approval.',
      result: 'Every future answer uses the new policy.',
    },
    seo: 'Support context graphs from your policies, product notes, and resolved conversations. Consistent answers for your team; support agents that improve with every correction.',
    relatedPosts: ['customer-support-memory-layer'],
    // NOTE on the Air Canada wording: the tribunal made no finding that the
    // chatbot was an LLM (para 14; the exchange predates ChatGPT), so we do
    // NOT call this an AI hallucination. What the decision does establish is
    // that one surface contradicted the authoritative page it linked to,
    // which is the failure we actually fix. Currency is CAD, and the
    // decision refers to Moffatt as "they".
    evidence: [
      {
        claim:
          'A Canadian tribunal ordered Air Canada to pay CA$812.02 after its website chatbot told a customer they could claim a bereavement fare after already travelling. The airline’s real policy said the opposite, on a page the chatbot’s own answer linked to. The tribunal rejected the argument that customers should have to check one part of a website against another.',
        source: 'Moffatt v. Air Canada, 2024 BCCRT 149',
        url: 'https://decisions.civilresolutionbc.ca/crt/crtd/en/item/525448/index.do',
      },
      {
        claim:
          'Cursor’s front-line support bot told users that logins were limited to one device per subscription. No such policy existed. Users were posting cancellations within about an hour; the co-founder’s correction landed three hours in.',
        source: 'Michael Truell, Cursor co-founder, on r/cursor',
        url: 'https://www.reddit.com/r/cursor/comments/1jyy5am/psa_cursor_now_restricts_logins_to_a_single/mn2vlbr/',
      },
    ],
  },
  {
    slug: 'sales',
    title: 'Sales',
    icon: 'Target',
    eyebrow: 'Use case · Sales',
    line: 'Sales copilots that learn your team’s best practices.',
    h1: ['Sales copilots that learn', 'your team’s best practices.'],
    deck: 'Pricing decisions, deals, and objection handling become sales context graphs. Every rep and every copilot starts with the full picture.',
    graphs: ['Pricing', 'Deals', 'Objections'],
    captures: ['call notes', 'pricing decisions', 'won and lost deals'],
    teamFace: {
      label: 'For sales teams',
      body: 'Every call starts with the deal history and the current pricing. No stale decks.',
    },
    builderFace: {
      label: 'For AI builders',
      body: 'Copilots that read pricing and product truth, and write what they learn back to the deals graph.',
    },
    flow: { agent: 'Sales copilot', reads: ['Pricing', 'Objections'], writes: 'Deals' },
    hitl: {
      correction: 'The starter plan is gone. Lead with the team plan.',
      result: 'Every future pitch leads with the team plan.',
    },
    seo: 'Sales context graphs from your pricing decisions, deals, and objection handling. Full-picture briefs for reps; sales copilots that learn your best practices.',
    relatedPosts: [],
    evidence: [],
  },
  {
    slug: 'personal',
    title: 'Personal',
    icon: 'User',
    eyebrow: 'Use case · Personal',
    line: 'Your own context lake.',
    h1: ['Your own', 'context lake.'],
    deck: 'Everything you work on with AI, kept. Your sessions and files become graphs only you control.',
    graphs: ['Projects', 'Notes', 'Decisions'],
    captures: ['AI sessions', 'files', 'things you save'],
    teamFace: {
      label: 'For you',
      body: 'Stop re-explaining yourself to every new chat. Every tool you use starts knowing your context.',
    },
    builderFace: {
      label: 'For AI builders',
      body: 'Your personal agents read your graphs and write back what they learn.',
    },
    flow: { agent: 'Your assistant', reads: ['Notes', 'Decisions'], writes: 'Projects' },
    hitl: {
      correction: 'I switched from Notion to Obsidian.',
      result: 'Every tool you use knows, from the next session.',
    },
    seo: 'A personal context lake: your AI sessions and files become graphs only you control. Every tool you use starts knowing your context.',
    relatedPosts: [],
    evidence: [],
  },
  {
    slug: 'teams',
    title: 'Teams',
    icon: 'Users',
    eyebrow: 'Use case · Teams',
    line: 'One lake for the whole team.',
    h1: ['One lake for', 'the whole team.'],
    deck: 'Personal knowledge becomes team knowledge, on your terms. Share graphs, keep control, and keep the context when people move on.',
    graphs: ['Team decisions', 'Projects', 'Playbooks'],
    captures: ['everyone’s sessions', 'shared files', 'decisions'],
    teamFace: {
      label: 'For teams',
      body: 'New members inherit the team’s context on day one. Nothing leaves when someone does.',
    },
    builderFace: {
      label: 'For AI builders',
      body: 'Team agents read the shared graphs and keep them current.',
    },
    flow: { agent: 'Team agent', reads: ['Projects', 'Playbooks'], writes: 'Team decisions' },
    hitl: {
      correction: 'We renamed Project Falcon to Atlas.',
      result: 'Every graph that mentioned Falcon is updated.',
    },
    seo: 'One context lake for the whole team: share graphs on your terms, keep control, and keep the context when people move on.',
    relatedPosts: ['when-your-star-employee-quits', 'give-your-ai-team-shared-memory'],
    // n=1, so this is an incident and never a rate. The hedges ("roughly",
    // "at least two") are the court's own words, not ours.
    evidence: [
      {
        claim:
          'A federal special master ordered two law firms to pay $31,100 jointly and severally after an AI-generated research outline was passed from one firm to the other and became a filed brief. Roughly 9 of its 27 citations were defective, and at least two of the authorities cited did not exist at all.',
        source: 'Lacey v. State Farm, C.D. Cal., order of 6 May 2025',
        url: 'https://storage.courtlistener.com/recap/gov.uscourts.cacd.930490/gov.uscourts.cacd.930490.119.0.pdf',
      },
    ],
  },
]

export const USE_CASE_BY_SLUG = Object.fromEntries(
  USE_CASE_CATEGORIES.map((c) => [c.slug, c])
)
