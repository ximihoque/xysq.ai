/**
 * Inline xysq lychee logo with internal graph dots that blink.
 *
 * Mirrors public/logo.svg exactly, with two changes:
 *   1. The 12 main-graph circles each have a per-dot <animate> that
 *      pulses opacity (0.25 → 0.95 → 0.25), staggered so they twinkle
 *      independently rather than in lockstep.
 *   2. The 8 faint background dots also blink, slower and lower.
 *
 * Keep this file in sync with public/logo.svg if the source logo changes.
 */

const mainDots = [
  { cx: 75,  cy: 102, r: 4.5, dur: 2.6, begin: 0.0  },
  { cx: 93,  cy: 95,  r: 3.5, dur: 2.2, begin: 0.7  },
  { cx: 114, cy: 99,  r: 5,   dur: 3.0, begin: 1.3  },
  { cx: 82,  cy: 115, r: 4,   dur: 2.4, begin: 0.4  },
  { cx: 101, cy: 110, r: 5.5, dur: 2.8, begin: 1.0  },
  { cx: 97,  cy: 133, r: 5,   dur: 3.2, begin: 1.6  },
  { cx: 117, cy: 148, r: 4.5, dur: 2.6, begin: 0.2  },
  { cx: 67,  cy: 165, r: 3.5, dur: 2.4, begin: 0.9  },
  { cx: 87,  cy: 175, r: 4,   dur: 3.0, begin: 1.5  },
  { cx: 101, cy: 192, r: 5,   dur: 2.6, begin: 0.6  },
  { cx: 120, cy: 172, r: 3.5, dur: 2.2, begin: 1.2  },
  { cx: 142, cy: 167, r: 4,   dur: 2.8, begin: 0.3  },
]

const faintDots = [
  { cx: 70,  cy: 80,  r: 2.5, dur: 4.0, begin: 0.5 },
  { cx: 88,  cy: 76,  r: 2,   dur: 3.6, begin: 1.4 },
  { cx: 122, cy: 80,  r: 2.5, dur: 4.2, begin: 0.0 },
  { cx: 143, cy: 92,  r: 2,   dur: 3.8, begin: 1.0 },
  { cx: 58,  cy: 97,  r: 2,   dur: 4.0, begin: 0.8 },
  { cx: 48,  cy: 132, r: 2.5, dur: 4.4, begin: 1.7 },
  { cx: 130, cy: 130, r: 2.5, dur: 3.6, begin: 0.3 },
  { cx: 140, cy: 148, r: 2,   dur: 4.0, begin: 1.2 },
]

