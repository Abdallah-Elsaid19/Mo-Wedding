type BranchesProps = {
  className?: string
}

export function Branches({ className }: BranchesProps) {
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true" fill="none">
      <path
        d="M18 214 C 62 176, 84 150, 132 104 C 158 80, 176 62, 214 28"
        stroke="#6A6248"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M74 162 C 92 148, 108 154, 128 136"
        stroke="#7C7356"
        strokeWidth="1.05"
        strokeLinecap="round"
      />
      <path
        d="M112 118 C 128 104, 146 112, 168 92"
        stroke="#6A6248"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M48 188 C 36 164, 52 146, 44 122"
        stroke="#8A7B58"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M150 78 C 162 64, 160 50, 174 40"
        stroke="#7A7054"
        strokeWidth="0.85"
        strokeLinecap="round"
      />
      <path
        d="M96 138 C 84 126, 86 110, 74 102"
        stroke="#6E684E"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <circle cx="214" cy="28" r="1.4" fill="#8E4540" />
      <circle cx="176" cy="38" r="1.15" fill="#A85A52" />
      <circle cx="128" cy="134" r="1.2" fill="#7A3E3A" />
    </svg>
  )
}
