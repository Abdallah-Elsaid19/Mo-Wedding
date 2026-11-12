import { AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { ConfettiEffect } from './components/ConfettiEffect'
import { FloatingParticles } from './components/FloatingParticles'
import { SurpriseScreen } from './components/SurpriseScreen'
import { WeddingInvitation } from './components/WeddingInvitation'

type Phase = 'surprise' | 'revealed'

export default function App() {
  const [phase, setPhase] = useState<Phase>('surprise')
  const [locked, setLocked] = useState(false)
  const lock = useRef(false)

  const reveal = () => {
    if (lock.current) return
    lock.current = true
    setLocked(true)
    setPhase('revealed')
  }

  return (
    <main className="relative min-h-dvh overflow-x-clip bg-[#FAF6EF] text-[#3c291c]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,252,246,0.35)_0%,rgba(232,210,170,0.16)_46%,rgba(168,130,82,0.14)_100%)]" />
      <div className="pointer-events-none absolute -top-[12%] -left-24 h-[42vh] w-[42vh] rounded-full bg-[radial-gradient(circle,rgba(232,201,150,0.38),transparent_68%)] blur-2xl" />
      <div className="pointer-events-none absolute -right-20 bottom-[-10%] h-[48vh] w-[48vh] rounded-full bg-[radial-gradient(circle,rgba(226,186,186,0.28),transparent_70%)] blur-2xl" />

      <FloatingParticles />
      <ConfettiEffect active={phase === 'revealed'} />

      <AnimatePresence mode="wait">
        {phase === 'surprise' ? (
          <SurpriseScreen key="surprise" onSurprise={reveal} disabled={locked} />
        ) : (
          <WeddingInvitation key="invitation" />
        )}
      </AnimatePresence>
    </main>
  )
}
