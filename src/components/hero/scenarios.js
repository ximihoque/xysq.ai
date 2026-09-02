// The two conversation scenarios. Everything a message claims is a POINTER
// into a source body ([sourceId, lineIndex]), never a copy of the text, so the
// panel cannot drift from the document and a source count is a count of
// distinct documents, not of lines.

export const growth = {
  id: 'growth',
  label: 'Growth',
  store: 'Two Pines Boards',
  initials: 'TP',
  scenario: {
    title: 'Abandoned cart',
    blurb: 'A shopper adds to cart and leaves. Bring them back in the shop’s own voice, without inventing a discount.',
  },
  // the three things this thread shows, each pointing at the step it starts on
  chapters: [
    { title: 'The first message', blurb: 'One message in the shop’s voice, with a sizing tip from the staff notes.', at: 0 },
    { title: 'A question at 6:31 am', blurb: 'It answers from this shopper’s own order history while the store is asleep.', at: 3 },
    { title: 'Closing the cart', blurb: 'Free shipping is allowed. A percentage off is not. Recovered at 6:40 am.', at: 6 },
  ],
  sources: [
    {
      id: 'cart', title: 'Cart, checked at send time', by: 'Shopify', added: 'at send time', live: true,
      body: ['The Collection Snowboard: Liquid, $149.95, left at checkout 8:47 pm.'],
    },
    {
      id: 'voice', title: 'Brand voice', by: 'store owner', added: '2 months ago',
      body: [
        'We talk like a rider at the shop counter, not a brand.',
        'You can offer free shipping on any order over $100. Never a percentage off.',
        'One message. If they do not answer, leave them alone.',
      ],
    },
    {
      id: 'notes', title: 'Product notes, boards', by: 'shop staff', added: '3 weeks ago',
      body: [
        'The Liquid runs small. Most riders size up one.',
        'Everyone asks about bindings. The Liquid takes any 4x4 or channel mount.',
        'We stopped discounting this line in March.',
      ],
    },
    {
      id: 'history', title: 'Order history', by: 'Growth agent', added: 'Dec 3',
      body: ['Dec 3: Ember bindings, 4x4 mount, one pair.', 'Placed by {mask}.'],
    },
  ],
  thread: [
    { id: 't0', kind: 'system', text: 'Left in cart, 8:47 pm' },
    { id: 'c0', kind: 'card', title: 'The Collection Snowboard: Liquid', sub: '$149.95 · size 157' },
    { id: 'ts1', kind: 'time', text: 'Today' },
    { id: 'm1', from: 'agent', at: '9:47 pm', draws: [['cart', 0], ['notes', 0], ['voice', 0]],
      text: 'Hey Alex, the Liquid is still in your cart. One thing before you decide: it runs small, most riders size up one.' },
    { id: 'm2', from: 'customer', at: '6:31 am', text: 'Oh, good to know. Will my bindings fit it? I got them from you last winter.' },
    { id: 'm3', from: 'agent', at: '6:31 am', draws: [['history', 0], ['notes', 1]],
      text: 'They will. Your Ember pair from December is a 4x4 mount, and the Liquid takes any 4x4 or channel binding.' },
    { id: 'm4', from: 'agent', at: '6:32 am', draws: [['voice', 1]],
      text: 'And shipping is on us for this one, if that helps.' },
    { id: 'm5', from: 'customer', at: '6:40 am', text: 'Sold. Ordered the 157.' },
    { id: 'ok', kind: 'system', tone: 'good', text: 'Cart recovered, 6:40 am' },
  ],
  // upto = thread items visible. typing = ms the agent is seen typing before
  // the newest item lands. sel = message whose sources open on the right.
  steps: [
    { upto: 2, hold: 2400, cap: 'A shopper leaves. The agent waits an hour before it says anything.' },
    { upto: 4, typing: 1700, hold: 4400, cap: 'One message, in the shop’s own voice, with a sizing tip from the staff notes.' },
    { upto: 4, sel: 'm1', hold: 4800, cap: 'Every line came from somewhere. Here is where.' },
    { upto: 5, hold: 2800, cap: '6:31 am. The store is asleep. The shopper is not.' },
    { upto: 6, typing: 1500, hold: 4000, cap: 'It answers from this shopper’s own order history.' },
    { upto: 6, sel: 'm3', hold: 4600, cap: 'Last December’s order, with the email masked.' },
    { upto: 7, typing: 1100, hold: 3300, cap: 'Free shipping is allowed. A percentage off is not.' },
    { upto: 7, sel: 'm4', hold: 4200, cap: 'The rule it followed, word for word.' },
    { upto: 9, hold: 3800, cap: 'Recovered at 6:40 am. Nobody was awake.' },
    { upto: 9, sel: 'm4', hold: null, cap: 'Your turn. Tap any message.' },
  ],
  closing: 'Same agent, every channel your shop already runs.',
}

