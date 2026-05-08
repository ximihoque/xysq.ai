// Single source of truth for use-case categories. Drives the Use Cases nav
// dropdown and the four /use-cases/* category pages.
//
// Each persona has a `nudge` — a short workflow vignette: a concrete chain
// of AI tools and the xysq feature(s) that hold the chain together.
//
// Within `body`, two inline tokens are recognised by the page renderer:
//   {tool:claude}     → bolded inline mention of the tool
//   {feature:organise}→ accent-coloured link to the feature's docs page
// `features` is an ordered list — the first entry drives the card's accent
// colour, and every entry renders as a pill in the card's footer.

export const USE_CASE_CATEGORIES = [
  {
    slug: 'productivity',
    title: 'Productivity',
    icon: 'Sparkles',
    eyebrow: 'For everyday work',
    headline: 'Your second brain,\nfinally working.',
    deck: 'Personal knowledge that compounds. Every note, paper, and conversation becomes recallable from any AI tool — without filing it twice.',
    personas: [
      {
        id: 'students',
        icon: 'GraduationCap',
        name: 'Students',
        body: 'Lectures, papers, notes — turned into knowledge you can ask any AI tool about. Cite what you read last semester without digging through Drive.',
        nudge: {
          label: 'When credits run out',
          body: 'Burning credits halfway through finals? Draft in {tool:claude}, finish the essay in {tool:chatgpt}, polish in {tool:gemini} — {feature:memory} keeps the context. When the credits run dry, fall back to {feature:chat} — same memory, no extra subscription.',
          tools: ['claude', 'chatgpt', 'gemini'],
          features: ['memory', 'chat'],
        },
      },
      {
        id: 'individuals',
        icon: 'User',
        name: 'Individuals',
        body: 'Your personal second brain. Conversations, ideas, decisions — never forgotten, always queryable from Claude, ChatGPT, or whatever you use next.',
        nudge: {
          label: 'Your second brain, plural',
          body: 'Brain-dump a project in {tool:claude} in the morning. Plan next steps in {tool:chatgpt} at night. Either tool remembers what you decided — because {feature:memory} does.',
          tools: ['claude', 'chatgpt'],
          features: ['memory'],
        },
      },
      {
        id: 'researchers',
        icon: 'FlaskConical',
        name: 'Researchers',
        body: 'Citations, experiments, hypotheses across years of work. Your AI agents know what you have already explored — and what is still open.',
        nudge: {
          label: 'Argue with your reading list',
          body: 'Drop your papers and reading notes into {feature:organise}. Argue with the lit right in {feature:chat} — every paper in scope — or take the same context to {tool:gemini} or {tool:claude} when you want a different voice.',
          tools: ['gemini', 'claude', 'chatgpt'],
          features: ['organise', 'chat'],
        },
      },
    ],
  },
  {
    slug: 'builders',
    title: 'Builders',
    icon: 'Hammer',
    eyebrow: 'For people shipping things',
    headline: 'Build agents that\ndo not forget.',
    deck: 'Memory for the things you build — and for the AI tools you build with. Architecture decisions, customer truth, and creative voice that travels across every model.',
    personas: [
      {
        id: 'developers',
        icon: 'Code2',
        name: 'Developers',
        body: 'Architecture decisions, gotchas, the why-we-did-it-this-way — every AI coding tool gets the full context. Stop re-explaining your stack on every new chat.',
        nudge: {
          label: 'Same brain, every IDE',
          body: 'Architect in {tool:claude}. Write in {tool:cursor}. Debug in {tool:codex}. The "why we did it this way" from the morning chat shows up unprompted in the afternoon refactor — that\'s {feature:memory} carrying the thread.',
          tools: ['claude', 'cursor', 'codex'],
          features: ['memory'],
        },
      },
      {
        id: 'founders',
        icon: 'Rocket',
        name: 'Founders',
        body: 'Product specs, customer interviews, fundraising notes — agents that actually know your company. Brief once, ask forever.',
        nudge: {
          label: 'Customer truth, on tap',
          body: 'Interview transcripts and product specs go into {feature:organise}. Interrogate them straight from {feature:chat}, then take the same context to {tool:claude} for the pitch deck or {tool:chatgpt} for the strategy doc.',
          tools: ['claude', 'chatgpt'],
          features: ['organise', 'chat'],
        },
      },
      {
        id: 'creators',
        icon: 'PenTool',
        name: 'Creators',
        body: 'Drafts, references, voice samples — AI that writes in your style because it remembers your style. Across tools, across projects.',
        nudge: {
          label: 'Your voice, remembered',
          body: 'Drafts, voice notes, references in {feature:organise}. {tool:claude} writes in your style, {tool:gemini} brainstorms in your aesthetic, and the next tool you try does not start cold.',
          tools: ['claude', 'gemini'],
          features: ['organise', 'memory'],
        },
      },
    ],
    showContextFlow: true,
  },
  {
    slug: 'collaboration',
    title: 'Collaboration',
    icon: 'Network',
    eyebrow: 'For teams',
    headline: 'Shared memory\nfor shared work.',
    deck: 'Onboarding takes hours, not weeks. Institutional knowledge survives turnover, model upgrades, and every new tool you adopt next.',
    personas: [
      {
        id: 'teams',
        icon: 'Users',
        name: 'Teams',
        body: 'Shared institutional memory. New hires plug into the same context as senior staff on day one — no more "ask Maya, she knows."',
        nudge: {
          label: 'Onboarding, in one prompt',
          body: 'Onboarding doc and decisions log in {feature:organise}, scoped via {feature:teams}. The new hire\'s first chat with {tool:claude} carries the same context a founder does.',
          tools: ['claude', 'chatgpt'],
          features: ['teams', 'organise'],
        },
      },
      {
        id: 'marketing',
        icon: 'Megaphone',
        name: 'Marketing',
        body: 'Campaigns, brand voice, what worked, what flopped. Every brief starts informed — not from a blank slate every Monday.',
        nudge: {
          label: 'Briefs that already sound like you',
          body: 'Last quarter\'s campaigns and the brand voice doc go into {feature:organise}. Shared via {feature:teams}, {tool:chatgpt} writes briefs the team does not have to re-edit.',
          tools: ['chatgpt', 'claude'],
          features: ['teams', 'organise'],
        },
      },
      {
        id: 'sales',
        icon: 'Target',
        name: 'Sales',
        body: 'Customer history, prior deals, objections already handled. Every call starts with full context — across the team, not just the rep on the account.',
        nudge: {
          label: 'Pre-call, pre-loaded',
          body: 'Call transcripts and objection-handling playbooks in {feature:organise}, shared via {feature:teams}. Each rep\'s pre-call brief from {tool:gemini} comes with the deal history already in scope.',
          tools: ['gemini', 'claude'],
          features: ['teams', 'organise'],
        },
      },
    ],
  },
  {
    slug: 'strategy',
    title: 'Strategy',
    icon: 'Target',
    eyebrow: 'For decision-makers',
    headline: 'Compound your\nthinking.',
    deck: 'Theses sharpen. Frameworks compound. Your AI agents stop being a fresh intern every week and start being the analyst who has been on the desk for years.',
    personas: [
      {
        id: 'investors',
        icon: 'LineChart',
        name: 'Investors',
        body: 'Theses, portfolio conversations, market signals. Compound your investing thinking across years — not just within one deal cycle.',
        nudge: {
          label: 'Steel-man your own thesis',
          body: 'A year of memos and reading notes in {feature:organise}. Ask {tool:claude} to argue against your latest thesis — with every data point you have already collected, surfaced by {feature:memory}.',
          tools: ['claude', 'gemini'],
          features: ['organise', 'memory'],
        },
      },
      {
        id: 'analysts',
        icon: 'BarChart3',
        name: 'Analysts',
        body: 'Research notes, models, reports. Your AI knows the analysis behind the numbers — not just the latest data point.',
        nudge: {
          label: 'See it all at once',
          body: 'Models, transcripts, and prior research in {feature:organise}. {tool:chatgpt} spots the pattern you missed because {feature:memory} can hold the whole desk in scope.',
          tools: ['chatgpt', 'claude'],
          features: ['organise', 'memory'],
        },
      },
      {
        id: 'advisors',
        icon: 'Compass',
        name: 'Advisors',
        body: 'Client engagements, frameworks, IP. Context that follows you from one engagement to the next — without copy-pasting decks.',
        nudge: {
          label: 'Your IP travels',
          body: 'Frameworks and prior engagement notes in {feature:organise}. New client, new context — but {feature:memory} carries your thinking with you, not the data.',
          tools: ['claude', 'chatgpt'],
          features: ['memory', 'organise'],
        },
      },
    ],
  },
]

