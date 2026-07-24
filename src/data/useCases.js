// Single source of truth for use cases. Drives the nav dropdown, the
// /use-cases/* pages, the footer column, and the prerender route list.
//
// Five cases: the three ICP functions (marketing, support, sales) plus
// personal and teams. Each page renders the same template:
// header -> the function's slice of the context lake -> what goes in ->
// the two faces (teams / AI builders) with an agent flow figure -> CTAs.

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
    seo: 'Marketing context graphs from your campaign retros, brand guidelines, and ad sessions. Your team briefs from them; your marketing agents draft from them.',
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
    seo: 'Support context graphs from your policies, product notes, and resolved conversations. Consistent answers for your team; support agents that improve with every correction.',
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
    seo: 'Sales context graphs from your pricing decisions, deals, and objection handling. Full-picture briefs for reps; sales copilots that learn your best practices.',
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
    seo: 'A personal context lake: your AI sessions and files become graphs only you control. Every tool you use starts knowing your context.',
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
    seo: 'One context lake for the whole team: share graphs on your terms, keep control, and keep the context when people move on.',
  },
]

export const USE_CASE_BY_SLUG = Object.fromEntries(
  USE_CASE_CATEGORIES.map((c) => [c.slug, c])
)
