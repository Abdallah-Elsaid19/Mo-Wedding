import { useId } from 'react'

type GoldFrameProps = {
  className?: string
}

const OUTER =
  'M17 8 H39 L43.5 3.6 H56.5 L61 8 H83 L93 17 V40 L97 45 V74 L93.4 79 V112 L97 117.5 V140 L89 154 H61 L56.5 158.4 H43.5 L39 154 H12 L4 145 V117 L7.4 112 V79 L3.4 74 V45 L7 40 V18 Z'

const OCTAGON =
  'M24 26 H76 L86 38 V124 L76 136 H24 L14 124 V38 Z'

const jewels = [
  [50, 10],
  [50, 152],
  [8, 81],
  [92, 81],
  [22, 24],
  [78, 24],
  [22, 138],
  [78, 138],
] as const

export function GoldFrame({ className }: GoldFrameProps) {
  const id = `gold-${useId().replace(/[^a-zA-Z0-9]/g, '')}`

  return (
    <svg
      viewBox="0 0 100 162"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4E7C8" />
          <stop offset="38%" stopColor="#C6A36A" />
          <stop offset="72%" stopColor="#8D6832" />
          <stop offset="100%" stopColor="#E7D3A4" />
        </linearGradient>
      </defs>

      <path
        d={OUTER}
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="1.7"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <g transform="translate(50 81) scale(0.972) translate(-50 -81)">
        <path
          d={OUTER}
          fill="none"
          stroke="#F6EAD2"
          strokeWidth="0.7"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </g>
      <path
        d={OCTAGON}
        fill="none"
        stroke="#C6A36A"
        strokeWidth="1.15"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={OCTAGON}
        fill="none"
        stroke="#F3E6C8"
        strokeWidth="0.45"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        transform="translate(50 81) scale(0.97) translate(-50 -81)"
      />

      <path
        d="M18 34 L30 24 M82 24 L70 34 M18 128 L30 138 M82 138 L70 128"
        fill="none"
        stroke="#C6A36A"
        strokeWidth="0.7"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M14 46 H22 M14 116 H22 M86 46 H78 M86 116 H78"
        fill="none"
        stroke="#B89256"
        strokeWidth="0.55"
        vectorEffect="non-scaling-stroke"
      />

      {jewels.map(([x, y]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          <path
            d="M0 -2.7 L1.9 0 L0 2.7 L-1.9 0 Z"
            fill="#F6EBD4"
            stroke="#A68446"
            strokeWidth="0.35"
            vectorEffect="non-scaling-stroke"
          />
          <path d="M0 -1.05 L0.75 0 L0 1.05 L-0.75 0 Z" fill="#C6A36A" />
        </g>
      ))}
    </svg>
  )
}