export const USE_CASE_BY_SLUG = Object.fromEntries(
  USE_CASE_CATEGORIES.map((c) => [c.slug, c])
)

// Tool ID → display info (logo path + display name). Used by the nudge cards.
export const TOOLS = {
  claude:      { name: 'Claude',      logo: '/logos/claude.svg' },
  chatgpt:     { name: 'ChatGPT',     logo: '/logos/chatgpt.svg' },
  cursor:      { name: 'Cursor',      logo: '/logos/cursor.svg' },
  gemini:      { name: 'Gemini',      logo: '/logos/gemini-c.svg' },
  codex:       { name: 'Codex',       logo: '/logos/openai.svg' },
  windsurf:    { name: 'Windsurf',    logo: '/logos/windsurf.svg' },
  zed:         { name: 'Zed',         logo: '/logos/zed.svg' },
  antigravity: { name: 'Antigravity', logo: '/logos/antigravity.svg' },
}

// Feature ID → display name + landing URL. Internal feature pages live at
// /features/:slug; Chat doesn't have a dedicated marketing page yet so it
// links to the docs site. Accent colours are wired in CSS via data-feature
// attributes on the rendered pill / inline link.
export const FEATURES = {
  memory:   { name: 'Memory',   docsHref: '/features/memory'                       },
  teams:    { name: 'Teams',    docsHref: '/features/teams'                        },
  organise: { name: 'Organise', docsHref: '/features/organise'                     },
  chat:     { name: 'Chat',     docsHref: 'https://docs.xysq.ai/features/chat'     },
}
