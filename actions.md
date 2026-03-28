# MVP Action Plan

A personal research and build roadmap for the Context OS platform.
Work through each phase sequentially — each one unblocks the next.

---

## Phase 1 — Understand the Competitive Landscape
*Goal: Know exactly what exists, what's missing, and where to position.*

- [ ] Deep-dive **Supermemory** — how does their memory retrieval work? What's the data model? What's the API surface?
- [ ] Deep-dive **Littlebird AI** — what does their capture pipeline look like? What modalities? How is it stored?
- [ ] Study **Mem.ai**, **Rewind.ai**, **Notion AI** — what have they built and where did they stall?
- [ ] Read **Anthropic's MCP (Model Context Protocol)** spec — this is the emerging standard for injecting context into models; your platform should speak this language
- [ ] Review **OpenAI Memory** feature — understand the design tradeoffs they made
- [ ] Map out: what does your platform do that none of these do? Write a 1-page differentiation doc

---

## Phase 2 — Understand the Technical Building Blocks
*Goal: Know what you're building with before you design the architecture.*

### 2a. Multimodal Capture
- [ ] Study **WebRTC** — how real-time audio/video is captured in the browser and on mobile
- [ ] Study **Whisper** (OpenAI) — real-time speech-to-text, local vs cloud tradeoffs
- [ ] Study **Vision APIs** — Google Vision, Azure Computer Vision, or running CLIP/LLaVA locally
- [ ] Understand **emotion detection** approaches — facial action units, voice sentiment, text sentiment (what's production-ready vs experimental?)
- [ ] Research **on-device processing** vs cloud — what can run locally for privacy? (Whisper.cpp, MediaPipe)

### 2b. Memory & Context Storage
- [ ] Study **vector databases** — Pinecone, Weaviate, Qdrant, pgvector; understand when to use each
- [ ] Learn **RAG (Retrieval Augmented Generation)** patterns deeply — naive RAG vs HyDE vs re-ranking
- [ ] Understand **embedding models** — what to use for text, audio transcripts, image captions (OpenAI embeddings, Cohere, local models)
- [ ] Study **episodic vs semantic memory** models — how do you store "what happened" vs "who you are"?
- [ ] Research **context window management** — how do you decide what to inject vs summarise?
- [ ] Read about **knowledge graphs** (Neo4j, Graphiti) — are they a better fit for long-term identity than flat vectors?

### 2c. Context Injection & API Design
- [ ] Study **streaming context injection** patterns — how to push context into a running LLM session
- [ ] Understand **tool use / function calling** across models (OpenAI, Anthropic, Gemini) — your pull API would be exposed as a tool
- [ ] Read the **MCP specification** end-to-end and prototype a simple MCP server
- [ ] Design your **API surface** — what does a business call to enrich their agent? What does an LLM call to pull deeper context?

---

## Phase 3 — Identity, Auth & Privacy Architecture
*Goal: Consent is the foundation — design this correctly from day one.*

- [ ] Study **OAuth 2.0 + OpenID Connect** — the standard for delegated identity; your platform issues access tokens to verified agents
- [ ] Research **Decentralised Identity (DID)** and **Verifiable Credentials (W3C)** — this is where agent identity is heading; understand the spec
- [ ] Research **government ID verification APIs** — Stripe Identity, Persona, Onfido; what's the integration cost and compliance overhead?
- [ ] Study **GDPR and CCPA requirements** in depth — data minimisation, right to erasure, consent logging; know what you must build
- [ ] Research **consent management patterns** — how do you log, version, and audit what data was shared with whom and when?
- [ ] Think through: **anonymous mode** — what data never leaves the device? What requires a server?
- [ ] Research **federated learning** — could user data stay local while you still learn from patterns?

---

## Phase 4 — Business Model & Go-to-Market
*Goal: Know how you'll make money and who your first customers are.*

- [ ] Study **API-as-a-product** pricing models — per-call, per-seat, tiered subscription; look at how Stripe, Twilio, OpenAI priced early
- [ ] Research **B2B SaaS for AI enrichment** — who are the buyers? CTO, Head of AI, Head of CX? What's their budget?
- [ ] Identify **10 specific businesses** who would pay to enrich their agents with user context today — customer support tools, healthcare apps, banking apps
- [ ] Think through the **consumer angle** — is there a freemium personal tier? What's the hook?
- [ ] Study **developer ecosystem building** — how do you get agents to integrate? SDK? Marketplace? Look at how Twilio and Segment built ecosystems
- [ ] Research **data ownership regulations** by market — UK, EU, US, India — where can you launch first with least friction?

---

## Phase 5 — MVP Scoping
*Goal: Define the smallest thing you can build that proves the core thesis.*

- [ ] Write a **core data model** — what does a "user context object" look like? What fields, what schema?
- [ ] Define **MVP scope** — pick ONE modality (text + voice is probably right), ONE memory store, ONE injection mechanism
- [ ] Choose your **tech stack** — backend language, hosting, DB; optimise for speed of iteration not scale
- [ ] Prototype a **single end-to-end flow**: user speaks → captured → stored → injected into a Claude or GPT conversation → response is contextually aware
- [ ] Build a **simple MCP server** that exposes your context store as tools any Claude instance can call
- [ ] Test with **one real business** — find a small company with a chatbot and offer to enrich it manually first, before building the integration

---

## Phase 6 — Questions to Resolve Before Building
*These are open questions — answer them before writing production code.*

- [ ] **Where does data live?** On-device, your cloud, or user-owned storage (e.g. their own S3)?
- [ ] **What is your moat?** The data flywheel, the OS layer, or the developer ecosystem?
- [ ] **Agent auth standard** — invent your own or wait for an emerging standard (MCP, A2A, etc.)?
- [ ] **How do you handle conflicting memories?** If what you feel and what you say contradict, what wins?
- [ ] **Regulatory strategy** — do you need to be a data processor or controller? Consult a lawyer early
- [ ] **Multimodal vs text-first MVP** — is multimodal capture necessary for v1 or can you prove value with text + voice transcript only?

---

## Recommended Reading
- *The Alignment Problem* — Brian Christian (understand what AI systems actually optimise for)
- Anthropic MCP documentation — model-context-protocol.io
- *Designing Data-Intensive Applications* — Martin Kleppmann (for the storage and streaming architecture)
- GDPR full text + ICO guidance (UK) — read once, properly
- Sequoia's *The Arc of AI* essay — how to think about the AI product landscape
- A16Z's writing on *AI Native* products — understand the category you're building in

---

*Review and update this list after each phase. The questions in Phase 6 should be answered before Phase 5 begins.*
