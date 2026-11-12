import { useId } from 'react'

const LEAF =
  'M0 2 C -18 -6 -26 -30 -12 -52 C -4 -62 4 -62 12 -52 C 26 -30 18 -6 0 2 Z'

const VEIN = 'M0 0 C -1 -18 1 -36 0 -54'

const tones = {
  olive: { light: '#C5C9A4', main: '#7D865C', deep: '#4F5838', vein: '#3C452C' },
  sage: { light: '#D5D8BC', main: '#8E9774', deep: '#667052', vein: '#515A40' },
  muted: { light: '#DDD2B4', main: '#8A7B58', deep: '#5C5140', vein: '#4A4032' },
} as const

export type LeafTone = keyof typeof tones

type LeavesProps = {
  className?: string
  variant?: LeafTone
}

const sprigs = [
  { x: 34, y: 128, rotate: -58, scale: 1 },
  { x: 78, y: 104, rotate: -18, scale: 0.82 },
  { x: 112, y: 78, rotate: 24, scale: 0.7 },
  { x: 146, y: 52, rotate: -8, scale: 0.56 },
  { x: 58, y: 86, rotate: 36, scale: 0.48 },
]

export function Leaves({ className, variant = 'olive' }: LeavesProps) {
  const id = `leaf-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const tone = tones[variant]

  return (
    <svg viewBox="0 0 180 150" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={tone.light} />
          <stop offset="46%" stopColor={tone.main} />
          <stop offset="100%" stopColor={tone.deep} />
        </linearGradient>
      </defs>

      <path
        d="M22 136 C 58 112, 92 86, 154 40"
        fill="none"
        stroke={tone.deep}
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M96 92 C 108 86, 118 90, 132 78"
        fill="none"
        stroke={tone.main}
        strokeWidth="0.9"
        strokeLinecap="round"
      />

      {sprigs.map((sprig) => (
        <g
          key={`${sprig.x}-${sprig.y}`}
          transform={`translate(${sprig.x} ${sprig.y}) rotate(${sprig.rotate}) scale(${sprig.scale})`}
        >
          <path d={LEAF} fill={`url(#${id})`} />
          <path
            d={VEIN}
            fill="none"
            stroke={tone.vein}
            strokeWidth="0.7"
            opacity="0.7"
          />
          <path
            d="M0 -16 C -8 -20, -10 -28, -6 -34"
            fill="none"
            stroke={tone.light}
            strokeWidth="0.45"
            opacity="0.55"
          />
        </g>
      ))}
    </svg>
  )
}
