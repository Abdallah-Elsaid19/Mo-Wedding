import { Heart, Sparkle, Sparkles } from 'lucide-react'
import { createRng } from '../utils/random'

type ParticleKind = 'dot' | 'mote' | 'heart' | 'spark'

type Particle = {
  id: number
  kind: ParticleKind
  left: string
  top: string
  size: number
  delay: string
  duration: string
  drift: string
  tilt: string
  color: string
  opacity: number
}

const colors = ['#E8D3A3', '#C6A36A', '#F3E6D0', '#E7C2BE', '#D7B56A', '#F7EFE3']

function buildParticles(): Particle[] {
  const random = createRng(41204)
  const kinds: ParticleKind[] = ['dot', 'dot', 'mote', 'spark', 'heart', 'dot', 'spark']

  return Array.from({ length: 22 }, (_, id) => {
    const kind = kinds[id % kinds.length] ?? 'dot'
    return {
      id,
      kind,
      left: `${random() * 100}%`,
      top: `${random() * 100}%`,
      size: kind === 'mote' ? 10 + random() * 18 : 8 + random() * 12,
      delay: `${-random() * 8}s`,
      duration: `${7 + random() * 8}s`,
      drift: `${-12 + random() * 24}px`,
      tilt: `${-10 + random() * 20}deg`,
      color: colors[Math.floor(random() * colors.length)] ?? colors[0],
      opacity: 0.35 + random() * 0.5,
    }
  })
}

const particles = buildParticles()

export function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className={particle.kind === 'spark' || particle.kind === 'heart' ? 'spark-twinkle absolute' : 'float-particle absolute'}
          style={{
            left: particle.left,
            top: particle.top,
            color: particle.color,
            opacity: particle.opacity,
            ['--dur' as string]: particle.duration,
            ['--delay' as string]: particle.delay,
            ['--drift' as string]: particle.drift,
            ['--tilt' as string]: particle.tilt,
          }}
        >
          {particle.kind === 'heart' ? (
            <Heart size={particle.size} strokeWidth={1.4} fill="currentColor" />
          ) : null}
          {particle.kind === 'spark' ? (
            particle.id % 2 === 0 ? (
              <Sparkles size={particle.size} strokeWidth={1.4} />
            ) : (
              <Sparkle size={particle.size} strokeWidth={1.4} />
            )
          ) : null}
          {particle.kind === 'dot' ? (
            <span
              className="block rounded-full"
              style={{
                width: particle.size * 0.45,
                height: particle.size * 0.45,
                background: particle.color,
                boxShadow: `0 0 10px ${particle.color}`,
              }}
            />
          ) : null}
          {particle.kind === 'mote' ? (
            <span
              className="block rounded-full blur-[1px]"
              style={{
                width: particle.size,
                height: particle.size,
                background: `radial-gradient(circle, ${particle.color}, transparent 70%)`,
              }}
            />
          ) : null}
        </span>
      ))}
    </div>
  )
}
