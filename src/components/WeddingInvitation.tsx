
import { motion, useReducedMotion } from 'framer-motion'
import { useId } from 'react'
import { FloralCorner } from './decorations/FloralCorner'
import { GoldFrame } from './decorations/GoldFrame'

const corners = [
  { className: 'left-[-4%] top-[-1%]', flip: '', variant: 'blush' as const },
  { className: 'right-[-4%] top-[-1%]', flip: 'scale-x-[-1]', variant: 'cream' as const },
  { className: 'bottom-[-1%] left-[-4%]', flip: 'scale-y-[-1]', variant: 'cream' as const },
  { className: 'right-[-4%] bottom-[-1%]', flip: 'scale-[-1]', variant: 'blush' as const },
]

function PaperGrain() {
  const id = `paper-${useId().replace(/[^a-zA-Z0-9]/g, '')}`

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-30 mix-blend-multiply"
      aria-hidden="true"
    >
      <filter id={id}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  )
}

function GoldRule() {
  return (
    <div
      className="flex items-center justify-center gap-[0.65em] text-[#C6A36A]"
      aria-hidden="true"
    >
      <span className="h-px w-[clamp(1.1rem,7cqw,2.8rem)] bg-gradient-to-r from-transparent to-current" />

      <svg viewBox="0 0 12 12" className="h-[0.55em] w-[0.55em]">
        <path
          d="M6 0.5 L7.3 4.7 L11.5 6 L7.3 7.3 L6 11.5 L4.7 7.3 L0.5 6 L4.7 4.7 Z"
          fill="currentColor"
        />
      </svg>

      <span className="h-px w-[clamp(1.1rem,7cqw,2.8rem)] bg-gradient-to-l from-transparent to-current" />
    </div>
  )
}

export function WeddingInvitation() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      className="relative z-30 flex h-dvh min-h-0 items-center justify-center overflow-hidden px-3 py-0 sm:px-6"      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <div className="relative">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(214,176,96,0.5),transparent_68%)] blur-2xl sm:-inset-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: reduceMotion ? 0.45 : [0.32, 0.68, 0.42] }}
          transition={{
            delay: 0.35,
            duration: reduceMotion ? 0.4 : 4.2,
            repeat: reduceMotion ? 0 : Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.article
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: reduceMotion ? 0.4 : 1.15,
            delay: reduceMotion ? 0.05 : 0.28,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="@container invitation-paper relative w-[min(92vw,440px,calc(92dvh/1.62))] overflow-visible shadow-[0_28px_80px_rgba(88,60,28,0.18),0_0_54px_rgba(201,164,90,0.32)] ring-1 ring-[#eadfcb] [aspect-ratio:100/162]"        >
          <PaperGrain />

          <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(255,255,255,0.28),transparent_22%,transparent_78%,rgba(176,140,90,0.05))]" />

          <GoldFrame className="pointer-events-none absolute inset-[4%] z-10 h-[92%] w-[92%]" />

          {corners.map((corner) => (
            <div
              key={corner.className}
              className={`absolute z-20 h-[30%] w-[52%] ${corner.className} ${corner.flip}`}
            >
              <FloralCorner variant={corner.variant} />
            </div>
          ))}

          <div className="relative z-30 flex h-full flex-col items-center justify-center px-[13%] pt-[18%] pb-[14%] text-center">
            <p className="font-display text-[clamp(1rem,4.5cqw,1.45rem)] leading-snug text-[#5c4632] italic">
              Join us for
              <br />
              the wedding of
            </p>

            <div className="mt-[0.35em] flex flex-col items-center">
              <h1 className="font-script text-[clamp(2.7rem,14.5cqw,4.9rem)] leading-[0.92] font-normal text-[#3c291c]">
                <span className="block mt-2">Mohamed</span>
                <span className="my-[0.02em] block text-[0.62em] leading-none text-[#a07d3e]">
                  &
                </span>
                <span className="block">Mayar</span>
              </h1>
            </div>

            <div className="mt-[0.85em]">
              <GoldRule />
            </div>

            <p className="mt-[0.85em] font-display text-[clamp(0.72rem,3.15cqw,0.98rem)] tracking-[0.38em] text-[#8a6a38]">
              DECEMBER
            </p>

            <p className="font-display text-[clamp(2.5rem,12cqw,2.15rem)] leading-none font-medium text-[#3c291c]">
              4
            </p>

            {/* Wedding Time */}
            <p className="mt-[0.35em] font-display text-[clamp(0.9rem,3.8cqw,1.2rem)] tracking-[0.18em] text-[#8a6a38]">
              8:00 PM
            </p>

            <div className="mt-[0.7em]">
              <GoldRule />
            </div>

            <p className="mt-[0.1em] font-serif text-[clamp(1.2rem,5.1cqw,1.75rem)] tracking-[0.08em] text-[#5a4030] italic">
              Rotana Hall
            </p>
          </div>
        </motion.article>
      </div>
    </motion.section>
  )
}
