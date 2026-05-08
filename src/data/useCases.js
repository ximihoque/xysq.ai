// Single source of truth for use-case categories. Drives the Use Cases nav
// dropdown and the four /use-cases/* category pages.

export const USE_CASE_CATEGORIES = [
  {
    slug: 'productivity',
    title: 'Productivity',
    eyebrow: 'For everyday work',
    headline: 'Your second brain,\nfinally working.',
    deck: 'Personal knowledge that compounds. Every note, paper, and conversation becomes recallable from any AI tool — without filing it twice.',
    personas: [
      {
        id: 'students',
        icon: 'GraduationCap',
        name: 'Students',
        body: 'Lectures, papers, notes — turned into knowledge you can ask any AI tool about. Cite what you read last semester without digging through Drive.',
      },
      {
        id: 'individuals',
        icon: 'User',
        name: 'Individuals',
        body: 'Your personal second brain. Conversations, ideas, decisions — never forgotten, always queryable from Claude, ChatGPT, or whatever you use next.',
      },
      {
        id: 'researchers',
        icon: 'FlaskConical',
        name: 'Researchers',
        body: 'Citations, experiments, hypotheses across years of work. Your AI agents know what you have already explored — and what is still open.',
      },
    ],
  },
  {
    slug: 'builders',
    title: 'Builders',
    eyebrow: 'For people shipping things',
    headline: 'Build agents that\ndo not forget.',
    deck: 'Memory for the things you build — and for the AI tools you build with. Architecture decisions, customer truth, and creative voice that travels across every model.',
    personas: [
      {
        id: 'developers',
        icon: 'Code2',
        name: 'Developers',
        body: 'Architecture decisions, gotchas, the why-we-did-it-this-way — every AI coding tool gets the full context. Stop re-explaining your stack on every new chat.',
      },
      {
        id: 'founders',
        icon: 'Rocket',
        name: 'Founders',
        body: 'Product specs, customer interviews, fundraising notes — agents that actually know your company. Brief once, ask forever.',
      },
      {
        id: 'creators',
        icon: 'PenTool',
        name: 'Creators',
        body: 'Drafts, references, voice samples — AI that writes in your style because it remembers your style. Across tools, across projects.',
      },
    ],
    showContextFlow: true,
  },
  {
    slug: 'collaboration',
    title: 'Collaboration',
    eyebrow: 'For teams',
    headline: 'Shared memory\nfor shared work.',
    deck: 'Onboarding takes hours, not weeks. Institutional knowledge survives turnover, model upgrades, and every new tool you adopt next.',
    personas: [
      {
        id: 'teams',
        icon: 'Users',
        name: 'Teams',
        body: 'Shared institutional memory. New hires plug into the same context as senior staff on day one — no more "ask Maya, she knows."',
      },
      {
        id: 'marketing',
        icon: 'Megaphone',
        name: 'Marketing',
        body: 'Campaigns, brand voice, what worked, what flopped. Every brief starts informed — not from a blank slate every Monday.',
      },
      {
        id: 'sales',
        icon: 'Target',
        name: 'Sales',
        body: 'Customer history, prior deals, objections already handled. Every call starts with full context — across the team, not just the rep on the account.',
      },
    ],
  },
  {
    slug: 'strategy',
    title: 'Strategy',
    eyebrow: 'For decision-makers',
    headline: 'Compound your\nthinking.',
    deck: 'Theses sharpen. Frameworks compound. Your AI agents stop being a fresh intern every week and start being the analyst who has been on the desk for years.',
    personas: [
      {
        id: 'investors',
        icon: 'LineChart',
        name: 'Investors',
        body: 'Theses, portfolio conversations, market signals. Compound your investing thinking across years — not just within one deal cycle.',
      },
      {
        id: 'analysts',
        icon: 'BarChart3',
        name: 'Analysts',
        body: 'Research notes, models, reports. Your AI knows the analysis behind the numbers — not just the latest data point.',
      },
      {
        id: 'advisors',
        icon: 'Compass',
        name: 'Advisors',
        body: 'Client engagements, frameworks, IP. Context that follows you from one engagement to the next — without copy-pasting decks.',
      },
    ],
  },
]

export const USE_CASE_BY_SLUG = Object.fromEntries(
  USE_CASE_CATEGORIES.map((c) => [c.slug, c])
)
