import { ChevronDown, Share2, HardDrive, Cloud, ShieldCheck, Lock } from 'lucide-react'
import XysqLogo from './XysqLogo'
import '../styles/hero-infographic.css'

/*
  The "For Teams" hero graphic: personal knowledge graph -> selective
  sharing -> team graph. The one cyan node is the story: you share a
  slice, not your whole graph. Same frame + tokens as HeroInfographic.
*/

const storage = [
  { icon: Cloud, label: 'Google Drive' },
  { icon: Cloud, label: 'Dropbox' },
  { icon: Cloud, label: 'OneDrive' },
  { icon: HardDrive, label: 'Local Files' },
]

const shareChips = ['Anyone', 'Team', 'Read Only', 'Editable', 'Granular Permissions']

const avatars = ['AK', 'MJ', 'RS', 'TP', 'LN', 'JD', 'PV', 'SC']

/* personal graph: 7 nodes, node 3 is the shared (cyan) one */
const pNodes = [
  { x: 42, y: 50 }, { x: 116, y: 26 }, { x: 116, y: 74 },
  { x: 200, y: 48, hl: true },
  { x: 282, y: 28 }, { x: 282, y: 76 }, { x: 356, y: 52 },
]
const pEdges = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6]]

/* team graph: people (initials) + the shared cyan node woven in */
const tNodes = [
  { x: 60, y: 44, label: 'MJ' }, { x: 148, y: 24 },
  { x: 200, y: 52, hl: true },
  { x: 262, y: 26, label: 'RS' }, { x: 340, y: 48, label: 'AK' },
]
const tEdges = [[0, 1], [1, 2], [0, 2], [2, 3], [3, 4], [2, 4]]

function MiniGraph({ nodes, edges, height, maxH }) {
  return (
    <svg
      viewBox={`0 0 400 ${height}`}
      className="htg-graph"
      style={maxH ? { maxHeight: `${maxH}px` } : undefined}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          className={nodes[a].hl || nodes[b].hl ? 'htg-edge htg-edge--hl' : 'htg-edge'}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x} cy={n.y} r={n.label ? 11 : 8}
            className={n.hl ? 'htg-node htg-node--hl' : 'htg-node'}
          />
          {n.label && (
            <text x={n.x} y={n.y + 2.5} className="htg-node-label">{n.label}</text>
          )}
        </g>
      ))}
    </svg>
  )
}

export default function HeroTeamsGraphic() {
  return (
    <div
      className="hig htg"
      role="img"
      aria-label="Build your personal knowledge graph from your files and AI conversations, stored in your own drive or locally. Share exactly what you want with anyone or your team, revoke anytime. Personal graphs grow into a governed team knowledge graph, powered by the same xysq Memory Engine"
    >
      {/* ── Zone 1: personal graph ── */}
      <div className="hig-card htg-zone">
        <span className="hig-card-text">
          <span className="hig-card-title">Your Personal Knowledge Graph</span>
          <span className="htg-chips">
            {storage.map(({ icon: Icon, label }) => (
              <span key={label} className="htg-chip">
                <Icon size={11} strokeWidth={1.8} aria-hidden="true" />
                {label}
              </span>
            ))}
          </span>
          <MiniGraph nodes={pNodes} edges={pEdges} height={100} maxH={72} />
          <span className="hig-card-line">Build a graph from your files and AI conversations.</span>
          <span className="hig-card-line">Stored in your own drive or locally.</span>
          <span className="htg-pill htg-pill--inline">
            <XysqLogo size={12} />
            Powered by the same xysq Memory Engine
          </span>
        </span>
      </div>

      <span className="hig-connector" aria-hidden="true">
        <ChevronDown size={13} strokeWidth={2} />
      </span>

      {/* ── Zone 2: share controls ── */}
      <div className="hig-card htg-zone htg-share">
        <span className="hig-card-icon" aria-hidden="true">
          <Share2 size={15} strokeWidth={1.7} />
        </span>
        <span className="hig-card-text">
          <span className="hig-card-title">Share Controls</span>
          <span className="htg-chips">
            {shareChips.map((chip) => (
              <span key={chip} className="htg-chip">{chip}</span>
            ))}
          </span>
          <span className="hig-card-line">Share exactly what you want. Revoke access anytime.</span>
        </span>
      </div>

      <span className="hig-connector" aria-hidden="true">
        <ChevronDown size={13} strokeWidth={2} />
      </span>

      {/* ── Zone 3: outcomes ── */}
      <div className="htg-out">
        <div className="hig-card htg-zone">
          <span className="hig-card-text">
            <span className="hig-card-title">Share with Anyone</span>
            <span className="htg-avatars" aria-hidden="true">
              {avatars.map((a) => (
                <span key={a} className="htg-avatar">{a}</span>
              ))}
              <span className="htg-avatar htg-avatar--more">+99</span>
            </span>
            <span className="hig-card-line">Securely share any part of your graph.</span>
          </span>
        </div>

        <div className="hig-card htg-zone">
          <span className="hig-card-text">
            <span className="hig-card-title">Team Knowledge Graph</span>
            <MiniGraph nodes={tNodes} edges={tEdges} height={72} maxH={52} />
            <span className="hig-card-line">Shared knowledge that grows with your team.</span>
          </span>
        </div>
      </div>

      {/* ── Security strip: governance + storage ownership ── */}
      <div className="htg-secure">
        <span className="htg-secure-item">
          <ShieldCheck size={13} strokeWidth={1.8} aria-hidden="true" />
          Governed and always under your control.
        </span>
        <span className="htg-secure-item">
          <Lock size={13} strokeWidth={1.8} aria-hidden="true" />
          Your storage, always yours.
        </span>
      </div>
    </div>
  )
}
