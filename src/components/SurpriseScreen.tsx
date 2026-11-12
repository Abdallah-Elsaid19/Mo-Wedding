import { motion } from 'framer-motion'

type SurpriseScreenProps = {
  onSurprise: () => void
  disabled: boolean
}

export function SurpriseScreen({ onSurprise, disabled }: SurpriseScreenProps) {
  return (
    <motion.section
      className="relative z-30 flex min-h-dvh w-full flex-col items-center justify-center px-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(82vw,460px)] w-[min(82vw,460px)] -translate-x-1/2 -translate-y-1/2">
        <svg viewBox="0 0 200 200" className="ornament-spin h-full w-full" aria-hidden="true">
          <circle cx="100" cy="100" r="78" fill="none" stroke="#C6A36A" strokeWidth="0.6" opacity="0.55" />
          <circle cx="100" cy="100" r="90" fill="none" stroke="#E7D3A8" strokeWidth="0.45" opacity="0.8" />
          {[0, 90, 180, 270].map((angle) => (
            <path
              key={angle}
              d="M0 -3.1 L2.1 0 L0 3.1 L-2.1 0 Z"
              fill="#C6A36A"
              transform={`translate(100 100) rotate(${angle}) translate(0 -90)`}
            />
          ))}
        </svg>
      </div>

      <div className="relative flex flex-col items-center">
        <motion.span
          aria-hidden="true"
          className="absolute -inset-x-8 -inset-y-5 rounded-full bg-[radial-gradient(circle,rgba(226,190,110,0.55),transparent_68%)] blur-lg"
          animate={
            disabled
              ? { opacity: 0.3, scale: 1 }
              : { opacity: [0.4, 0.9, 0.4], scale: [0.96, 1.08, 0.96] }
          }
          transition={{ duration: 2.6, repeat: disabled ? 0 : Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          animate={disabled ? { scale: 1 } : { scale: [1, 1.035, 1] }}
          transition={{ duration: 2.5, repeat: disabled ? 0 : Infinity, ease: 'easeInOut' }}
        >
          <motion.button
            type="button"
            onClick={onSurprise}
            disabled={disabled}
            whileHover={disabled ? undefined : { scale: 1.05, y: -2 }}
            whileTap={disabled ? undefined : { scale: 0.98 }}
            className="relative overflow-hidden rounded-full border border-[#f8edd4] px-10 py-4 font-display text-[0.95rem] tracking-[0.34em] text-[#3f2c1c] uppercase shadow-[0_12px_40px_rgba(176,132,60,0.42),0_0_32px_rgba(232,201,122,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8a6a32] disabled:cursor-default sm:px-14 sm:py-5 sm:text-lg sm:tracking-[0.42em]"
            style={{
              background:
                'linear-gradient(155deg, #f8e7c1 0%, #e7c98a 34%, #c4964a 62%, #f3dcb0 100%)',
            }}
          >
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/55 to-transparent"
              animate={{ x: ['-130%', '340%'] }}
              transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
            />
            <span className="relative">SURPRISE!</span>
          </motion.button>
        </motion.div>

        <p className="relative mt-8 max-w-xs text-center font-serif text-xl text-[#6d5642] italic sm:text-2xl">
          We have something special for you...
        </p>
      </div>
    </motion.section>
  )
}
