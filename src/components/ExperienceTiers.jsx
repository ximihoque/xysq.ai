import '../styles/experience-tiers.css'

function PersonalTier() {
  return (
    <>
      {/* Identity Layer */}
      <section className="sect identity-sect">
        <div className="sect-inner">
          <span className="stag reveal">Your Identity</span>
          <h2 className="reveal">Your identity.<br /><em>Your call.</em></h2>
          <p style={{ maxWidth: 620, marginTop: 24, fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--silver)' }} className="reveal">
            There are two ways to start with xysq. Both give you memory. One gives you sovereignty.
          </p>

          <div className="identity-cards">
            <div className="identity-card reveal">
              <span className="identity-label">Frictionless</span>
              <h3>No account required.</h3>
              <p>
                Your memory lives within this agent. Cross-session, so it carries forward each time you return.
                No signup. No named identity. The agent knows you from visit to visit, privately, within that one context.
                Simple to start. Right for trying things out.
              </p>
              <span className="identity-tag">No Signup · Cross-Session · Single Agent</span>
            </div>

            <div className="identity-card named reveal" style={{ transitionDelay: '0.12s' }}>
              <span className="identity-label">Named Identity</span>
              <h3>One identity. Everywhere.</h3>
              <p>
                Link your identity to our platform and your memory becomes portable. Every agent running on xysq
                picks up from where the last one left off. You get a dashboard to see everything stored,
                manage who has access, and revoke it at any time. Your memory follows you.
                You decide who benefits from it.
              </p>
              <span className="identity-tag">Portable · Cross-Agent · Full Dashboard</span>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Experience */}
      <section className="sect tier-sect">
        <div className="sect-inner">
          <span className="stag reveal">Personal Experience</span>
          <h2 className="reveal">Every interaction.<br /><em>One you.</em></h2>
          <p style={{ maxWidth: 620, marginTop: 24, fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--silver)' }} className="reveal">
            Whether you are talking to a customer support agent, a shopping assistant, or a healthcare tool,
            if it runs on xysq, it starts with you.
          </p>

          <div className="tier-body">
            <div className="tier-col reveal">
              <h4>What You Carry</h4>
              <p>
                Your preferences. Your history. Your emotional context. The way you like information delivered.
                All of it travels with you. Domain-filtered, so only what is relevant surfaces in any given interaction.
                Nothing irrelevant. Nothing missing.
              </p>
              <span className="tier-tag">Portable · Domain-Filtered · Always Relevant</span>
            </div>
            <div className="tier-col reveal" style={{ transitionDelay: '0.12s' }}>
              <h4>What You Control</h4>
              <p>
                Every agent that has ever interacted with you can identify itself to our platform.
                If you have given it access, it picks up where you left off. If you have not, it gets nothing.
                You grant. You revoke. You stay in control of who gets to know you.
              </p>
              <span className="tier-tag">Consent-Gated · Per-Agent · Always Revocable</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function TeamTier() {
  return (
    <section className="sect tier-sect">
      <div className="sect-inner">
        <span className="stag reveal">For Teams</span>
        <h2 className="reveal">Individual memory.<br /><em>Shared knowledge.</em></h2>
        <p style={{ maxWidth: 620, marginTop: 24, fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--silver)' }} className="reveal">
          Teams build a collective memory layer on top of individual memory. When you query within a team context,
          both layers are active simultaneously.
        </p>

        <div className="tier-body">
          <div className="tier-col reveal">
            <h4>Your Personal Layer</h4>
            <p>
              Your own memories, preferences, and history. Domain-filtered to what is relevant to the
              query at hand. Personal context that only you carry, surfaced when it matters.
            </p>
            <span className="tier-tag">Personal · Domain-Filtered · Private</span>
          </div>
          <div className="tier-col reveal" style={{ transitionDelay: '0.12s' }}>
            <h4>The Team Layer</h4>
            <p>
              Shared knowledge that compounds with every team interaction. Accessible to all members.
              Grows as the team works. Explicit writes only: a memory becomes a team memory when
              designated as one, so nothing leaks accidentally.
            </p>
            <span className="tier-tag">Shared · Compounding · Explicit Writes</span>
          </div>
        </div>

        <div className="tier-combined reveal">
          <span className="tier-combined-label">At Recall Time</span>
          <p>
            The agent receives both streams. What you know, and what the team knows. Blended into
            a single response that is informed by both. The more a team interacts, the more
            collective context compounds. Every individual benefits from it.
          </p>
        </div>
      </div>
    </section>
  )
}

function BusinessTier() {
  return (
    <section className="sect tier-sect">
      <div className="sect-inner">
        <span className="stag reveal">For Businesses</span>
        <h2 className="reveal">What the business knows.<br /><em>What you allow.</em></h2>
        <p style={{ maxWidth: 620, marginTop: 24, fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--silver)' }} className="reveal">
          Every business on the platform has its own memory. Products, services, domain context.
          When a customer arrives with consent, two streams merge.
        </p>

        <div className="tier-body">
          <div className="tier-col reveal">
            <h4>Business Stream</h4>
            <p>
              What this product knows. Usage patterns, common friction points, domain context
              scoped to that service or product. The business agent recalls what is relevant
              to this interaction. Not everything, just what matters right now.
            </p>
            <span className="tier-tag">Product Knowledge · Domain-Scoped · Business-Owned</span>
          </div>
          <div className="tier-col reveal" style={{ transitionDelay: '0.12s' }}>
            <h4>User Stream</h4>
            <p>
              What the customer has consented to share. Their relevant preferences, personal context,
              and history. Read-only to the business, filtered to the domain. The business
              never writes to user memory. They only receive what was explicitly granted.
            </p>
            <span className="tier-tag">Consent-Gated · Read-Only · User-Controlled</span>
          </div>
        </div>

        <div className="tier-combined reveal">
          <span className="tier-combined-label">The Result</span>
          <p>
            A response that knows the product and the person. Not one or the other. The agent understands
            what the business offers and who it is talking to. Full context on both sides, in the same moment.
            Hyper-personalised without asking the customer to repeat themselves.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function ExperienceTiers() {
  return (
    <>
      <PersonalTier />
      <TeamTier />
      <BusinessTier />
    </>
  )
}
