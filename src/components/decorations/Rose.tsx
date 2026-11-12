import { useId } from 'react'

const PETAL =
  'M0 4 C 13 1 19 -14 13 -28 C 9 -37 4 -41 0 -41 C -4 -41 -9 -37 -13 -28 C -19 -14 -13 1 0 4 Z'

const CUP =
  'M0 2 C 9 0 12 -11 8 -20 C 5 -27 2 -30 0 -30 C -2 -30 -5 -27 -8 -20 C -12 -11 -9 0 0 2 Z'

export const rosePalettes = {
  blush: { light: '#F8E6E3', mid: '#E8B7B3', deep: '#C98380', shadow: '#A36360' },
  cream: { light: '#FFF8EF', mid: '#F1E1C9', deep: '#E0C7A4', shadow: '#C4A67C' },
  champagne: { light: '#FBF4E4', mid: '#E8D3A6', deep: '#D2B57A', shadow: '#B08E52' },
} as const

export type RosePalette = keyof typeof rosePalettes

type RoseProps = {
  className?: string
  palette?: RosePalette
}

type RingProps = {
  count: number
  scale: number
  distance: number
  spin: number
  fill: string
  opacity: number
  d: string
}

function PetalRing({ count, scale, distance, spin, fill, opacity, d }: RingProps) {
  return Array.from({ length: count }, (_, index) => {
    const angle = spin + (360 / count) * index
    const varied = opacity - (index % 3) * 0.05

    return (
      <g key={`${d.length}-${index}`} transform={`rotate(${angle} 60 60)`}>
        <path
          d={d}
          fill={fill}
          opacity={varied}
          transform={`translate(60 ${60 - distance}) scale(${scale})`}
        />
      </g>
    )
  })
}

export function Rose({ className, palette = 'blush' }: RoseProps) {
  const id = `rose-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
const colors = rosePalettes[palette] ?? rosePalettes.blush
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-petal`} cx="38%" cy="28%" r="78%">
          <stop offset="0%" stopColor={colors.light} />
          <stop offset="48%" stopColor={colors.mid} />
          <stop offset="100%" stopColor={colors.deep} />
        </radialGradient>
        <radialGradient id={`${id}-heart`} cx="40%" cy="34%" r="72%">
          <stop offset="0%" stopColor={colors.light} />
          <stop offset="55%" stopColor={colors.deep} />
          <stop offset="100%" stopColor={colors.shadow} />
        </radialGradient>
      </defs>

      <ellipse cx="60" cy="64" rx="40" ry="34" fill={colors.mid} opacity="0.16" />
      <PetalRing
        count={7}
        scale={1.18}
        distance={8}
        spin={8}
        fill={`url(#${id}-petal)`}
        opacity={0.94}
        d={PETAL}
      />
      <PetalRing
        count={6}
        scale={0.96}
        distance={2}
        spin={28}
        fill={`url(#${id}-petal)`}
        opacity={0.96}
        d={PETAL}
      />
      <PetalRing
        count={5}
        scale={1.05}
        distance={0}
        spin={14}
        fill={`url(#${id}-heart)`}
        opacity={0.95}
        d={CUP}
      />
      <PetalRing
        count={4}
        scale={0.72}
        distance={0}
        spin={40}
        fill={colors.shadow}
        opacity={0.78}
        d={CUP}
      />
      <circle cx="60" cy="60" r="7.5" fill={`url(#${id}-heart)`} />
      <circle cx="57.5" cy="57" r="2.3" fill={colors.light} opacity="0.85" />
      <path
        d="M60 56 C 63 59, 64 63, 60 66 C 57 63, 57 59, 60 56 Z"
        fill={colors.shadow}
        opacity="0.45"
      />
    </svg>
  )
}
