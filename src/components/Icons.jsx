/* Shared SVG icon components — all use currentColor, sized via CSS */

export function IconEye({ className }) {
  return (
    <svg className={className} viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 8C6 2 22 2 27 8C22 14 6 14 1 8Z" />
      <circle cx="14" cy="8" r="3.5" />
      <circle cx="14" cy="8" r="1.4" fill="currentColor" stroke="none" />
      {/* small iris detail */}
      <circle cx="12" cy="6.8" r="0.7" fill="currentColor" stroke="none" fillOpacity="0.5" />
    </svg>
  )
}

export function IconWave({ className }) {
  return (
    <svg className={className} viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
      <path d="M1 8C4 2.5 7 13.5 10 8C13 2.5 15 13.5 18 8C21 2.5 24 11 27 8" />
    </svg>
  )
}

export function IconPulse({ className }) {
  return (
    <svg className={className} viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="1,8 7,8 10,2 14,14 18,2 21,8 27,8" />
    </svg>
  )
}

export function IconInfinity({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
      <path d="M12 8C12 5.2 10 2.5 7 2.5C4 2.5 1.5 5.2 1.5 8C1.5 10.8 4 13.5 7 13.5C10 13.5 12 10.8 16 8C20 5.2 22 2.5 25 2.5C28 2.5 30.5 5.2 30.5 8C30.5 10.8 28 13.5 25 13.5C22 13.5 20 10.8 16 8Z" />
    </svg>
  )
}

export function IconLock({ className }) {
  return (
    <svg className={className} viewBox="0 0 14 17" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1.5" y="7.5" width="11" height="8" rx="1.5" />
      <path d="M4 7.5V5a3 3 0 0 1 6 0v2.5" />
      <circle cx="7" cy="11.8" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  )
}
