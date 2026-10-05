import SEO, { breadcrumbSchema } from '../components/SEO'
import '../styles/privacy.css'

const EFFECTIVE_DATE = 'October 5, 2026'
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
              xysq ("we", "us", "our") is a context platform for AI agents and teams. We run the
              website at <strong>xysq.ai</strong>, the app at <strong>app.xysq.ai</strong>, and the
              API at <strong>api.xysq.ai</strong>. To
              contact us about privacy, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </Section>

          <Section n="2" title="What We Collect">
            <Subsection title="Information you provide">
              <ul>
                <li><strong>Memories</strong>, the text content you or your AI agents store through xysq.</li>
                <li><strong>Files and images</strong> you upload, and images you attach in a chat.</li>
                <li><strong>WhatsApp messages and your phone number</strong>, if you use the WhatsApp agent, including any chat history you choose to import.</li>
                <li><strong>Email and calendar content</strong>, only if you connect Gmail or Google Calendar.</li>
                <li><strong>Public LinkedIn, X, and website content</strong> you choose to import.</li>
                <li><strong>Account information</strong>, your email address and display name, provided when you sign in through Auth0 (for example with Google).</li>
                <li><strong>Profile data</strong>, optional fields you choose to fill in: your role, company, focus, location, and preferences.</li>
              </ul>
            </Subsection>
            <Subsection title="Information generated automatically">
              <ul>
                <li><strong>Activity logs</strong>, which agents accessed which memories and when (used for your dashboard, not for advertising).</li>
                <li><strong>API tokens</strong>, stored as one-way SHA-256 hashes; the raw token is shown to you once and never stored in plain text.</li>
                <li><strong>Usage metadata</strong>, memory counts, timestamps, and tags attached to memories.</li>
                <li><strong>Request logs</strong>, the time, the action called, your user ID, and your IP address for each request to our API.</li>
                <li><strong>Website analytics</strong>, our marketing site (xysq.ai) uses Google Analytics and the Apollo.io website tracker to understand visits to the site. The xysq app (app.xysq.ai) loads no analytics trackers.</li>
              </ul>
            </Subsection>
            <Subsection title="What we do NOT collect">
              <ul>
                <li>We do not take payments today, so we hold no payment information.</li>
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
              <li>Sending account emails (such as invites and contact requests) and occasional product emails. Every product email has an unsubscribe link.</li>
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
                <tr><td>Amazon Web Services (AWS)</td><td>Our main host: servers, search index, and your wiki files (EC2); the AI models that read your content (Bedrock); daily backups of your vault and uploads (S3)</td><td>All of your content</td></tr>
                <tr><td>Supabase</td><td>Database</td><td>Your account and profile, the text you save and upload, your wiki's facts and quotes, chats, WhatsApp history, and request logs (with IP address)</td></tr>
                <tr><td>Google Cloud</td><td>Hosts the app's web pages (Cloud Run); reads images you attach in a chat and indexes your text for search (Vertex AI)</td><td>Web requests to the app (with IP address), images you attach, and the text of your memories</td></tr>
                <tr><td>Auth0 (Okta)</td><td>Sign-in and identity, including Sign in with Google</td><td>Email, name, and the identity of the account you sign in with</td></tr>
                <tr><td>Meta (WhatsApp Cloud API)</td><td>The WhatsApp agent, if you use it</td><td>Your phone number, messages, media you send, and chat history you import</td></tr>
                <tr><td>Composio</td><td>Gmail and Google Calendar actions, only if you connect them</td><td>Access to your Gmail and Calendar, and the email and calendar content the agent reads or writes</td></tr>
                <tr><td>LlamaIndex (LlamaParse)</td><td>Reads the text in PDFs you upload</td><td>The full PDF file</td></tr>
                <tr><td>Resend</td><td>Sends our emails</td><td>Email addresses, names, and the content of the email</td></tr>
                <tr><td>Mindcase</td><td>Imports public LinkedIn and X profiles and posts you ask us to import</td><td>Profile URLs and handles</td></tr>
                <tr><td>Google Analytics</td><td>Visit statistics for xysq.ai (marketing site only)</td><td>Pages you view and details about your browser and device</td></tr>
                <tr><td>Apollo.io</td><td>Website visitor tracker on xysq.ai (marketing site only)</td><td>Pages you view and your IP address</td></tr>
              </tbody>
            </table>
            <p>
              Your data is stored mainly in the USA (AWS, us-east-1) and Japan (Supabase, Tokyo).
              Google's Vertex AI processing runs in US regions. A few AI requests on AWS Bedrock use
              AWS global routing and can be processed in another AWS region.
            </p>
            <p>
              If you connect your own AI client (ChatGPT, Claude, or another) to xysq over MCP, what
              that client sends and receives is also governed by that provider's privacy policy.
            </p>
          </Section>

          <Section n="5" title="Data Retention">
            <ul>
              <li><strong>Memories</strong>, kept until you delete them or close your account. Deleting a source removes it and the lines drawn from it, but earlier copies can remain in your vault's version history and in our backups. Email us to erase those too.</li>
              <li><strong>Activity logs</strong>, kept as long as your vault exists.</li>
              <li><strong>Request logs</strong> (including IP address), deleted after 30 days. Error logs are deleted after 90 days.</li>
              <li><strong>Account data</strong>, deleted within 30 days of account closure.</li>
            </ul>
          </Section>

          <Section n="6" title="Your Rights &amp; Controls">
            <p>You have full control over your data at all times:</p>
            <ul>
              <li><strong>Access</strong>, view all stored memories from your dashboard.</li>
              <li><strong>Edit</strong>, update or correct the text you saved. Files such as PDFs can't be edited, but you can delete them and upload a new version.</li>
              <li><strong>Delete</strong>, remove any source you saved from your vault. To wipe your whole vault, email us.</li>
              <li><strong>Export</strong>, request a full export of your data by emailing us.</li>
              <li><strong>Revoke access</strong>, delete a key on the Keys page and it stops working. Disconnect Gmail or Google Calendar on the Apps page and the agent can no longer act through them.</li>
              <li><strong>Close account</strong>, email us and we will delete your account and all associated data.</li>
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
              <li>All data is encrypted in transit (TLS). Data held by Supabase and our backups on AWS S3 are encrypted at rest by those providers.</li>
              <li>API tokens are stored as one-way SHA-256 hashes, we cannot recover your raw token.</li>
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
