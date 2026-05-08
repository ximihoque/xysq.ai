import { motion } from 'framer-motion'

/* Opacity-only crossfade — no `y` translate.
   A `transform` on this wrapper sticks around as `transform: translateY(0)`
   after animation completes, and that turns the wrapper into a containing
   block for every `position: fixed` descendant (nav, NeuralBackground).
   On iOS Safari that scopes those elements to the wrapper's box rather
   than the viewport, which breaks scroll behavior on tall pages — the
   user gets stuck partway down and can't reach the footer. */
const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
}

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
