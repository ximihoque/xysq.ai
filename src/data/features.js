// Feature page configs — drive /features/:slug pages.
//
// Each feature carries a primary tone (used by the eyebrow, headline accent,
// CTAs) plus a 4-tone palette ('violet', 'mint', 'amber', 'blue') used to
// rotate accents across the How-it-works steps and the Why-cards. The CSS
// resolves these tones via `data-tone` attributes.

const APP_URL = import.meta.env.VITE_APP_URL || 'https://app.xysq.ai'

export const FEATURE_PAGES = {
  organise: {
    slug: 'organise',
    title: 'Organise',
    primaryTone: 'violet',
    eyebrow: 'Introducing Organise',
    headline: { lead: 'Your documents, finally', accent: 'answering back.' },
    deck: 'Upload your documents, data, and images. Ask questions across all of them — using any AI tool you’re connected to, or our native chat.',
    primaryCta:   { label: 'Get started free', href: APP_URL, external: true },
    secondaryCta: { label: 'See a demo',       href: '#fp-how' },
    personas: ['Researchers', 'Legal teams', 'Healthcare', 'Analysts', 'Enterprises'],
    steps: [
      { id: 'upload',   icon: 'Upload',          tone: 'violet', title: 'Upload',   desc: 'Docs, PDFs, spreadsheets, images.' },
      { id: 'organise', icon: 'LayoutGrid',      tone: 'mint',   title: 'Organise', desc: 'Everything indexed, searchable.' },
      { id: 'ask',      icon: 'MessageCircle',   tone: 'amber',  title: 'Ask',      desc: 'Chat with any AI you’re connected to.' },
      { id: 'discover', icon: 'Sparkles',        tone: 'blue',   title: 'Discover', desc: 'Instant answers from your own files.' },
    ],
    benefits: [
      { id: 'no-hunting',  icon: 'Search',     tone: 'violet', title: 'No more hunting',    body: 'Stop scrolling through folders. Just ask, and get the exact answer — with its source.' },
      { id: 'any-ai',      icon: 'BrainCog',   tone: 'mint',   title: 'Any AI, your choice', body: 'Use Claude, GPT, Gemini — or any tool you’re already connected to. Or our native Chat.' },
      { id: 'private',     icon: 'Lock',       tone: 'amber',  title: 'Your data, private', body: 'Your documents never leave your vault. Encrypted, scoped, never trained on.' },
      { id: 'all-formats', icon: 'Files',      tone: 'blue',   title: 'All formats welcome', body: 'PDFs, Word docs, spreadsheets, images — Organise handles them all.' },
    ],
    testimonial: {
      quote: 'I had 400 case files on my laptop. Finding a specific clause used to mean opening ten documents. Now I just ask.',
      attribution: 'Legal counsel, mid-size firm',
    },
    finalCta: {
      headline: 'Ready to stop searching and start finding?',
      subtext: 'Join researchers, lawyers, and analysts who’ve made their files finally useful.',
      label: 'Start for free',
      href: APP_URL,
    },
    seo: {
      description: 'Upload your documents, data, and images into xysq Organise. Ask questions across all of them from Claude, ChatGPT, Gemini, or xysq’s native chat.',
    },
  },

  memory: {
    slug: 'memory',
    title: 'Memory',
    primaryTone: 'cyan',
    eyebrow: 'Introducing Memory',
    headline: { lead: 'Context that follows you,', accent: 'everywhere.' },
    deck: 'Capture decisions, preferences, and conversations once. Surface them in any AI tool you connect — Claude, ChatGPT, Cursor, Gemini, or xysq’s native chat.',
    primaryCta:   { label: 'Get started free', href: APP_URL, external: true },
    secondaryCta: { label: 'See how it works', href: '#fp-how' },
    personas: ['Students', 'Researchers', 'Founders', 'Developers', 'Knowledge workers'],
    steps: [
      { id: 'capture',  icon: 'Brain',         tone: 'cyan',   title: 'Capture',   desc: 'Conversations, decisions, preferences — saved as you work.' },
      { id: 'index',    icon: 'Network',       tone: 'mint',   title: 'Index',     desc: 'Structured, queryable, consent-gated.' },
      { id: 'surface',  icon: 'Sparkles',      tone: 'amber',  title: 'Surface',   desc: 'The right context, in the right tool, at the right moment.' },
      { id: 'compound', icon: 'TrendingUp',    tone: 'blue',   title: 'Compound',  desc: 'The longer it runs, the smarter your AI gets.' },
    ],
    benefits: [
      { id: 'one-mind',   icon: 'BrainCog',     tone: 'cyan',   title: 'One memory, every model',  body: 'Switch between Claude, ChatGPT, Cursor, Gemini — your context comes with you.' },
      { id: 'consent',    icon: 'ShieldCheck',  tone: 'mint',   title: 'Consent-first by design',  body: 'You decide what crosses agents. We never train on your memory.' },
      { id: 'no-restate', icon: 'Repeat2',      tone: 'amber',  title: 'No more re-explaining',    body: 'Decisions made yesterday show up unprompted in tomorrow’s chat.' },
      { id: 'compounds',  icon: 'TrendingUp',   tone: 'blue',   title: 'Compounds over time',      body: 'Patterns emerge, preferences sharpen — without retraining anything.' },
    ],
    testimonial: {
      quote: 'I stopped re-introducing myself to every new chat. Claude, Cursor, ChatGPT — they all already know my project, my stack, my decisions.',
      attribution: 'Staff engineer, growth-stage startup',
    },
    finalCta: {
      headline: 'Stop starting over.',
      subtext: 'One memory across every AI tool you use — and the next one you’ll try.',
      label: 'Start for free',
      href: APP_URL,
    },
    seo: {
      description: 'Capture context once, surface it in any AI tool. xysq Memory keeps your decisions, preferences, and conversations queryable from Claude, ChatGPT, Cursor, Gemini, or our native chat.',
    },
  },

  teams: {
    slug: 'teams',
    title: 'Teams',
    primaryTone: 'amber',
    eyebrow: 'Introducing Teams',
    headline: { lead: 'Shared memory for', accent: 'shared work.' },
    deck: 'Onboarding takes hours, not weeks. Institutional knowledge survives turnover. Every teammate’s AI starts with the same context — consent-gated, never trained on.',
    primaryCta:   { label: 'Bring it to your team', href: '/contact' },
    secondaryCta: { label: 'How it works',          href: '#fp-how' },
    personas: ['Engineering', 'Marketing', 'Sales', 'Operations', 'Founders'],
    steps: [
      { id: 'invite', icon: 'UserPlus',  tone: 'amber',  title: 'Invite',   desc: 'Bring your team or org into a shared vault.' },
      { id: 'scope',  icon: 'Layers',    tone: 'violet', title: 'Scope',    desc: 'Personal, team, or business — explicit by default.' },
      { id: 'share',  icon: 'Handshake', tone: 'mint',   title: 'Share',    desc: 'Consent-gated cross-context for every member.' },
      { id: 'sync',   icon: 'RefreshCw', tone: 'blue',   title: 'Sync',     desc: 'Every member, every tool, the same source of truth.' },
    ],
    benefits: [
      { id: 'onboard',     icon: 'GraduationCap', tone: 'amber',  title: 'Onboarding, in one prompt',    body: 'New hires start with the same context senior staff carry. The "ask Maya" tax disappears.' },
      { id: 'continuity',  icon: 'GitMerge',      tone: 'violet', title: 'Knowledge survives turnover',  body: 'Decisions, playbooks, and customer truth stay — even when people move on.' },
      { id: 'consent',     icon: 'ShieldCheck',   tone: 'mint',   title: 'Consent-gated by default',     body: 'Personal stays personal. Team-scoped stays scoped. Nothing leaks.' },
      { id: 'every-tool',  icon: 'Workflow',      tone: 'blue',   title: 'Every tool, every teammate',   body: 'Claude, ChatGPT, Gemini, Cursor — and the next tool — all draw from one source.' },
    ],
    testimonial: {
      quote: 'New eng hires used to take three weeks to ramp. Now their first chat with Claude already knows our codebase decisions and gotchas.',
      attribution: 'CTO, mid-stage SaaS company',
    },
    finalCta: {
      headline: 'Bring memory to your team.',
      subtext: 'Talk to us about rolling xysq out across your org — consent-first, security-reviewed, audit-ready.',
      label: 'Book a call',
      href: '/contact',
    },
    seo: {
      description: 'xysq Teams gives every member of your org the same context across every AI tool — consent-gated, never trained on. Onboarding in hours, not weeks.',
    },
  },
}

export const FEATURE_SLUGS = Object.keys(FEATURE_PAGES)
