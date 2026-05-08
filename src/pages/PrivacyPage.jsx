import SEO, { breadcrumbSchema } from '../components/SEO'
import '../styles/privacy.css'

const EFFECTIVE_DATE = 'April 6, 2026'
const CONTACT_EMAIL = 'privacy@xysq.ai'

export default function PrivacyPage() {
  return (
    <div className="pp-root">
      <SEO
        title="Privacy Policy"
        path="/privacy"
        description="How xysq collects, protects, and gives you control over your memories. We don't sell data and don't train AI on your content."
        schema={breadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Privacy Policy', item: '/privacy' },
        ])}
      />
      <div className="pp-wrap">
        <header className="pp-header">
          <a href="/" className="pp-logo">xysq<span>.ai</span></a>
          <h1>Privacy Policy</h1>
          <p className="pp-meta">Effective date: {EFFECTIVE_DATE}</p>
        </header>

        <section className="pp-intro">
          <p>
            xysq is built on a simple belief: your memory belongs to you. This policy explains what
            data we collect, why we collect it, how we protect it, and the controls you have over it.
            We do not sell your data. We do not use your memories to train AI models. Everything you
            store stays yours.
          </p>
        </section>

        <div className="pp-body">

          <Section n="1" title="Who We Are">
            <p>
              xysq ("we", "us", "our") is a consent-first memory layer for AI agents. We operate the
              service at <strong>xysq.ai</strong> and the API at <strong>api.xysq.ai</strong>. To
              contact us about privacy, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </Section>

          <Section n="2" title="What We Collect">
            <Subsection title="Information you provide">
              <ul>
                <li><strong>Memories</strong> — the text content you or your AI agents store through xysq.</li>
                <li><strong>Account information</strong> — your email address and display name, provided via Auth0 login (email/password or Google).</li>
                <li><strong>Profile data</strong> — optional fields you choose to fill in: occupation, location, bio, and social links.</li>
              </ul>
            </Subsection>
            <Subsection title="Information generated automatically">
              <ul>
                <li><strong>Activity logs</strong> — which agents accessed which memories and when (used for your dashboard, not for advertising).</li>
                <li><strong>API tokens</strong> — stored as one-way SHA-256 hashes; the raw token is shown to you once and never stored in plain text.</li>
                <li><strong>Usage metadata</strong> — memory counts, timestamps, and tags attached to memories.</li>
              </ul>
            </Subsection>
            <Subsection title="What we do NOT collect">
              <ul>
                <li>We do not use cookies for tracking or advertising.</li>
                <li>We do not collect payment information directly (Stripe handles billing if applicable).</li>
                <li>We do not read or analyse your memory content for advertising purposes.</li>
              </ul>
            </Subsection>
          </Section>

          <Section n="3" title="How We Use Your Data">
            <p>We use your data solely to operate and improve the xysq service:</p>
            <ul>
              <li>Storing, indexing, and retrieving your memories on demand.</li>
              <li>Authenticating you and your connected AI agents.</li>
              <li>Displaying activity and usage statistics on your dashboard.</li>
              <li>Enforcing memory quotas and plan limits.</li>
              <li>Sending transactional emails (account-related only — no marketing without explicit opt-in).</li>
              <li>Diagnosing errors and improving reliability.</li>
            </ul>
            <p className="pp-strong">We never sell your data, share it with advertisers, or use your memories to train AI models.</p>
          </Section>

          <Section n="4" title="Third-Party Services">
            <p>We use the following sub-processors to operate xysq. Each is contractually bound to protect your data:</p>
            <table className="pp-table">
              <thead>
                <tr><th>Provider</th><th>Purpose</th><th>Data shared</th></tr>
              </thead>
              <tbody>
                <tr><td>Auth0 (Okta)</td><td>Authentication &amp; identity</td><td>Email, name</td></tr>
                <tr><td>Supabase</td><td>Database (sessions, profiles, logs)</td><td>User ID, activity metadata</td></tr>
                <tr><td>Google Cloud Platform</td><td>Hosting &amp; infrastructure</td><td>All data at rest (encrypted)</td></tr>
                <tr><td>OpenAI (ChatGPT)</td><td>Optional GPT integration</td><td>Memory content you store via the GPT</td></tr>
              </tbody>
            </table>
            <p>
              When you use xysq via the ChatGPT Custom GPT, your conversation passes through OpenAI's
              systems. Please review{' '}
              <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noreferrer">
                OpenAI's Privacy Policy
              </a>{' '}
              for how they handle conversation data.
            </p>
          </Section>

          <Section n="5" title="Data Retention">
            <ul>
              <li><strong>Memories</strong> — retained until you delete them or close your account.</li>
              <li><strong>Activity logs</strong> — retained for 12 months, then automatically purged.</li>
              <li><strong>Device sessions</strong> — expired sessions are pruned hourly.</li>
              <li><strong>Account data</strong> — deleted within 30 days of account closure.</li>
            </ul>
          </Section>

          <Section n="6" title="Your Rights &amp; Controls">
            <p>You have full control over your data at all times:</p>
            <ul>
              <li><strong>Access</strong> — view all stored memories from your dashboard.</li>
              <li><strong>Edit</strong> — update or correct any memory at any time.</li>
              <li><strong>Delete</strong> — remove individual memories or all memories at once.</li>
              <li><strong>Export</strong> — request a full export of your data by emailing us.</li>
              <li><strong>Revoke agent access</strong> — disconnect any AI agent from the Connected Agents page; that agent immediately loses access to your memory.</li>
              <li><strong>Close account</strong> — permanently delete your account and all associated data from Settings.</li>
            </ul>
            <p>
              If you are in the European Economic Area (EEA) or the UK, you also have rights under GDPR
              including the right to restriction of processing and the right to lodge a complaint with
              your local supervisory authority. If you are in California, you have rights under the CCPA
              including the right to know, delete, and opt out of sale (we do not sell data).
            </p>
          </Section>

          <Section n="7" title="Security">
            <p>
              We apply industry-standard security measures to protect your data:
            </p>
            <ul>
              <li>All data is encrypted in transit (TLS 1.2+) and at rest (AES-256 via GCP).</li>
              <li>API tokens are stored as one-way SHA-256 hashes — we cannot recover your raw token.</li>
              <li>Authentication is handled by Auth0 with RS256-signed JWTs.</li>
              <li>Access to production systems is restricted to authorised personnel only.</li>
            </ul>
            <p>
              If you discover a security vulnerability, please disclose it responsibly to{' '}
              <a href="mailto:security@xysq.ai">security@xysq.ai</a>.
            </p>
          </Section>

          <Section n="8" title="Children's Privacy">
            <p>
              xysq is not directed at children under 13. We do not knowingly collect personal
              information from children. If you believe a child has provided us with personal data,
              contact us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will delete it promptly.
            </p>
          </Section>

          <Section n="9" title="Changes to This Policy">
            <p>
              We may update this policy from time to time. When we do, we will update the effective
              date at the top and, for material changes, notify you via email or an in-app notice. Your
              continued use of xysq after changes take effect constitutes acceptance of the updated
              policy.
            </p>
          </Section>

          <Section n="10" title="Contact Us">
            <p>
              For privacy questions, data requests, or to exercise your rights, contact us at:
            </p>
            <p className="pp-contact">
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
            <p>We respond to all privacy requests within 30 days.</p>
          </Section>

        </div>

        <footer className="pp-footer">
          <a href="/">← Back to xysq.ai</a>
          <span>© 2026 xysq.ai</span>
        </footer>
      </div>
    </div>
  )
}

function Section({ n, title, children }) {
  return (
    <div className="pp-section">
      <h2><span className="pp-n">{n}.</span> {title}</h2>
      {children}
    </div>
  )
}

function Subsection({ title, children }) {
  return (
    <div className="pp-subsection">
      <h3>{title}</h3>
      {children}
    </div>
  )
}
