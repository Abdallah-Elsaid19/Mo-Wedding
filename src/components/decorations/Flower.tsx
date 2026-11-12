import { useId } from 'react'

const BLOOM =
  'M0 10 C 20 5 30 -16 18 -36 C 10 -48 -10 -48 -18 -36 C -30 -16 -20 5 0 10 Z'

const INNER =
  'M0 6 C 13 3 18 -10 11 -22 C 6 -30 -6 -30 -11 -22 C -18 -10 -13 3 0 6 Z'

export const flowerPalettes = {
  cream: { light: '#FFF9F2', mid: '#F3E4CE', deep: '#E2CBAE', heart: '#C9A97E' },
  blush: { light: '#FDEEEC', mid: '#F0C9C5', deep: '#E0A8A4', heart: '#C98484' },
  beige: { light: '#F8F2E6', mid: '#EADFCB', deep: '#D7C2A2', heart: '#B99768' },
} as const

export type FlowerPalette = keyof typeof flowerPalettes

type FlowerProps = {
  className?: string
  palette?: FlowerPalette
}

export function Flower({ className, palette = 'cream' }: FlowerProps) {
  const id = `flower-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const colors = flowerPalettes[palette]
  const outer = Array.from({ length: 8 }, (_, index) => index)
  const inner = Array.from({ length: 7 }, (_, index) => index)
  const buds = Array.from({ length: 6 }, (_, index) => index)

  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-petal`} cx="36%" cy="30%" r="80%">
          <stop offset="0%" stopColor={colors.light} />
          <stop offset="52%" stopColor={colors.mid} />
          <stop offset="100%" stopColor={colors.deep} />
        </radialGradient>
        <radialGradient id={`${id}-center`} cx="42%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#FFF8EA" />
          <stop offset="60%" stopColor={colors.heart} />
          <stop offset="100%" stopColor="#8C6A3A" />
        </radialGradient>
      </defs>

      <ellipse cx="60" cy="64" rx="42" ry="36" fill={colors.mid} opacity="0.18" />

      {outer.map((index) => (
        <g key={`outer-${index}`} transform={`rotate(${index * 45 + 6} 60 60)`}>
          <path
            d={BLOOM}
            fill={`url(#${id}-petal)`}
            opacity={0.9 - (index % 2) * 0.06}
            transform="translate(60 50) scale(1.02)"
          />
        </g>
      ))}

      {inner.map((index) => (
        <g key={`inner-${index}`} transform={`rotate(${index * 51.4 + 18} 60 60)`}>
          <path
            d={INNER}
            fill={`url(#${id}-petal)`}
            opacity="0.95"
            transform="translate(60 54) scale(0.86)"
          />
        </g>
      ))}

      {buds.map((index) => (
        <g key={`bud-${index}`} transform={`rotate(${index * 60} 60 60)`}>
          <ellipse
            cx="60"
            cy="46"
            rx="5.5"
            ry="9"
            fill={colors.deep}
            opacity="0.55"
          />
        </g>
      ))}

      <circle cx="60" cy="60" r="11" fill={`url(#${id}-center)`} />
      <circle cx="57" cy="56" r="3" fill="#FFF8EE" opacity="0.7" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <circle
          key={angle}
          cx={60 + Math.cos((angle * Math.PI) / 180) * 6.2}
          cy={60 + Math.sin((angle * Math.PI) / 180) * 6.2}
          r="1.15"
          fill="#F6E2B4"
          opacity="0.9"
        />
      ))}
    </svg>
  )
}
