import { Branches } from './Branches'
import { Flower } from './Flower'
import { Leaves } from './Leaves'
import { Rose } from './Rose'

type FloralCornerProps = {
  className?: string
  variant?: 'blush' | 'cream'
}

export function FloralCorner({ className, variant = 'blush' }: FloralCornerProps) {
  const primary = variant === 'blush' ? 'blush' : 'cream'
  const secondary = variant === 'blush' ? 'champagne' : 'beige'

  return (
    <div className={`pointer-events-none relative h-full w-full ${className ?? ''}`}>
      <Branches className="absolute inset-[-6%] h-[112%] w-[112%] opacity-90" />

      <Leaves
        className="absolute left-[-4%] top-[18%] w-[78%] rotate-[-8deg]"
        variant="olive"
      />
      <Leaves
        className="absolute left-[16%] top-[-2%] w-[62%] rotate-[24deg] opacity-90"
        variant="sage"
      />

      <Rose
        className="absolute left-[2%] top-[2%] w-[48%] drop-shadow-[0_2px_2px_rgba(90,60,40,0.12)]"
        palette={primary}
      />
      <Flower
        className="absolute left-[34%] top-[26%] w-[42%]"
        palette={variant === 'blush' ? 'cream' : 'beige'}
      />
      <Rose
        className="absolute left-[-2%] top-[40%] w-[34%] rotate-[12deg]"
        palette={secondary}
      />
      <Flower
        className="absolute left-[30%] top-[2%] w-[24%] rotate-[-16deg]"
        palette="blush"
      />

      <Leaves
        className="absolute left-[8%] top-[46%] w-[46%] rotate-[16deg]"
        variant="muted"
      />

      <svg
        viewBox="0 0 70 54"
        className="absolute left-[24%] top-[58%] w-[28%]"
        aria-hidden="true"
      >
        <path
          d="M8 40 C 18 28, 28 30, 36 18"
          fill="none"
          stroke="#6A6248"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <circle cx="16" cy="28" r="4.3" fill="#8E4540" />
        <circle cx="14.6" cy="26.4" r="1.3" fill="#F0C8C2" opacity="0.75" />
        <circle cx="26" cy="22" r="3.5" fill="#A85A52" />
        <circle cx="24.8" cy="20.7" r="1" fill="#F3D2CC" opacity="0.7" />
        <circle cx="22" cy="34" r="3.1" fill="#7A3E3A" />
        <circle cx="34" cy="30" r="2.5" fill="#C47A72" />
        <circle cx="40" cy="20" r="2.1" fill="#9A514C" />
        <circle cx="12" cy="38" r="1.7" fill="#B8645C" />
      </svg>
    </div>
  )
}