export default function XysqLogo({ size = 88, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="20 18 160 215"
      width={size}
      height={size * (215 / 160)}
      fill="none"
      className={className}
      aria-label="xysq logo"
      role="img"
    >
      <defs>
        <clipPath id="fc-anim"><circle cx="100" cy="140" r="74"/></clipPath>
      </defs>

      {/* Body */}
      <circle cx="100" cy="140" r="76" fill="#ff6b7a"/>

      {/* Scallops */}
      <circle cx="100" cy="64"  r="10"  fill="#ff6b7a"/><circle cx="83"  cy="67"  r="9.5" fill="#ff6b7a"/>
      <circle cx="67"  cy="75"  r="9"   fill="#ff6b7a"/><circle cx="53"  cy="88"  r="9"   fill="#ff6b7a"/>
      <circle cx="43"  cy="104" r="9"   fill="#ff6b7a"/><circle cx="37"  cy="122" r="9"   fill="#ff6b7a"/>
      <circle cx="36"  cy="141" r="9"   fill="#ff6b7a"/><circle cx="39"  cy="160" r="9"   fill="#ff6b7a"/>
      <circle cx="47"  cy="178" r="9"   fill="#ff6b7a"/><circle cx="59"  cy="193" r="9"   fill="#ff6b7a"/>
      <circle cx="75"  cy="204" r="9.5" fill="#ff6b7a"/><circle cx="100" cy="210" r="10"  fill="#ff6b7a"/>
      <circle cx="125" cy="204" r="9.5" fill="#ff6b7a"/><circle cx="141" cy="193" r="9"   fill="#ff6b7a"/>
      <circle cx="153" cy="178" r="9"   fill="#ff6b7a"/><circle cx="161" cy="160" r="9"   fill="#ff6b7a"/>
      <circle cx="164" cy="141" r="9"   fill="#ff6b7a"/><circle cx="163" cy="122" r="9"   fill="#ff6b7a"/>
      <circle cx="157" cy="104" r="9"   fill="#ff6b7a"/><circle cx="147" cy="88"  r="9"   fill="#ff6b7a"/>
      <circle cx="133" cy="75"  r="9"   fill="#ff6b7a"/><circle cx="117" cy="67"  r="9.5" fill="#ff6b7a"/>

      {/* Border facets */}
      <polygon points="100,58 93,68 107,68"    fill="#e85568" opacity="0.75"/>
      <polygon points="82,62 76,72 89,71"      fill="#e85568" opacity="0.70"/>
      <polygon points="65,72 60,83 73,81"      fill="#d94a5c" opacity="0.68"/>
      <polygon points="50,86 46,98 58,95"      fill="#d94a5c" opacity="0.68"/>
      <polygon points="39,103 37,115 49,112"   fill="#cf4456" opacity="0.65"/>
      <polygon points="32,122 31,135 43,130"   fill="#cf4456" opacity="0.65"/>
      <polygon points="30,141 30,154 42,148"   fill="#cf4456" opacity="0.65"/>
      <polygon points="34,160 36,172 47,166"   fill="#d94a5c" opacity="0.68"/>
      <polygon points="43,177 48,188 58,181"   fill="#d94a5c" opacity="0.68"/>
      <polygon points="57,192 64,202 73,194"   fill="#e85568" opacity="0.70"/>
      <polygon points="76,202 83,211 92,202"   fill="#e85568" opacity="0.72"/>
      <polygon points="100,207 100,217 108,207" fill="#e85568" opacity="0.72"/>
      <polygon points="108,202 117,211 124,202" fill="#e85568" opacity="0.72"/>
      <polygon points="127,194 136,202 143,192" fill="#e85568" opacity="0.70"/>
      <polygon points="142,181 152,188 157,177" fill="#d94a5c" opacity="0.68"/>
      <polygon points="153,166 164,172 166,160" fill="#d94a5c" opacity="0.68"/>
      <polygon points="158,148 170,154 170,141" fill="#cf4456" opacity="0.65"/>
      <polygon points="151,130 163,135 161,122" fill="#cf4456" opacity="0.65"/>
      <polygon points="142,108 153,112 151,98"  fill="#cf4456" opacity="0.65"/>
      <polygon points="127,86 138,90 133,78"    fill="#d94a5c" opacity="0.68"/>
      <polygon points="111,72 121,75 117,63"    fill="#e85568" opacity="0.70"/>

      {/* Interior facets */}
      <polygon points="105,82 98,92 112,93"     fill="#e85568" opacity="0.55"/>
      <polygon points="84,88 77,98 91,97"       fill="#d94a5c" opacity="0.52"/>
      <polygon points="122,88 115,99 129,98"    fill="#e85568" opacity="0.55"/>
      <polygon points="68,110 61,121 75,119"    fill="#d94a5c" opacity="0.52"/>
      <polygon points="74,132 67,143 81,141"    fill="#cf4456" opacity="0.52"/>
      <polygon points="138,116 131,127 145,125" fill="#e85568" opacity="0.55"/>
      <polygon points="148,138 141,149 155,147" fill="#d94a5c" opacity="0.52"/>
      <polygon points="133,160 126,170 140,168" fill="#e85568" opacity="0.55"/>
      <polygon points="95,160 88,171 102,170"   fill="#d94a5c" opacity="0.52"/>

      {/* Outline */}
      <circle cx="100" cy="140" r="76" fill="none" stroke="white" strokeWidth="5"/>

      {/* Internal knowledge graph — clipped to the fruit body */}
      <g clipPath="url(#fc-anim)">
        {/* Connecting lines */}
        <g stroke="white" strokeWidth="1.5" opacity="0.3" fill="none">
          <line x1="75"  y1="102" x2="93"  y2="95"/><line x1="93"  y1="95"  x2="114" y2="99"/>
          <line x1="114" y1="99"  x2="136" y2="106"/><line x1="75"  y1="102" x2="62"  y2="120"/>
          <line x1="93"  y1="95"  x2="82"  y2="115"/><line x1="82"  y1="115" x2="101" y2="110"/>
          <line x1="101" y1="110" x2="97"  y2="133"/><line x1="97"  y1="133" x2="117" y2="148"/>
          <line x1="117" y1="148" x2="151" y2="160"/><line x1="57"  y1="143" x2="67"  y2="165"/>
          <line x1="67"  y1="165" x2="87"  y2="175"/><line x1="87"  y1="175" x2="101" y2="192"/>
          <line x1="101" y1="192" x2="120" y2="172"/><line x1="120" y1="172" x2="142" y2="167"/>
        </g>

        {/* Main blinking nodes */}
        <g fill="white">
          {mainDots.map((d, i) => (
            <circle key={`md-${i}`} cx={d.cx} cy={d.cy} r={d.r} opacity="0.65">
              <animate
                attributeName="opacity"
                values="0.95;0.25;0.95"
                keyTimes="0;0.5;1"
                dur={`${d.dur}s`}
                begin={`${d.begin}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>

        {/* Faint background nodes — blink slower, dimmer */}
        <g fill="white">
          {faintDots.map((d, i) => (
            <circle key={`fd-${i}`} cx={d.cx} cy={d.cy} r={d.r} opacity="0.35">
              <animate
                attributeName="opacity"
                values="0.55;0.1;0.55"
                keyTimes="0;0.5;1"
                dur={`${d.dur}s`}
                begin={`${d.begin}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      </g>

      {/* Branch + leaves */}
      <path d="M100 66 Q94 54 88 44" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
      <path d="M88 44 C76 26 40 28 36 56 C32 76 48 96 70 94 C84 92 92 76 88 44Z" fill="#22c4a5" stroke="white" strokeWidth="3.5" strokeLinejoin="round"/>
      <path d="M88 44 C72 56 56 72 50 88" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.45"/>
      <path d="M80 51 L74 45 C70 42 64 41 58 42" stroke="white" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.35"/>
      <path d="M72 61 L66 55 C62 52 56 51 50 52" stroke="white" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.35"/>
      <path d="M63 73 L57 67 C53 64 47 64 42 66" stroke="white" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.35"/>
      <path d="M80 51 L84 57 C86 63 84 69 82 73" stroke="white" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.35"/>
      <path d="M72 61 L76 67 C78 73 76 79 74 83" stroke="white" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.35"/>
      <path d="M63 73 L67 79 C69 85 67 90 65 93" stroke="white" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.35"/>
      <path d="M88 44 C98 30 128 24 146 36 C156 44 150 58 134 60 C116 62 96 56 88 44Z" fill="#22c4a5" stroke="white" strokeWidth="3.5" strokeLinejoin="round"/>
      <path d="M88 44 C110 40 132 34 144 38" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.45"/>
      <path d="M104 41 C106 35 110 30 116 28" stroke="white" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.35"/>
      <path d="M104 43 C107 49 112 53 118 55" stroke="white" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.35"/>
      <path d="M120 38 C122 32 126 28 132 27" stroke="white" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.35"/>
      <path d="M120 41 C123 47 128 51 134 52" stroke="white" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.35"/>
    </svg>
  )
}
