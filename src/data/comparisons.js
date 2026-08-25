export const COMPARISONS = {
  mem0: {
    competitorName: 'mem0',
    title: 'xysq vs mem0',
    description: 'Understand the architectural and trust differences between xysq\'s memory layer and mem0.',
    points: [
      {
        title: 'User Interface (Transparency vs. Blackbox)',
        xysq: "Comes with a complete, intuitive dashboard out of the box. Users can easily navigate their personal or team vaults, see exactly what the AI remembers, and watch how information is consolidated. It's a transparent window into the AI's brain.",
        competitor: 'Operates primarily as a backend API (a "blackbox" to end-users). If you want your users to see or manage their memories, your engineers have to build that UI from scratch.'
      },
      {
        title: 'Trust & Exact Provenance',
        xysq: 'Never guesses. Every single fact is strictly bound to the exact document and quote it was extracted from. If you edit or delete the original source document, the stale fact automatically retracts. You always know why the AI believes something.',
        competitor: 'Extracts and stores semantic facts efficiently, but over time these facts can detach from their original context, making it difficult to audit the source of truth.'
      },
      {
        title: 'Human-in-the-Loop Authority',
        xysq: 'Built for workflows where accuracy is critical. xysq includes native auditing tools that allow a human to review uncertain claims. When a human auditor confirms a fact, it becomes the highest authority in the vault, superseding AI guesses.',
        competitor: "Relies on fully automated extraction. It lacks a built-in workflow for human oversight, review, or overriding the AI's confidence levels."
      },
      {
        title: 'Document & Conversational Memory',
        xysq: "Optimized from the ground up to handle both conversational memory and long-form documents. Whether you're uploading whitepapers, meeting transcripts, or scraping web pages, xysq seamlessly extracts and grounds facts from unstructured documents alongside your chat history.",
        competitor: 'Primarily focused on conversational memory (extracting user preferences and context from chat logs). Ingesting and managing large, static documents often requires additional engineering outside of their core memory loops.'
      },
      {
        title: 'Plug-and-Play Team Collaboration',
        xysq: 'Beyond just agent vaults, xysq is built for personal and team collaboration. As a native MCP server with strict vault boundaries, you can plug xysq directly into tools like Claude or Cursor in seconds. Your agents instantly get access to your private memory and shared team knowledge—without writing code or risking data leaks.',
        competitor: 'A developer tool that requires your team to write integration wrappers. Managing complex team-based collaboration and strict enterprise data boundaries requires building custom permission logic on top of their API.'
      }
    ]
  }
};