export const cx = {
  id: 'cx',
  label: 'CX',
  store: 'Two Pines Boards',
  initials: 'TP',
  scenario: {
    title: 'Where is my order',
    blurb: 'A late delivery, a product question and a return, in one thread, answered from what the store actually knows.',
  },
  chapters: [
    { title: 'Delivery delay', blurb: 'Nine days late. It knows what is holding it up and what it is allowed to promise.', at: 0 },
    { title: 'Product issue', blurb: 'A strap that pops open, and the fix the support lead wrote down once.', at: 3 },
    { title: 'Returns', blurb: 'The current window, with last season’s still there to read.', at: 6 },
  ],
  sources: [
    {
      id: 'ship', title: 'Shipping notice, Sept 1', by: 'warehouse', added: 'yesterday',
      body: [
        'Everything going west of Denver is running 3 to 4 days late.',
        'The carrier’s Reno hub has been backed up since Aug 29.',
        'Do not promise a date. If it is not there by day 14, reship at our cost.',
      ],
    },
    {
      id: 'issues', title: 'Known issues', by: 'support lead', added: '2 weeks ago',
      body: [
        'Ember bindings: the ankle strap ratchet pops open when new.',
        'Tell people to click it past the first tooth. It stops after a week.',
        'Not a defect. Do not replace them for this.',
      ],
    },
    {
      id: 'returns', title: 'Returns and refunds', by: 'store owner', added: '1 month ago',
      body: [
        'Unworn gear can come back within 30 days.',
        'Refunds go back to the original card in 5 to 7 days.',
        'Return shipping is on the customer unless we sent the wrong thing.',
      ],
      // the line this document closed, still readable
      was: { text: 'Unworn gear can come back within 14 days.', from: 'Returns policy, 2025 season', closed: 'closed Aug 2' },
    },
  ],
  thread: [
    { id: 'ts1', kind: 'time', text: 'Today' },
    { id: 'k1', from: 'customer', at: '8:12 am', text: 'Hi, my board still hasn’t shown up. It’s been 9 days. I’m in Portland.' },
    { id: 'k2', from: 'agent', at: '8:12 am', draws: [['ship', 0], ['ship', 1], ['ship', 2]],
      text: 'Sorry about the wait. Everything going west of Denver is running 3 to 4 days late; the carrier’s Reno hub has been backed up since Aug 29. I can’t promise a date, but if it’s not there by day 14 we reship at our cost.' },
    { id: 'k3', from: 'customer', at: '8:14 am', text: 'Ok. Also the ankle strap on my Ember bindings keeps popping open. Are they faulty?' },
    { id: 'k4', from: 'agent', at: '8:14 am', draws: [['issues', 0], ['issues', 1]],
      text: 'Not faulty, new Embers do that. Click the ratchet past the first tooth and it stops after a week.' },
    { id: 'k5', from: 'customer', at: '8:15 am', text: 'And if the board doesn’t fit when it lands, can I send it back?' },
    { id: 'k6', from: 'agent', at: '8:15 am', draws: [['returns', 0], ['returns', 1]],
      text: 'Yes. Unworn gear can come back within 30 days, and the refund goes back to your card in 5 to 7 days.' },
  ],
  steps: [
    { upto: 2, hold: 2600, cap: 'Nine days, no board, and a customer who wants an answer now.' },
    { upto: 3, typing: 1900, hold: 4600, cap: 'It knows what is delaying it, and what it is allowed to promise.' },
    { upto: 3, sel: 'k2', hold: 5200, cap: 'A warehouse note from yesterday. Three lines, all used.' },
    { upto: 4, hold: 2600, cap: 'A second problem, same thread.' },
    { upto: 5, typing: 1400, hold: 3800, cap: 'Not a canned reply. It knows this strap.' },
    { upto: 5, sel: 'k4', hold: 4600, cap: 'A recurring issue the support lead wrote down once.' },
    { upto: 6, hold: 2600, cap: 'One more.' },
    { upto: 7, typing: 1500, hold: 3800, cap: 'Returns, with the window that is current.' },
    { upto: 7, sel: 'k6', hold: 5000, cap: 'Last season’s 14 days is still there. Closed, not deleted.' },
    { upto: 7, sel: 'k6', hold: null, cap: 'Your turn. Tap any message.' },
  ],
  closing: 'Same layer. Every ticket, every channel, one answer.',
}

export const MASKED = '••••••@acme.com'
export const plain = (line) => line.replace('{mask}', MASKED)

// dev-time guard: a draw must point at a real line
if (import.meta.env.DEV) {
  for (const sc of [growth, cx]) {
    for (const m of sc.thread) {
      for (const [sid, i] of m.draws ?? []) {
        const s = sc.sources.find((x) => x.id === sid)
        if (!s || s.body[i] == null) console.error(`[scenarios] ${sc.id}/${m.id} points at ${sid}[${i}] which does not exist`)
      }
    }
  }
}
