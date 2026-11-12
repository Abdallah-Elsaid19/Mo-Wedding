import confetti from 'canvas-confetti'
import { useEffect, useRef } from 'react'
import { createRng } from '../utils/random'

const COLORS = [
  '#E8D3A3',
  '#C6A36A',
  '#F6E7C8',
  '#F7F1E5',
  '#E7B7B4',
  '#F4D2CE',
  '#D4A0A4',
  '#C9847A',
  '#E7C56B',
  '#F3D5B5',
  '#C9B4D4',
  '#8EAE8A',
]

type Origin = 'top' | 'left' | 'right'

type Ribbon = {
  id: string
  origin: Origin
  position: string
  width: string
  height: string
  delay: string
  duration: string
  drift: string
  spin: string
  turn: string
  background: string
}

function ribbonBackground(color: string) {
  return `linear-gradient(90deg, rgba(255,255,255,0.72), transparent 42%, rgba(90,50,30,0.08)), ${color}`
}

function buildRibbons(): Ribbon[] {
  const random = createRng(1204)
  const make = (count: number, origin: Origin): Ribbon[] =>
    Array.from({ length: count }, (_, index) => {
      const color = COLORS[Math.floor(random() * COLORS.length)] ?? COLORS[0]
      const fromSide = origin !== 'top'
      const drift =
        origin === 'top'
          ? `${-90 + random() * 180}px`
          : origin === 'left'
            ? `${58 + random() * 48}vw`
            : `-${58 + random() * 48}vw`
      return {
        id: `${origin}-${index}`,
        origin,
        position: `${4 + random() * 92}%`,
        width: `${fromSide ? 7 + random() * 8 : 8 + random() * 9}px`,
        height: `${fromSide ? 64 + random() * 90 : 78 + random() * 110}px`,
        delay: `${random() * 0.55}s`,
        duration: `${3.1 + random() * 1.8}s`,
        drift,
        spin: `${-50 + random() * 100}deg`,
        turn: `${160 + random() * 220}deg`,
        background: ribbonBackground(color),
      }
    })

  return [...make(20, 'top'), ...make(8, 'left'), ...make(8, 'right')]
}

const ribbons = buildRibbons()

type ConfettiEffectProps = {
  active: boolean
}

export function ConfettiEffect({ active }: ConfettiEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active || !canvasRef.current) return

    const shoot = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: false,
    })

    const timers: number[] = []
    const burst = (options: confetti.Options) => {
      void shoot({
        colors: COLORS,
        ticks: 240,
        gravity: 0.85,
        decay: 0.91,
        scalar: 0.95,
        ...options,
      })
    }

    burst({
      particleCount: 150,
      spread: 100,
      startVelocity: 48,
      origin: { x: 0.5, y: 0.62 },
    })
    burst({
      particleCount: 70,
      angle: 58,
      spread: 68,
      startVelocity: 52,
      origin: { x: 0.02, y: 0.45 },
    })
    burst({
      particleCount: 70,
      angle: 122,
      spread: 68,
      startVelocity: 52,
      origin: { x: 0.98, y: 0.45 },
    })

    timers.push(
      window.setTimeout(() => {
        burst({
          particleCount: 90,
          spread: 130,
          startVelocity: 36,
          origin: { x: 0.5, y: 0.28 },
          scalar: 1.05,
          shapes: ['square', 'circle'],
        })
      }, 260),
    )

    timers.push(
      window.setTimeout(() => {
        burst({
          particleCount: 48,
          spread: 160,
          startVelocity: 28,
          origin: { x: 0.5, y: 0.18 },
          shapes: ['star', 'circle'],
          scalar: 0.85,
        })
        burst({
          particleCount: 36,
          angle: 70,
          spread: 50,
          origin: { x: 0, y: 0.2 },
        })
        burst({
          particleCount: 36,
          angle: 110,
          spread: 50,
          origin: { x: 1, y: 0.2 },
        })
      }, 640),
    )

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
      shoot.reset()
    }
  }, [active])

  if (!active) return null

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-40 h-full w-full"
      />
      <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
        {ribbons.map((ribbon) => (
          <span
            key={ribbon.id}
            className={`ribbon ribbon-${ribbon.origin}`}
            style={{
              ['--pos' as string]: ribbon.position,
              ['--w' as string]: ribbon.width,
              ['--h' as string]: ribbon.height,
              ['--delay' as string]: ribbon.delay,
              ['--dur' as string]: ribbon.duration,
              ['--drift' as string]: ribbon.drift,
              ['--spin' as string]: ribbon.spin,
              ['--turn' as string]: ribbon.turn,
              ['--c' as string]: ribbon.background,
            }}
          />
        ))}
      </div>
    </>
  )
}
